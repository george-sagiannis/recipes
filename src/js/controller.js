import * as model from './model.js'
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


//we have the function controlRecipes in the controller that will then be called by controlRecipes between loading the recipe and then rendering it using the view (controller works as a bridge here between model and view)
const controlRecipes = async function (){
  try {

    //the controller actually gets the id right here and so then when it calls the model so the loadRecipe function it can pass that ID into it export const loadRecipe = async function (id)
    const id = window.location.hash.slice(1);

    if(!id) return;

    // spinner added in refresh
    recipeView.renderSpinner();

    // 1) Load Recipe

    //it is an async function and therefore it is going to return a promise that we then need to handle whenever we call that async function
    //this loadRecipe fucntion here does not return anything. And so therefore, we are not storing any result into a new variable
    //Instead here we will get access to state.recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe (generally is the container of the recipe)

    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
    //here the error is shown now in the view
  }
}

// showRecipe();


//with this we just implemented the Publisher-Subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
}

init();