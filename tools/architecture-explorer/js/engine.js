function evaluateArchitectures(requirements) {
  return architectures
    .map((architecture) => {
      let score = 0;

      const dimensions = [
        "scalability",

        "reliability",

        "simplicity",

        "costEfficiency",

        "latency",

        "ordering",

        "replay",
      ];

      dimensions.forEach((dimension) => {
        const requirementWeight = requirements[dimension] || 0;

        const capability = architecture.scores[dimension] || 0;

        score += (requirementWeight * capability) / 100;
      });

      const finalScore = Math.round(score / dimensions.length);

      return {
        ...architecture,

        // Always keep architecture fit between 0-100
        finalScore: Math.min(100, Math.max(0, finalScore)),
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
