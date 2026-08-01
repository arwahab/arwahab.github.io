let selectedScenario = null;
let selectedRecommendation = null;


/*
=====================================
 Scenario Selection
=====================================
*/

function selectScenario(scenarioId) {


    const scenario = scenarios[scenarioId];


    if (!scenario) {

        console.error(
            "Scenario not found:",
            scenarioId
        );

        return;

    }


    selectedScenario = scenario;


    updateScenarioContext(
        scenario
    );


    const recommendation =
        getRecommendation(
            scenario.requirements
        );


    selectedRecommendation =
        recommendation;


    updateRecommendation(
        recommendation
    );


    updateMetrics(
        recommendation.winner
    );


    updateComparison(
        recommendation.ranking
    );


    updateTradeoffMatrix(
        recommendation.ranking
    );


    updateLandscape(
        recommendation.ranking
    );


    updateDiagram(
        scenarioId
    );


}




/*
=====================================
 Scenario Context
=====================================
*/

function updateScenarioContext(scenario) {


    const title =
        document.getElementById(
            "scenarioTitle"
        );


    const description =
        document.getElementById(
            "scenarioDescription"
        );


    const challenges =
        document.getElementById(
            "scenarioChallenges"
        );



    if(title){

        title.innerHTML =
            scenario.name;

    }



    if(description){

        description.innerHTML =
            scenario.summary;

    }



    if(challenges){

        challenges.innerHTML =
            scenario.keyChallenges
            .map(
                item =>
                "✓ " + item
            )
            .join("<br>");

    }


}





/*
=====================================
 Recommendation
=====================================
*/


function updateRecommendation(data){


    if(!data || !data.winner){

        return;

    }


    const winner =
        data.winner;



    const tech =
        document.querySelector(
            ".tech"
        );


    const score =
        document.querySelector(
            ".score"
        );


    const reason =
        document.querySelector(
            ".reason"
        );


    const confidence =
        document.querySelector(
            ".confidence span"
        );



    if(tech){

        tech.innerHTML =
            winner.name;

    }



    if(score){

        animateScore(
            score,
            winner.finalScore
        );

    }



    if(confidence){

        confidence.style.width =
            winner.finalScore + "%";

    }



    if(reason){

        reason.innerHTML = `


        <b>
        Why this architecture?
        </b>


        <br><br>


        ${
            winner.strengths
            .map(
                item =>
                "✓ " + item
            )
            .join("<br>")
        }


        <br><br>


        <b>
        Tradeoffs:
        </b>


        <br><br>


        ${
            winner.weaknesses
            .map(
                item =>
                "• " + item
            )
            .join("<br>")
        }


        `;

    }


}





function animateScore(element,target){


    let score =
        Number(target);


    if(isNaN(score)){

        score = 0;

    }


    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    element.innerHTML =
        Math.round(score)
        + "%";


}





/*
=====================================
 Engineering Metrics
=====================================
*/


function updateMetrics(system){


    if(
        !system ||
        !system.scores
    ){

        return;

    }


    const metrics = {

        scaleBar:
        system.scores.scalability,


        reliabilityBar:
        system.scores.reliability,


        simplicityBar:
        system.scores.simplicity,


        costBar:
        system.scores.costEfficiency

    };



    Object.keys(metrics)
    .forEach(id=>{


        const element =
            document.getElementById(id);



        if(element){

            element.style.width =
                metrics[id]
                + "%";

        }


    });


}







/*
=====================================
 Architecture Comparison
=====================================
*/


function updateComparison(results){


    const container =
        document.getElementById(
            "comparisonContainer"
        );


    if(
        !container ||
        !results
    ){

        return;

    }


    container.innerHTML =
        "";



    results.forEach(
        (system,index)=>{


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "comparison-row";



            row.innerHTML = `


            <div class="comparison-header">


            <span class="comparison-name">

            #${index+1}
            ${system.name}

            </span>



            <span class="comparison-score">

            ${system.finalScore}%

            </span>


            </div>



            <div class="comparison-bar">


                <div 
                class="comparison-fill"
                style="width:${system.finalScore}%">

                </div>


            </div>


            `;


            container.appendChild(row);


        }

    );


}








