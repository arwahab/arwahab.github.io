const diagrams = {
  streaming: {
    title: "Event Streaming Architecture",
    nodes: [
      "Applications",
      "Event Producers",
      "Kafka Cluster",
      "Stream Processing",
      "Analytics Platform",
      "Data Lake",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
    ],
  },

  payments: {
    title: "Payment Processing Architecture",
    nodes: [
      "Customers",
      "API Gateway",
      "Payment Services",
      "Transaction Database",
      "Event Bus",
      "Fraud Detection",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [4, 5],
    ],
  },

  ai: {
    title: "AI Platform Architecture",
    nodes: [
      "Data Sources",
      "Ingestion Pipeline",
      "Feature Store",
      "ML Training",
      "Model Registry",
      "Inference API",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },

  api: {
    title: "Global API Architecture",
    nodes: [
      "Global Users",
      "CDN",
      "API Gateway",
      "Application Services",
      "Database",
      "Monitoring",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
    ],
  },

  dataPlatform: {
    title: "Enterprise Data Platform Architecture",
    nodes: [
      "Data Sources",
      "Ingestion Pipelines",
      "Cloud Data Lake (Bronze)",
      "Transformation Layer (Silver)",
      "Curated Data (Gold)",
      "BI / ML Consumers",
      "Governance & Lineage",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [1, 6],
    ],
  },

  iot: {
    title: "IoT & Telemetry Architecture",
    nodes: [
      "Device Fleet",
      "Edge Gateways",
      "Ingestion Bus",
      "Stream Processing",
      "Time-Series Store",
      "Analytics & Alerting",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
    ],
  },

  notifications: {
    title: "Notification & Fan-Out Architecture",
    nodes: [
      "Applications",
      "Notification Producer",
      "Fan-Out Hub",
      "Email Service",
      "Push Service",
      "SMS Service",
      "Webhook Delivery",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
    ],
  },

  ecommerce: {
    title: "E-Commerce Order Architecture",
    nodes: [
      "Customers",
      "API Gateway",
      "Order Service",
      "Event Bus",
      "Inventory Service",
      "Payment Service",
      "Fulfillment Service",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
      [3, 6],
    ],
  },

  logistics: {
    title: "Logistics & Supply Chain Architecture",
    nodes: [
      "Carrier Partners",
      "Warehouse Systems",
      "Ingestion Queue",
      "Tracking Service",
      "Status Database",
      "Customer Notifications",
    ],
    connections: [
      [0, 2],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
    ],
  },

  backgroundJobs: {
    title: "Background Job Processing Architecture",
    nodes: [
      "Applications",
      "Job Producer",
      "Task Queue",
      "Worker Pool",
      "DLQ",
      "Result Store",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 5],
      [2, 4],
    ],
  },

  realtime: {
    title: "Real-Time Collaboration Architecture",
    nodes: [
      "Players / Clients",
      "Edge Gateway",
      "Session Service",
      "Event Stream",
      "Presence Service",
      "Leaderboard & Analytics",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
    ],
  },

  healthcare: {
    title: "Healthcare Claims & Compliance Architecture",
    nodes: [
      "Providers",
      "Claims API",
      "Ingestion Bus",
      "Claims Processor",
      "Audit & Compliance Store",
      "Payers",
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
    ],
  },
};

function getDiagram(scenarioId) {
  return diagrams[scenarioId];
}
