let selectedScenario = null;

let selectedRecommendation = null;


/*
=====================================
 Scenario Selection
=====================================
*/

function selectScenario(scenarioId) {


    const scenario =
        scenarios[scenarioId];


    if(!scenario){

        console.error(
            "Scenario not found:",
            scenarioId
        );

        return;

    }



    selectedScenario =
        scenario;



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

function updateScenarioContext(scenario){


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


    if(
        !data ||
        !data.winner
    ){

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



        <div class="recommendation-section">


        <h3>
        Why this architecture?
        </h3>


        <br>


        ${
            winner.strengths
            .map(
                item =>
                "✓ " + item
            )
            .join("<br>")
        }


        </div>




        <div class="recommendation-section">


        <h3>
        Tradeoffs
        </h3>


        <br>


        ${
            winner.weaknesses
            .map(
                item =>
                "• " + item
            )
            .join("<br>")
        }


        </div>




        <div class="recommendation-section">


        <h3>
        Why not alternatives?
        </h3>


        <br>


        ${
            generateAlternativeAnalysis(
                winner,
                data.ranking
            )
        }


        </div>


        `;


    }


}






function generateAlternativeAnalysis(
    winner,
    ranking
){


    if(
        !ranking ||
        ranking.length === 0
    ){

        return "";

    }



    return ranking

    .filter(
        architecture =>
        architecture.id !== winner.id
    )

    .slice(0,3)

    .map(
        architecture => {


            return `


            <div class="alternative-item">


            <b>
            ${architecture.name}
            </b>


            <br>


            Score:
            ${architecture.finalScore}%


            <br><br>


            Not selected because:


            <br>


            ${
                architecture.weaknesses
                .slice(0,2)
                .map(
                    item =>
                    "• " + item
                )
                .join("<br>")
            }


            </div>


            `;


        }

    )

    .join("<br>");


}








function animateScore(
    element,
    target
){


    if(!element){

        return;

    }



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

    .forEach(
        id=>{


            const element =
                document.getElementById(
                    id
                );



            if(element){

                element.style.width =
                    metrics[id]
                    + "%";

            }


        }

    );


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



            container.appendChild(
                row
            );


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



    let html = `


<table class="tradeoff-table">

<thead>

<tr>

<th>
Dimension
</th>


${
results.map(
system =>

`
<th>
${system.name}
</th>

`

).join("")
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
${dimension}
</td>



${
results.map(
system=>{


const value =
system.scores[dimension] ?? 0;


let css =
"medium-score";


if(value >= 85){

css =
"high-score";

}


if(value < 60){

css =
"low-score";

}



return `

<td class="tradeoff-score ${css}">

${value}

</td>


`;


}

).join("")

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



            point.style.left =
                architecture.scores.simplicity
                + "%";



            point.style.bottom =
                architecture.scores.scalability
                + "%";



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
                diagram.nodes.length - 1
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