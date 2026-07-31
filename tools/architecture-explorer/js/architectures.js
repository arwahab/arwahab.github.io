const architectures = [

    {
        id: "kafka",

        name: "Apache Kafka",

        category: "Event Streaming",

        description:
            "Distributed event streaming platform optimized for massive throughput, durable logs, and event replay.",


        scores: {

            scalability: 95,

            reliability: 90,

            simplicity: 45,

            costEfficiency: 65,

            latency: 90,

            ordering: 100,

            replay: 100

        },


        strengths: [

            "Massive throughput",

            "Strong event ordering",

            "Durable event history",

            "Native replay capability",

            "Excellent for streaming analytics"

        ],


        weaknesses: [

            "Higher operational complexity",

            "Requires cluster management",

            "Steeper learning curve"

        ],


        bestFor: [

            "Event-driven systems",

            "Real-time analytics",

            "Financial transactions",

            "Large scale data pipelines"

        ]

    },





    {
        id: "sqs",

        name: "Amazon SQS",

        category: "Managed Queue",

        description:
            "Fully managed message queue designed for reliable asynchronous processing without infrastructure management.",


        scores: {

            scalability: 95,

            reliability: 98,

            simplicity: 98,

            costEfficiency: 90,

            latency: 75,

            ordering: 60,

            replay: 50

        },


        strengths: [

            "Fully managed service",

            "Excellent reliability",

            "Minimal operations",

            "Automatic scaling",

            "Strong AWS integration"

        ],


        weaknesses: [

            "Limited ordering guarantees",

            "Replay requires additional design",

            "Less control than Kafka"

        ],


        bestFor: [

            "Background processing",

            "Serverless workloads",

            "Task queues",

            "Decoupled services"

        ]

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

            simplicity: 95,

            costEfficiency: 90,

            latency: 70,

            ordering: 30,

            replay: 60

        },


        strengths: [

            "Serverless architecture",

            "Native AWS integrations",

            "Event filtering",

            "Schema discovery"

        ],


        weaknesses: [

            "Not designed for extreme streaming",

            "Limited ordering guarantees",

            "Less control"

        ],


        bestFor: [

            "AWS event-driven systems",

            "Application integration",

            "Serverless platforms"

        ]

    },





    {
        id: "rabbitmq",

        name: "RabbitMQ",

        category: "Message Broker",

        description:
            "Flexible messaging broker supporting complex routing and low latency communication.",


        scores: {

            scalability: 75,

            reliability: 85,

            simplicity: 70,

            costEfficiency: 80,

            latency: 95,

            ordering: 85,

            replay: 60

        },


        strengths: [

            "Low latency",

            "Flexible routing",

            "Multiple messaging patterns",

            "Protocol support"

        ],


        weaknesses: [

            "Cluster operations",

            "Scaling complexity",

            "Infrastructure ownership"

        ],


        bestFor: [

            "Enterprise messaging",

            "Complex workflows",

            "Low latency systems"

        ]

    }


];