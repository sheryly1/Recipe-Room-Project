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
        
        /* ------------ FETCHING INFORMATION ------------ */
        //FETCH INGREDIENT ID 
        
        //API Query 
        const id_query = `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&apiKey=${key}`; 
        
        //API Array 
        const id_response = await fetch(id_query); 
        const id_json = await id_response.json(); 

        //ID & Image successfully fetched 
        let ingredient_arr = id_json.results[0]; 
        let ingredient_id = ingredient_arr.id; 
        let ingredient_img = ingredient_arr.image; 

        //API Query
        const ingredient_info = `https://api.spoonacular.com/food/ingredients/${ingredient_id}/information?amount=1&apiKey=${key}`;

        // API Array 
        const info_response = await fetch(ingredient_info); 
        const info_json = await info_response.json(); 
        console.log(info_json); 



       //Show substitute options
        substitute_result.innerHTML = 
            ` 
            <div>
                <div class = "row">
                    <div class = "description col"> 
                        <h2> ${recipe_name} </h2> 
                        <h3> Diets: ${recipe_diets} </h3> 
                        <h3> Time: ${recipe_time} </h3> 
                        <h3> Servings: ${recipe_servings} </h3> 
                        <p> ${recipe_description} </p> 
                    </div>
                    <div class = "image col">
                        <img src = ${recipe_photo}>
                    </div>
                </div> 
            </div>
            <h4> ${message} </h4> 
            <ol> ${substitutes} </ol> 
            `; 
    }
});
/* ------------ END OF SUBMISSION BUTTON ------------ */
