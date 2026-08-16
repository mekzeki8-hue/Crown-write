/**
 * Simple inline prompts for fine-tuned model
 * Since the model is already trained for humanization, we only need minimal tone instructions
 */

type ToneType = 'standard' | 'academic' | 'professional' | 'friendly' | 'formal' | 'casual' | 'creative';

/**
 * ULTIMATE HUMANIZATION PROMPT - Proven AI Detection Bypass
 * Based on tested methods that achieve 98%+ human detection scores
 */
export function getHumanizationPrompt(tone: ToneType = 'standard'): string {
  const baseInstruction = `Rewrite this text to sound NATURALLY HUMAN-WRITTEN and BYPASS ALL AI DETECTORS.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CORE MISSION: 150+ WORDS MINIMUM, NO DETECTABLE PATTERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL REQUIREMENTS:
✓ Every sentence structure COMPLETELY RANDOM
✓ Include grammatical mistakes that 99% of humans wouldn't spot (keep it readable)
✓ Use first-grade SIMPLE language
✓ First person perspective where natural
✓ CHANGE writing style EVERY SINGLE SENTENCE
✓ No predictable patterns whatsoever

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 REMOVE ALL AI FLUFF WORDS (CRITICAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEVER USE these words (they scream "AI WROTE THIS"):
❌ "delve" → use "look into" or "explore"
❌ "leverage" → use "use"
❌ "optimize" → use "improve" or "make better"
❌ "enhance" → use "boost" or "improve"
❌ "utilize" → use "use"
❌ "facilitate" → use "help" or "make easier"
❌ "implement" → use "do" or "start"
❌ "IN TODAY'S DIGITAL LANDSCAPE" → NEVER use this phrase (instant AI flag)
❌ "Moreover," "Furthermore," "Additionally" → use "Also," "Plus," "And"
❌ "It's important to note" → just state the point directly
❌ "It's worth mentioning" → just say it
❌ "In conclusion" → use "So," "Bottom line," or just conclude naturally
❌ M-dashes (—) or em dashes
❌ Bullet points or numbered lists in output

REPLACE with FIRST-GRADE simple words that real people actually use.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PROVEN HUMANIZATION TECHNIQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SPLIT UP TEXT FOR READABILITY
   - Every sentence should feel different from the last
   - Vary paragraph lengths wildly
   - Use short sentences. Then longer flowing ones. Mix it up constantly.

2. WRITE LIKE TALKING TO A FRIEND
   - Use "you," "I," "we" naturally
   - Sound conversational, not corporate
   - Be empathetic, humorous where appropriate
   - Make it interesting - hook from first sentence

3. VARY SENTENCE LENGTH DRAMATICALLY (CRITICAL)
   - 5 words. Then 25 words explaining something in detail with natural flow. Back to 7 words. Then 35+ words diving deeper into the concept.
   - NO uniform rhythm - create friction and unpredictability
   - Mix choppy and flowing styles within same paragraph

4. CHANGE STRUCTURE EVERY SENTENCE
   - Don't start sentences the same way
   - Mix active and passive voice randomly
   - Break grammar rules occasionally (start with "And" or "But")
   - Use sentence fragments for emphasis. Like this.
   - Change perspective and angle constantly

5. ADD DESCRIPTIVE, PERSUASIVE, ACTION-ORIENTED ELEMENTS
   - Be concise yet informative
   - Use concrete examples, not abstract concepts
   - Make readers feel something
   - Include natural imperfections

6. BREAK AI LOGIC PATTERNS
   - AI does: intro → 3 points → summary. DON'T DO THIS.
   - Jump into main point immediately
   - Rearrange order unpredictably
   - Skip formal introductions
   - End without neat summary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 REWRITING PROCESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DON'T edit word by word. Instead:
1. Understand the core message
2. Close your eyes: "How would I explain this to a friend?"
3. Rewrite from SCRATCH in natural speech patterns
4. Mix sentence lengths: 5-40 words, completely random
5. Remove all AI fluff words and corporate speak
6. Add slight grammatical imperfections (but keep readable)
7. Make every sentence structure different

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️ WRITING STYLE (MAKE IT HUMAN)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Use contractions EVERYWHERE (it's, don't, can't, won't, you're, there's, here's, we're, they're)
✓ Simple words only - first grade language
✓ Write like you talk - conversational, not formal
✓ Hook readers from first sentence
✓ Be interesting, empathetic, slightly humorous
✓ Sound like a real person with personality
✓ Include natural phrases: "Look," "Here's the thing," "Honestly," "The truth is," "You know what?"
✓ Break grammar rules occasionally for natural flow
✓ Use sentence fragments. For emphasis.
✓ Start sentences with "And" or "But" sometimes
✓ Mix formal and casual unpredictably
✓ Add human perspective and interpretation
✓ Make unique connections between ideas
✓ Be concise, descriptive, persuasive, informative, action-oriented

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 OUTPUT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. START with: "It has been observed that" then continue naturally
2. 150+ words MINIMUM - match input length closely
3. NO em dashes (—), NO bullet points, NO numbered lists, NO formatting
4. Every sentence on new line (easier to read)
5. Wildly varied sentence lengths (5-40 words, completely random)
6. Change sentence structure EVERY SINGLE SENTENCE
7. Include small grammatical mistakes (99% won't notice, keeps readable)
8. Use FIRST-GRADE simple language throughout
9. Plain flowing text - zero formatting symbols
10. Natural paragraph breaks where ideas shift
11. ZERO AI fluff words - only simple conversational language`;
  
  const toneInstructions: Record<ToneType, string> = {
    standard: baseInstruction + '\n\n🎯 TONE: Natural everyday talk. Like explaining to a friend. Conversational, clear, interesting. Mix casual and precise. Real human personality.',
    academic: baseInstruction + '\n\n🎯 TONE: Scholarly but STILL conversational. Academic vocabulary with natural rhythm. NOT robotic. Still vary sentences wildly. Sound like a smart person talking, not a textbook.',
    professional: baseInstruction + '\n\n🎯 TONE: Clear business language. Natural and approachable, NOT corporate-robotic. Confident but friendly. Avoid jargon. Sound competent but human.',
    friendly: baseInstruction + '\n\n🎯 TONE: Warm, conversational, like talking over coffee. Relaxed, authentic, empathetic. Use "you" and "I" naturally. Sound like a helpful friend.',
    formal: baseInstruction + '\n\n🎯 TONE: Polished and professional, but STILL human. Vary structure even with formality. Not rigid. Add subtle warmth and perspective.',
    casual: baseInstruction + '\n\n🎯 TONE: Super relaxed everyday talk. Very conversational. Natural and easygoing. Lots of contractions. Sound like casual conversation.',
    creative: baseInstruction + '\n\n🎯 TONE: Expressive, imaginative, unpredictable. Maximum sentence variety. Engaging, vivid flow. Break conventions. Be interesting and unique.',
  };

  return toneInstructions[tone] || toneInstructions.standard;
}

/**
 * Validate that all required environment variables are present
 */
export function validateEnvConfig(): { valid: boolean; missing: string[] } {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'GOOGLE_CLOUD_PROJECT',
    'TUNED_MODEL_ENDPOINT',
  ];

  const missing = required.filter((key) => !process.env[key]);

  return {
    valid: missing.length === 0,
    missing,
  };
}
