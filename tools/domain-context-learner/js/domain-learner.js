const DOMAIN_PROFILE_KEY = "wahab-waypoint.domain-profile";

const DOMAINS = [
  { id: "financial", name: "Financial Services", icon: "💳", blurb: "Payments, banking, capital markets, compliance." },
  { id: "healthcare", name: "Healthcare", icon: "🏥", blurb: "Claims, patient data, care coordination, compliance." },
  { id: "ecommerce", name: "E-Commerce & Retail", icon: "🛒", blurb: "Orders, inventory, personalization, peak traffic." },
  { id: "logistics", name: "Logistics & Supply Chain", icon: "🚚", blurb: "Tracking, carriers, fleet telemetry, cost control." },
  { id: "media", name: "Media & Streaming", icon: "📡", blurb: "Content delivery, events, analytics at scale." },
  { id: "saas", name: "SaaS & Multi-tenant", icon: "☁️", blurb: "Multi-tenant products, feature velocity, isolation." },
  { id: "manufacturing", name: "Manufacturing & Industrial", icon: "🏭", blurb: "OT/IT integration, sensor data, reliability." },
  { id: "public", name: "Public Sector & Government", icon: "🏛️", blurb: "Citizen services, auditability, strict compliance." },
  { id: "energy", name: "Energy & Utilities", icon: "⚡", blurb: "Grid telemetry, forecasting, mission-critical uptime." },
  { id: "travel", name: "Travel & Hospitality", icon: "✈️", blurb: "Bookings, availability, reservations, volatility." },
  { id: "education", name: "Education & EdTech", icon: "🎓", blurb: "Learning platforms, student data, seasonality." },
  { id: "other", name: "Other / General", icon: "🧩", blurb: "A domain not listed — choose what fits best." },
];

const QUALITIES = [
  { id: "costControl", name: "Cost control" },
  { id: "timeToMarket", name: "Time-to-market" },
  { id: "regulatoryCompliance", name: "Regulatory compliance" },
  { id: "resilience", name: "Resilience & uptime" },
  { id: "dataPrivacy", name: "Data privacy" },
  { id: "scalability", name: "Scalability" },
  { id: "interoperability", name: "Interoperability" },
  { id: "security", name: "Security & auditability" },
];

const DATA_OPTIONS = {
  volume: [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ],
  sensitivity: [
    { id: "none", name: "Not sensitive" },
    { id: "pii", name: "PII" },
    { id: "phi", name: "PHI" },
    { id: "cardholder", name: "Cardholder data" },
  ],
  realtime: [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ],
  integration: [
    { id: "simple", name: "Simple" },
    { id: "complex", name: "Complex" },
  ],
};

let selectedDomain = null;

let selectedQualities = [];

let selectedData = {
  volume: "medium",
  sensitivity: [],
  realtime: "medium",
  integration: "simple",
};

let journeyStep = 1;

function setJourneyStep(step) {
  journeyStep = step;
  const stepper = document.getElementById("stepper");

  if (stepper) {
    stepper.querySelectorAll(".step").forEach((el) => {
      const n = Number(el.getAttribute("data-step"));
      const numEl = el.querySelector(".step-num");

      if (step === 4) {
        el.classList.add("done");
        el.classList.remove("active");
      } else {
        el.classList.toggle("active", n === step);
        el.classList.toggle("done", n < step);
      }

      if (numEl) {
        numEl.textContent = n < step || step === 4 ? "✓" : String(n);
      }
    });
  }
  const overview = document.getElementById("overview");
  const qualities = document.getElementById("qualities");
  const data = document.getElementById("data");
  const profile = document.getElementById("profile");

  if (overview) {
    overview.classList.toggle("hidden", step < 1);
  }

  if (qualities) {
    qualities.classList.toggle("hidden", step < 2);
  }

  if (data) {
    data.classList.toggle("hidden", step < 3);
  }

  if (profile) {
    profile.classList.toggle("hidden", step < 4);
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

function renderDomains() {
  const grid = document.getElementById("domainGrid");

  if (!grid) {
    return;
  }
  grid.innerHTML = "";

  DOMAINS.forEach((domain) => {
    const card = document.createElement("div");
    card.className = "scenario";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("data-domain", domain.id);
    card.innerHTML = `
      <div class="icon">${domain.icon}</div>
      <h3>${domain.name}</h3>
      <p>${domain.blurb}</p>
    `;

    card.addEventListener("click", () => selectDomain(domain));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectDomain(domain);
      }
    });
    grid.appendChild(card);
  });
}

