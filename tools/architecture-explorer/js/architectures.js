const architectures = [
  {
    id: "kafka",
    name: "Apache Kafka",
    category: "Event Streaming",
    description:
      "Distributed event streaming platform optimized for massive throughput, durable logs, and event replay.",

    scores: {
      scalability: 96,
      reliability: 93,
      simplicity: 38,
      costEfficiency: 58,
      latency: 90,
      ordering: 100,
      replay: 100,
      compliance: 58,
    },
    strengths: [
      "Massive throughput",
      "Strong event ordering",
      "Durable event history",
      "Native replay capability",
      "Excellent for streaming analytics",
    ],
    weaknesses: [
      "Higher operational complexity",
      "Requires cluster management",
      "Steeper learning curve",
    ],
    bestFor: [
      "Event-driven systems",
      "Real-time analytics",
      "Financial transactions",
      "Large scale data pipelines",
    ],
  },

  {
    id: "sqs",
    name: "Amazon SQS",
    category: "Managed Queue",
    description:
      "Fully managed message queue designed for reliable asynchronous processing without infrastructure management.",

    scores: {
      scalability: 85,
      reliability: 95,
      simplicity: 100,
      costEfficiency: 84,
      latency: 65,
      ordering: 55,
      replay: 45,
      compliance: 60,
    },
    strengths: [
      "Fully managed service",
      "Excellent reliability",
      "Minimal operations",
      "Automatic scaling",
      "Strong AWS integration",
    ],
    weaknesses: [
      "Limited ordering guarantees",
      "Replay requires additional design",
      "Less control than Kafka",
    ],
    bestFor: [
      "Background processing",
      "Serverless workloads",
      "Task queues",
      "Decoupled services",
    ],
  },

  {
    id: "eventbridge",
    name: "Amazon EventBridge",
    category: "Event Bus",
    description:
      "Serverless event routing platform for loosely coupled architectures.",

    scores: {
      scalability: 85,
      reliability: 95,
      simplicity: 92,
      costEfficiency: 82,
      latency: 62,
      ordering: 35,
      replay: 60,
      compliance: 82,
    },
    strengths: [
      "Serverless architecture",
      "Native AWS integrations",
      "Event filtering",
      "Schema discovery",
    ],
    weaknesses: [
      "Not designed for extreme streaming",
      "Limited ordering guarantees",
      "Less control",
    ],
    bestFor: [
      "AWS event-driven systems",
      "Application integration",
      "Serverless platforms",
    ],
  },

  {
    id: "rabbitmq",
    name: "RabbitMQ",
    category: "Message Broker",
    description:
      "Flexible messaging broker supporting complex routing and low latency communication.",

    scores: {
      scalability: 70,
      reliability: 85,
      simplicity: 74,
      costEfficiency: 80,
      latency: 98,
      ordering: 85,
      replay: 55,
      compliance: 40,
    },
    strengths: [
      "Low latency",
      "Flexible routing",
      "Multiple messaging patterns",
      "Protocol support",
    ],
    weaknesses: [
      "Cluster operations",
      "Scaling complexity",
      "Infrastructure ownership",
    ],
    bestFor: [
      "Enterprise messaging",
      "Complex workflows",
      "Low latency systems",
    ],
  },

  {
    id: "apigateway",
    name: "Amazon API Gateway",
    category: "Managed API Gateway",
    description:
      "Fully managed gateway for building, securing, and operating REST, HTTP, and WebSocket APIs at scale.",

    scores: {
      scalability: 85,
      reliability: 95,
      simplicity: 86,
      costEfficiency: 76,
      latency: 90,
      ordering: 20,
      replay: 20,
      compliance: 85,
    },
    strengths: [
      "Fully managed service",
      "Built-in auth, throttling, and quotas",
      "REST, HTTP, and WebSocket support",
      "Native Lambda and AWS integration",
    ],
    weaknesses: [
      "Adds a latency hop",
      "Not a broker - no ordering or replay",
      "Per-request cost at extreme volume",
    ],
    bestFor: [
      "Public and partner APIs",
      "Serverless front doors",
      "B2B and integration surfaces",
    ],
  },

  {
    id: "lambda",
    name: "AWS Lambda",
    category: "Serverless Compute",
    description:
      "Event-driven compute that runs code without provisioning servers, scaling automatically with workload.",

    scores: {
      scalability: 92,
      reliability: 90,
      simplicity: 95,
      costEfficiency: 88,
      latency: 60,
      ordering: 40,
      replay: 45,
      compliance: 75,
    },
    strengths: [
      "No servers to manage",
      "Scale to zero",
      "Pay per invocation",
      "Native event source integration",
    ],
    weaknesses: [
      "Cold start latency",
      "Execution time and package limits",
      "Stateless execution model",
    ],
    bestFor: [
      "Event handlers",
      "API backends",
      "Background jobs",
      "Integration glue code",
    ],
  },

  {
    id: "ecs",
    name: "AWS Elastic Container Service",
    category: "Container Orchestration",
    description:
      "Managed container orchestration with Fargate and EC2 options for predictable long-running services.",

    scores: {
      scalability: 90,
      reliability: 94,
      simplicity: 76,
      costEfficiency: 75,
      latency: 92,
      ordering: 55,
      replay: 45,
      compliance: 72,
    },
    strengths: [
      "Managed control plane",
      "Predictable performance",
      "Fargate or EC2 placement",
      "ECS-Anywhere for hybrid workloads",
    ],
    weaknesses: [
      "Capacity and image management still required",
      "No native replay",
      "Smaller ecosystem than Kubernetes",
    ],
    bestFor: [
      "Long-running containerized services",
      "Containerized workers",
      "Portability across environments",
    ],
  },

  {
    id: "rosa",
    name: "Red Hat OpenShift on AWS (ROSA)",
    category: "Managed Kubernetes",
    description:
      "Enterprise Kubernetes platform operated jointly by Red Hat and AWS for regulated and hybrid estates.",

    scores: {
      scalability: 92,
      reliability: 96,
      simplicity: 45,
      costEfficiency: 45,
      latency: 92,
      ordering: 75,
      replay: 65,
      compliance: 96,
    },
    strengths: [
      "Enterprise-grade Kubernetes",
      "Governance and compliance controls",
      "Hybrid and edge consistency",
      "Operator and ecosystem support",
    ],
    weaknesses: [
      "Higher operational cost",
      "Platform expertise required",
      "Complexity for small workloads",
    ],
    bestFor: [
      "Regulated enterprises",
      "Hybrid and edge estates",
      "Large platform teams with K8s skills",
    ],
  },

  {
    id: "kinesis",
    name: "Amazon Kinesis Data Streams",
    category: "Managed Streaming",
    description:
      "Serverless sharded data streaming service with long retention, per-shard ordering, and replayable records.",

    scores: {
      scalability: 88,
      reliability: 82,
      simplicity: 66,
      costEfficiency: 66,
      latency: 92,
      ordering: 100,
      replay: 92,
      compliance: 68,
    },
    strengths: [
      "Fully managed sharded streaming",
      "Per-shard ordering",
      "Long retention with replay",
      "Native Lambda and Flink integration",
    ],
    weaknesses: [
      "Shard capacity planning",
      "Cost grows with shards and volume",
      "No consumer group model like Kafka",
    ],
    bestFor: [
      "Real-time analytics ingestion",
      "Log and telemetry pipelines",
      "Decoupled streaming workloads",
    ],
  },

  {
    id: "pubsub",
    name: "Google Cloud Pub/Sub",
    category: "Managed Messaging",
    description:
      "Serverless global messaging service with push and pull delivery, seek, and replay across regions.",

    scores: {
      scalability: 95,
      reliability: 92,
      simplicity: 82,
      costEfficiency: 85,
      latency: 70,
      ordering: 55,
      replay: 72,
      compliance: 75,
    },
    strengths: [
      "Serverless and global",
      "Push and pull delivery",
      "Seek and replay support",
      "Exactly-once option",
    ],
    weaknesses: [
      "Ordering only with ordering keys",
      "Outside the AWS ecosystem",
      "Not built for long-term storage",
    ],
    bestFor: [
      "Global fan-out",
      "Multi-cloud architectures",
      "Serverless messaging",
    ],
  },
];
