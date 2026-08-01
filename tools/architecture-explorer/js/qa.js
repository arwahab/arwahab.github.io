/*
=====================================
 Architecture Q&A
=====================================
A self-contained, on-device assistant that answers architecture questions
for users at every skill level. Questions may be brief, verbose, or open
ended: the engine normalizes the text, scores every topic by phrase and
keyword overlap, and returns a succinct, clearly worded answer with related
topics to explore next.
*/

const qaTopics = [
  {
    id: "event-streaming",
    topic: "Event Streaming",
    plain:
      "Event streaming is like a continuous broadcast: systems keep publishing events (facts like 'order placed') that many others can watch and react to, at any time.",
    answer: [
      "Event streaming means continuously recording and processing a durable, ordered stream of events rather than one-off messages.",
      "It powers real-time analytics, data pipelines, and loosely coupled integrations.",
      "Core ideas:",
      "- An immutable event log that never forgets",
      "- Events can be replayed from any point in history",
      "- Consumers read at their own pace and can catch up later",
    ],
    match: [
      "event streaming",
      "event stream",
      "streaming platform",
      "real time streaming",
      "real-time streaming",
      "stream processing",
      "streaming data",
    ],
    terms: ["stream", "streaming"],
    related: ["kafka", "ordering", "replay", "queue-vs-bus"],
    example: "What is event streaming?",
  },

  {
    id: "kafka",
    topic: "Apache Kafka",
    plain:
      "Kafka is a high-throughput, durable event log: it records every event like an append-only ledger, so consumers can read, re-read, and reprocess events later.",
    answer: [
      "Apache Kafka is a distributed event streaming platform designed for massive throughput, durability, and replay.",
      "Events are organized into topics and partitioned for parallelism; ordering is guaranteed within a partition.",
      "Strengths:",
      "- Extremely high throughput",
      "- Durable event history with native replay",
      "- Strong per-partition ordering",
      "Tradeoffs:",
      "- Higher operational complexity (you run the cluster)",
      "- Steeper learning curve",
      "Choose Kafka when you need durable, replayable, ordered event streams at scale.",
    ],
    match: [
      "apache kafka",
      "kafka",
      "kafka cluster",
      "what is kafka",
      "kafka topic",
      "kafka partitions",
    ],
    terms: ["kafka"],
    related: ["kafka-vs-sqs", "ordering", "consumer-groups", "event-streaming"],
    example: "What is Apache Kafka?",
  },

  {
    id: "kafka-vs-sqs",
    topic: "Kafka vs. Amazon SQS",
    plain:
      "Kafka is a replayable, ordered event log you operate yourself; SQS is a fully managed queue that hands each message to one worker - simpler, but weaker on ordering and replay.",
    answer: [
      "Kafka and SQS solve related but different problems. Choose based on what your workload needs:",
      "- Throughput: Kafka wins at very high event volumes",
      "- Ordering: Kafka gives per-partition ordering; SQS only in FIFO queues",
      "- Replay: Kafka keeps a durable log you can re-read; SQS has no native replay",
      "- Operations: SQS is fully managed; Kafka requires running a cluster",
      "- Best fit: Kafka for streaming and analytics; SQS for reliable background jobs and serverless processing",
    ],
    match: [
      "kafka vs sqs",
      "kafka or sqs",
      "sqs vs kafka",
      "kafka versus sqs",
      "kafka and sqs",
      "kafka sqs",
      "compare kafka",
      "kafka vs",
      "kafka or",
    ],
    terms: ["kafka", "sqs"],
    related: ["sqs", "ordering", "replay", "dlq"],
    example: "When should I use Kafka instead of SQS?",
  },

  {
    id: "sqs",
    topic: "Amazon SQS",
    plain:
      "SQS is a managed to-do list for your services: messages wait in a queue until a worker picks one up, and each message is handled once.",
    answer: [
      "Amazon SQS is a fully managed message queue for reliable asynchronous processing without infrastructure to run.",
      "Key characteristics:",
      "- At-least-once delivery; consumers must be idempotent",
      "- FIFO queues add strict ordering and exactly-once processing",
      "- No native event replay - messages are deleted after processing",
      "Great for background jobs, task queues, and decoupling services.",
    ],
    match: [
      "amazon sqs",
      "simple queue service",
      "sqs",
      "sqs fifo",
      "sqs queue",
      "what is sqs",
    ],
    terms: ["sqs"],
    related: ["dlq", "idempotency", "ordering", "serverless-vs-containers"],
    example: "What is Amazon SQS and when should I use it?",
  },

  {
    id: "rabbitmq",
    topic: "RabbitMQ",
    plain:
      "RabbitMQ is a flexible message broker that routes messages using smart rules called exchanges - like a switchboard that delivers each message to the right recipient.",
    answer: [
      "RabbitMQ is a message broker (AMQP) known for flexible routing and low latency.",
      "It supports many patterns: pub/sub, work queues, RPC, and complex routing keys.",
      "Strengths:",
      "- Rich routing and multiple messaging patterns",
      "- Low latency",
      "Tradeoffs:",
      "- You operate the cluster and handle scaling",
      "Good for enterprise messaging, complex workflows, and low-latency systems.",
    ],
    match: ["rabbitmq", "rabbit mq", "amqp", "message broker"],
    terms: ["rabbitmq", "amqp"],
    related: ["queue-vs-bus", "kafka-vs-sqs", "microservices"],
    example: "What is RabbitMQ used for?",
  },

  {
    id: "eventbridge",
    topic: "Amazon EventBridge",
    plain:
      "EventBridge is a serverless event bus: events come in and are routed to targets based on rules, with no servers to manage.",
    answer: [
      "Amazon EventBridge is a serverless event bus for loosely coupled, event-driven architectures.",
      "It offers built-in AWS event sources, schema discovery, and rule-based routing to targets like Lambda and Step Functions.",
      "Tradeoffs:",
      "- Not built for extreme streaming throughput",
      "- Limited ordering guarantees",
      "Ideal for application integration and serverless event-driven platforms.",
    ],
    match: ["amazon eventbridge", "eventbridge", "event bridge", "event bus"],
    terms: ["eventbridge"],
    related: ["event-driven", "serverless-vs-containers", "queue-vs-bus"],
    example: "What is Amazon EventBridge?",
  },

  {
    id: "queue-vs-bus",
    topic: "Message Queue vs. Event Bus",
    plain:
      "A queue delivers each message to one consumer, like a single-file line; an event bus broadcasts to many subscribers at once, like a radio station.",
    answer: [
      "The key difference is delivery semantics:",
      "- Queue: point-to-point, each message consumed by exactly one worker",
      "- Event bus: publish/subscribe, each event broadcast to all interested subscribers",
      "Use a queue for tasks and background jobs; use an event bus for events and integrations that many services react to.",
    ],
    match: [
      "message queue vs event bus",
      "queue vs event bus",
      "queue or event bus",
      "event bus vs queue",
      "message queue and event bus",
      "event bus",
      "message queue",
      "what is a message queue",
      "publish subscribe",
      "pub sub",
      "pub/sub",
    ],
    terms: ["queue", "bus", "pubsub"],
    related: ["event-driven", "sqs", "eventbridge", "ordering"],
    example: "What is the difference between a message queue and an event bus?",
  },

  {
    id: "ordering",
    topic: "Message Ordering",
    plain:
      "Ordering means events are processed in the order they happened - like watching a story in sequence instead of shuffled scenes.",
    answer: [
      "Ordering guarantees how events relate in time are delivered and processed:",
      "- Per-key ordering (Kafka partitions, SQS FIFO) is practical and common",
      "- Global ordering across all events is expensive and rarely needed",
      "Order matters for stateful workflows such as payments and inventory; design keys so related events share a partition.",
    ],
    match: [
      "message ordering",
      "event ordering",
      "ordering",
      "order of messages",
      "ordering of messages",
      "order of events",
      "message order",
      "messages in order",
      "events in order",
      "out of order",
      "ordering guarantee",
      "order guarantee",
      "fifo ordering",
      "fifo",
      "sequence",
    ],
    terms: ["ordering", "fifo", "order"],
    related: ["kafka", "sqs", "consumer-groups", "replay"],
    example: "How do I guarantee message ordering?",
  },

  {
    id: "replay",
    topic: "Event Replay",
    plain:
      "Replay lets you re-read past events from the beginning - like rewinding a recording to re-process what happened.",
    answer: [
      "Replay means reprocessing events from an earlier point in the log.",
      "Why it matters:",
      "- Rebuild state after a bug",
      "- Backfill new analytics or features",
      "- Recover from processing mistakes",
      "Kafka supports replay naturally by resetting consumer offsets; SQS has no native replay and needs a re-queue design.",
    ],
    match: [
      "replay",
      "event replay",
      "reprocess events",
      "reprocessing",
      "rewind",
      "backfill",
    ],
    terms: ["replay", "rewind", "backfill"],
    related: ["kafka", "kafka-vs-sqs", "event-streaming", "event-sourcing"],
    example: "What is event replay and why does it matter?",
  },

  {
    id: "dlq",
    topic: "Dead Letter Queues",
    plain:
      "A dead letter queue is a quarantine bin: messages that keep failing are parked there so they don't block the queue and can be inspected later.",
    answer: [
      "A dead letter queue (DLQ) collects messages that could not be processed after several attempts.",
      "Purpose:",
      "- Stop poison messages from blocking the main queue",
      "- Preserve failures for inspection and manual recovery",
      "Best practice:",
      "- Set a retry limit, then route failures to the DLQ",
      "- Monitor the DLQ and alert on growth",
      "- Redrive messages after fixing the underlying issue",
    ],
    match: [
      "dead letter queue",
      "dead letter",
      "dead-letter queue",
      "dlq",
      "poison message",
      "poison pill",
    ],
    terms: ["dlq"],
    related: ["retries", "idempotency", "sqs", "observability"],
    example: "What is a dead letter queue?",
  },

  {
    id: "consumer-groups",
    topic: "Consumer Groups and Partitions",
    plain:
      "A consumer group is a team of workers that splits the stream among themselves - each message is processed by exactly one member, so work scales out.",
    answer: [
      "Consumer groups let multiple consumers share a topic's partitions so processing scales horizontally.",
      "Key ideas:",
      "- Each partition is consumed by exactly one member of the group",
      "- More partitions allow more parallel consumers",
      "- Monitor consumer lag: a growing lag means consumers can't keep up",
      "Ordering holds per partition, so related events should share a partition key.",
    ],
    match: [
      "consumer group",
      "consumer groups",
      "consumers",
      "consumer",
      "partition",
      "partitions",
      "partitioning",
      "consumer lag",
    ],
    terms: ["consumer", "consumers", "partition", "partitions", "lag"],
    related: ["kafka", "ordering", "scalability", "backpressure"],
    example: "How do consumer groups and partitions work?",
  },

  {
    id: "idempotency",
    topic: "Idempotency",
    plain:
      "Idempotency means doing the same operation twice has the same result as doing it once - like pressing 'confirm' twice still placing one order.",
    answer: [
      "Idempotency protects systems from duplicate effects caused by retries and at-least-once delivery.",
      "Techniques:",
      "- Idempotency keys: a unique key a client sends so repeats are ignored",
      "- Natural keys and unique constraints on the data",
      "- Deduplication tables for incoming events",
      "- Check-then-act wrapped in a transaction or compare-and-set",
      "Make consumers idempotent before relying on at-least-once queues.",
    ],
    match: [
      "idempotency",
      "idempotent",
      "duplicate messages",
      "duplicate events",
      "deduplication",
      "dedup",
      "at least once",
      "at-least-once",
      "exactly once",
      "exactly-once",
    ],
    terms: ["idempotent", "duplicate", "dedup"],
    related: ["retries", "sqs", "dlq", "outbox"],
    example: "How do I make message processing idempotent?",
  },

  {
    id: "event-driven",
    topic: "Event-Driven Architecture",
    plain:
      "Event-driven architecture means components talk by publishing events instead of calling each other directly - like neighbors who respond to a town announcement rather than phoning everyone.",
    answer: [
      "Event-driven architecture (EDA) decouples producers from consumers using events and brokers.",
      "Benefits:",
      "- Loose coupling: services evolve independently",
      "- Natural scale: consumers can be added freely",
      "- Event history for audit and replay",
      "Tradeoffs:",
      "- Eventual consistency between components",
      "- Harder to trace flows and debug",
      "- Requires strong event schema governance",
      "Great for real-time systems, integrations, and extensible platforms.",
    ],
    match: [
      "event driven",
      "event-driven architecture",
      "event driven architecture",
      "event-driven",
      "eda",
    ],
    terms: ["event"],
    related: ["eventbridge", "queue-vs-bus", "outbox", "observability"],
    example: "What is event-driven architecture?",
  },

  {
    id: "microservices",
    topic: "Microservices vs. Monoliths",
    plain:
      "Microservices split one big app into many small, independent services that each own a piece of the business - like separate departments instead of one giant office.",
    answer: [
      "Microservices are small, independently deployable services that each own a business capability.",
      "Benefits:",
      "- Independent scaling and deployment",
      "- Team ownership and velocity",
      "- Technology flexibility per service",
      "Tradeoffs:",
      "- Distributed systems complexity (network, data, tracing)",
      "- Eventual consistency between services",
      "- More operational overhead",
      "Practical guidance: start as a modular monolith; extract services when team size and scaling demands make it worthwhile.",
    ],
    match: [
      "microservice",
      "microservices",
      "micro services",
      "microservice architecture",
      "monolith",
      "monolithic",
      "microservices vs monolith",
      "monolith vs microservices",
      "monolith or microservices",
    ],
    terms: ["microservice", "microservices", "monolith"],
    related: ["event-driven", "saga", "api-gateway", "soa"],
    example: "Should I use microservices or a monolith?",
  },

  {
    id: "soa",
    topic: "SOA vs. Microservices",
    plain:
      "SOA is an earlier service style with heavier enterprise contracts and a shared bus; microservices are smaller, independently deployed services with lighter contracts.",
    answer: [
      "SOA and microservices both split systems into services, but differ in scope and style:",
      "- SOA: enterprise-scale services, shared messaging bus, heavier contracts (often ESB)",
      "- Microservices: small services, per-service data and deployment, lightweight HTTP/messaging contracts",
      "Microservices favor independent scaling and teams; SOA emphasizes reuse and governance at the enterprise level.",
    ],
    match: [
      "soa",
      "soa vs microservices",
      "service oriented",
      "esb",
      "service oriented architecture",
    ],
    terms: ["soa", "esb"],
    related: ["microservices", "event-driven", "api-gateway"],
    example: "What is the difference between SOA and microservices?",
  },

  {
    id: "cap",
    topic: "The CAP Theorem",
    plain:
      "CAP says a distributed system can't have it all: during a network failure you must choose between consistency and availability. It's a tradeoff, not a bug.",
    answer: [
      "CAP states that a distributed data system can provide only two of three guarantees simultaneously:",
      "- Consistency: every read returns the latest write",
      "- Availability: every request gets a response",
      "- Partition tolerance: the system keeps working when the network splits",
      "Network partitions are unavoidable, so you effectively choose consistency (CP) or availability (AP) when they occur.",
      "Think of CAP as a lens for tradeoffs, not a rule to 'satisfy'.",
    ],
    match: [
      "cap theorem",
      "cap",
      "consistency vs availability",
      "consistency availability",
      "cap theory",
      "what is cap",
    ],
    terms: ["cap"],
    related: ["eventual-consistency", "replication", "high-availability"],
    example: "What is the CAP theorem in simple terms?",
  },

  {
    id: "eventual-consistency",
    topic: "Consistency Models",
    plain:
      "Eventually consistent systems briefly show slightly stale data that converges to correct over time - like a multiplayer game where other players catch up a moment later.",
    answer: [
      "Consistency models describe how quickly replicas agree on the latest state:",
      "- Strong consistency: every read sees the latest committed write",
      "- Eventual consistency: replicas converge over time; reads may briefly be stale",
      "Choose based on consequence: strong consistency for ledgers and payments; eventual consistency for feeds, profiles, and analytics.",
      "Handle divergence with versioning, merge rules, and conflict resolution.",
    ],
    match: [
      "eventual consistency",
      "consistency model",
      "strongly consistent",
      "strong consistency",
      "consistency",
      "eventually consistent",
    ],
    terms: ["consistency", "consistent"],
    related: ["cap", "replication", "outbox", "cqrs"],
    example: "What is eventual consistency?",
  },

  {
    id: "outbox",
    topic: "The Transactional Outbox Pattern",
    plain:
      "The outbox pattern guarantees you never lose events: write the event into the same database transaction as your data, then a small publisher forwards it to the broker.",
    answer: [
      "The outbox pattern solves the dual-write problem (updating a database and publishing an event must not fail independently).",
      "How it works:",
      "- Write business data and an event row in the same transaction",
      "- A publisher polls the outbox table (or uses change data capture) and sends events",
      "- Events are only published after the transaction commits",
      "Result: reliable, exactly-once-ish event emission without distributed transactions.",
    ],
    match: [
      "outbox",
      "transactional outbox",
      "outbox pattern",
      "dual write",
      "dual-write",
      "publish event after commit",
    ],
    terms: ["outbox"],
    related: ["event-driven", "idempotency", "replication"],
    example: "What is the transactional outbox pattern?",
  },

  {
    id: "saga",
    topic: "The Saga Pattern",
    plain:
      "A saga is a long business transaction broken into steps with compensating actions - if step 3 fails, it runs the 'undo' of steps 2 and 1, like reversing a checkout.",
    answer: [
      "A saga coordinates a distributed transaction as a sequence of local transactions with compensating steps.",
      "Two styles:",
      "- Choreography: services react to each other's events (looser, harder to follow)",
      "- Orchestration: a central coordinator drives each step (easier to trace, one point of control)",
      "Use sagas when a business operation spans multiple services and cannot use a single database transaction.",
    ],
    match: [
      "saga",
      "saga pattern",
      "distributed transaction",
      "compensating transaction",
      "compensation",
      "orchestration",
      "choreography",
    ],
    terms: ["saga", "transaction", "transactions"],
    related: ["microservices", "outbox", "idempotency"],
    example: "What is the saga pattern?",
  },

  {
    id: "circuit-breaker",
    topic: "The Circuit Breaker Pattern",
    plain:
      "A circuit breaker stops calls to a failing service - like an electrical breaker that trips so a shorted appliance doesn't set the house on fire; it lets the service recover.",
    answer: [
      "A circuit breaker prevents a failing dependency from taking down the whole system by failing fast.",
      "States:",
      "- Closed: requests flow normally",
      "- Open: after a failure threshold, requests fail immediately without hitting the dependency",
      "- Half-open: a probe request tests recovery, then closes or reopens",
      "Combine with timeouts, retries with backoff, and fallbacks for resilient design.",
    ],
    match: ["circuit breaker", "circuit-breaker", "circuit breaker pattern"],
    terms: ["circuit"],
    related: ["retries", "high-availability", "observability"],
    example: "What is the circuit breaker pattern?",
  },

  {
    id: "cqrs",
    topic: "CQRS",
    plain:
      "CQRS separates the model you use to write data from the model you use to read it - like a precise ledger for writes and a fast, searchable copy for reads.",
    answer: [
      "CQRS (Command Query Responsibility Segregation) splits reads and writes into separate models and often separate stores.",
      "Benefits:",
      "- Optimize each side independently (write efficiency vs. read speed)",
      "- Scale reads separately from writes",
      "- Pairs naturally with event sourcing and event-driven design",
      "Tradeoffs:",
      "- More moving parts and eventual consistency between read and write sides",
      "Use it for complex domains or high read/write imbalance, not every service.",
    ],
    match: ["cqrs", "command query"],
    terms: ["cqrs"],
    related: ["event-sourcing", "eventual-consistency", "event-driven"],
    example: "What is CQRS?",
  },

  {
    id: "event-sourcing",
    topic: "Event Sourcing",
    plain:
      "Event sourcing stores every change as an event instead of just the current state - like a bank account history instead of only the balance.",
    answer: [
      "Event sourcing persists the full sequence of state-changing events as the source of truth.",
      "Current state is derived by replaying events.",
      "Benefits:",
      "- Complete audit trail and history",
      "- Ability to rebuild or replay state",
      "- Natural fit with CQRS",
      "Tradeoffs:",
      "- Event schema evolution is hard",
      "- Rebuilding state can be slow; snapshots help",
      "Choose it when auditability and history are first-class requirements.",
    ],
    match: ["event sourcing", "event-sourcing", "event sourced"],
    terms: ["sourcing"],
    related: ["cqrs", "replay", "event-driven"],
    example: "What is event sourcing?",
  },

  {
    id: "api-gateway",
    topic: "API Gateway",
    plain:
      "An API gateway is the front door of your APIs: it handles authentication, rate limits, routing, and caching so your services stay simple.",
    answer: [
      "An API gateway is a single entry point that fronts your internal services.",
      "Typical responsibilities:",
      "- Authentication and authorization",
      "- Rate limiting and throttling",
      "- Routing and aggregation",
      "- Request validation, caching, and observability",
      "Use one to centralize cross-cutting concerns; keep business logic in the services behind it.",
    ],
    match: [
      "api gateway",
      "gateway",
      "api gateway pattern",
      "what is an api gateway",
      "api gateway vs",
    ],
    terms: ["gateway", "api"],
    related: ["rate-limiting", "microservices", "load-balancing"],
    example: "What does an API gateway do?",
  },

  {
    id: "rate-limiting",
    topic: "Rate Limiting",
    plain:
      "Rate limiting caps how many requests a user can make per time window - like a stadium turnstile that only lets in so many people per minute.",
    answer: [
      "Rate limiting protects services from abuse and overload by capping request rates.",
      "Common algorithms:",
      "- Token bucket: allows bursts up to a steady average",
      "- Sliding window: smoother limits over time",
      "Apply limits per user or key, and return HTTP 429 with Retry-After when exceeded.",
      "Combine with quotas for capacity planning and fairness.",
    ],
    match: [
      "rate limit",
      "rate limiting",
      "rate limiting algorithm",
      "throttling",
      "throttle",
      "429",
      "token bucket",
      "sliding window",
    ],
    terms: ["limit", "throttle"],
    related: ["api-gateway", "load-balancing", "circuit-breaker"],
    example: "How does rate limiting work?",
  },

  {
    id: "caching",
    topic: "Caching",
    plain:
      "A cache stores frequently used results in fast memory - like keeping your phone numbers in recent calls instead of re-dialing the full directory.",
    answer: [
      "Caching stores frequently accessed data closer to the consumer to cut latency and load.",
      "Common patterns:",
      "- Cache-aside: read cache, on miss load from source and fill cache",
      "- Write-through / write-back: keep the cache and source in sync",
      "- CDN caching for static and edge content",
      "Design for invalidation and TTLs, and guard against cache stampedes (many requests hitting the source after expiry).",
    ],
    match: [
      "caching",
      "cache",
      "cache invalidation",
      "cache-aside",
      "write through",
      "cdn",
      "redis",
      "cache stampede",
    ],
    terms: ["cache", "caching", "redis", "cdn"],
    related: ["throughput-vs-latency", "scalability", "load-balancing"],
    example: "How should I design caching?",
  },

  {
    id: "load-balancing",
    topic: "Load Balancing",
    plain:
      "A load balancer spreads traffic across many servers - like a hostess seating diners at whichever table is free so no server gets overwhelmed.",
    answer: [
      "A load balancer distributes incoming traffic across multiple instances for capacity and resilience.",
      "Key aspects:",
      "- Layer 4 (transport) vs. layer 7 (HTTP) balancing",
      "- Health checks remove unhealthy instances",
      "- Strategies: round robin, least connections, consistent hashing",
      "Make services stateless so any instance can serve any request.",
    ],
    match: [
      "load balance",
      "load balancing",
      "load balancer",
      "lb",
      "sticky session",
      "health check",
      "reverse proxy",
      "nginx",
    ],
    terms: ["balancer", "balancing"],
    related: ["scalability", "high-availability", "multi-region"],
    example: "How does load balancing work?",
  },

  {
    id: "scalability",
    topic: "Scalability",
    plain:
      "Scaling up means a bigger machine; scaling out means more machines working together - like upgrading to a bigger truck versus adding more trucks to the fleet.",
    answer: [
      "Scalability is a system's ability to handle growing load.",
      "Two directions:",
      "- Vertical scaling: more CPU/memory on one machine - simple, but with a ceiling",
      "- Horizontal scaling: more machines - nearly unlimited, but requires statelessness and partitioning",
      "To scale horizontally: keep services stateless, partition data by key, and use load balancers and auto-scaling.",
    ],
    match: [
      "scalability",
      "scaling",
      "scale",
      "scale out",
      "scale up",
      "horizontal scaling",
      "vertical scaling",
      "auto scaling",
      "autoscaling",
      "elastic scaling",
      "how to scale",
    ],
    terms: ["scale", "scaling", "scalability"],
    related: [
      "load-balancing",
      "database-sharding",
      "serverless-vs-containers",
    ],
    example: "How do I design for scalability?",
  },

  {
    id: "throughput-vs-latency",
    topic: "Throughput vs. Latency",
    plain:
      "Throughput is how much you process per second; latency is how long a single request takes - a busy highway can carry many cars slowly, a quiet road can be fast.",
    answer: [
      "Throughput and latency are different performance measures:",
      "- Throughput: work completed per unit of time (e.g., events/second)",
      "- Latency: time for one request to complete (e.g., milliseconds)",
      "Optimizing one can hurt the other: batching raises throughput but can add latency.",
      "Set explicit targets for both (e.g., p95 latency under 100ms, 100k events/sec) and measure them separately.",
    ],
    match: [
      "throughput",
      "latency",
      "throughput vs latency",
      "latency vs throughput",
      "p95",
      "p99",
      "tail latency",
      "performance",
    ],
    terms: ["throughput", "latency"],
    related: ["scalability", "caching", "backpressure"],
    example: "What is the difference between throughput and latency?",
  },

  {
    id: "high-availability",
    topic: "High Availability",
    plain:
      "High availability means the service stays up even when parts fail - like an elevator with a backup power supply and a spare motor.",
    answer: [
      "High availability (HA) is about redundancy and fast failover so the system survives component failures.",
      "Design for it:",
      "- Run multiple instances across availability zones",
      "- Use health checks, load balancers, and automatic failover",
      "- Replicate data so no single copy is a point of failure",
      "Availability is often measured in nines (99.9%, 99.99%); each nine is increasingly expensive.",
      "Reliability goes further: systems that fail and recover safely, not just stay up.",
    ],
    match: [
      "high availability",
      "availability",
      "uptime",
      "failover",
      "ha",
      "highly available",
      "nine 9",
      "nines",
    ],
    terms: ["availability", "uptime", "failover"],
    related: ["replication", "multi-region", "cap", "circuit-breaker"],
    example: "How do I design for high availability?",
  },

  {
    id: "database-sharding",
    topic: "Database Sharding",
    plain:
      "Sharding splits a database into smaller pieces by a key - like splitting a phone book by last name - so no single machine holds everything.",
    answer: [
      "Sharding horizontally partitions a database across multiple machines by a shard key.",
      "Design decisions:",
      "- Choose a shard key that distributes load evenly (avoid hot spots)",
      "- Related data should share a shard to keep queries local",
      "- Plan for resharding and growth from day one",
      "Sharding adds operational complexity; scale reads with replicas first before sharding.",
    ],
    match: [
      "shard",
      "sharding",
      "database sharding",
      "shard key",
      "partitioning",
      "horizontal partition",
      "data partitioning",
      "partition database",
    ],
    terms: ["shard", "sharding", "partition", "partitioning"],
    related: ["replication", "scalability", "eventual-consistency"],
    example: "How does database sharding work?",
  },

  {
    id: "replication",
    topic: "Database Replication",
    plain:
      "Replication keeps synchronized copies of data on multiple machines - like an automatic backup that's always running, so losing one copy isn't a disaster.",
    answer: [
      "Replication maintains multiple synchronized copies of data for durability, reads, and failover.",
      "Common models:",
      "- Leader-based: writes go to one leader, replicas serve reads",
      "- Multi-leader / leaderless: multiple writable nodes with conflict handling",
      "Uses:",
      "- Read replicas to absorb read load",
      "- Failover when the primary fails",
      "Mind replication lag: replicas may briefly serve stale data.",
    ],
    match: [
      "replication",
      "replica",
      "replicas",
      "read replica",
      "leader follower",
      "master slave",
      "primary secondary",
      "failover replica",
    ],
    terms: ["replica", "replicas", "replication"],
    related: ["high-availability", "database-sharding", "eventual-consistency"],
    example: "How does database replication work?",
  },

  {
    id: "multi-region",
    topic: "Multi-Region Architecture",
    plain:
      "Multi-region means running the same service in several parts of the world - so users hit a nearby copy and a whole data center can fail without taking you down.",
    answer: [
      "Multi-region deployment improves latency and resilience by running workloads in multiple geographies.",
      "Models:",
      "- Active-active: all regions serve traffic (lower latency, more conflict handling)",
      "- Active-passive: one region serves, others stand by (simpler, slower failover)",
      "Key challenges:",
      "- Data replication across regions and conflict resolution",
      "- Higher cost and operational complexity",
      "Start multi-region for reads (edge caching) before full active-active writes.",
    ],
    match: [
      "multi region",
      "multi-region",
      "multi region architecture",
      "cross region",
      "global deployment",
      "active active",
      "active-passive",
      "active passive",
      "disaster recovery",
      "dr",
      "geographic redundancy",
    ],
    terms: ["region", "regions", "multi-region"],
    related: ["high-availability", "replication", "load-balancing"],
    example: "Should I go multi-region?",
  },

  {
    id: "serverless-vs-containers",
    topic: "Serverless vs. Containers",
    plain:
      "Serverless runs your code on demand with no servers to manage; containers give you your own lightweight, portable app machines that you control.",
    answer: [
      "Serverless and containers are both ways to run code without managing servers directly.",
      "- Serverless (e.g., Lambda): scales to zero, pay-per-invocation, no infrastructure - but cold starts and platform limits",
      "- Containers (e.g., ECS, Kubernetes): full control over runtime and resources, predictable cost - but you operate the platform",
      "Choose serverless for variable, event-driven workloads; choose containers for long-running, resource-tuned, or portable workloads.",
      "Many systems mix both.",
    ],
    match: [
      "serverless vs containers",
      "serverless or containers",
      "containers vs serverless",
      "serverless",
      "lambda",
      "containers",
      "kubernetes",
      "ecs",
      "docker",
      "containerization",
      "cold start",
    ],
    terms: [
      "serverless",
      "container",
      "containers",
      "lambda",
      "kubernetes",
      "ecs",
      "docker",
    ],
    related: ["scalability", "eventbridge", "cost-optimization"],
    example: "Serverless or containers - which should I choose?",
  },

  {
    id: "batch-vs-stream",
    topic: "Batch vs. Stream Processing",
    plain:
      "Batch processes data in big scheduled chunks; streaming processes it as it arrives - like doing laundry once a week versus washing each sock as it comes in.",
    answer: [
      "Batch and streaming are two processing modes with different latency and cost profiles:",
      "- Batch: scheduled, high efficiency, higher latency (minutes to days)",
      "- Streaming: continuous, near-real-time, lower latency, more resources",
      "Choose by latency requirement and cost tolerance; many pipelines combine both (e.g., stream for hot paths, batch for deep analytics).",
      "Lambda and Kappa architectures describe common stream + batch combinations.",
    ],
    match: [
      "batch vs stream",
      "batch processing",
      "stream processing",
      "batch and streaming",
      "batch or streaming",
      "streaming vs batch",
      "lambda architecture",
      "kappa architecture",
      "batch job",
      "batch",
    ],
    terms: ["batch", "stream"],
    related: ["event-streaming", "data-lake-vs-warehouse", "replay"],
    example: "When should I use batch vs. stream processing?",
  },

  {
    id: "backpressure",
    topic: "Backpressure",
    plain:
      "Backpressure is the system telling producers 'slow down, I can't keep up' - like a congested pipe that pushes back so nothing bursts.",
    answer: [
      "Backpressure regulates the flow between a fast producer and a slower consumer so the system stays stable.",
      "Techniques:",
      "- Bounded buffers and queues with limits",
      "- Pull-based consumption (consumers pull at their own pace)",
      "- Apply backpressure signals from slow consumers to producers",
      "- Monitor consumer lag as a health signal",
      "Without it, unbounded buffering leads to memory exhaustion and lost work.",
    ],
    match: [
      "backpressure",
      "back pressure",
      "consumer lag",
      "bounded buffer",
      "buffer",
      "rate mismatch",
      "overwhelm",
    ],
    terms: ["backpressure", "lag", "buffer"],
    related: ["consumer-groups", "throughput-vs-latency", "retries"],
    example: "What is backpressure in event processing?",
  },

  {
    id: "retries",
    topic: "Retries and Backoff",
    plain:
      "Retries try an operation again when it fails - but you need backoff and a limit so a flaky service isn't hammered by a thousand retries at once.",
    answer: [
      "Retries improve reliability for transient failures, but must be designed carefully.",
      "Rules of thumb:",
      "- Use exponential backoff with jitter to spread out retries",
      "- Cap the number of retries and honor Retry-After headers",
      "- Only retry idempotent operations",
      "- Combine with circuit breakers and timeouts to avoid overload",
      "Route permanently failing messages to a dead letter queue.",
    ],
    match: [
      "retry",
      "retries",
      "backoff",
      "exponential backoff",
      "retry policy",
      "retry logic",
      "retry with jitter",
      "retry strategy",
    ],
    terms: ["retry", "retries", "backoff"],
    related: ["circuit-breaker", "idempotency", "dlq"],
    example: "How should I design retries and backoff?",
  },

  {
    id: "observability",
    topic: "Observability",
    plain:
      "Observability is being able to understand a system's health from the outside - like a car dashboard showing engine, fuel, and temperature all at once.",
    answer: [
      "Observability lets you understand a system's internal state from its outputs.",
      "Three pillars:",
      "- Metrics: counters and gauges (request rate, error rate, latency)",
      "- Logs: structured records of events",
      "- Traces: end-to-end request paths across services",
      "Add correlation IDs to connect logs and traces, and alert on symptoms (errors, latency) rather than causes.",
    ],
    match: [
      "observability",
      "monitoring",
      "tracing",
      "distributed tracing",
      "telemetry",
      "metrics",
      "logs",
      "alerting",
      "opentelemetry",
      "grafana",
      "prometheus",
      "dashboard",
    ],
    terms: [
      "observability",
      "monitoring",
      "logs",
      "metrics",
      "tracing",
      "telemetry",
    ],
    related: ["high-availability", "retries", "event-driven"],
    example: "What is observability and why does it matter?",
  },

  {
    id: "data-lake-vs-warehouse",
    topic: "Data Lake vs. Data Warehouse",
    plain:
      "A data lake stores raw data in any format - a big archive; a warehouse stores cleaned, structured data ready for queries - a tidy library.",
    answer: [
      "Data lakes and warehouses serve different analytics needs:",
      "- Data lake: stores raw data in any format, schema-on-read, cheap, great for exploration and ML",
      "- Data warehouse: stores curated, structured data, schema-on-write, optimized for fast SQL analytics",
      "A lakehouse combines both: low-cost storage with warehouse-style query performance.",
      "Choose by your need for flexibility vs. guaranteed query performance and governance.",
    ],
    match: [
      "data lake",
      "data warehouse",
      "lakehouse",
      "data lake vs warehouse",
      "warehouse",
      "data lakehouse",
      "snowflake",
      "redshift",
      "bigquery",
    ],
    terms: ["lake", "warehouse", "lakehouse"],
    related: ["batch-vs-stream", "data-governance", "data-mesh"],
    example: "What is the difference between a data lake and a data warehouse?",
  },

  {
    id: "data-governance",
    topic: "Data Governance",
    plain:
      "Data governance is the rules for who can access, change, and use data - like a librarian deciding who may borrow which book, with a log of every checkout.",
    answer: [
      "Data governance controls how data is accessed, used, and protected across an organization.",
      "Core practices:",
      "- Lineage: track where data comes from and how it transforms",
      "- Access control and least privilege",
      "- Data cataloging for discovery and ownership",
      "- Compliance with regulations (e.g., GDPR, HIPAA) and audit logging",
      "- Data quality monitoring",
      "Governance becomes critical as data scale and user counts grow.",
    ],
    match: [
      "governance",
      "data governance",
      "lineage",
      "data lineage",
      "data catalog",
      "cataloging",
      "compliance",
      "gdpr",
      "hipaa",
      "audit",
      "data quality",
      "sensitive data",
    ],
    terms: ["governance", "lineage", "catalog", "compliance"],
    related: ["data-lake-vs-warehouse", "security", "data-mesh"],
    example: "What is data governance?",
  },

  {
    id: "data-mesh",
    topic: "Data Mesh",
    plain:
      "Data mesh treats data as a product owned by the teams that create it - like each department curating its own department-store section instead of one central warehouse.",
    answer: [
      "Data mesh is an organizational approach to data architecture with four principles:",
      "- Domain ownership: teams own their data as a product",
      "- Data as a product: discoverable, trustworthy, self-serve",
      "- Self-serve data platform: shared infrastructure for teams",
      "- Federated governance: global standards with local autonomy",
      "Tradeoffs: more autonomy and agility, but requires mature platform and culture; not a fit for every organization.",
    ],
    match: ["data mesh", "data-mesh", "data product"],
    terms: ["mesh"],
    related: ["data-governance", "data-lake-vs-warehouse", "microservices"],
    example: "What is data mesh?",
  },

  {
    id: "security",
    topic: "Security Architecture",
    plain:
      "Security in architecture means assuming every network is hostile and protecting data in transit, at rest, and in use - defense in depth.",
    answer: [
      "Good security architecture applies defense in depth across every layer:",
      "- Zero trust: verify every request, never trust the network",
      "- Least privilege: grant only the access needed",
      "- Encrypt data in transit (TLS) and at rest",
      "- Manage secrets centrally and rotate them",
      "- Authenticate and authorize at every boundary",
      "- Validate and sanitize all input (OWASP top 10)",
      "Design security reviews into the pipeline, not after the fact.",
    ],
    match: [
      "security",
      "zero trust",
      "least privilege",
      "encryption",
      "authentication",
      "authorization",
      "owasp",
      "vulnerability",
      "threat model",
      "secure architecture",
      "oauth",
      "jwt",
      "identity",
    ],
    terms: ["security", "encryption", "auth", "token"],
    related: ["api-gateway", "data-governance", "observability"],
    example: "How should I think about security in system architecture?",
  },

  {
    id: "rest-vs-grpc",
    topic: "REST vs. gRPC",
    plain:
      "REST uses standard HTTP verbs and JSON - easy and universal; gRPC is a high-performance binary protocol with strict contracts, great for internal services.",
    answer: [
      "REST and gRPC are both ways services communicate over HTTP:",
      "- REST: JSON payloads, simple and universal, great for public APIs and browsers",
      "- gRPC: binary encoding (Protobuf), HTTP/2, typed contracts, streaming - fast and efficient for internal services",
      "GraphQL is another option when clients need flexible queries.",
      "Choose REST for broad interoperability, gRPC for performance and internal service calls.",
    ],
    match: [
      "rest vs grpc",
      "grpc vs rest",
      "grpc",
      "rest api",
      "rest",
      "graphql",
      "soap",
      "protobuf",
      "rest or grpc",
    ],
    terms: ["rest", "grpc", "graphql", "soap"],
    related: ["api-gateway", "microservices", "throughput-vs-latency"],
    example: "REST or gRPC - which should I use?",
  },

  {
    id: "cost-optimization",
    topic: "Cost Optimization",
    plain:
      "Cost optimization means getting the most value per dollar - like rightsizing a fleet so you're not paying for trucks that sit idle.",
    answer: [
      "Cost optimization reduces waste without sacrificing performance or reliability.",
      "Approaches:",
      "- Right-size resources to actual utilization",
      "- Use serverless and scale-to-zero for variable workloads",
      "- Leverage spot instances and committed-use discounts",
      "- Tier storage and lifecycle data policies",
      "- Auto-scale to match demand",
      "Treat cost as a first-class architecture attribute: measure it, budget for it, and review regularly.",
    ],
    match: [
      "cost",
      "cost optimization",
      "optimize cost",
      "reduce cost",
      "save money",
      "spend",
      "budget",
      "finops",
      "cost efficient",
      "cost efficiency",
      "too expensive",
    ],
    terms: ["cost", "finops", "budget", "spend"],
    related: [
      "serverless-vs-containers",
      "scalability",
      "data-lake-vs-warehouse",
    ],
    example: "How do I optimize cloud costs?",
  },

  {
    id: "payments",
    topic: "Payment System Design",
    plain:
      "Payment systems care about correctness and reliability above all: a payment must be processed exactly once, or fail safely - never duplicated or lost.",
    answer: [
      "Payment systems are correctness-first: money must never be lost, duplicated, or misrouted.",
      "Design principles:",
      "- Idempotency keys on every payment operation",
      "- Retries with dead letter handling for failed transactions",
      "- Atomic ledger updates (single source of truth)",
      "- End-to-end audit trails and reconciliation",
      "- Exactly-once or fail-safe semantics for external integrations",
      "This tool's Payments scenario evaluates architectures on reliability and correctness first.",
    ],
    match: [
      "payment system",
      "payments",
      "payment",
      "payment processing",
      "credit card",
      "checkout",
      "billing",
      "transaction processing",
      "failed transaction",
      "failed payment",
    ],
    terms: [
      "payment",
      "payments",
      "checkout",
      "billing",
      "transaction",
      "transactions",
    ],
    related: ["idempotency", "retries", "saga", "dlq"],
    example: "How do I design a reliable payment system?",
  },

  {
    id: "adr",
    topic: "Architecture Decision Records",
    plain:
      "An ADR is a short document that records an important architecture decision and why - like a signed memo future engineers can read to understand the 'why'.",
    answer: [
      "An Architecture Decision Record (ADR) captures a significant architecture decision and its rationale.",
      "A lightweight ADR includes:",
      "- Context: the problem and constraints",
      "- Decision: what was chosen",
      "- Alternatives: what was considered and why it was rejected",
      "- Consequences: tradeoffs and follow-ups",
      "Keep them short and version-controlled. They preserve institutional knowledge for future engineers.",
      "Use the Generate ADR button above to produce one for the selected scenario.",
    ],
    match: [
      "adr",
      "architecture decision record",
      "architecture decision",
      "decision record",
      "adr template",
      "document a decision",
    ],
    terms: ["adr", "decision"],
    related: ["which-architecture", "microservices"],
    example: "What is an Architecture Decision Record?",
  },

  {
    id: "which-architecture",
    topic: "Choosing an Architecture",
    plain:
      "This tool scores Kafka, SQS, EventBridge, and RabbitMQ against your workload's needs and recommends the best fit - pick a scenario above or describe what you're building.",
    answer: [
      "There is no single best architecture - only the best fit for your requirements.",
      "How this tool helps:",
      "- Select a scenario above to see the recommended architecture",
      "- Tune the What-If weights to reflect your priorities",
      "- Compare results in the Tradeoff Matrix, Landscape, and Blueprint panels",
      "Quick heuristics:",
      "- Event streaming with replay: Apache Kafka",
      "- Reliable background jobs / serverless: Amazon SQS",
      "- Serverless event routing: Amazon EventBridge",
      "- Low-latency complex routing: RabbitMQ",
      "Clarify your top three non-negotiables, then evaluate tradeoffs - that is the whole exercise.",
    ],
    match: [
      "which architecture",
      "what architecture",
      "choose an architecture",
      "choosing an architecture",
      "pick an architecture",
      "pick architecture",
      "architecture for",
      "architecture should i",
      "recommend architecture",
      "recommended architecture",
      "best architecture",
      "which one",
      "how does this tool",
      "how does the tool",
      "how to use this tool",
      "should i use",
      "what should i use",
      "which should i use",
      "for my project",
      "for my system",
      "for my workload",
      "recommendation",
    ],
    terms: ["architecture", "recommend", "choose", "pick", "best", "which"],
    catchAll: true,
    related: ["kafka-vs-sqs", "event-streaming", "sqs", "eventbridge"],
    example: "How do I choose the right architecture?",
  },
];

