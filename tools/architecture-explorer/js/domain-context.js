/*
=====================================
 Domain Context (shared)
=====================================

Shared domain-profile helpers used by both Wahab Waypoint: Architect and
Wahab Waypoint: Reviewer. The profile is produced by Wahab Waypoint:
Domain Context Learner and stored under DOMAIN_PROFILE_KEY.
*/

const DOMAIN_PROFILE_KEY = "wahab-waypoint.domain-profile";

const DOMAIN_DOMAIN_WEIGHTS = {
  financial: { compliance: 15, reliability: 10 },
  healthcare: { compliance: 20, reliability: 10, latency: 5 },
  ecommerce: { scalability: 10, latency: 10, reliability: 5 },
  logistics: { costEfficiency: 10, reliability: 10 },
  media: { scalability: 15, latency: 10 },
  saas: { scalability: 10, simplicity: 10 },
  manufacturing: { reliability: 10, costEfficiency: 10 },
  public: { compliance: 20 },
  energy: { reliability: 15, compliance: 10 },
  travel: { scalability: 5, costEfficiency: 5 },
  education: { costEfficiency: 10 },
  other: {},
};

const DOMAIN_QUALITY_WEIGHTS = {
  costControl: { costEfficiency: 20, simplicity: 5 },
  timeToMarket: { simplicity: 20, latency: 5 },
  regulatoryCompliance: { compliance: 25, reliability: 10 },
  resilience: { reliability: 25, compliance: 5 },
  dataPrivacy: { compliance: 20 },
  scalability: { scalability: 25 },
  interoperability: { simplicity: 15, reliability: 5 },
  security: { compliance: 15, reliability: 10 },
};

const DOMAIN_DATA_WEIGHTS = {
  volume: {
    low: {},
    medium: { scalability: 10 },
    high: { scalability: 20, costEfficiency: 5 },
  },
  realtime: {
    low: {},
    medium: { latency: 10 },
    high: { latency: 20 },
  },
  integration: {
    simple: {},
    complex: { simplicity: 10 },
  },
  sensitivity: {
    pii: { compliance: 10 },
    phi: { compliance: 15 },
    cardholder: { compliance: 15 },
  },
};

function getDomainProfile() {
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

function getDomainAdjustments(profile) {
  const adjustments = {};
  const add = (delta) => {
    if (!delta) {
      return;
    }
    Object.keys(delta).forEach((dimension) => {
      adjustments[dimension] = (adjustments[dimension] || 0) + delta[dimension];
    });
  };

  if (!profile) {
    return adjustments;
  }
  add(DOMAIN_DOMAIN_WEIGHTS[profile.domain && profile.domain.id]);
  (profile.qualities || []).forEach((quality) => {
    add(DOMAIN_QUALITY_WEIGHTS[quality && quality.id]);
  });
  const data = profile.data || {};
  add(DOMAIN_DATA_WEIGHTS.volume[data.volume && data.volume.id]);
  add(DOMAIN_DATA_WEIGHTS.realtime[data.realtime && data.realtime.id]);
  add(DOMAIN_DATA_WEIGHTS.integration[data.integration && data.integration.id]);
  (data.sensitivity || []).forEach((item) => {
    add(DOMAIN_DATA_WEIGHTS.sensitivity[item && item.id]);
  });
  return adjustments;
}
