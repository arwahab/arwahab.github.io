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

      compliance: 35,
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

      simplicity: 30,

      costEfficiency: 50,

      latency: 95,

      ordering: 90,

      replay: 80,

      compliance: 80,
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

      simplicity: 30,

      costEfficiency: 65,

      latency: 60,

      ordering: 40,

      replay: 85,

      compliance: 45,
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

      ordering: 5,

      replay: 5,

      compliance: 60,
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

      simplicity: 30,

      costEfficiency: 75,

      latency: 65,

      ordering: 50,

      replay: 90,

      compliance: 45,
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

      simplicity: 60,

      costEfficiency: 75,

      latency: 70,

      ordering: 95,

      replay: 90,

      compliance: 55,
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

      compliance: 60,
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

      simplicity: 30,

      costEfficiency: 50,

      latency: 90,

      ordering: 95,

      replay: 75,

      compliance: 60,
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
      scalability: 55,

      reliability: 90,

      simplicity: 100,

      costEfficiency: 90,

      latency: 55,

      ordering: 25,

      replay: 10,

      compliance: 35,
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
      scalability: 60,

      reliability: 95,

      simplicity: 100,

      costEfficiency: 90,

      latency: 30,

      ordering: 40,

      replay: 15,

      compliance: 10,
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

      compliance: 35,
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

      simplicity: 30,

      costEfficiency: 60,

      latency: 75,

      ordering: 85,

      replay: 95,

      compliance: 75,
    },

    priorities: [
      "Audit and compliance",

      "Replayable event history",

      "Reliability",

      "Ordered clinical events",
    ],
  },

  managedStream: {
    id: "managedStream",

    name: "Managed Streaming Pipeline",

    description:
      "AWS-native streaming with fully managed ops, retention, and replay for moderate-scale pipelines.",

    summary:
      "Designed for teams that want real-time streaming without operating a Kafka cluster, trading some scale and replay depth for managed simplicity and tighter AWS integration.",

    keyChallenges: [
      "Streaming without broker operations",
      "Managed retention and replay",
      "Tight integration with Lambda and Flink",
      "Predictable shard-based capacity",
      "Lower operational overhead",
    ],

    requirements: {
      scalability: 90,

      reliability: 88,

      simplicity: 88,

      costEfficiency: 80,

      latency: 85,

      ordering: 92,

      replay: 55,

      compliance: 75,
    },

    priorities: [
      "Managed simplicity",
      "Fully managed ops",
      "AWS-native integration",
      "Predictable capacity",
    ],
  },

  eventDriven: {
    id: "eventDriven",

    name: "Event-Driven Integration Platform",

    description:
      "Routing events across SaaS tools and internal services with filtering, schemas, and governance.",

    summary:
      "Designed for platforms that react to events from SaaS products and internal systems, prioritizing routing rules, schema governance, and compliance over strict ordering and replay.",

    keyChallenges: [
      "Integrating many SaaS and internal event sources",
      "Event filtering and routing rules",
      "Schema discovery and governance",
      "Cross-account and cross-team event flows",
      "Auditable event delivery",
    ],

    requirements: {
      scalability: 65,

      reliability: 90,

      simplicity: 100,

      costEfficiency: 85,

      latency: 25,

      ordering: 20,

      replay: 30,

      compliance: 100,
    },

    priorities: [
      "Managed event routing",
      "Schema governance",
      "Compliance and audit",
      "Integration breadth",
    ],
  },

  reliableMessaging: {
    id: "reliableMessaging",

    name: "Low-Latency Reliable Messaging",

    description:
      "Sub-millisecond request/reply transport and complex routing between internal services.",

    summary:
      "Designed for latency-sensitive point-to-point communication where messages must be routed flexibly and delivered exactly, with no need for durable long-term replay.",

    keyChallenges: [
      "Sub-millisecond message delivery",
      "Complex routing and exchange patterns",
      "Exactly-once or at-most-once semantics",
      "Fan-out to many consumers",
      "Simple broker operations",
    ],

    requirements: {
      scalability: 25,

      reliability: 80,

      simplicity: 95,

      costEfficiency: 90,

      latency: 100,

      ordering: 70,

      replay: 10,

      compliance: 10,
    },

    priorities: [
      "Sub-millisecond latency",
      "Flexible routing",
      "Operational simplicity",
      "Low operating cost",
    ],
  },

  serverlessFunctions: {
    id: "serverlessFunctions",

    name: "Serverless & Utility Functions",

    description:
      "Bursty, event-driven glue functions and API backends that scale to zero and charge per invocation.",

    summary:
      "Designed for workloads that run occasionally or in bursts - webhooks, ETL glue, image resizing, notification handlers - where zero provisioning and per-invocation billing beat dedicated infrastructure.",

    keyChallenges: [
      "Bursty and unpredictable invocation patterns",
      "Zero idle cost and scale to zero",
      "Rapid integration with many event sources",
      "Short-lived, stateless executions",
      "Developer velocity without provisioning",
    ],

    requirements: {
      scalability: 90,

      reliability: 65,

      simplicity: 100,

      costEfficiency: 100,

      latency: 30,

      ordering: 15,

      replay: 10,

      compliance: 35,
    },

    priorities: [
      "Zero provisioning",
      "Pay-per-invocation cost",
      "Operational simplicity",
      "Fast integration glue",
    ],
  },

  containerPlatform: {
    id: "containerPlatform",

    name: "Containerized Microservices Platform",

    description:
      "Long-running containerized services with predictable performance and simple orchestration.",

    summary:
      "Designed for teams running many long-lived services that need consistent latency and reliability, where Fargate-style managed containers beat serverless limits and Kubernetes complexity.",

    keyChallenges: [
      "Long-running, stateful-capable services",
      "Predictable low-latency response times",
      "Managed orchestration without K8s overhead",
      "Custom images and specialized runtimes",
      "Balance of control and operations",
    ],

    requirements: {
      scalability: 90,

      reliability: 90,

      simplicity: 65,

      costEfficiency: 65,

      latency: 92,

      ordering: 15,

      replay: 10,

      compliance: 20,
    },

    priorities: [
      "Predictable latency",
      "Managed orchestration",
      "Long-running services",
      "Custom runtime flexibility",
    ],
  },

  regulatedPlatform: {
    id: "regulatedPlatform",

    name: "Regulated Enterprise Platform",

    description:
      "Governance-heavy application platforms for regulated industries requiring audit, control, and hybrid deployment.",

    summary:
      "Designed for banks, insurers, and public sector estates where governance, auditability, and hybrid/edge consistency matter more than cost or operational simplicity.",

    keyChallenges: [
      "Strict compliance and audit requirements",
      "Role-based access and policy controls",
      "Hybrid and on-premises consistency",
      "Long-lived platform investment",
      "Integration with enterprise security tooling",
    ],

    requirements: {
      scalability: 85,

      reliability: 96,

      simplicity: 45,

      costEfficiency: 45,

      latency: 90,

      ordering: 30,

      replay: 30,

      compliance: 100,
    },

    priorities: [
      "Compliance and governance",
      "Auditability",
      "Reliability",
      "Hybrid consistency",
    ],
  },
};
