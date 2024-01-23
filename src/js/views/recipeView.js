import icons from 'url:../../img/icons.svg'; //Parcel 2
import {Fraction} from 'fractional';
console.log(Fraction);

class RecipeView {
    #parentElement = document.querySelector('.recipe'); //parentElement
    #data; //data property
    #errorMessage = 'We could not find that recipe. Please try another one!';
    #message = '';

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clear();
        // 3) insert here HTML into DOM with json HTML method on the parent element (for my case the class recipe) amd it is done inside render
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    //this method here will be usable for all the views as long as all the views have a parentElemnet property like this one #parentElement = document.querySelector('.recipe');

    #clear() {
        this.#parentElement.innerHTML = '';
    }


    //this is a method
    renderSpinner() {
        const markup = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div> 
        `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    };


    renderError(message = this.#errorMessage) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    renderMessage(message = this.#message) {
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }




    //private method because we are using Babel here we use this syntax
    #generateMarkup() {
       return ` <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          

          <!-- transform the array of strings into a single big string using the join method -->
          
          <ul class="recipe__ingredient-list">
            ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
          </ul>
        </div>


        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;

    }


    #generateMarkupIngredient(ing) {
        return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''} </div>
            <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
            </div>
        </li>
        `;
    }

    //method (not private)

        // window.addEventListener('hashchange', handler);
        // window.addEventListener('load', handler);


        // //if we copy the hash we need the below so not to see empty recipe
        //me syntomia grafoume ta parapano alla den paizei sosta se emena
        addHandlerRender(handler){
            ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
        }
    





}


export default new RecipeView();