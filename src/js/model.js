import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

//here in model will contain an object for receipe, search and bookmarks
export const state = {
    recipe: {},
};

//loadRecipe is responsible for actually fetching the recipe data from Forkify API
//this fuction here is not going to return anything - all it will do is to change the state object
//So this big state object whicj will then contain the recipe and into which the controller will then grab the recipe out there
//this will work because there is a live connection between the imports and exports
//When this state object here!!! is going to get updated by loadRecipe then that state is also updated in the controller which imports the state

export const loadRecipe = async function (id) {
   
  try { 
    
    const data = await getJSON(`${API_URL}/${id}`);

   //  console.log(res, data);


   const {recipe} = data.data;   

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);   
  } catch(err) {
        console.error(`${err} hello here is the error`)  
        // Error: Invalid _id: 5ed6604591c37cdc054bc886sssssss. (400) hello here is the error
        //th error is not appearing in the helpers.js but here because in helpers i have this throw err;
        //http://localhost:1234/#5ed6604591c37cdc054bc886sssssss --> for wrong url i take the above error
    }

}