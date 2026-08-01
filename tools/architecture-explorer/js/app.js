let selectedScenario = null;

let selectedRecommendation = null;

let currentDiagramId = null;

const weightDimensions = [
  { id: "scalability", label: "Scalability" },
  { id: "reliability", label: "Reliability" },
  { id: "simplicity", label: "Operational Simplicity" },
  { id: "costEfficiency", label: "Cost Efficiency" },
  { id: "latency", label: "Latency" },
  { id: "ordering", label: "Ordering" },
  { id: "replay", label: "Replay" },
];

window.addEventListener("resize", () => {
  if (currentDiagramId) {
    updateDiagram(currentDiagramId);
  }
});

/*
=====================================
 Scenario Selection
=====================================
*/

function selectScenario(scenarioId) {
  const scenario = scenarios[scenarioId];

  if (!scenario) {
    console.error("Scenario not found:", scenarioId);

    return;
  }

  selectedScenario = scenario;

  updateScenarioContext(scenario);

  renderWeightSliders(scenario);

  clearWeightNote();

  const recommendation = getRecommendation(scenario.requirements);

  selectedRecommendation = recommendation;

  renderResults(recommendation);

  updateDiagram(scenarioId);

  currentDiagramId = scenarioId;
}

function renderResults(recommendation) {
  updateRecommendation(recommendation);

  updateMetrics(recommendation.winner);

  updateComparison(recommendation.ranking);

  updateTradeoffMatrix(recommendation.ranking);

  updateLandscape(recommendation.ranking);
}

/*
=====================================
 Scenario Context
=====================================
*/

function updateScenarioContext(scenario) {
  const title = document.getElementById("scenarioTitle");

  const description = document.getElementById("scenarioDescription");

  const challenges = document.getElementById("scenarioChallenges");

  if (title) {
    title.innerHTML = scenario.name;
  }

  if (description) {
    description.innerHTML = scenario.summary;
  }

  if (challenges) {
    challenges.innerHTML = scenario.keyChallenges
      .map((item) => "✓ " + item)
      .join("<br>");
  }
}

/*
=====================================
 Recommendation
=====================================
*/

function updateRecommendation(data) {
  if (!data || !data.winner) {
    return;
  }

  const winner = data.winner;

  const tech = document.querySelector(".tech");

  const score = document.querySelector(".score");

  const reason = document.querySelector(".reason");

  const confidence = document.querySelector(".confidence span");

  if (tech) {
    tech.innerHTML = winner.name;
  }

  if (score) {
    animateScore(score, winner.finalScore);
  }

  if (confidence) {
    confidence.style.width = winner.finalScore + "%";
  }

  if (reason) {
    reason.innerHTML = `
        <div class="recommendation-section">
        <h3>
        Why this architecture?
        </h3>

        <br>

        ${winner.strengths.map((item) => "✓ " + item).join("<br>")}

        </div>

        <div class="recommendation-section">
        <h3>
        Tradeoffs
        </h3>

        <br>

        ${winner.weaknesses.map((item) => "• " + item).join("<br>")}

        </div>

        <div class="recommendation-section">
        <h3>
        Why not alternatives?
        </h3>

        <br>

        ${generateAlternativeAnalysis(winner, data.ranking)}

        </div>

        <div class="recommendation-section">
        <h3>
        Best suited for
        </h3>

        <br>

        ${winner.bestFor.map((item) => "✓ " + item).join("<br>")}

        </div>
        `;
  }
}

function generateAlternativeAnalysis(winner, ranking) {
  if (!ranking || ranking.length === 0) {
    return "";
  }

  return ranking

    .filter((architecture) => architecture.id !== winner.id)

    .slice(0, 3)

    .map((architecture) => {
      return `
            <div class="alternative-item">

            <b>
            ${architecture.name}
            </b>

            <br>

            Score:
            ${architecture.finalScore}%

            <br><br>

            Not selected because:

            <br>

            ${architecture.weaknesses
              .slice(0, 2)
              .map((item) => "• " + item)
              .join("<br>")}

            </div>
            `;
    })

    .join("<br>");
}

