function evaluateArchitecture(requirements){


return architectures.map(system=>{


let score=0;


score +=
requirements.scale *
system.scores.scalability /100;


score +=
requirements.reliability *
system.scores.reliability /100;


score +=
requirements.simplicity *
system.scores.simplicity /100;


score +=
requirements.cost *
system.scores.cost /100;


score +=
requirements.latency *
system.scores.latency /100;



return {

...system,

finalScore:
Math.round(score / 5)

};


})

.sort(
(a,b)=>
b.finalScore-a.finalScore
);


}