const qaExamples = [
  { label: "Kafka vs SQS?", topic: "kafka-vs-sqs" },
  { label: "What is a dead letter queue?", topic: "dlq" },
  { label: "How do I choose an architecture?", topic: "which-architecture" },
  { label: "What is the CAP theorem?", topic: "cap" },
  { label: "How does message ordering work?", topic: "ordering" },
  {
    label: "How do I design for high availability?",
    topic: "high-availability",
  },
];

/*
=====================================
 Matching Engine
=====================================
*/

function qaNormalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function qaWordCount(phrase) {
  return phrase ? phrase.split(" ").filter(Boolean).length : 0;
}

function qaScoreEntry(question, entry) {
  let score = 0;
  const matched = [];
  const tokens = new Set(question.split(" "));
  for (const raw of entry.match || []) {
    const phrase = qaNormalize(raw);
    if (!phrase) continue;
    if (question.includes(phrase)) {
      score += 8 + (qaWordCount(phrase) - 1) * 5;
      matched.push(phrase);
    }
  }
  for (const raw of entry.terms || []) {
    const term = qaNormalize(raw);
    if (term && tokens.has(term)) score += 2;
  }
  if (entry.catchAll) score = Math.round(score * 0.75);
  return {
    score,
    matched,
    count: matched.length,
    longest: matched.reduce((max, p) => Math.max(max, qaWordCount(p)), 0),
  };
}

