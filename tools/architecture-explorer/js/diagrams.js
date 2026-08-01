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
};

function getDiagram(scenarioId) {
  return diagrams[scenarioId];
}
