/* ------------ HELPER FUNCTIONS ------------ */
//Generate a Random Int. 
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
/* ------------ END OF HELPER FUNCTIONS ------------ */


/* ------------ FORM QUERYING ------------ */
const ingredient_input = document.querySelector('#substitute-input');

ingredient_input.addEventListener("change", (e) => {
    const ingredient_result = event.target.value.toLowerCase();
    ingredient = ingredient_result;
});

/* ------------ END OF FORM QUERYING ------------ */

/* ------------ SUBMISSION BUTTON ------------ */
submitButton.addEventListener("click", async (e) => {
    /* ------------ API FETCHING ------------ */
    //API KEY
    let key = "d19a62610b27408ba490042364b04e91";

    //API Query 
    const query = `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${key}&ingredientName=${ingredient}`;

    //API Array 
    const all_response = await fetch(query);
    const json = await all_response.json();
    console.log(json);
    /* ------------ END OF API FETCHING ------------ */

    /* ------------ CHECK IF A RESULT EXISTS ------------ */
    let substitute_result = document.querySelector('#substitute-result');
    if (json.status == "failure"){
        substitute_result.innerHTML = 
            `
            <h3> Sorry we couldn't find a recipe for you </h3>
            <p> Please double check your spelling and make sure ingredient is not in plural form </p>
            `;
    }else{
        let message = json.message; 
        /* Parse out substitute options:*/ 
        let substitutes = ``;
        for (i = 0 ; i < json.substitutes.length; i ++){
            substitutes += `<li> ${json.substitutes[i]} </li> `;
        };

        /* Show substitute options */ 
        substitute_result.innerHTML = 
            ` 
            <h4> ${message} </h4> 
            <ol> ${substitutes} </ol> 
            `; 
    }

});
/* ------------ END OF SUBMISSION BUTTON ------------ */
