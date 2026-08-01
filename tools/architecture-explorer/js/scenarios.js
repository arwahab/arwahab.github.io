const scenarios = {
  streaming: {
    id: "streaming",

    name: "Event Streaming Platform",

    description:
      "High-volume event ingestion, analytics, and real-time processing.",

    summary:
      "Designed for systems that process millions of events while maintaining ordering, durability, and replay capability.",

    keyChallenges: [
      "Massive event throughput",

      "Event ordering guarantees",

      "Long-term event replay",

      "Real-time processing",
    ],

    requirements: {
      scalability: 100,

      reliability: 90,

      simplicity: 35,

      costEfficiency: 60,

      latency: 85,

      ordering: 100,

      replay: 100,
    },

    priorities: [
      "Massive throughput",

      "Event ordering",

      "Replay capability",

      "Real-time processing",
    ],
  },

  payments: {
    id: "payments",

    name: "Payment Processing System",

    description:
      "Mission-critical transactions requiring correctness and reliability.",

    summary:
      "Designed for financial workflows where data correctness and availability matter more than raw throughput.",

    keyChallenges: [
      "Transaction correctness",

      "High availability",

      "Low latency",

      "Failure recovery",
    ],

    requirements: {
      scalability: 75,

      reliability: 100,

      simplicity: 70,

      costEfficiency: 50,

      latency: 95,

      ordering: 90,

      replay: 80,
    },

    priorities: [
      "Data correctness",

      "High availability",

      "Transaction reliability",

      "Low latency",
    ],
  },

  ai: {
    id: "ai",

    name: "AI Platform",

    description:
      "AI workloads requiring asynchronous pipelines and scalable processing.",

    summary:
      "Designed for machine learning workloads involving data pipelines, model processing, and distributed workloads.",

    keyChallenges: [
      "Large data processing",

      "Pipeline scalability",

      "Compute optimization",

      "Workflow orchestration",
    ],

    requirements: {
      scalability: 90,

      reliability: 85,

      simplicity: 60,

      costEfficiency: 75,

      latency: 60,

      ordering: 40,

      replay: 85,
    },

    priorities: [
      "Pipeline scalability",

      "Data processing",

      "Model workflows",

      "Cost management",
    ],
  },

  api: {
    id: "api",

    name: "Global API Platform",

    description: "Customer-facing APIs requiring availability and low latency.",

    summary:
      "Designed for internet-scale applications requiring global availability, performance, and operational simplicity.",

    keyChallenges: [
      "Global traffic distribution",

      "Low latency",

      "High availability",

      "Developer velocity",
    ],

    requirements: {
      scalability: 85,

      reliability: 95,

      simplicity: 90,

      costEfficiency: 80,

      latency: 100,

      ordering: 20,

      replay: 20,
    },

    priorities: [
      "Low latency",

      "Global availability",

      "Developer productivity",

      "Operational simplicity",
    ],
  },

  dataPlatform: {
    id: "dataPlatform",

    name: "Enterprise Data Platform",

    description:
      "Cloud analytics platform supporting ingestion, governance, transformation, and large-scale data workloads.",

    summary:
      "Designed for enterprise analytics environments requiring scalable data processing, governance, metadata management, and cost-effective cloud operations.",

    keyChallenges: [
      "Large-scale data ingestion",

      "Data governance and lineage",

      "Analytics workload optimization",

      "Cost-efficient cloud processing",

      "Self-service data access",
    ],

    requirements: {
      scalability: 95,

      reliability: 95,

      simplicity: 75,

      costEfficiency: 85,

      latency: 65,

      ordering: 50,

      replay: 90,
    },

    priorities: [
      "Enterprise data scalability",

      "Governance and compliance",

      "Analytics performance",

      "Operational efficiency",

      "Data pipeline reliability",
    ],
  },

  iot: {
    id: "iot",

    name: "IoT & Telemetry Platform",

    description:
      "Millions of connected devices streaming telemetry in real time.",

    summary:
      "Designed for IoT fleets that continuously emit sensor data, requiring massive ingestion throughput, per-device ordering, and long-term replay for analytics and audit.",

    keyChallenges: [
      "Massive device ingestion",

      "Per-device event ordering",

      "Long-term telemetry retention",

      "Real-time anomaly detection",

      "Variable and spiky device load",
    ],

    requirements: {
      scalability: 100,

      reliability: 90,

      simplicity: 40,

      costEfficiency: 75,

      latency: 70,

      ordering: 95,

      replay: 90,
    },

    priorities: [
      "Massive ingestion throughput",

      "Per-device ordering",

      "Telemetry replay for analytics",

      "Durable retention",
    ],
  },

  notifications: {
    id: "notifications",

    name: "Notification & Fan-Out Platform",

    description:
      "High-volume multi-channel notifications, alerts, and event fan-out.",

    summary:
      "Designed for platforms that broadcast events to many subscribers across email, push, SMS, and webhooks, prioritizing managed simplicity, cost, and reliable delivery.",

    keyChallenges: [
      "High-volume fan-out to many channels",

      "Delivery retries and deduplication",

      "Channel-specific rate limits",

      "Dead letter handling for failed sends",

      "Operational simplicity at scale",
    ],

    requirements: {
      scalability: 90,

      reliability: 90,

      simplicity: 95,

      costEfficiency: 90,

      latency: 65,

      ordering: 30,

      replay: 40,
    },

    priorities: [
      "Managed simplicity",

      "Cost efficiency at scale",

      "Reliable delivery with retries",

      "High-volume fan-out",
    ],
  },

  ecommerce: {
    id: "ecommerce",

    name: "E-Commerce Order Platform",

    description:
      "Order placement, inventory, and fulfillment workflows with strict correctness.",

    summary:
      "Designed for retail platforms that must reliably track orders end to end, keep inventory consistent, and reconcile events without duplicates or loss.",

    keyChallenges: [
      "Order state correctness",

      "Inventory consistency across services",

      "Idempotent payment and stock updates",

      "Event replay for reconciliation",

      "Peak-day traffic spikes",
    ],

    requirements: {
      scalability: 85,

      reliability: 100,

      simplicity: 70,

      costEfficiency: 60,

      latency: 90,

      ordering: 95,

      replay: 75,
    },

    priorities: [
      "Correctness and reliability",

      "Ordered order lifecycle events",

      "Reconciliation and replay",

      "Low latency at checkout",
    ],
  },

  logistics: {
    id: "logistics",

    name: "Logistics & Supply Chain",

    description:
      "Shipment tracking, dispatching, and warehouse events across partners.",

    summary:
      "Designed for logistics networks coordinating carriers, warehouses, and drivers, where reliable delivery tracking, cost control, and operational simplicity matter most.",

    keyChallenges: [
      "Shipment status tracking across partners",

      "Event deduplication from multiple sources",

      "Retry-heavy integration with external carriers",

      "Dead letter handling for bad events",

      "Cost control across high event volume",
    ],

    requirements: {
      scalability: 75,

      reliability: 90,

      simplicity: 95,

      costEfficiency: 90,

      latency: 75,

      ordering: 60,

      replay: 40,
    },

    priorities: [
      "Reliable delivery tracking",

      "Operational simplicity",

      "Cost efficiency",

      "Resilient carrier integrations",
    ],
  },

  backgroundJobs: {
    id: "backgroundJobs",

    name: "Background Job Processing",

    description:
      "Asynchronous task execution for transcoding, reports, and image processing.",

    summary:
      "Designed for platforms that offload long-running or bursty work to background workers, prioritizing managed queues, automatic retries, and predictable cost.",

    keyChallenges: [
      "Long-running and bursty jobs",

      "Automatic retry and deduplication",

      "Backpressure on external APIs",

      "Dead letter handling for failed jobs",

      "Worker autoscaling",
    ],

    requirements: {
      scalability: 80,

      reliability: 90,

      simplicity: 95,

      costEfficiency: 90,

      latency: 50,

      ordering: 40,

      replay: 30,
    },

    priorities: [
      "Managed simplicity",

      "Reliable retries",

      "Cost-efficient scale",

      "Worker autoscaling",
    ],
  },

  realtime: {
    id: "realtime",

    name: "Real-Time Collaboration & Gaming",

    description:
      "Multiplayer games, live chat, presence, and collaborative editing with sub-second latency.",

    summary:
      "Designed for interactive experiences where users act together in real time, requiring low-latency delivery, per-room ordering, presence state, and burst-tolerant scale around launches and events.",

    keyChallenges: [
      "Sub-second message latency",

      "Per-room and per-session ordering",

      "Presence and state synchronization",

      "Bursty traffic from launches and events",

      "Horizontal fan-out to many clients",
    ],

    requirements: {
      scalability: 90,

      reliability: 90,

      simplicity: 55,

      costEfficiency: 70,

      latency: 100,

      ordering: 90,

      replay: 50,
    },

    priorities: [
      "Low latency",

      "Per-session ordering",

      "Presence and state sync",

      "Burst-tolerant scale",
    ],
  },

  healthcare: {
    id: "healthcare",

    name: "Healthcare Claims & Compliance",

    description:
      "Claims processing, prior authorization, and clinical events requiring audit trails and replay.",

    summary:
      "Designed for regulated healthcare workflows where every event must be provable, replayable, and correctly ordered for audits and reconciliation, even if that costs throughput or simplicity.",

    keyChallenges: [
      "Strict audit trail for every event",

      "Claims reconciliation and replay",

      "HIPAA-grade reliability and security",

      "Ordered clinical event timelines",

      "Integration with legacy payer systems",
    ],

    requirements: {
      scalability: 80,

      reliability: 100,

      simplicity: 65,

      costEfficiency: 60,

      latency: 75,

      ordering: 85,

      replay: 95,
    },

    priorities: [
      "Audit and compliance",

      "Replayable event history",

      "Reliability",

      "Ordered clinical events",
    ],
  },
};
