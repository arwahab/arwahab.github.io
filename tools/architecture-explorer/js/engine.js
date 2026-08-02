const DIMENSIONS = [
  "scalability",

  "reliability",

  "simplicity",

  "costEfficiency",

  "latency",

  "ordering",

  "replay",
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

      if (totalWeight > 0) {
        finalScore = weightedSum / totalWeight;
      } else {
        const uniformScore = DIMENSIONS.reduce(
          (acc, dimension) => acc + (architecture.scores[dimension] || 0),
          0,
        );

        finalScore = uniformScore / DIMENSIONS.length;
      }

      return {
        ...architecture,

        // Always keep architecture fit between 0-100
        finalScore: Math.min(100, Math.max(0, Math.round(finalScore))),
      };
    })

    .sort((a, b) => b.finalScore - a.finalScore);
}

function getRecommendation(requirements) {
  const results = evaluateArchitectures(requirements);

  return {
    winner: results[0],

    alternatives: results.slice(1, 4),

    ranking: results,
  };
}
