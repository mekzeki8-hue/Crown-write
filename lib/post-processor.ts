/**
 * Post-processing system to clean up remaining robotic patterns
 * Final safety net to ensure natural human output
 */

interface ReplacementRule {
  pattern: RegExp;
  replacement: string | ((match: string) => string);
  description: string;
}

/**
 * Intelligent replacement rules for common AI patterns
 */
const CLEANUP_RULES: ReplacementRule[] = [
  // Formal transitions → Casual
  {
    pattern: /\b(Moreover|Furthermore|Additionally),\s/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.4) return 'Also, ';
      if (rand < 0.7) return 'Plus, ';
      return 'And ';
    },
    description: 'Replace formal transitions'
  },
  {
    pattern: /\bUltimately,\s/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.5) return 'In the end, ';
      return 'At the end of the day, ';
    },
    description: 'Replace "Ultimately"'
  },
  {
    pattern: /\bIn reality,\s/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.4) return 'Actually, ';
      if (rand < 0.7) return 'Really, ';
      return 'Truth is, ';
    },
    description: 'Replace "In reality"'
  },
  
  // Formal phrases → Natural
  {
    pattern: /\bplays? a (vital|crucial|significant) role\b/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.5) return 'matters';
      return 'is important';
    },
    description: 'Replace "plays a vital role"'
  },
  {
    pattern: /\bone of the most (significant|important)\b/gi,
    replacement: 'really important',
    description: 'Simplify superlatives'
  },
  {
    pattern: /\bit is (important|essential|crucial) to note that\b/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.5) return 'here\'s the thing:';
      return 'look,';
    },
    description: 'Replace formal note phrases'
  },
  
  // Overly formal words → Simple
  {
    pattern: /\butilize\b/gi,
    replacement: 'use',
    description: 'utilize → use'
  },
  {
    pattern: /\bcommence\b/gi,
    replacement: 'start',
    description: 'commence → start'
  },
  {
    pattern: /\bterminate\b/gi,
    replacement: 'end',
    description: 'terminate → end'
  },
  
  // Add contractions where missing
  {
    pattern: /\bit is\b/gi,
    replacement: "it's",
    description: 'Add contraction: it is → it\'s'
  },
  {
    pattern: /\bdoes not\b/gi,
    replacement: "doesn't",
    description: 'Add contraction: does not → doesn\'t'
  },
  {
    pattern: /\bcannot\b/gi,
    replacement: "can't",
    description: 'Add contraction: cannot → can\'t'
  },
  {
    pattern: /\bwill not\b/gi,
    replacement: "won't",
    description: 'Add contraction: will not → won\'t'
  },
  {
    pattern: /\bare not\b/gi,
    replacement: "aren't",
    description: 'Add contraction: are not → aren\'t'
  },
  {
    pattern: /\bis not\b/gi,
    replacement: "isn't",
    description: 'Add contraction: is not → isn\'t'
  },
  {
    pattern: /\bdo not\b/gi,
    replacement: "don't",
    description: 'Add contraction: do not → don\'t'
  },
  {
    pattern: /\byou are\b/gi,
    replacement: "you're",
    description: 'Add contraction: you are → you\'re'
  },
  {
    pattern: /\bwe are\b/gi,
    replacement: "we're",
    description: 'Add contraction: we are → we\'re'
  },
  {
    pattern: /\bthey are\b/gi,
    replacement: "they're",
    description: 'Add contraction: they are → they\'re'
  },
  {
    pattern: /\bthat is\b/gi,
    replacement: "that's",
    description: 'Add contraction: that is → that\'s'
  },
  
  // Remove overly formal conclusions
  {
    pattern: /\bIn conclusion,\s/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.3) return 'Bottom line, ';
      if (rand < 0.6) return 'So, ';
      return ''; // Sometimes just remove it
    },
    description: 'Replace "In conclusion"'
  },
  {
    pattern: /\bTo summarize,\s/gi,
    replacement: 'So, ',
    description: 'Replace "To summarize"'
  }
];

/**
 * Apply post-processing cleanup to humanized text
 * Returns cleaned text with robotic patterns removed
 */
export function postProcessHumanizedText(text: string): {
  cleanedText: string;
  changesApplied: string[];
} {
  let cleanedText = text;
  const changesApplied: string[] = [];
  
  // Apply each cleanup rule
  CLEANUP_RULES.forEach(rule => {
    const before = cleanedText;
    
    if (typeof rule.replacement === 'function') {
      cleanedText = cleanedText.replace(rule.pattern, rule.replacement);
    } else {
      cleanedText = cleanedText.replace(rule.pattern, rule.replacement);
    }
    
    if (before !== cleanedText) {
      changesApplied.push(rule.description);
    }
  });
  
  // Additional cleanup: Fix double spaces
  cleanedText = cleanedText.replace(/\s{2,}/g, ' ');
  
  // Fix spacing around punctuation
  cleanedText = cleanedText.replace(/\s+([.,!?;:])/g, '$1');
  cleanedText = cleanedText.replace(/([.,!?;:])\s{2,}/g, '$1 ');
  
  return {
    cleanedText: cleanedText.trim(),
    changesApplied
  };
}

/**
 * Detect if text still has robotic patterns (for warnings)
 */
export function detectRemainingRoboticPatterns(text: string): {
  hasRoboticPatterns: boolean;
  patterns: string[];
} {
  const patterns: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Check for patterns we couldn't auto-fix
  const checkPatterns = [
    { regex: /\bindividuals\b/gi, name: '"individuals" (use "people" instead)' },
    { regex: /\bnevertheless\b/gi, name: '"nevertheless"' },
    { regex: /\bfurthermore\b/gi, name: '"furthermore"' },
    { regex: /\bmoreover\b/gi, name: '"moreover"' },
    { regex: /\bin actuality\b/gi, name: '"in actuality"' },
  ];
  
  checkPatterns.forEach(({ regex, name }) => {
    if (regex.test(text)) {
      patterns.push(name);
    }
  });
  
  return {
    hasRoboticPatterns: patterns.length > 0,
    patterns
  };
}

/**
 * Full post-processing pipeline with validation
 */
export function finalizeHumanizedText(text: string): {
  finalText: string;
  changesApplied: string[];
  warnings: string[];
  quality: 'excellent' | 'good' | 'needs-review';
} {
  // Step 1: Apply cleanup rules
  const { cleanedText, changesApplied } = postProcessHumanizedText(text);
  
  // Step 2: Detect remaining issues
  const { hasRoboticPatterns, patterns } = detectRemainingRoboticPatterns(cleanedText);
  
  // Step 3: Build warnings
  const warnings: string[] = [];
  if (hasRoboticPatterns) {
    warnings.push(`Still contains: ${patterns.join(', ')}`);
  }
  
  // Step 4: Assess quality
  let quality: 'excellent' | 'good' | 'needs-review';
  if (warnings.length === 0 && changesApplied.length < 3) {
    quality = 'excellent';
  } else if (warnings.length === 0) {
    quality = 'good';
  } else {
    quality = 'needs-review';
  }
  
  return {
    finalText: cleanedText,
    changesApplied,
    warnings,
    quality
  };
}
