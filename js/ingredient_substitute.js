/* ------------ HELPER FUNCTIONS ------------ */
//Generate a Random Int. 
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
/* ------------ END OF HELPER FUNCTIONS ------------ */


/* ------------ FORM QUERYING ------------ */
const submitButton = document.querySelector('#submitButton');
const ingredient_input = document.querySelector('#substitute-input');
let ingredient = ""; 

ingredient_input.addEventListener("change", (e) => {
    const ingredient_result = e.target.value.toLowerCase();
    ingredient = ingredient_result;
});

ingredient_input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent default form submission if in a form
    ingredient = e.target.value.toLowerCase(); 
    submitButton.click(); // Simulate button click
  }
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
            <div class = "failure"> 
                <h2> Sorry we couldn't find a replacement for ${ingredient} </h2>
                <p> Please double check your spelling and make sure ingredient is not in plural form </p>
            </div> 
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
        //Get correct image format...
        let imageFile = ingredient_arr.image.replace('.png', '.jpg');
        let ingredient_img = `https://spoonacular.com/cdn/ingredients_250x250/${imageFile}`;

        //API Query
        const ingredient_info = `https://api.spoonacular.com/food/ingredients/${ingredient_id}/information?amount=1&apiKey=${key}`;

        // API Array 
        const info_response = await fetch(ingredient_info); 
        const info_json = await info_response.json(); 
        let estimated_cost = info_json.estimatedCost; 
        let aisle = info_json.aisle; 
        console.log(info_json); 

       //Show substitute options
        substitute_result.innerHTML = 
            ` 
            <div class = "js_result">
                <div class = "row">
                    <div class = "description col"> 
                        <h2> Substitute[s] for ${ingredient}: </h2> 
                        <ol> ${substitutes} </ol> 
                        <p> If these substitutes don't seem good, then you can find ${ingredient} in the ${aisle} aisles at your local supermarket! </p> 
                    </div>
                    <div class = "image col">
                        <img src = ${ingredient_img}>
                    </div>
                </div> 
            </div>
            `; 
    }
});
/* ------------ END OF SUBMISSION BUTTON ------------ */
