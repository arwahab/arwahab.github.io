function generateADR(
    scenario,
    recommendation
) {


    const winner =
        recommendation.winner;



    const alternatives =
        recommendation.alternatives;



    const adr = `


# ADR-001: ${scenario.name}


## Status

Accepted


## Decision

Use ${winner.name}
as the recommended architecture.



## Context

${scenario.summary}



The architecture must address:


${scenario.keyChallenges
            .map(
                challenge =>
                    "- " + challenge
            )
            .join("\n")}




## Alternatives Considered


${alternatives
            .map(
                item =>
                    "- " + item.name
            )
            .join("\n")}




## Architecture Fit


${winner.finalScore}%



## Strengths


${winner.strengths
            .map(
                item =>
                    "- " + item
            )
            .join("\n")}




## Tradeoffs


${winner.weaknesses
            .map(
                item =>
                    "- " + item
            )
            .join("\n")}




## Decision Rationale


This architecture provides the strongest alignment
with the workload requirements while balancing
performance, reliability, operational complexity,
and cost.


`;



    return adr;


}