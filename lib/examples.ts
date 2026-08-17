/**
 * Few-shot learning examples for teaching AI to humanize text
 * Each example shows a clear before/after transformation
 */

export interface HumanizationExample {
  category: string;
  aiVersion: string;
  humanVersion: string;
  keyChanges: string[];
}

/**
 * Curated examples showing AI → Human transformations
 */
export const humanizationExamples: HumanizationExample[] = [
  {
    category: 'success',
    aiVersion: 'Success is often misunderstood as a destination marked by wealth and status. In reality, it represents a continuous journey characterized by personal growth and resilience. Moreover, success requires dedication and perseverance.',
    humanVersion: "People think success is about money and status. Like, hitting some finish line and you're done. But that's not it. It's more of an ongoing thing - growing, bouncing back from setbacks. And yeah, it takes real dedication.",
    keyChanges: [
      'Removed "In reality" → used "But that\'s not it"',
      'Changed "Moreover" → "And yeah"',
      'Added casual markers ("Like", "that kind of stuff")',
      'Used contractions ("you\'re", "that\'s", "it\'s")',
      'Broke long sentences into shorter ones'
    ]
  },
  {
    category: 'technology',
    aiVersion: 'Technology has become an essential component of modern life, transforming the manner in which individuals communicate, work, and learn. One of the greatest benefits of technology is its profound impact on communication.',
    humanVersion: "Tech is everywhere now. It's changed how we talk to each other, how we work, how we learn stuff. And honestly? The communication part is huge. Being able to instantly connect with someone across the world - that's pretty incredible.",
    keyChanges: [
      '"Technology" → "Tech"',
      '"individuals" → "we"',
      'Split into multiple short sentences',
      'Added personality ("honestly?", "that\'s pretty incredible")',
      'Made it conversational'
    ]
  },
  {
    category: 'education',
    aiVersion: 'Education plays a vital role in societal development, equipping individuals with essential knowledge and skills necessary to navigate life effectively.',
    humanVersion: "Education matters. It's not just about learning facts - it's about building skills you'll actually use and becoming someone who can figure stuff out.",
    keyChanges: [
      '"plays a vital role" → "matters"',
      '"individuals" → "you"',
      'Made concrete ("figure stuff out" vs "navigate life")',
      'Used contractions',
      'Direct, conversational tone'
    ]
  },
  {
    category: 'ai',
    aiVersion: 'Artificial intelligence is rapidly transforming the modern world, revolutionizing how individuals work, learn, and interact with technology. The implications are far-reaching and significant.',
    humanVersion: "AI is changing everything. How we work, how we learn, how we use tech - it's all different now. And the impact? It's bigger than most people realize.",
    keyChanges: [
      '"Artificial intelligence" → "AI"',
      'Removed "revolutionizing" (too dramatic)',
      'Fragment sentences for emphasis',
      'Added question ("And the impact?")',
      'Natural speaking rhythm'
    ]
  },
  {
    category: 'health',
    aiVersion: 'Maintaining good health requires a balanced lifestyle. It is important to consume nutritious foods and engage in regular physical activity.',
    humanVersion: "Staying healthy is pretty straightforward. Eat decent food, move your body regularly. That's really the foundation of it.",
    keyChanges: [
      'Simplified language',
      'Removed formal structure',
      'Used casual phrasing ("pretty straightforward")',
      'Direct instructions',
      'Natural conclusion'
    ]
  },
  {
    category: 'business',
    aiVersion: 'Effective leadership necessitates strong communication skills and the ability to inspire team members. Moreover, leaders must demonstrate integrity and accountability.',
    humanVersion: "Good leaders need to communicate well and get their team motivated. But here's the thing - if you don't have integrity, if you're not accountable for your decisions, none of that matters.",
    keyChanges: [
      '"necessitates" → "need to"',
      '"Moreover" → "But here\'s the thing"',
      'Added personal emphasis',
      'Conversational conditional ("if you don\'t...")',
      'Strong, direct ending'
    ]
  }
];

/**
 * Select most relevant examples based on input text characteristics
 * Returns 2-3 examples that match the input style/topic
 */
export function selectRelevantExamples(inputText: string, count: number = 2): HumanizationExample[] {
  const input = inputText.toLowerCase();
  const scored = humanizationExamples.map(example => {
    let score = 0;
    
    // Score by keyword matching
    const keywords = example.category.split(',');
    keywords.forEach(keyword => {
      if (input.includes(keyword.trim())) score += 10;
    });
    
    // Score by AI marker presence (these examples will be most helpful)
    const aiMarkers = ['moreover', 'furthermore', 'in reality', 'individuals', 'necessitates', 'utilize'];
    aiMarkers.forEach(marker => {
      if (input.includes(marker)) score += 5;
    });
    
    // Add randomness for variety
    score += Math.random() * 3;
    
    return { example, score };
  });
  
  // Sort by score and return top examples
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map(s => s.example);
}

/**
 * Format examples for inclusion in prompt
 */
export function formatExamplesForPrompt(examples: HumanizationExample[]): string {
  return examples.map((ex, i) => `
EXAMPLE ${i + 1}:

❌ AI Version:
"${ex.aiVersion}"

✅ Human Version:
"${ex.humanVersion}"

What Changed:
${ex.keyChanges.map(change => `- ${change}`).join('\n')}
`).join('\n---\n');
}

/**
 * Get dynamic few-shot examples based on input
 */
export function getDynamicExamples(inputText: string): string {
  const relevant = selectRelevantExamples(inputText, 2);
  return formatExamplesForPrompt(relevant);
}
