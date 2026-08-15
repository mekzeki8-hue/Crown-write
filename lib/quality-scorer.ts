/**
 * Quality scoring system for humanized text
 * Evaluates how natural and human-like the output is
 */

export interface QualityScore {
  total: number;           // 0-100 overall score
  naturalness: number;     // How natural it sounds
  variety: number;         // Sentence structure variety
  casualness: number;      // Appropriate casual tone
  roboticMarkers: number;  // Penalty for AI markers
  details: {
    roboticPhrasesFound: string[];
    contractionsCount: number;
    sentenceLengthVariety: number;
    casualMarkersCount: number;
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
 * Score the quality of humanized text
 * Higher score = more human-like
 */
export function scoreHumanizedText(text: string): QualityScore {
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
  const naturalness = Math.max(0, 40 - roboticPenalty + contractionsCount * 2);
  const variety = Math.max(0, Math.min(varietyScore - repetitionPenalty, 25));
  const casualness = Math.max(0, casualScore - longSentencePenalty);
  const roboticMarkers = Math.max(0, 10 - roboticPhrasesFound.length * 5);
  
  // TOTAL SCORE (0-100)
  const total = Math.max(0, Math.min(100,
    naturalness + variety + casualness + roboticMarkers
  ));
  
  return {
    total,
    naturalness: Math.round(naturalness),
    variety: Math.round(variety),
    casualness: Math.round(casualness),
    roboticMarkers: Math.round(roboticMarkers),
    details: {
      roboticPhrasesFound,
      contractionsCount,
      sentenceLengthVariety: Math.round(stdDev * 10) / 10,
      casualMarkersCount
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