function selectDomain(domain) {
  selectedDomain = domain;
  document.querySelectorAll("#domainGrid .scenario").forEach((card) => {
    const active = card.getAttribute("data-domain") === domain.id;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", active ? "true" : "false");
  });
  setJourneyStep(2);
  scrollToSection(document.getElementById("qualities"));
}

function renderQualities() {
  const grid = document.getElementById("qualityGrid");

  if (!grid) {
    return;
  }
  grid.innerHTML = "";

  QUALITIES.forEach((quality) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "quality-chip";
    chip.setAttribute("data-quality", quality.id);
    chip.innerHTML = quality.name;
    chip.addEventListener("click", () => toggleQuality(quality));
    grid.appendChild(chip);
  });
  updateContinueState();
}

function toggleQuality(quality) {
  const index = selectedQualities.indexOf(quality.id);

  if (index >= 0) {
    selectedQualities.splice(index, 1);
  } else {
    if (selectedQualities.length >= 4) {
      showToast("Select up to 4 qualities.", "warn");
      return;
    }
    selectedQualities.push(quality.id);
  }
  document
    .querySelectorAll("#qualityGrid .quality-chip")
    .forEach((chip) => {
      chip.classList.toggle(
        "selected",
        selectedQualities.includes(chip.getAttribute("data-quality")),
      );
    });
  updateContinueState();
}

function updateContinueState() {
  const button = document.getElementById("continueBtn");

  if (button) {
    button.disabled = selectedQualities.length === 0;
  }
}

function continueToData() {
  if (selectedQualities.length === 0) {
    showToast("Select at least one quality.", "warn");
    return;
  }
  setJourneyStep(3);
  scrollToSection(document.getElementById("data"));
}

function renderDataOptions() {
  renderOptionGroup("volume", false);
  renderOptionGroup("sensitivity", true);
  renderOptionGroup("realtime", false);
  renderOptionGroup("integration", false);
}

function renderOptionGroup(key, multi) {
  const row = document.getElementById("opt-" + key);

  if (!row) {
    return;
  }
  row.innerHTML = "";

  DATA_OPTIONS[key].forEach((option) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "option-card";
    card.setAttribute("data-option", option.id);
    card.classList.toggle(
      "selected",
      multi
        ? selectedData[key].includes(option.id)
        : selectedData[key] === option.id,
    );
    card.innerHTML = option.name;
    card.addEventListener("click", () => selectOption(key, option, multi));
    row.appendChild(card);
  });
}

function selectOption(key, option, multi) {
  if (multi) {
    const index = selectedData[key].indexOf(option.id);

    if (index >= 0) {
      selectedData[key].splice(index, 1);
    } else {
      selectedData[key].push(option.id);
    }
  } else {
    selectedData[key] = selectedData[key] === option.id ? null : option.id;
  }
  const row = document.getElementById("opt-" + key);

  row.querySelectorAll(".option-card").forEach((card) => {
    const id = card.getAttribute("data-option");
    card.classList.toggle(
      "selected",
      multi ? selectedData[key].includes(id) : selectedData[key] === id,
    );
  });
}

function getDataItem(key) {
  const id = selectedData[key];
  const item = DATA_OPTIONS[key].find((option) => option.id === id);
  return item ? { id: item.id, name: item.name } : null;
}

function generateProfile() {
  if (!selectedDomain) {
    showToast("Choose a business domain first.", "warn");
    return;
  }

  if (selectedQualities.length === 0) {
    showToast("Select at least one quality.", "warn");
    return;
  }
  const profile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    domain: { id: selectedDomain.id, name: selectedDomain.name },
    qualities: QUALITIES.filter((quality) =>
      selectedQualities.includes(quality.id),
    ).map((quality) => ({ id: quality.id, name: quality.name })),
    data: {
      volume: getDataItem("volume"),
      sensitivity: DATA_OPTIONS.sensitivity
        .filter((option) => selectedData.sensitivity.includes(option.id))
        .map((option) => ({ id: option.id, name: option.name })),
      realtime: getDataItem("realtime"),
      integration: getDataItem("integration"),
    },
  };

  try {
    localStorage.setItem(DOMAIN_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    showToast("Could not save the domain profile.", "error");
    return;
  }
  renderProfile(profile);
  setJourneyStep(4);
  hideSavedBanner();
  showToast("Domain profile saved.");
  scrollToSection(document.getElementById("profile"));
}

