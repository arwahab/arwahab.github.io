const architectures = [

{
name:"Apache Kafka",

type:"Event Streaming",

description:
"Distributed event streaming platform optimized for high throughput and durable event history.",

scores:{
scalability:95,
reliability:90,
simplicity:45,
cost:60,
latency:90
},

strengths:[
"Massive throughput",
"Event replay",
"Strong ordering",
"Durable log"
],

weaknesses:[
"Operational complexity",
"Broker management",
"Requires expertise"
]

},


{
name:"Amazon SQS",

type:"Message Queue",

description:
"Managed message queue for reliable asynchronous processing.",

scores:{
scalability:90,
reliability:95,
simplicity:95,
cost:85,
latency:75
},

strengths:[
"Fully managed",
"Highly reliable",
"Low operational overhead"
],

weaknesses:[
"Limited ordering",
"Less control",
"Replay requires design"
]

},


{
name:"Amazon EventBridge",

type:"Event Bus",

description:
"Serverless event routing service for loosely coupled architectures.",

scores:{
scalability:85,
reliability:90,
simplicity:95,
cost:90,
latency:70
},

strengths:[
"Serverless",
"Native AWS integration",
"Schema support"
],

weaknesses:[
"Not ideal for massive streams",
"Limited replay patterns"
]

},


{
name:"RabbitMQ",

type:"Message Broker",

description:
"Flexible messaging broker supporting advanced routing patterns.",

scores:{
scalability:75,
reliability:85,
simplicity:70,
cost:80,
latency:90
},

strengths:[
"Flexible routing",
"Low latency",
"Many protocols"
],

weaknesses:[
"Cluster management",
"Scaling complexity"
]

}

];
