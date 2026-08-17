/**
 * Post-processing system to clean up remaining robotic patterns
 * Final safety net to ensure natural human output
 */

type ToneType = 'standard' | 'academic' | 'professional' | 'friendly' | 'formal' | 'casual' | 'creative';

interface ReplacementRule {
  pattern: RegExp;
  replacement: string | ((match: string) => string);
  description: string;
  tones?: ToneType[]; // Only apply to specific tones (undefined = all tones)
}

/**
 * Intelligent replacement rules for common AI patterns
 * Now with tone-awareness!
 */
const CLEANUP_RULES: ReplacementRule[] = [
  // Formal transitions → Casual (skip for academic/formal tones)
  {
    pattern: /\b(Moreover|Furthermore|Additionally),\s/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.4) return 'Also, ';
      if (rand < 0.7) return 'Plus, ';
      return 'And ';
    },
    description: 'Replace formal transitions',
    tones: ['standard', 'friendly', 'casual', 'creative'] // Not academic/professional/formal
  },
  {
    pattern: /\bUltimately,\s/gi,
    replacement: (match) => {
      const rand = Math.random();
      if (rand < 0.5) return 'In the end, ';
      return 'At the end of the day, ';
    },
    description: 'Replace "Ultimately"',
    tones: ['standard', 'casual', 'friendly']
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
  
  // Add aggressive contractions for casual/friendly tones only
  {
    pattern: /\bit is\b/gi,
    replacement: "it's",
    description: 'Add contraction: it is → it\'s',
    tones: ['standard', 'casual', 'friendly', 'creative']
  },
  {
    pattern: /\bdoes not\b/gi,
    replacement: "doesn't",
    description: 'Add contraction: does not → doesn\'t',
    tones: ['standard', 'casual', 'friendly', 'creative']
  },
  {
    pattern: /\bcannot\b/gi,
    replacement: "can't",
    description: 'Add contraction: cannot → can\'t',
    tones: ['standard', 'casual', 'friendly', 'creative']
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
 * Apply post-processing cleanup to rewritten text
 * Now tone-aware: applies different rules based on tone
 */
export function postProcessRewrittenText(text: string, tone: ToneType = 'standard'): {
  cleanedText: string;
  changesApplied: string[];
} {
  let cleanedText = text;
  const changesApplied: string[] = [];
  
  // FIRST: Remove all formatting symbols (markdown, bullets, etc.)
  const beforeFormatting = cleanedText;
  
  // Remove markdown headers (# ## ###)
  cleanedText = cleanedText.replace(/^#{1,6}\s+/gm, '');
  
  // Remove bullet points and list markers (-, *, •, numbers)
  cleanedText = cleanedText.replace(/^[\s]*[-*•]\s+/gm, '');
  cleanedText = cleanedText.replace(/^[\s]*\d+\.\s+/gm, '');
  
  // Remove bold/italic markers (**, *, __)
  cleanedText = cleanedText.replace(/\*\*(.+?)\*\*/g, '$1');
  cleanedText = cleanedText.replace(/\*(.+?)\*/g, '$1');
  cleanedText = cleanedText.replace(/__(.+?)__/g, '$1');
  cleanedText = cleanedText.replace(/_(.+?)_/g, '$1');
  
  // Remove extra quotes around phrases
  cleanedText = cleanedText.replace(/"([^"]+)"/g, '$1');
  
  // CRITICAL: Remove ALL em dashes (—, –)
  cleanedText = cleanedText.replace(/—/g, ' ');
  cleanedText = cleanedText.replace(/–/g, ' ');
  
  // Remove code blocks
  cleanedText = cleanedText.replace(/```[\s\S]*?```/g, '');
  cleanedText = cleanedText.replace(/`([^`]+)`/g, '$1');
  
  if (beforeFormatting !== cleanedText) {
    changesApplied.push('Removed formatting symbols and em dashes');
  }
  
  // Apply each cleanup rule that matches the tone
  CLEANUP_RULES.forEach(rule => {
    // Skip if rule has tone restrictions and current tone isn't included
    if (rule.tones && !rule.tones.includes(tone)) {
      return;
    }
    
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
  
  // Additional cleanup: Fix double spaces (but keep single spaces from removed dashes)
  cleanedText = cleanedText.replace(/\s{3,}/g, ' ');
  cleanedText = cleanedText.replace(/\s{2}/g, ' ');
  
  // Fix spacing around punctuation
  cleanedText = cleanedText.replace(/\s+([.,!?;:])/g, '$1');
  cleanedText = cleanedText.replace(/([.,!?;:])\s{2,}/g, '$1 ');
  
  // Preserve paragraph breaks: Keep double line breaks, remove excessive ones
  cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');
  
  // Ensure "It has been observed that" is at the start
  if (!cleanedText.trim().startsWith('It has been observed that')) {
    changesApplied.push('Added standard opening phrase');
    cleanedText = 'It has been observed that ' + cleanedText.trim();
  }
  
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
 * Now includes tone parameter for smart processing
 */
export function finalizeRewrittenText(text: string, tone: ToneType = 'standard'): {
  finalText: string;
  changesApplied: string[];
  warnings: string[];
  quality: 'excellent' | 'good' | 'needs-review';
} {
  // Step 1: Apply cleanup rules (tone-aware)
  const { cleanedText, changesApplied } = postProcessRewrittenText(text, tone);
  
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
