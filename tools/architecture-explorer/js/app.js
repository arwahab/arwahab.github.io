function selectScenario(scenarioId) {


    const scenario =
        scenarios[scenarioId];


    if (!scenario) {

        console.error(
            "Scenario not found:",
            scenarioId
        );

        return;

    }



    updateScenarioContext(
        scenario
    );



    const recommendation =
        getRecommendation(
            scenario.requirements
        );



    updateRecommendation(
        recommendation
    );



    updateMetrics(
        recommendation.winner
    );



    updateComparison(
        recommendation.ranking
    );



    updateDiagram(
        scenarioId
    );


}







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









function updateRecommendation(data) {


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



    if(tech){

        tech.innerHTML =
            winner.name;

    }



    animateScore(

        score,

        Number(
            winner.finalScore
        )

    );





    if(reason){

        reason.innerHTML = `


        <b>
        Why this architecture?
        </b>


        <br><br>


        ${winner.strengths
            .map(
                item =>
                "✓ " + item
            )
            .join("<br>")}



        <br><br>


        <b>
        Tradeoffs:
        </b>


        <br><br>


        ${winner.weaknesses
            .map(
                item =>
                "• " + item
            )
            .join("<br>")}


        `;

    }


}









function animateScore(element, target){

    if(!element){
        return;
    }


    let score = parseFloat(target);


    if(isNaN(score)){
        score = 0;
    }


    // Hard safety limit
    if(score > 100){
        score = 100;
    }


    if(score < 0){
        score = 0;
    }


    element.innerHTML =
        Math.round(score) + "%";

}








function updateMetrics(system){



    if(!system || !system.scores){

        return;

    }




    document
    .getElementById("scaleBar")
    .style.width =
        system.scores.scalability + "%";




    document
    .getElementById("reliabilityBar")
    .style.width =
        system.scores.reliability + "%";




    document
    .getElementById("simplicityBar")
    .style.width =
        system.scores.simplicity + "%";




    document
    .getElementById("costBar")
    .style.width =
        system.scores.costEfficiency + "%";


}









function updateComparison(results){


    const container =
        document.getElementById(
            "comparisonContainer"
        );



    if(!container){

        return;

    }



    container.innerHTML =
        "";



    results.forEach(system=>{


        const row =
            document.createElement(
                "div"
            );



        row.className =
            "comparison-row";



        row.innerHTML = `


        <div class="comparison-header">


        <span class="comparison-name">

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


    });



}









function updateDiagram(scenarioId){


    const diagram =
        getDiagram(
            scenarioId
        );



    const title =
        document.getElementById(
            "diagramTitle"
        );



    const container =
        document.getElementById(
            "diagramContainer"
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