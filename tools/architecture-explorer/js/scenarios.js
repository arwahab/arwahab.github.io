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

            "Real-time processing"

        ],


        requirements: {

            scalability: 100,

            reliability: 90,

            simplicity: 35,

            costEfficiency: 60,

            latency: 85,

            ordering: 100,

            replay: 100

        },


        priorities: [

            "Massive throughput",

            "Event ordering",

            "Replay capability",

            "Real-time processing"

        ]

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

            "Failure recovery"

        ],


        requirements: {

            scalability: 75,

            reliability: 100,

            simplicity: 70,

            costEfficiency: 50,

            latency: 95,

            ordering: 90,

            replay: 80

        },


        priorities: [

            "Data correctness",

            "High availability",

            "Transaction reliability",

            "Low latency"

        ]

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

            "Workflow orchestration"

        ],


        requirements: {

            scalability: 90,

            reliability: 85,

            simplicity: 60,

            costEfficiency: 75,

            latency: 60,

            ordering: 40,

            replay: 85

        },


        priorities: [

            "Pipeline scalability",

            "Data processing",

            "Model workflows",

            "Cost management"

        ]

    },





    api: {

        id: "api",

        name: "Global API Platform",

        description:
            "Customer-facing APIs requiring availability and low latency.",


        summary:
            "Designed for internet-scale applications requiring global availability, performance, and operational simplicity.",


        keyChallenges: [

            "Global traffic distribution",

            "Low latency",

            "High availability",

            "Developer velocity"

        ],


        requirements: {

            scalability: 85,

            reliability: 95,

            simplicity: 90,

            costEfficiency: 80,

            latency: 100,

            ordering: 20,

            replay: 20

        },


        priorities: [

            "Low latency",

            "Global availability",

            "Developer productivity",

            "Operational simplicity"

        ]

    }


};