function animateScore(element, target) {
  if (!element) {
    return;
  }

  let score = Number(target);

  if (isNaN(score)) {
    score = 0;
  }

  score = Math.max(0, Math.min(100, score));

  const duration = 800;

  const start = performance.now();

  const timer = setInterval(() => {
    const progress = Math.min(1, (performance.now() - start) / duration);

    const eased = 1 - Math.pow(1 - progress, 3);

    element.innerHTML = Math.round(score * eased) + "%";

    if (progress >= 1) {
      clearInterval(timer);
    }
  }, 16);
}

/*
=====================================
 Engineering Metrics
=====================================
*/

function updateMetrics(system) {
  if (!system || !system.scores) {
    return;
  }

  const metrics = {
    scaleBar: system.scores.scalability,

    reliabilityBar: system.scores.reliability,

    simplicityBar: system.scores.simplicity,

    costBar: system.scores.costEfficiency,
  };

  Object.keys(metrics)

    .forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        element.style.width = metrics[id] + "%";
      }
    });
}

/*
=====================================
 Architecture Comparison
=====================================
*/

function updateComparison(results) {
  const container = document.getElementById("comparisonContainer");

  if (!container || !results) {
    return;
  }

  container.innerHTML = "";

  results.forEach((system, index) => {
    const row = document.createElement("div");

    row.className =
      "comparison-row" + (index === 0 ? " comparison-winner" : "");

    row.innerHTML = `
            <div class="comparison-header">

            <span class="comparison-name">

            #${index + 1}
            ${system.name}

            ${index === 0 ? '<span class="winner-badge">★ Recommended</span>' : ""}

            </span>

            <span class="comparison-score">

            ${system.finalScore}%

            </span>

            </div>

            <div class="comparison-bar">

            <div

            class="comparison-fill"

            style="width:${system.finalScore}%">

            </div>

            </div>
            `;

    container.appendChild(row);
  });
}

/*
=====================================
 Tradeoff Matrix
=====================================
*/

function updateTradeoffMatrix(results) {
  const container = document.getElementById("tradeoffMatrix");

  if (!container || !results) {
    return;
  }

  const dimensions = [
    "scalability",

    "reliability",

    "simplicity",

    "costEfficiency",

    "latency",

    "ordering",

    "replay",
  ];

  let html = `
<table class="tradeoff-table">

<thead>

<tr>

<th>
Dimension
</th>

${results
  .map(
    (system) =>
      `
<th>
${system.name}
</th>

`,
  )
  .join("")}

</tr>

</thead>

<tbody>

`;

  dimensions.forEach((dimension) => {
    html += `
<tr>

<td>
${dimension}
</td>

${results
  .map((system) => {
    const value = system.scores[dimension] ?? 0;

    let css = "medium-score";

    if (value >= 85) {
      css = "high-score";
    }

    if (value < 60) {
      css = "low-score";
    }

    return `

<td class="tradeoff-score ${css}">

${value}

</td>

`;
  })
  .join("")}

</tr>

`;
  });

  html += `
</tbody>

</table>

`;

  container.innerHTML = html;
}

/*
=====================================
 Architecture Landscape
=====================================
*/

