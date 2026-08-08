const SCENARIO_ICONS = {
  streaming: "📡",
  payments: "💳",
  ai: "🤖",
  dataPlatform: "🏢",
  api: "🌎",
  iot: "📶",
  notifications: "📣",
  ecommerce: "🛒",
  logistics: "🚚",
  backgroundJobs: "⚙️",
  realtime: "🎮",
  healthcare: "🏥",
  managedStream: "🌊",
  eventDriven: "🔀",
  reliableMessaging: "✉️",
  serverlessFunctions: "⚡",
  containerPlatform: "📦",
  regulatedPlatform: "🏛️",
};

const CRITERIA_META = [
  { id: "scalability", label: "Scalability" },
  { id: "reliability", label: "Reliability" },
  { id: "simplicity", label: "Operational Simplicity" },
  { id: "costEfficiency", label: "Cost Efficiency" },
  { id: "latency", label: "Latency" },
  { id: "ordering", label: "Event Ordering" },
  { id: "replay", label: "Replay" },
  { id: "compliance", label: "Compliance" },
];

let selectedScenario = null;

let selectedArchitecture = null;

let journeyStep = 1;

function setJourneyStep(step) {
  journeyStep = step;
  const stepper = document.getElementById("stepper");

  if (stepper) {
    stepper.querySelectorAll(".step").forEach((el) => {
      const n = Number(el.getAttribute("data-step"));
      const numEl = el.querySelector(".step-num");

      if (step === 3) {
        el.classList.add("done");
        el.classList.remove("active");
      } else {
        el.classList.toggle("active", n === step);
        el.classList.toggle("done", n < step);
      }

      if (numEl) {
        numEl.textContent = n < step || step === 3 ? "✓" : String(n);
      }
    });
  }
  const workload = document.getElementById("workload");
  const architecture = document.getElementById("architecture");
  const review = document.getElementById("review");

  if (workload) {
    workload.classList.toggle("hidden", step < 1);
  }

  if (architecture) {
    architecture.classList.toggle("hidden", step < 2);
  }

  if (review) {
    review.classList.toggle("hidden", step < 3);
  }
}

function scrollToSection(element) {
  if (!element) {
    return;
  }
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (rect.top >= 0 && rect.bottom <= viewportHeight) {
    return;
  }
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderScenarios() {
  const grid = document.getElementById("scenarioGrid");

  if (!grid) {
    return;
  }
  grid.innerHTML = "";

  Object.values(scenarios).forEach((scenario) => {
    const card = document.createElement("div");
    card.className = "scenario";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("data-scenario", scenario.id);
    card.innerHTML = `
      <div class="icon">${SCENARIO_ICONS[scenario.id] || "🧩"}</div>
      <h3>${scenario.name}</h3>
      <p>${scenario.description}</p>
    `;

    card.addEventListener("click", () => selectScenario(scenario));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectScenario(scenario);
      }
    });
    grid.appendChild(card);
  });
}

function selectScenario(scenario) {
  selectedScenario = scenario;
  document
    .querySelectorAll("#scenarioGrid .scenario")
    .forEach((card) => {
      const active = card.getAttribute("data-scenario") === scenario.id;
      card.classList.toggle("active", active);
      card.setAttribute("aria-pressed", active ? "true" : "false");
    });
  clearArchitectureSelection();
  setJourneyStep(2);
  scrollToSection(document.getElementById("architecture"));
}

function renderArchitectures() {
  const grid = document.getElementById("archGrid");

  if (!grid) {
    return;
  }
  grid.innerHTML = "";

  architectures.forEach((arch) => {
    const card = document.createElement("div");
    card.className = "arch-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("data-arch", arch.id);
    card.innerHTML = `
      <span class="arch-category">${arch.category}</span>
      <h3>${arch.name}</h3>
      <p>${arch.description}</p>
    `;

    card.addEventListener("click", () => selectArchitecture(arch));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectArchitecture(arch);
      }
    });
    grid.appendChild(card);
  });
}

function clearArchitectureSelection() {
  selectedArchitecture = null;
  document.querySelectorAll("#archGrid .arch-card").forEach((card) => {
    card.classList.remove("active");
    card.setAttribute("aria-pressed", "false");
  });
}

function selectArchitecture(arch) {
  selectedArchitecture = arch;
  document.querySelectorAll("#archGrid .arch-card").forEach((card) => {
    const active = card.getAttribute("data-arch") === arch.id;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", active ? "true" : "false");
  });
  renderReview();
  setJourneyStep(3);
  scrollToSection(document.getElementById("review"));
}

function getVerdict(score) {
  if (score >= 85) {
    return { label: "Strong fit", tone: "good" };
  }
  if (score >= 70) {
    return { label: "Good fit", tone: "good" };
  }
  if (score >= 55) {
    return { label: "Moderate fit", tone: "warn" };
  }
  if (score >= 40) {
    return { label: "Weak fit", tone: "bad" };
  }
  return { label: "Poor fit", tone: "bad" };
}

function getAdjustedRequirements(scenario) {
  const requirements = Object.assign({}, scenario.requirements || {});
  const adjustments = getDomainAdjustments(getDomainProfile());

  Object.keys(adjustments).forEach((dimension) => {
    requirements[dimension] =
      (requirements[dimension] || 0) + adjustments[dimension];
  });
  return requirements;
}

function buildFitRows(scenario, arch, requirements) {
  const reqs = requirements || scenario.requirements || {};
  const scores = arch.scores || {};

  return CRITERIA_META.map((meta) => {
    const req = reqs[meta.id] || 0;
    const cap = scores[meta.id] || 0;
    const coverage =
      req > 0 ? Math.round((Math.min(cap, req) / req) * 100) : 100;
    let status;

    if (req < 50) {
      status = "fit-low";
    } else if (coverage >= 90) {
      status = "fit-strong";
    } else if (coverage >= 70) {
      status = "fit-partial";
    } else {
      status = "fit-gap";
    }
    return { meta, req, cap, coverage, status, gap: req - cap };
  });
}

