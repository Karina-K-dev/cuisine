const btnRandom = document.querySelector(".btn-success");
const btnSearch = document.querySelector(".search");
const recipeContainer = document.querySelector(".recipe-container");
const getRecipeData = (data) => {
  const ingredientsList = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data.meals[0][`strIngredient${i}`];
    const measure = data.meals[0][`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      const ingredientString = `${ingredient} ${measure}`.trim();
      ingredientsList.push(ingredientString);
    }
  }
  const recipeData = {
    name: data.meals[0].strMeal,
    country: data.meals[0].strArea,
    image: data.meals[0].strMealThumb,
    ingredientsList: ingredientsList,
    instructions: data.meals[0].strInstructions,
    youTube: data.meals[0].strYoutube,
  };
  return recipeData;
};

const getRecipe = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const recipeData = getRecipeData(data);
      renderRecipe(recipeData);
    });
};

btnRandom.addEventListener("click", (e) => getRecipe());

const renderRecipe = (data) => {
  const { name, country, image, youTube, ingredientsList, instructions } = data;

  const html = `
    <div class="recipe-container">
      <div><img src="${image}" alt="logo" class="main-img" /></div>
      <div>
        <h1 class="container">${name}</h1>
      </div>
      <div class="recipe-content container">
        <p>${country}</p>
        <a href="${youTube}" id="link" target="_blank">Watch</a> 
        <p>
        <ul id="ingredients">${ingredientsList
          .map((el) => `<li>${el}</li>`)
          .join("")}</ul>
        </p>

        <p id="instructions">${instructions}</p>
      </div>
    </div>
  `;
  recipeContainer.innerHTML = html;
};

const searchRecipe = (recipe) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    .then((res) => res.json())
    .then((data) => {
      const recipeData = getRecipeData(data);
      renderRecipe(recipeData);
    });
};

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  const searchValue = document.querySelector(".form-control").value;
  searchRecipe(searchValue);
});