function updateLandscape(results) {
  const container = document.getElementById("landscapeContainer");

  if (!container || !results) {
    return;
  }

  container.innerHTML = `
    <div class="landscape-legend">

        <span class="legend-dot legend-winner"></span>
        Recommended

        <span class="legend-dot legend-alt"></span>
        Alternative

    </div>

    <div class="landscape">

        <div class="landscape-axis-x">

        Operational Simplicity →

        </div>

        <div class="landscape-axis-y">

        Scalability →

        </div>

    </div>
    `;

  const chart = container.querySelector(".landscape");

  const plotPadding = 90;

  const chartBox = chart.getBoundingClientRect();

  const usableWidth = Math.max(1, chartBox.width - plotPadding * 2);

  const usableHeight = Math.max(1, chartBox.height - plotPadding * 2);

  results.forEach((architecture, index) => {
    const point = document.createElement("div");

    point.className =
      "landscape-point" + (index === 0 ? " landscape-winner" : "");

    point.innerHTML = (index === 0 ? "★ " : "") + architecture.name;

    point.style.left =
      plotPadding + (architecture.scores.simplicity / 100) * usableWidth + "px";

    point.style.bottom =
      plotPadding +
      (architecture.scores.scalability / 100) * usableHeight +
      "px";

    chart.appendChild(point);
  });

  resolveLandscapeCollisions(
    chart,
    chart.querySelectorAll(".landscape-point"),
    plotPadding,
  );
}

function resolveLandscapeCollisions(chart, points, padding) {
  const gap = 10;

  const chartWidth = chart.clientWidth;

  const chartHeight = chart.clientHeight;

  for (let iteration = 0; iteration < 12; iteration++) {
    let moved = false;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i].getBoundingClientRect();

        const b = points[j].getBoundingClientRect();

        const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);

        const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);

        if (overlapX > -gap && overlapY > -gap) {
          moved = true;

          if (overlapX < overlapY) {
            const direction = a.left < b.left ? 1 : -1;

            const left =
              parseFloat(points[j].style.left) +
              direction * (Math.abs(overlapX) + gap);

            const halfWidth = b.width / 2;

            points[j].style.left =
              Math.max(
                padding + halfWidth,
                Math.min(chartWidth - padding - halfWidth, left),
              ) + "px";
          } else {
            const direction = a.top < b.top ? -1 : 1;

            const bottom =
              parseFloat(points[j].style.bottom) +
              direction * (Math.abs(overlapY) + gap);

            const height = b.height;

            points[j].style.bottom =
              Math.max(
                padding,
                Math.min(chartHeight - padding - height, bottom),
              ) + "px";
          }
        }
      }
    }

    if (!moved) {
      break;
    }
  }
}

/*
=====================================
 Architecture Diagram
=====================================
*/