function renderReview() {
  const container = document.getElementById("reviewContent");

  if (!container || !selectedScenario || !selectedArchitecture) {
    return;
  }
  const scenario = selectedScenario;
  const arch = selectedArchitecture;
  const requirements = getAdjustedRequirements(scenario);
  const ranked = evaluateArchitectures(requirements);
  const entry = ranked.find((item) => item.id === arch.id) || arch;
  const score = entry.finalScore;
  const verdict = getVerdict(score);
  const fitRows = buildFitRows(scenario, arch, requirements);

  const fitHtml = fitRows
    .map((row) => {
      const statusLabel =
        row.status === "fit-strong"
          ? "Strong"
          : row.status === "fit-partial"
            ? "Partial"
            : row.status === "fit-gap"
              ? "Gap"
              : "Not critical";
      return `
        <div class="fit-row">
          <div class="fit-head">
            <span>${row.meta.label}</span>
            <span>${statusLabel} · <em>${row.coverage}%</em></span>
          </div>
          <div class="bar">
            <div class="${row.status}" style="width:${row.coverage}%"></div>
          </div>
          <div class="fit-sub muted">
            Needs ${row.req} · Provides ${row.cap}
          </div>
        </div>
      `;
    })
    .join("");

  const strengths = [];
  fitRows.forEach((row) => {
    if (row.req >= 50 && row.coverage >= 90) {
      strengths.push(row.meta.label + " — meets a top requirement");
    }
  });
  (arch.strengths || []).slice(0, 4).forEach((item) => {
    strengths.push(item);
  });

  const gaps = fitRows
    .filter((row) => row.req >= 50 && row.coverage < 70)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 4)
    .map(
      (row) =>
        row.meta.label + " — needs " + row.req + ", provides " + row.cap,
    );

  const biggestGap = fitRows
    .filter((row) => row.req >= 50 && row.coverage < 70)
    .sort((a, b) => b.gap - a.gap)[0];

  let verdictText =
    "Overall fit " +
    score +
    "/100 against the " +
    scenario.name +
    " requirements.";

  if (biggestGap) {
    verdictText +=
      " The biggest gap is " +
      biggestGap.meta.label +
      " — the workload needs " +
      biggestGap.req +
      ", but this architecture provides " +
      biggestGap.cap +
      ".";
  } else {
    verdictText +=
      " No material gaps against this workload's top priorities.";
  }

  const gapHtml =
    gaps.length > 0
      ? gaps.map((gap) => "<li>" + gap + "</li>").join("")
      : "<li>No significant gaps against this workload's top priorities.</li>";

  const watchHtml = (arch.weaknesses || [])
    .map((item) => "<li>" + item + "</li>")
    .join("");

  const domainProfile = getDomainProfile();
  const domainNote =
    domainProfile && domainProfile.domain
      ? " · <a href=\"../domain-context-learner/domain-context-learner.html\">Domain context</a> applied from <strong>" +
        domainProfile.domain.name +
        "</strong>"
      : "";

  container.innerHTML = `
    <div class="review-summary">
      <div class="review-score ${verdict.tone}">
        <strong>${score}</strong>
        <span>/ 100</span>
      </div>

      <div class="review-verdict">
        <h3>${verdict.label} for this workload</h3>
        <p>${verdictText}</p>
      </div>
    </div>

    <p class="review-context muted">
      ${arch.name} reviewed against ${scenario.name}${domainNote}
    </p>

    <h4 class="fit-title">Fit by criterion</h4>

    <div class="fit-list">${fitHtml}</div>

    <div class="review-columns">
      <div class="review-section">
        <h4>Strengths</h4>
        <ul class="review-list">
          ${strengths.map((item) => "<li>" + item + "</li>").join("")}
        </ul>
      </div>

      <div class="review-section">
        <h4>Gaps to watch</h4>
        <ul class="review-list">${gapHtml}</ul>
      </div>
    </div>

    <div class="review-section" style="margin-top: 18px">
      <h4>Watch out</h4>
      <ul class="review-list">${watchHtml}</ul>
    </div>

    <div class="priority-actions">
      <a
        class="cta-btn"
        href="../architecture-explorer/architecture-explorer-v1.html?scenario=${scenario.id}"
      >
        Compare alternatives in Architect →
      </a>

      <button class="secondary" onclick="resetReview()">Start over</button>
    </div>
  `;
}

function resetReview() {
  selectedScenario = null;
  clearArchitectureSelection();
  document.querySelectorAll("#scenarioGrid .scenario").forEach((card) => {
    card.classList.remove("active");
    card.setAttribute("aria-pressed", "false");
  });
  setJourneyStep(1);
  scrollToSection(document.getElementById("workload"));
  showToast("Review reset.");
}

function showToast(message, type) {
  const container = document.getElementById("toastContainer");

  if (!container) {
    alert(message);
    return;
  }
  const toast = document.createElement("div");
  toast.className = "toast " + (type || "success");
  toast.setAttribute("role", "status");
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast-visible");
  });

  setTimeout(() => {
    toast.classList.remove("toast-visible");
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function init() {
  renderScenarios();
  renderArchitectures();

  const params = new URLSearchParams(window.location.search);
  const scenarioId = params.get("scenario");
  const archId = params.get("arch");

  if (scenarioId && scenarios[scenarioId]) {
    selectScenario(scenarios[scenarioId]);

    if (archId) {
      const arch = architectures.find((item) => item.id === archId);

      if (arch) {
        selectArchitecture(arch);
      }
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
