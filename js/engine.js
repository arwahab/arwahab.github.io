function scoreTechnology(user,tech){

let score=100;

score-=Math.abs(user.traffic-tech.traffic)*0.25;

score-=Math.abs(user.latency-tech.latency)*0.30;

score-=Math.abs(user.ordering-tech.ordering)*0.20;

score-=Math.abs(user.budget-tech.budget)*0.15;

score-=Math.abs(user.replay-tech.replay)*0.10;

return Math.max(0,Math.round(score));

}