function qaFind(question) {
  const q = qaNormalize(question);
  if (!q) return { entry: null, kind: "fallback", closest: [], score: 0 };
  const scored = [];
  qaTopics.forEach((entry) => {
    const result = qaScoreEntry(q, entry);
    if (result.score > 0) {
      scored.push({ entry, ...result });
    }
  });
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if ((a.entry.catchAll ? 1 : 0) !== (b.entry.catchAll ? 1 : 0)) {
      return a.entry.catchAll ? 1 : -1;
    }
    if (b.count !== a.count) return b.count - a.count;
    return b.longest - a.longest;
  });
  const top = scored[0];
  if (top && top.score >= 8) {
    return {
      entry: top.entry,
      kind: top.score >= 22 ? "match" : "guess",
      score: top.score,
      closest: [],
    };
  }
  if (top) {
    return {
      entry: null,
      kind: "closest",
      score: top.score,
      closest: scored.slice(0, 3),
    };
  }
  return { entry: null, kind: "fallback", closest: [], score: 0 };
}

/*
=====================================
 Rendering
=====================================
*/

function qaEscape(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function qaInline(text) {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function qaRenderLines(lines) {
  let html = "";
  let open = false;
  for (const raw of lines || []) {
    const line = String(raw).replace(/\s+/g, " ").trim();
    if (!line) continue;
    if (line.startsWith("-") || line.startsWith("•")) {
      if (!open) {
        html += "<ul>";
        open = true;
      }
      html +=
        "<li>" + qaInline(qaEscape(line.replace(/^[-•]\s*/, ""))) + "</li>";
    } else {
      if (open) {
        html += "</ul>";
        open = false;
      }
      html += "<p>" + qaInline(qaEscape(line)) + "</p>";
    }
  }
  if (open) html += "</ul>";
  return html;
}

function qaChipHtml(label, topic) {
  return (
    '<button type="button" class="qa-chip" onclick="askTopic(\'' +
    topic +
    "')\">" +
    qaEscape(label) +
    "</button>"
  );
}

function qaRenderResult(entry, kind) {
  const badge =
    kind === "match"
      ? '<span class="qa-badge qa-badge-match">Matched topic</span>'
      : '<span class="qa-badge qa-badge-guess">Best guess - review these</span>';
  const plain = entry.plain
    ? '<div class="qa-plain">' + qaEscape(entry.plain) + "</div>"
    : "";
  const related =
    entry.related && entry.related.length > 0
      ? '<div class="qa-related">Explore related:</div><div class="qa-chips">' +
        entry.related
          .map((id) => {
            const topic = qaTopics.find((t) => t.id === id);
            return topic ? qaChipHtml(topic.topic, topic.id) : "";
          })
          .join("") +
        "</div>"
      : "";
  document.getElementById("qaResult").innerHTML =
    '<div class="qa-answer">' +
    badge +
    '<h3 class="qa-topic">' +
    qaEscape(entry.topic) +
    "</h3>" +
    plain +
    qaRenderLines(entry.answer) +
    related +
    "</div>";
}

function qaRenderClosest(closest) {
  let list = "";
  closest.forEach((item) => {
    list +=
      "<p>- <b>" +
      qaEscape(item.entry.topic) +
      "</b></p>" +
      '<div class="qa-chips">' +
      qaChipHtml("Show answer", item.entry.id) +
      "</div>";
  });
  document.getElementById("qaResult").innerHTML =
    '<div class="qa-answer">' +
    '<span class="qa-badge qa-badge-guess">Not quite sure</span>' +
    "<p>I could not confidently match your question. Did you mean one of these topics?</p>" +
    list +
    "</div>";
}

function qaRenderFallback() {
  document.getElementById("qaResult").innerHTML =
    '<div class="qa-answer">' +
    '<span class="qa-badge qa-badge-guess">General guidance</span>' +
    "<p>I can answer architecture questions such as event streaming, messaging and queues, ordering and replay, scalability, availability, consistency, databases, API design, serverless vs. containers, cost, security, and how to pick an architecture.</p>" +
    "<p>Try one of the example prompts below, or rephrase your question with a few more specifics (e.g. a technology or a workload).</p>" +
    "</div>";
}

/*
=====================================
 Public Actions
=====================================
*/

function askTopic(topicId) {
  const entry = qaTopics.find((topic) => topic.id === topicId);
  if (!entry) return;
  const input = document.getElementById("qaInput");
  if (input) input.value = entry.example || entry.topic + "?";
  qaRenderResult(entry, "match");
  const result = document.getElementById("qaResult");
  if (result) result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function askQuestion() {
  const input = document.getElementById("qaInput");
  const question = input ? input.value.trim() : "";
  if (!question) {
    if (input) input.focus();
    return;
  }
  const result = qaFind(question);
  if (result.entry) {
    qaRenderResult(result.entry, result.kind);
  } else if (result.kind === "closest") {
    qaRenderClosest(result.closest);
  } else {
    qaRenderFallback();
  }
}

function initQA() {
  const container = document.getElementById("qaExamples");
  if (container) {
    container.innerHTML = qaExamples
      .map((example) => qaChipHtml(example.label, example.topic))
      .join("");
  }
  const input = document.getElementById("qaInput");
  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        askQuestion();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQA);
} else {
  initQA();
}
