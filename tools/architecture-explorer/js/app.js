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


}







function updateRecommendation(data) {


    const winner =
        data.winner;



    const technologyName =
        document.querySelector(".tech");


    const score =
        document.querySelector(".score");


    const reason =
        document.querySelector(".reason");




    technologyName.innerHTML =
        winner.name;



    animateScore(
        score,
        winner.finalScore
    );





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
            .join("<br>")
        }


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
            .join("<br>")
        }


    `;


}









function animateScore(element,target){


    let current = 0;


    const interval =
        setInterval(()=>{


            current += 2;


            element.innerHTML =
                current;



            if(current >= target){

                element.innerHTML =
                    target;


                clearInterval(interval);

            }



        },15);


}









function updateMetrics(system){


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