function getDomainIcon(id) {
  const domain = DOMAINS.find((item) => item.id === id);
  return domain ? domain.icon : "🧩";
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch (error) {
    return iso;
  }
}

function buildSummary(profile) {
  const names = (profile.qualities || []).map((quality) => quality.name);
  const parts = [];
  parts.push(profile.domain.name + " business");

  if (names.length) {
    parts.push("prioritizing " + names.join(", ").toLowerCase());
  }
  const data = profile.data || {};

  if (data.volume) {
    parts.push(data.volume.name.toLowerCase() + " data volume");
  }

  if (data.realtime) {
    parts.push(data.realtime.name.toLowerCase() + " real-time needs");
  }

  if (data.integration) {
    parts.push(data.integration.name.toLowerCase() + " integration");
  }
  const sensitivity = (data.sensitivity || []).map((item) =>
    item.name.toLowerCase(),
  );

  if (sensitivity.length) {
    parts.push(sensitivity.join(", ") + " sensitivity");
  }
  return parts.join(" · ") + ".";
}

function renderProfile(profile) {
  const content = document.getElementById("profileContent");

  if (!content) {
    return;
  }
  const qualities = (profile.qualities || [])
    .map((quality) => `<span class="profile-chip">${quality.name}</span>`)
    .join("");
  const sensitivity =
    (profile.data.sensitivity || []).map((item) => item.name).join(", ") ||
    "None";
  content.innerHTML = `
    <div class="profile-domain">
      <div class="profile-icon">${getDomainIcon(profile.domain.id)}</div>
      <div>
        <h3>${profile.domain.name}</h3>
        <p class="muted">Updated ${formatDate(profile.updatedAt)}</p>
      </div>
    </div>

    <div class="profile-block">
      <h4>Priorities</h4>
      <div class="profile-chips">${qualities}</div>
    </div>

    <div class="profile-grid">
      <div class="profile-block">
        <h4>Data volume</h4>
        <p>${profile.data.volume ? profile.data.volume.name : "—"}</p>
      </div>
      <div class="profile-block">
        <h4>Real-time needs</h4>
        <p>${profile.data.realtime ? profile.data.realtime.name : "—"}</p>
      </div>
      <div class="profile-block">
        <h4>Integration</h4>
        <p>${profile.data.integration ? profile.data.integration.name : "—"}</p>
      </div>
      <div class="profile-block">
        <h4>Sensitivity</h4>
        <p>${sensitivity}</p>
      </div>
    </div>

    <p class="profile-summary">${buildSummary(profile)}</p>
  `;
}

function getSavedProfile() {
  try {
    const raw = localStorage.getItem(DOMAIN_PROFILE_KEY);

    if (!raw) {
      return null;
    }
    const profile = JSON.parse(raw);
    return profile && profile.version && profile.domain ? profile : null;
  } catch (error) {
    return null;
  }
}

function viewSavedProfile() {
  const profile = getSavedProfile();

  if (!profile) {
    return;
  }
  renderProfile(profile);
  setJourneyStep(4);
  scrollToSection(document.getElementById("profile"));
}

function showSavedBanner() {
  const saved = getSavedProfile();
  const banner = document.getElementById("savedBanner");
  const text = document.getElementById("savedBannerText");

  if (saved && banner && text) {
    text.textContent =
      "A domain profile for " + saved.domain.name + " is saved and applied in Architect.";
    banner.classList.remove("hidden");
  }
}

function hideSavedBanner() {
  const banner = document.getElementById("savedBanner");

  if (banner) {
    banner.classList.add("hidden");
  }
}

function clearAll() {
  selectedDomain = null;
  selectedQualities = [];
  selectedData = {
    volume: "medium",
    sensitivity: [],
    realtime: "medium",
    integration: "simple",
  };

  try {
    localStorage.removeItem(DOMAIN_PROFILE_KEY);
  } catch (error) {
    /* ignore */
  }
  renderDomains();
  renderQualities();
  renderDataOptions();
  hideSavedBanner();
  setJourneyStep(1);
  scrollToSection(document.getElementById("overview"));
  showToast("Domain profile cleared.");
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
  renderDomains();
  renderQualities();
  renderDataOptions();
  showSavedBanner();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