/*
=====================================
 Tradeoff Matrix
=====================================
*/


function updateTradeoffMatrix(results){


    const container =
        document.getElementById(
            "tradeoffMatrix"
        );


    if(
        !container ||
        !results
    ){

        return;

    }



    const dimensions = [

        "scalability",

        "reliability",

        "simplicity",

        "costEfficiency",

        "latency",

        "ordering",

        "replay"

    ];



    const formatLabel =
        text =>

        text
        .replace(
            /([A-Z])/g,
            " $1"
        )
        .replace(
            /^./,
            c=>c.toUpperCase()
        );




    let html = `


<table class="tradeoff-table">


<thead>

<tr>

<th>
Dimension
</th>


${
results.map(
system=>`

<th>
${system.name}
</th>

`
)
.join("")
}


</tr>

</thead>


<tbody>


`;




dimensions.forEach(
dimension=>{


html += `


<tr>


<td>

${formatLabel(dimension)}

</td>



${
results.map(system=>{


const value =
system.scores[dimension] ?? 0;



let css =
"medium-score";


if(value>=85){

css="high-score";

}


if(value<60){

css="low-score";

}



return `


<td class="tradeoff-score ${css}">

${value}

</td>


`;

})
.join("")
}



</tr>


`;


});




html += `

</tbody>

</table>

`;



container.innerHTML =
    html;


}









/*
=====================================
 Architecture Landscape
=====================================
*/


function updateLandscape(results){


    const container =
        document.getElementById(
            "landscapeContainer"
        );


    if(
        !container ||
        !results
    ){

        return;

    }



    container.innerHTML = `


    <div class="landscape">


        <div class="landscape-axis-x">

            Operational Simplicity →

        </div>



        <div class="landscape-axis-y">

            Scalability →

        </div>


    </div>


    `;



    const chart =
        container.querySelector(
            ".landscape"
        );



    results.forEach(
        architecture=>{


            const point =
                document.createElement(
                    "div"
                );



            point.className =
                "landscape-point";



            point.innerHTML =
                architecture.name;



            const x =
                Math.max(
                    10,
                    Math.min(
                        90,
                        architecture.scores.simplicity
                    )
                );


            const y =
                Math.max(
                    10,
                    Math.min(
                        90,
                        architecture.scores.scalability
                    )
                );



            point.style.left =
                x + "%";



            point.style.bottom =
                y + "%";



            chart.appendChild(
                point
            );


        }

    );


}







/*
=====================================
 Architecture Diagram
=====================================
*/


function updateDiagram(scenarioId){


    const diagram =
        getDiagram(
            scenarioId
        );


    const container =
        document.getElementById(
            "diagramContainer"
        );


    const title =
        document.getElementById(
            "diagramTitle"
        );



    if(
        !diagram ||
        !container
    ){

        return;

    }



    if(title){

        title.innerHTML =
            diagram.title;

    }



    container.innerHTML =
        "";



    diagram.nodes.forEach(
        (node,index)=>{


            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "diagram-node";


            box.innerHTML =
                node;



            container.appendChild(
                box
            );



            if(
                index <
                diagram.nodes.length-1
            ){

                const arrow =
                    document.createElement(
                        "div"
                    );


                arrow.className =
                    "diagram-arrow";


                arrow.innerHTML =
                    "↓";


                container.appendChild(
                    arrow
                );

            }


        }

    );


}





/*
=====================================
 ADR Generator
=====================================
*/


function showADR(){


    if(
        !selectedScenario ||
        !selectedRecommendation
    ){

        alert(
            "Select a workload first."
        );

        return;

    }



    const output =
        document.getElementById(
            "adrOutput"
        );


    if(output){

        output.value =
            generateADR(
                selectedScenario,
                selectedRecommendation
            );

    }


}