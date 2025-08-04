const categoryList = document.getElementById("categoryList");
const allCategories = document.getElementById("allCategories");
const mealResults = document.getElementById("mealResults");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Load categories
async function loadCategories() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await res.json();

  categoryList.innerHTML = '';
  allCategories.innerHTML = '';

  data.categories.forEach(cat => {
    // Sidebar item
    const li = document.createElement("li");
    li.textContent = cat.strCategory;
    li.classList.add("py-2", "border-bottom");
    li.style.cursor = "pointer";
    li.addEventListener("click", () => fetchMealsByCategory(cat.strCategory));
    categoryList.appendChild(li);

    // Grid card
    const col = document.createElement("div");
    col.className = "col-md-3 col-sm-6 mb-4";

    col.innerHTML = `
      <div class="category-card" data-category="${cat.strCategory}">
        <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" />
        <div class="category-label">${cat.strCategory}</div>
      </div>
    `;

    col.querySelector('.category-card').addEventListener('click', () => fetchMealsByCategory(cat.strCategory));

    allCategories.appendChild(col);
  });
}

// Search meals
searchBtn.addEventListener("click", () => {
  const food = searchInput.value.trim();
  if (food !== "") {
    searchMeals(food);
  }
});

async function searchMeals(foodName) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
  const data = await res.json();
  renderMeals(data.meals || []);
}

// Get meals by category
async function fetchMealsByCategory(catName) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
  const data = await res.json();
  renderMeals(data.meals || []);
}

// Render meals
function renderMeals(meals) {
  mealResults.innerHTML = "";
  if (meals.length === 0) {
    mealResults.innerHTML = "<p class='text-danger'>No meals found.</p>";
    return;
  }

  meals.forEach(meal => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    col.innerHTML = `
      <div class="category-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="category-label">${meal.strMeal}</div>
      </div>
    `;

    mealResults.appendChild(col);
  });

  mealResults.scrollIntoView({ behavior: "smooth" });
}

// Load on start
loadCategories();
