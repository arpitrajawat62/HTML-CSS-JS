const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchRecipes = async(query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";
     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
     const response = await data.json();
     
     recipecontainer.innerHTML = "";
     response.meals.forEach(meal => {
           const recipeDiv = document.createElement('div');
           recipeDiv.classList.add('recipe');
           recipeDiv.innerHTML = `

             <img src="${meal.strMealThumb}">
             <h3>${meal.strMeal}</h3>
             <p>(${meal.strArea} Dish)</p>
             <p>Belongs to <span>${meal.strCategory}</span> Category</p>
              `
        
            const button = document.createElement('button');
            button.textContent = "view Recipe";
            recipeDiv.appendChild(button);

            // Adding EventListener to recipe button
            button.addEventListener('click',(e)=>{
              e.preventDefault();
              openRecipePopup(meal);
            });


            recipecontainer.appendChild(recipeDiv);

     });
}
const fetchIngrediants = (meal) => {
  let IngrediantsList = "";
  for (let i = 1; i <= 20; i++) { 
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      IngrediantsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return IngrediantsList;
};


const openRecipePopup = (meal) =>{
  recipeDetailsContent.innerHTML = `
    <h2><center>${meal.strMeal}<center> </h2>
    <h3>Ingrediants</h3>
    <ul>${fetchIngrediants(meal)}</ul>
    <div>
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
  `
 
  recipeDetailsContent.parentElement.classList.add('active');

}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});

