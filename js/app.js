const results=document.getElementById("results");

const sliders=document.querySelectorAll("input");

function refresh(){

const workload={

traffic:+traffic.value,

latency:+latency.value,

ordering:+ordering.value,

budget:+budget.value,

replay:+replay.value

};

results.innerHTML="";

technologies

.map(t=>({

...t,

score:scoreTechnology(workload,t)

}))

.sort((a,b)=>b.score-a.score)

.forEach(t=>{

results.innerHTML+=`

<div class="card">

<h2>${t.name}</h2>

<div class="score">${t.score}</div>

<div class="reason">

${recommendation(t)}

</div>

</div>

`;

});

}

function recommendation(t){

if(t.score>90)
return"Excellent architectural fit for this workload.";

if(t.score>75)
return"Very good balance of scalability, operational complexity, and cost.";

if(t.score>60)
return"Viable option with some notable tradeoffs.";

return"Consider only if constrained by organizational standards or existing investments.";

}

sliders.forEach(s=>s.oninput=refresh);

refresh();
