/**
 * Quality scoring system for humanized text
 * Evaluates how natural and human-like the output is
 * Now with tone-aware scoring!
 */

type ToneType = 'standard' | 'academic' | 'professional' | 'friendly' | 'formal' | 'casual' | 'creative';

export interface QualityScore {
  total: number;           // 0-100 overall score
  naturalness: number;     // How natural it sounds (30pts)
  variety: number;         // Sentence structure variety (25pts)
  toneMatch: number;       // How well it matches requested tone (25pts)
  roboticMarkers: number;  // Penalty for AI markers (20pts)
  details: {
    roboticPhrasesFound: string[];
    contractionsCount: number;
    sentenceLengthVariety: number;
    casualMarkersCount: number;
    toneScore: string;
  };
}

/**
 * Forbidden AI phrases that scream "robot wrote this"
 */
const ROBOTIC_PHRASES = [
  'moreover',
  'furthermore',
  'additionally',
  'nevertheless',
  'in reality',
  'in actuality',
  'ultimately',
  'in conclusion',
  'to summarize',
  'plays a vital role',
  'plays a crucial role',
  'one of the most significant',
  'one of the most important',
  'it is important to note',
  'it should be noted',
  'individuals' // when used repeatedly
];

/**
 * Casual markers that indicate natural human writing
 */
const CASUAL_MARKERS = [
  "it's", "don't", "can't", "won't", "doesn't", "isn't", "aren't",
  'honestly', 'really', 'pretty much', 'kind of', 'sort of',
  'look,', 'truth is', "here's the thing", 'basically',
  'stuff', 'things', 'way', 'just', 'actually'
];

/**
 * Score how well the text matches the requested tone
 */
function scoreToneMatch(text: string, tone: ToneType): { score: number; description: string } {
  const lowerText = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgLength = sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) / sentences.length;
  
  let score = 15; // Base score
  let description = '';
  
  // Count contractions
  const contractionCount = (text.match(/\b\w+'\w+\b/g) || []).length;
  const contractionRatio = contractionCount / sentences.length;
  
  // Count casual markers
  const casualCount = CASUAL_MARKERS.filter(m => lowerText.includes(m.toLowerCase())).length;
  
  // Count formal markers
  const formalMarkers = ['furthermore', 'moreover', 'hence', 'thus', 'therefore'];
  const formalCount = formalMarkers.filter(m => lowerText.includes(m)).length;
  
  switch (tone) {
    case 'academic':
      // Scholarly but natural - moderate contractions OK, longer sentences
      if (avgLength > 15 && avgLength < 25) score += 5;
      if (contractionRatio < 0.3 && contractionRatio > 0.1) score += 3;
      if (formalCount > 0 && formalCount < 3) score += 2;
      description = 'Scholarly tone';
      break;
      
    case 'professional':
      // Clear business language - some contractions, balanced sentences
      if (avgLength > 12 && avgLength < 20) score += 5;
      if (contractionRatio > 0.2 && contractionRatio < 0.5) score += 5;
      description = 'Professional tone';
      break;
      
    case 'formal':
      // Polished and proper - minimal contractions, structured
      if (avgLength > 15) score += 5;
      if (contractionRatio < 0.2) score += 5;
      description = 'Formal tone';
      break;
      
    case 'casual':
    case 'friendly':
      // Relaxed and conversational - lots of contractions and casual markers
      if (contractionRatio > 0.4) score += 5;
      if (casualCount > 2) score += 3;
      if (avgLength < 18) score += 2;
      description = 'Conversational tone';
      break;
      
    case 'creative':
      // Expressive and vivid - varied sentences, creative language
      const lengths = sentences.map(s => s.trim().split(/\s+/).length);
      const variance = lengths.reduce((sum, len, _, arr) => {
        const mean = arr.reduce((a, b) => a + b) / arr.length;
        return sum + Math.pow(len - mean, 2);
      }, 0) / lengths.length;
      if (variance > 30) score += 5;
      if (contractionRatio > 0.3) score += 5;
      description = 'Creative tone';
      break;
      
    case 'standard':
    default:
      // Natural everyday language - good contractions, varied sentences
      if (contractionRatio > 0.3) score += 3;
      if (casualCount > 1) score += 2;
      if (avgLength > 10 && avgLength < 20) score += 5;
      description = 'Natural tone';
      break;
  }
  
  return { score: Math.min(score, 25), description };
}

/**
 * Score the quality of humanized text (ENHANCED with tone matching)
 * Higher score = more human-like
 */
export function scoreHumanizedText(text: string, tone: ToneType = 'standard'): QualityScore {
  const lowerText = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // 1. CHECK FOR ROBOTIC PHRASES (heavy penalty)
  const roboticPhrasesFound: string[] = [];
  let roboticPenalty = 0;
  
  ROBOTIC_PHRASES.forEach(phrase => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      roboticPhrasesFound.push(...matches);
      roboticPenalty += matches.length * 15; // -15 per robotic phrase
    }
  });
  
  // 2. COUNT CONTRACTIONS (good sign)
  let contractionsCount = 0;
  const contractionPattern = /\b\w+'\w+\b/g;
  const contractions = text.match(contractionPattern);
  if (contractions) {
    contractionsCount = contractions.length;
  }
  const contractionScore = Math.min(contractionsCount * 5, 30); // Up to +30
  
  // 3. SENTENCE LENGTH VARIETY
  const lengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);
  const varietyScore = Math.min(stdDev * 3, 25); // Up to +25 for variety
  
  // 4. CASUAL MARKERS (good sign)
  let casualMarkersCount = 0;
  CASUAL_MARKERS.forEach(marker => {
    if (lowerText.includes(marker.toLowerCase())) {
      casualMarkersCount++;
    }
  });
  const casualScore = Math.min(casualMarkersCount * 4, 25); // Up to +25
  
  // 5. AVOID OVERLY LONG SENTENCES (penalty)
  const longSentencePenalty = lengths.filter(l => l > 30).length * 5;
  
  // 6. REPETITION CHECK (penalty for same sentence structure)
  const startsWithThe = sentences.filter(s => s.trim().toLowerCase().startsWith('the ')).length;
  const repetitionPenalty = startsWithThe > 3 ? (startsWithThe - 3) * 3 : 0;
  
  // CALCULATE COMPONENT SCORES
  const naturalness = Math.max(0, Math.min(30, 30 - (roboticPenalty / 2) + (contractionsCount * 1.5)));
  const variety = Math.max(0, Math.min(25, varietyScore - repetitionPenalty));
  const toneMatchResult = scoreToneMatch(text, tone);
  const toneMatch = toneMatchResult.score;
  const roboticMarkers = Math.max(0, 20 - roboticPhrasesFound.length * 4);
  
  // TOTAL SCORE (0-100)
  const total = Math.max(0, Math.min(100,
    naturalness + variety + toneMatch + roboticMarkers
  ));
  
  return {
    total,
    naturalness: Math.round(naturalness),
    variety: Math.round(variety),
    toneMatch: Math.round(toneMatch),
    roboticMarkers: Math.round(roboticMarkers),
    details: {
      roboticPhrasesFound,
      contractionsCount,
      sentenceLengthVariety: Math.round(stdDev * 10) / 10,
      casualMarkersCount,
      toneScore: toneMatchResult.description
    }
  };
}

