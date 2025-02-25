const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const recipiecontainer=document.querySelector('.recipies_container');
const pop=document.querySelector('.pop');
// const details=document.querySelector('.recipie');


 const fetchdata= async (value)=>{
    recipiecontainer.innerHTML=`<h2>Fetching for a recipes....</h2>`
    try {
     const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)    
     const response = await data.json();
     recipiecontainer.innerHTML=" ";
     response.meals.forEach(meal => {
        const mealInfo = document.createElement('div');
        mealInfo.classList.add('recipie');
        mealInfo.innerHTML = `
                  <img src="${meal.strMealThumb}" alt="">
                  <h2>${meal.strMeal}</h2>
                  <p>${meal.strArea}</p>
                  <p>${meal.strCategory}</p>
        
        `
         mealInfo.onclick=()=>show(meal)
        
        console.log(meal);
        
       recipiecontainer.append(mealInfo);
       
     });
    } catch (error) {
        recipiecontainer.innerHTML="<h2>Error in Fetching a recipe..</h2>"
    }
};
searchButton.addEventListener('click', (e) => {
    recipiecontainer.innerHTML=" ";
    e.preventDefault();
    const searchtxt=searchInput.value.trim();
    if(!searchtxt){
        recipiecontainer.innerHTML="<h2>Please enter recipe name..</h2>";
        return;
    }
    fetchdata(searchInput.value);
});
const show=(meal)=>{
    const tittle=document.querySelector('.tittle');
    const Ingredients=document.querySelector('.Ingredients');
    const instructions=document.querySelector('.Instructions')
    pop.style.display="block";
    tittle.innerHTML=`${meal.strMeal}`
    Ingredients.innerHTML=`<h2>Ingredients</h2>`
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    
    Ingredients.innerHTML = ingredientsList;
        instructions.innerHTML=`${meal.strInstructions}`;
       const close =document.querySelector('.close')
       close.onclick=()=>pop.style.display="none"
        window.onclick = event => {
            if (event.target === recipiecontainer) {
                pop.style.display = "none";
            }
        };
}
            

