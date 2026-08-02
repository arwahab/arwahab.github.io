const OPERATIONAL_NOTES = {
  kafka: `
- Partition strategy
- Consumer lag monitoring
- Schema evolution strategy
- Cluster capacity planning
`,
  kinesis: `
- Shard count and capacity planning
- Retention window configuration
- Enhanced fan-out consumer pattern
- Lambda / Flink integration points
`,
  sqs: `
- Dead letter queue strategy
- Retry policies
- Visibility timeout tuning
- Idempotent consumers
`,
  eventbridge: `
- Event schema governance
- Event routing rules
- Integration monitoring
`,
  lambda: `
- Cold start mitigation
- Timeout and memory tuning
- Reserved concurrency
- Observability and tracing
`,
  apigateway: `
- Throttling and quota policies
- Authentication and authorization
- Request validation
- Usage plans and monitoring
`,
  ecs: `
- Fargate vs. EC2 placement
- Service auto scaling
- Image registry and CI pipeline
- Capacity planning
`,
  rosa: `
- Node pool sizing and scaling
- Cluster upgrade strategy
- Role-based access control
- Backup and disaster recovery
`,
  pubsub: `
- Topic and subscription design
- Exactly-once and ordering key strategy
- Retention and seek configuration
- Cross-region replication
`,
  default: `
- Capacity planning
- Monitoring strategy
- Failure recovery procedures
`,
};

const SECURITY_NOTES = {
  kafka: `
- TLS in transit and SASL/SCRAM authentication with ACL-based authorization
- Encrypt at rest with KMS and isolate brokers on private networks
- Rotate service credentials and audit broker access
- Lock down the schema registry with its own auth and audit trail
`,
  kinesis: `
- Least-privilege IAM policies on streams and consumers
- Server-side encryption with KMS keys
- Restrict access to private VPC endpoints
- Audit producer and consumer access with CloudTrail
`,
  sqs: `
- Least-privilege IAM for queue access and redrive
- Server-side encryption with KMS
- Access queues privately via VPC endpoints
- Encrypt message bodies end-to-end for sensitive payloads
`,
  eventbridge: `
- Tight IAM resource policies on event buses
- Allowlist and validate target integrations
- Reject overly permissive cross-account rules
- Encrypt events and audit routing changes
`,
  lambda: `
- Least-privilege execution roles
- Keep secrets in Parameter Store / Secrets Manager, not env vars
- Run functions inside VPCs with locked-down security groups
- Scan dependencies and image layers in CI
`,
  apigateway: `
- Front APIs with WAF
- Authenticate via IAM, Cognito, or OAuth
- Enforce TLS and strict request validation
- Throttle and budget to prevent abuse and cost spikes
`,
  ecs: `
- Least-privilege task and execution roles
- Scan container images in ECR before deploy
- Run as non-root with a read-only root filesystem
- Isolate services with security groups and private network modes
`,
  rosa: `
- Enforce SSO/RBAC and deny default cluster-admin
- Restrict egress with network policies
- Keep clusters patched and encrypt etcd and volumes
- Gate workloads with SecurityContextConstraints
`,
  pubsub: `
- IAM roles with minimal publish and subscribe scope
- Topic-level access control and encrypted transport
- Encrypt at rest with customer-managed keys
- Strip sensitive data from message attributes
`,
  default: `
- Enforce least privilege with IAM
- Encrypt data in transit and at rest
- Protect secrets with a dedicated secrets store
- Audit access and changes with logging
`,
};

const CODE_SECURITY_NOTES = `
- Run static analysis (SAST) and secret scanning in CI
- Review dependencies for known vulnerabilities
- Validate all input and encode all output (OWASP Top 10)
- Use short-lived credentials and rotate secrets
`;

function generateADR(scenario, recommendation) {
  const winner = recommendation.winner;
  const alternatives = recommendation.alternatives;
  let adr = "";
  adr += `
==================================================
ARCHITECTURE DECISION RECORD
==================================================


Decision
--------------------------------------------------

Adopt ${winner.name}


Category:
${winner.category}



Context
--------------------------------------------------

${scenario.summary}



Business / Engineering Drivers
--------------------------------------------------

`;

  scenario.priorities.forEach((item) => {
    adr += `✓ ${item}\n`;
  });
  adr += `

Why This Architecture
--------------------------------------------------

`;

  winner.strengths.forEach((item) => {
    adr += `✓ ${item}\n`;
  });
  adr += `

Architecture Tradeoffs Accepted
--------------------------------------------------

`;

  winner.weaknesses.forEach((item) => {
    adr += `⚠ ${item}\n`;
  });
  adr += `

Alternatives Considered
==================================================

`;

  alternatives.forEach((architecture) => {
    adr += `
${architecture.name}

Why it was not selected:
`;

    architecture.weaknesses.slice(0, 3).forEach((item) => {
      adr += `- ${item}\n`;
    });
    adr += "\n";
  });
  adr += `
Operational Considerations
==================================================

Recommended implementation considerations:

`;
  adr += OPERATIONAL_NOTES[winner.id] || OPERATIONAL_NOTES.default;
  adr += `
Security Considerations
==================================================

Infrastructure / IT security:

`;
  adr += SECURITY_NOTES[winner.id] || SECURITY_NOTES.default;
  adr += `
Application / code security:
${CODE_SECURITY_NOTES}
==================================================
Generated by Wahab Waypoint: Architect
==================================================
`;
  return adr;
}