/**
 * Compare two humanized versions and return the better one
 */
export function selectBetterVersion(version1: string, version2: string): {
  winner: string;
  score1: QualityScore;
  score2: QualityScore;
} {
  const score1 = scoreHumanizedText(version1);
  const score2 = scoreHumanizedText(version2);
  
  return {
    winner: score1.total >= score2.total ? version1 : version2,
    score1,
    score2
  };
}

/**
 * Generate and select best from multiple attempts
 * This is the main function for quality-focused humanization
 */
export async function generateWithQualitySelection<T>(
  generateFn: () => Promise<string>,
  attempts: number = 3
): Promise<{ text: string; score: QualityScore; attemptScores: QualityScore[] }> {
  const versions: { text: string; score: QualityScore }[] = [];
  
  console.log(`🎯 Generating ${attempts} versions for quality selection...`);
  
  for (let i = 0; i < attempts; i++) {
    try {
      const text = await generateFn();
      const score = scoreHumanizedText(text);
      versions.push({ text, score });
      console.log(`  Version ${i + 1}: Score ${score.total}/100 (robotic: ${score.details.roboticPhrasesFound.length}, contractions: ${score.details.contractionsCount})`);
    } catch (error: any) {
      console.log(`  Version ${i + 1}: Failed - ${error.message}`);
    }
  }
  
  if (versions.length === 0) {
    throw new Error('All generation attempts failed');
  }
  
  // Sort by score and pick best
  versions.sort((a, b) => b.score.total - a.score.total);
  const best = versions[0];
  
  console.log(`✅ Selected best version with score: ${best.score.total}/100`);
  
  return {
    text: best.text,
    score: best.score,
    attemptScores: versions.map(v => v.score)
  };
}