function updateDiagram(scenarioId) {
  const diagram = getDiagram(scenarioId);

  const container = document.getElementById("diagramContainer");

  const title = document.getElementById("diagramTitle");

  if (!diagram || !container) {
    return;
  }

  if (title) {
    title.innerHTML = diagram.title;
  }

  container.innerHTML = "";

  const nodes = diagram.nodes;

  const adjacency = new Array(nodes.length).fill(null).map(() => []);

  const indegree = new Array(nodes.length).fill(0);

  diagram.connections.forEach(([source, target]) => {
    adjacency[source].push(target);

    indegree[target]++;
  });

  const level = new Array(nodes.length).fill(0);

  const queue = [];

  indegree.forEach((degree, index) => {
    if (degree === 0) {
      queue.push(index);
    }
  });

  while (queue.length > 0) {
    const current = queue.shift();

    adjacency[current].forEach((next) => {
      level[next] = Math.max(level[next], level[current] + 1);

      queue.push(next);
    });
  }

  const maxLevel = Math.max(...level);

  const nodesByLevel = [];

  for (let i = 0; i <= maxLevel; i++) {
    nodesByLevel.push([]);
  }

  nodes.forEach((node, index) => {
    nodesByLevel[level[index]].push(index);
  });

  const maxRows = Math.max(...nodesByLevel.map((group) => group.length));

  const nodeWidth = 180;

  const nodeHeight = 64;

  const columnGap = 100;

  const rowHeight = 120;

  const padX = 30;

  const padY = 30;

  const columnWidth = nodeWidth + columnGap;

  const canvasWidth = padX * 2 + maxLevel * columnWidth + nodeWidth;

  const canvasHeight = padY * 2 + maxRows * rowHeight;

  const canvas = document.createElement("div");

  canvas.className = "diagram-canvas";

  canvas.style.width = canvasWidth + "px";

  canvas.style.height = canvasHeight + "px";

  const positions = [];

  nodesByLevel.forEach((group, levelIndex) => {
    group.forEach((nodeIndex, rowIndex) => {
      const box = document.createElement("div");

      box.className = "diagram-node";

      box.innerHTML = nodes[nodeIndex];

      box.style.left = padX + levelIndex * columnWidth + "px";

      box.style.top =
        padY + rowIndex * rowHeight + (rowHeight - nodeHeight) / 2 + "px";

      positions[nodeIndex] = {
        left: padX + levelIndex * columnWidth,

        top: padY + rowIndex * rowHeight + (rowHeight - nodeHeight) / 2,
      };

      canvas.appendChild(box);
    });
  });

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("class", "diagram-svg");

  svg.setAttribute("width", canvasWidth);

  svg.setAttribute("height", canvasHeight);

  svg.innerHTML = `
    <defs>
      <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#93c5fd"></path>
      </marker>
    </defs>
  `;

  diagram.connections.forEach(([source, target]) => {
    const x1 = positions[source].left + nodeWidth;

    const y1 = positions[source].top + nodeHeight / 2;

    const x2 = positions[target].left;

    const y2 = positions[target].top + nodeHeight / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute("d", `M${x1},${y1} L${x2},${y2}`);

    path.setAttribute("stroke", "#93c5fd");

    path.setAttribute("stroke-width", "2");

    path.setAttribute("fill", "none");

    path.setAttribute("marker-end", "url(#arrowHead)");

    svg.appendChild(path);
  });

  canvas.appendChild(svg);

  container.appendChild(canvas);

  fitDiagramToContainer(container, canvas, canvasWidth);
}

function fitDiagramToContainer(container, canvas, naturalWidth) {
  const available = container.clientWidth;

  const scale = Math.min(1, available / naturalWidth);

  if (scale >= 1) {
    return;
  }

  canvas.style.transformOrigin = "top center";

  canvas.style.transform = `scale(${scale})`;

  container.style.height = Math.ceil(canvas.offsetHeight * scale) + "px";
}

/*
=====================================
 What-If Weight Tuning
=====================================
*/

function renderWeightSliders(scenario) {
  const container = document.getElementById("weightSliders");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  weightDimensions.forEach((dimension) => {
    const row = document.createElement("div");

    row.className = "weight-row";

    const label = document.createElement("label");

    label.innerHTML = dimension.label;

    const input = document.createElement("input");

    input.type = "range";

    input.min = "0";

    input.max = "100";

    input.step = "5";

    input.id = "w-" + dimension.id;

    input.value = scenario.requirements[dimension.id] ?? 50;

    const value = document.createElement("span");

    value.className = "weight-value";

    value.id = "w-" + dimension.id + "-val";

    value.innerHTML = input.value;

    input.addEventListener("input", () => {
      value.innerHTML = input.value;

      onWeightChange();
    });

    row.appendChild(label);

    row.appendChild(input);

    row.appendChild(value);

    container.appendChild(row);
  });
}

function getWeightsFromSliders() {
  const weights = {};

  weightDimensions.forEach((dimension) => {
    const element = document.getElementById("w-" + dimension.id);

    weights[dimension.id] = element ? Number(element.value) : 0;
  });

  return weights;
}

function onWeightChange() {
  if (!selectedScenario) {
    return;
  }

  const recommendation = getRecommendation(getWeightsFromSliders());

  selectedRecommendation = recommendation;

  renderResults(recommendation);

  const note = document.getElementById("weightNote");

  if (note) {
    note.innerHTML = "⚙ Custom weights applied";
  }
}

