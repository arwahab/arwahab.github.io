function evaluateArchitectures(requirements) {


    return architectures.map(architecture => {


        let score = 0;


        const dimensions = [

            "scalability",

            "reliability",

            "simplicity",

            "costEfficiency",

            "latency",

            "ordering",

            "replay"

        ];



        dimensions.forEach(dimension => {


            const requirementWeight =
                requirements[dimension];


            const capability =
                architecture.scores[dimension];



            score +=
                (
                    requirementWeight *
                    capability
                ) / 100;


        });



        return {


            ...architecture,


            finalScore:
                Math.round(
                    score / dimensions.length * 100
                )

        };


    })

    .sort(
        (a,b)=>
        b.finalScore -
        a.finalScore
    );

}






function getRecommendation(requirements){


    const results =
        evaluateArchitectures(requirements);



    return {


        winner:
            results[0],


        alternatives:
            results.slice(1,4),


        ranking:
            results


    };

}