const mealsEl = document.getElementById("meals");
const search = document.getElementById("search");
const searchTerm = document.getElementById("searchTerm");
const mealPopup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

const favItems = document.getElementById("fav-meals");
const mealInfoEl = document.getElementById("meal-info");
getRandomMeal();
fetchFavMeals();
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const respData = await resp.json();
  // console.log(respData);
  const randomMeal = respData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  console.log(respData);
  const meal = respData.meals[0];
  return meal;
}

async function getMealBySearch(word) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + word
  );
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}
function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = ` 
    <div class="meal-header">
    ${random ? `<span class="random">Random Recipe</span>` : ""}
        <img src='${mealData.strMealThumb}' alt="${mealData.strMeal}" />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="btn-change"><i class="fas fa-heart"></i></button>
    </div>`;
  const btn = meal.querySelector(".meal-body .btn-change");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLs(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealFLs(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
  });
  meal.addEventListener("click", () => {
    updateInfo(mealData);
  });

  mealsEl.appendChild(meal);
}
function addMealFLs(mealId) {
  const mealIds = getMealsLs();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}
function removeMealLs(mealId) {
  const mealIds = getMealsLs();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}
function getMealsLs() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  favItems.innerHTML = "";
  const mealIds = getMealsLs();
  const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealToFav(meal);
  }
}
function addMealToFav(mealData, random = false) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `

  <img src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}" /><span>${mealData.strMeal}</span>
      <button class="clear"><i class="fas fa-times"></i></button>
`;
  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLs(mealData.idMeal);
    fetchFavMeals();
  });
  favMeal.addEventListener("click", () => {
    updateInfo(mealData);
  });
  favItems.appendChild(favMeal);
}
function updateInfo(mealData) {
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");
  const ingredient = [];
  for (let i = 0; i <= 20; i++) {
    if (mealData["strIngredient" + 1]) {
      ingredient.push(
        `${mealData["strIngr022edient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  mealEl.innerHTML = ` <h1>${mealData.strMeal}</h1>
<img src='${mealData.strMealThumb}' alt="">


<p>${mealData.strInstructions}</p>
<h3>Ingredient:</h3>
<ul>${ingredient.map((ing) => `<li>${ing}</li>`).join("")}</ul>
`;
  mealInfoEl.appendChild(mealEl);
  mealPopup.classList.remove("hidden");
}
search.addEventListener("click", async () => {
  mealsEl.innerHTML = "";
  const searchItem = searchTerm.value;
  const meals = await getMealBySearch(searchItem);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});
closePopup.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});


function showTime(){
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var date = d.getDate();
  var day =d.getDay();
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  
  

  switch(month){
    case 0:
    month="January";
    break;
    case 1:
    month="February";
    break;
    case 2:
    month="March";
    break;
    case 3:
    month="April";
    break;
    case 4:
    month="May"
    break;
    case 5:
    month="June"
    break;
    case 6:
    month="July"
    break;
    case 7:
    month="August"
    break;
    case 8:
    month="September"
    break;
    case 9:
    month="October"
    break;
    case 10:
    month="November"
    break;
    case 11:
    month="December"
    break;
    default:
    }

    switch(day){
      case 0:
      day="Monday";
      break;
      case 1:
      day="Tuesday";
      break;
      case 2:
      day="Wednesday";
      break;
      case 3:
      day="Thursday";
      break;
      case 4:
      day="Friday";
      break;
      case 5:
      day="Saturday";
      break;
      case 6:
      day="Sunday";
      break;
      default:
      }

var MV = "AM";
if(hour == 12){
MV = "PM";
}
if(hour > 12){
hour = hour % 12;
MV = "PM";
}
hour = ("0" + hour).slice(-2);
min = ("0" + min).slice(-2);
sec = ("0" + sec).slice(-2);

document.getElementById("clock").innerHTML = "<b>Today is:</b> "+day+" "+date+"th  "+month+" "+year+", "+hour+":"+min+":"+sec+" "+MV;

}
setInterval(showTime,1000);