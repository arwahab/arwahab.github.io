const DIMENSIONS = [
  "scalability",
  "reliability",
  "simplicity",
  "costEfficiency",
  "latency",
  "ordering",
  "replay",
  "compliance",
];

function evaluateArchitectures(requirements) {
  return architectures
    .map((architecture) => {
      let weightedSum = 0;
      let totalWeight = 0;

      DIMENSIONS.forEach((dimension) => {
        const weight = requirements[dimension] || 0;
        const capability = architecture.scores[dimension] || 0;
        weightedSum += weight * capability;
        totalWeight += weight;
      });
      let finalScore = 0;
      let rawScore = 0;

      if (totalWeight > 0) {
        rawScore = weightedSum / totalWeight;
      } else {
        rawScore =
          DIMENSIONS.reduce(
            (acc, dimension) => acc + (architecture.scores[dimension] || 0),
            0,
          ) / DIMENSIONS.length;
      }
      finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

      return {
        ...architecture,
        rawScore,
        // Always keep architecture fit between 0-100
        finalScore,
      };
    })
    .sort((a, b) => b.rawScore - a.rawScore);
}

function getRecommendation(requirements) {
  const results = evaluateArchitectures(requirements);

  return {
    winner: results[0],
    alternatives: results.slice(1, 4),
    ranking: results,
  };
}