function resetWeights() {
  if (!selectedScenario) {
    return;
  }

  renderWeightSliders(selectedScenario);

  clearWeightNote();

  const recommendation = getRecommendation(selectedScenario.requirements);

  selectedRecommendation = recommendation;

  renderResults(recommendation);
}

function clearWeightNote() {
  const note = document.getElementById("weightNote");

  if (note) {
    note.innerHTML = "";
  }
}

/*
=====================================
 Reset View
=====================================
*/

function resetView() {
  selectedScenario = null;

  selectedRecommendation = null;

  const title = document.getElementById("scenarioTitle");

  const description = document.getElementById("scenarioDescription");

  const challenges = document.getElementById("scenarioChallenges");

  if (title) {
    title.innerHTML = "Select a workload";
  }

  if (description) {
    description.innerHTML =
      "Choose a scenario above to see the engineering context.";
  }

  if (challenges) {
    challenges.innerHTML = "";
  }

  const tech = document.querySelector(".tech");

  const score = document.querySelector(".score");

  const confidence = document.querySelector(".confidence span");

  const reason = document.querySelector(".reason");

  const alternatives = document.querySelector(".alternatives");

  if (tech) {
    tech.innerHTML = "Select a scenario";
  }

  if (score) {
    score.innerHTML = "--";
  }

  if (confidence) {
    confidence.style.width = "0%";
  }

  if (reason) {
    reason.innerHTML = `
        <div class="recommendation-section">
        Your architecture recommendation will appear here.
        </div>
        `;
  }

  if (alternatives) {
    alternatives.innerHTML = "";
  }

  ["scaleBar", "reliabilityBar", "simplicityBar", "costBar"].forEach((id) => {
    const element = document.getElementById(id);

    if (element) {
      element.style.width = "0%";
    }
  });

  const comparison = document.getElementById("comparisonContainer");

  if (comparison) {
    comparison.innerHTML = "<p>Select a workload to compare architectures.</p>";
  }

  const tradeoff = document.getElementById("tradeoffMatrix");

  if (tradeoff) {
    tradeoff.innerHTML =
      '<p style="color: #94a3b8">Select a workload to analyze tradeoffs.</p>';
  }

  const landscape = document.getElementById("landscapeContainer");

  if (landscape) {
    landscape.innerHTML =
      '<p style="color: #94a3b8">Select a workload to visualize architecture positioning.</p>';
  }

  const diagramTitle = document.getElementById("diagramTitle");

  const diagram = document.getElementById("diagramContainer");

  if (diagramTitle) {
    diagramTitle.innerHTML = "Architecture Blueprint";
  }

  if (diagram) {
    diagram.style.height = "";

    diagram.innerHTML = "<p>Select a workload to visualize architecture.</p>";
  }

  currentDiagramId = null;

  const sliders = document.getElementById("weightSliders");

  if (sliders) {
    sliders.innerHTML = "";
  }

  clearWeightNote();

  const adrOutput = document.getElementById("adrOutput");

  if (adrOutput) {
    adrOutput.value = "";
  }
}

/*
=====================================
 ADR Generator
=====================================
*/

function showADR() {
  if (!selectedScenario || !selectedRecommendation) {
    alert("Select a workload first.");

    return;
  }

  const output = document.getElementById("adrOutput");

  if (output) {
    output.value = generateADR(
      selectedScenario,

      selectedRecommendation,
    );
  }
}

function copyADR() {
  const output = document.getElementById("adrOutput");

  if (!output || !output.value) {
    alert("Generate an ADR first.");

    return;
  }

  navigator.clipboard
    .writeText(output.value)
    .then(() => {
      alert("ADR copied to clipboard.");
    })
    .catch(() => {
      alert("Could not copy ADR.");
    });
}

function downloadADR() {
  const output = document.getElementById("adrOutput");

  if (!output || !output.value) {
    alert("Generate an ADR first.");

    return;
  }

  const blob = new Blob([output.value], { type: "text/markdown" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = (selectedScenario ? selectedScenario.id : "adr") + "-adr.md";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
