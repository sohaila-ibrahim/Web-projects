/**
 * NutriPlan - Main Entry Point
 */

import {
  getCategories,
  getAreas,
  filterByCategory,
  filterByArea,
  searchMealsByName,
  filterById,
  estimateNutrition,
  searchProducts,
  lookupBarcode,
  normalizeProduct,
} from "./api/mealdb.js";

import {
  getState,
  setAllMeals,
  setFilteredMeals,
  setCategories,
  setAreas,
  findMealInCache,
  setProducts,
  setActiveNutriScore,
  setCurrentPage,
  setSelectedMealId,
  setActiveCategory,
  setActiveArea,
  setSearchQuery,
  loadFoodLog,
  addToFoodLog,
  removeFromFoodLog,
  clearFoodLog,
  getTodayLog,
  getTodayTotals,
  getLast7DaysTotals,
} from "./state/appState.js";

import {
  renderCards,
  createRecipeCard,
  createCategoryCard,
  createLoadingSpinner,
  createEmptyState,
  renderAreaFilters,
  renderMealDetails,
  createProductCard,
  renderLoggedItems,
} from "./ui/components.js";

// ------------------------------------------------------------------
// Element refs
// ------------------------------------------------------------------
const recipesGrid = document.getElementById("recipes-grid");
const categoriesGrid = document.getElementById("categories-grid");
const recipesCountEl = document.getElementById("recipes-count");
const loadingOverlay = document.getElementById("app-loading-overlay");
const areaFiltersContainer = document.getElementById("area-filters");
const searchInput = document.getElementById("search-input");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

const pageTitleEl = document.getElementById("page-title");
const pageSubtitleEl = document.getElementById("page-subtitle");
const navLinks = document.querySelectorAll(".nav-link[data-page]");

const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const headerMenuBtn = document.getElementById("header-menu-btn");
const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

const backToMealsBtn = document.getElementById("back-to-meals-btn");
const logMealBtn = document.getElementById("log-meal-btn");

// products page
const productSearchInput = document.getElementById("product-search-input");
const searchProductBtn = document.getElementById("search-product-btn");
const barcodeInput = document.getElementById("barcode-input");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const productsGrid = document.getElementById("products-grid");
const productsCountEl = document.getElementById("products-count");
const nutriScoreButtons = document.querySelectorAll(".nutri-score-filter");
const productCategoryButtons = document.querySelectorAll(".product-category-btn");

// food log page
const foodlogDateEl = document.getElementById("foodlog-date");
const loggedItemsList = document.getElementById("logged-items-list");
const clearFoodLogBtn = document.getElementById("clear-foodlog");
const weeklyOverviewEl = document.getElementById("weekly-overview");
const weeklyAverageEl = document.getElementById("weekly-average");
const weeklyItemsEl = document.getElementById("weekly-items");
const weeklyGoalDaysEl = document.getElementById("weekly-goal-days");

// constants
const DEFAULT_CATEGORY = "Chicken";
const DEFAULT_MEALS_COUNT = 25;
const CATEGORIES_PREVIEW_COUNT = 12;
const DAILY_GOALS = { calories: 2000, protein: 50, carbs: 250, fat: 65 };
let searchDebounceTimer = null;

// ------------------------------------------------------------------
// Page routing
// ------------------------------------------------------------------
const PAGE_SECTIONS = {
  home: ["search-filters-section", "meal-categories-section", "all-recipes-section"],
  "meal-details": ["meal-details"],
  products: ["products-section"],
  foodlog: ["foodlog-section"],
};

const PAGE_TITLES = {
  home: ["Meals & Recipes", "Discover delicious and nutritious recipes tailored for you"],
  "meal-details": ["Recipe Details", "Everything you need to know about this recipe"],
  products: ["Product Scanner", "Search for packaged food products to view nutrition information"],
  foodlog: ["Food Log", "Track and monitor your daily nutrition intake"],
};
// function for routing
function pageFromHash(hash) {
  const route = hash.replace(/^#/, "");
  if (route.startsWith("meal/")) return "meal-details";
  if (route === "products") return "products";
  if (route === "foodlog") return "foodlog";
  return "home";
}

function hashFromPage(page, mealId) {
  if (page === "meal-details") return mealId ? `#meal/${mealId}` : "#home";
  if (page === "home") return "#home";
  return `#${page}`;
}

function mealIdFromHash(hash) {
  const match = hash.replace(/^#/, "").match(/^meal\/(.+)$/);
  return match ? match[1] : null;
}

function showSections(page) {
  const allSectionIds = Object.values(PAGE_SECTIONS).flat();
  allSectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  (PAGE_SECTIONS[page] || PAGE_SECTIONS.home).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = "";
  });
}

function updateHeader(page) {
  const [title, subtitle] = PAGE_TITLES[page] || PAGE_TITLES.home;
  if (pageTitleEl) pageTitleEl.textContent = title;
  if (pageSubtitleEl) pageSubtitleEl.textContent = subtitle;
}

function updateActiveNav(page) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.page === page || (page === "meal-details" && link.dataset.page === "home");
    link.classList.toggle("bg-emerald-50", isActive);
    link.classList.toggle("text-emerald-700", isActive);
    link.classList.toggle("text-gray-600", !isActive);
  });
}

async function renderPage(page, mealId) {
  showSections(page);
  updateHeader(page);
  updateActiveNav(page);
  setCurrentPage(page);
  closeSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (page === "meal-details" && mealId) {
    await openMealDetails(mealId);
  } else if (page === "products") {
    if (getState().products.length === 0) {
      productsGrid.innerHTML = createEmptyState("Search a product name or scan a barcode to get started", "fa-barcode");
    }
  } else if (page === "foodlog") {
    renderFoodLogPage();
  }
}

function navigateTo(page, { mealId, replace = false } = {}) {
  const hash = hashFromPage(page, mealId);
  const state = { page, mealId };
  if (replace) {
    history.replaceState(state, "", hash);
  } else if (location.hash !== hash) {
    history.pushState(state, "", hash);
  }
  renderPage(page, mealId);
}

window.addEventListener("popstate", (event) => {
  const page = event.state?.page || pageFromHash(location.hash);
  const mealId = event.state?.mealId || mealIdFromHash(location.hash);
  renderPage(page, mealId);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// ------------------------------------------------------------------
// Sidebar (mobile)
// ------------------------------------------------------------------
function openSidebar() {
  sidebar?.classList.add("open");
  sidebarOverlay?.classList.add("active");
}
function closeSidebar() {
  sidebar?.classList.remove("open");
  sidebarOverlay?.classList.remove("active");
}
headerMenuBtn?.addEventListener("click", openSidebar);
sidebarCloseBtn?.addEventListener("click", closeSidebar);
sidebarOverlay?.addEventListener("click", closeSidebar);

// ------------------------------------------------------------------
// Home page — meals, categories, areas, search
// ------------------------------------------------------------------
function updateRecipesCount(count) {
  if (recipesCountEl) recipesCountEl.textContent = `Showing ${count} recipe${count === 1 ? "" : "s"}`;
}

// filter.php (used by filterByCategory/filterByArea) only returns
// { idMeal, strMeal, strMealThumb } — no category/area/instructions.
// This fetches the full record for each meal so cards can show real
// data instead of falling back to placeholders.
async function enrichMeals(meals) {
  const fullMeals = await Promise.all(
    meals.map(async (meal) => {
      const full = await filterById(meal.idMeal);
      return full || meal; // if the lookup fails, keep the minimal data instead of losing the card
    }),
  );
  return fullMeals;
}

async function loadDefaultMeals() {
  recipesGrid.innerHTML = createLoadingSpinner();
  const meals = await filterByCategory(DEFAULT_CATEGORY);
  const first25 = meals.slice(0, DEFAULT_MEALS_COUNT);
  const enriched = await enrichMeals(first25);
  setAllMeals(enriched);
  renderCards(recipesGrid, enriched, createRecipeCard);
  updateRecipesCount(enriched.length);
}

async function loadCategories() {
  const categories = await getCategories();
  setCategories(categories);
  const preview = categories.slice(0, CATEGORIES_PREVIEW_COUNT);
  renderCards(categoriesGrid, preview, createCategoryCard);
}

async function loadAreas() {
  const areas = await getAreas();
  setAreas(areas);
  renderAreaFilters(areaFiltersContainer, areas, "all");
}

async function applyMealsFilter() {
  const { activeCategory, activeArea, searchQuery } = getState();
  recipesGrid.innerHTML = createLoadingSpinner();

  let meals = [];
  if (searchQuery.trim()) {
    meals = await searchMealsByName(searchQuery.trim()); // search.php already returns full meal objects
  } else if (activeCategory !== "all") {
    meals = await filterByCategory(activeCategory);
    meals = await enrichMeals(meals);
  } else if (activeArea !== "all") {
    meals = await filterByArea(activeArea);
    meals = await enrichMeals(meals);
  } else {
    meals = await filterByCategory(DEFAULT_CATEGORY);
    meals = meals.slice(0, DEFAULT_MEALS_COUNT);
    meals = await enrichMeals(meals);
  }

  setFilteredMeals(meals);
  setAllMeals(meals);

  if (!meals.length) {
    recipesGrid.innerHTML = createEmptyState("No recipes found — try a different search or filter", "fa-utensils");
  } else {
    renderCards(recipesGrid, meals, createRecipeCard);
  }
  updateRecipesCount(meals.length);
}

// search (debounced)
searchInput?.addEventListener("input", (e) => {
  clearTimeout(searchDebounceTimer);
  const value = e.target.value;
  searchDebounceTimer = setTimeout(() => {
    setSearchQuery(value);
    if (value.trim()) {
      setActiveCategory("all");
      setActiveArea("all");
      renderAreaFilters(areaFiltersContainer, getState().areas, "all");
    }
    applyMealsFilter();
  }, 400);
});

// category click (event delegation)
categoriesGrid?.addEventListener("click", (e) => {
  const card = e.target.closest(".category-card");
  if (!card) return;
  const category = card.dataset.category;
  setActiveCategory(category);
  setActiveArea("all");
  setSearchQuery("");
  if (searchInput) searchInput.value = "";
  renderAreaFilters(areaFiltersContainer, getState().areas, "all");
  applyMealsFilter();
  document.getElementById("all-recipes-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

// area pill click
areaFiltersContainer?.addEventListener("click", (e) => {
  const btn = e.target.closest(".area-filter-btn");
  if (!btn) return;
  const area = btn.dataset.area;
  setActiveArea(area);
  setActiveCategory("all");
  setSearchQuery("");
  if (searchInput) searchInput.value = "";
  renderAreaFilters(areaFiltersContainer, getState().areas, area);
  applyMealsFilter();
});

// recipe card click -> meal details
recipesGrid?.addEventListener("click", (e) => {
  const card = e.target.closest(".recipe-card");
  if (!card) return;
  navigateTo("meal-details", { mealId: card.dataset.mealId });
});

// ------------------------------------------------------------------
// Grid / List view toggle
// ------------------------------------------------------------------
const ACTIVE_VIEW_BTN_CLASSES = ["bg-white", "rounded-md", "shadow-sm"];

function setRecipesView(mode) {
  const isList = mode === "list";
  recipesGrid?.classList.toggle("list-view", isList);

  // active button gets the white pill background, the other loses it
  ACTIVE_VIEW_BTN_CLASSES.forEach((c) => {
    gridViewBtn?.classList.toggle(c, !isList);
    listViewBtn?.classList.toggle(c, isList);
  });

  const gridIcon = gridViewBtn?.querySelector("i");
  const listIcon = listViewBtn?.querySelector("i");
  gridIcon?.classList.toggle("text-gray-700", !isList);
  gridIcon?.classList.toggle("text-gray-500", isList);
  listIcon?.classList.toggle("text-gray-700", isList);
  listIcon?.classList.toggle("text-gray-500", !isList);
}

gridViewBtn?.addEventListener("click", () => setRecipesView("grid"));
listViewBtn?.addEventListener("click", () => setRecipesView("list"));

// ------------------------------------------------------------------
// Meal Details page
// ------------------------------------------------------------------
async function openMealDetails(mealId) {
  setSelectedMealId(mealId);
  let meal = findMealInCache(mealId);
  if (!meal) {
    meal = await filterById(mealId);
  }
  if (!meal) {
    Swal.fire({ icon: "error", title: "Recipe not found", text: "We couldn't load this recipe." });
    navigateTo("home", { replace: true });
    return;
  }
  renderMealDetails(meal);
}

backToMealsBtn?.addEventListener("click", () => navigateTo("home"));

logMealBtn?.addEventListener("click", async () => {
  const mealId = logMealBtn.dataset.mealId;
  let meal = findMealInCache(mealId);
  if (!meal) meal = await filterById(mealId);
  if (!meal) return;

  const nutrition = estimateNutrition(meal);

  const result = await Swal.fire({
    html: `
      <div class="text-left">
        <div class="flex items-center gap-3 mb-5">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-14 h-14 rounded-xl object-cover" />
          <div>
            <h3 class="text-lg font-bold text-gray-900">Log This Meal</h3>
            <p class="text-sm text-gray-500">${meal.strMeal}</p>
          </div>
        </div>

        <p class="font-semibold text-gray-900 mb-2">Number of Servings</p>
        <div class="flex items-center gap-3 mb-5">
          <button type="button" id="servings-minus"
            class="w-10 h-10 rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors">-</button>
          <input id="servings-input" type="text" value="1" readonly
            class="w-16 h-10 text-center border border-gray-200 rounded-lg font-bold text-gray-900" />
          <button type="button" id="servings-plus"
            class="w-10 h-10 rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors">+</button>
        </div>

        <div class="bg-emerald-50 rounded-xl p-4">
          <p class="text-sm text-gray-600 mb-3">Estimated nutrition per serving:</p>
          <div class="grid grid-cols-4 gap-2 text-center">
            <div>
              <p class="font-bold text-emerald-600">${nutrition.calories}</p>
              <p class="text-xs text-gray-500">Calories</p>
            </div>
            <div>
              <p class="font-bold text-blue-600">${nutrition.protein}g</p>
              <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div>
              <p class="font-bold text-amber-600">${nutrition.carbs}g</p>
              <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div>
              <p class="font-bold text-purple-600">${nutrition.fat}g</p>
              <p class="text-xs text-gray-500">Fat</p>
            </div>
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    // 2 buttons for cancle and log meal
    cancelButtonText: "Cancel",
    confirmButtonText: '<i class="fa-solid fa-clipboard-list "></i> Log Meal',

    buttonsStyling: false,
    reverseButtons: true,
    focusConfirm: false,
    customClass: {
      popup: "rounded-2xl !p-6",
      confirmButton:
        "flex-1 whitespace-nowrap inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all",
      cancelButton:
        "flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-all",
      actions: "w-full gap-3",
    },
    didOpen: () => {
      const input = document.getElementById("servings-input");
      // number of servings increase or decrease by 0.5
      document.getElementById("servings-minus")?.addEventListener("click", () => {
        input.value = Math.max(1, parseFloat(input.value, 10) - 0.5).toFixed(1);
      });
      document.getElementById("servings-plus")?.addEventListener("click", () => {
        input.value = (parseFloat(input.value, 10) + 0.5).toFixed(1);
      });
    },
    preConfirm: () => parseFloat(document.getElementById("servings-input").value, 10) || 1,
  });

  if (!result.isConfirmed) return;
  const servings = result.value;

  addToFoodLog({
    type: "meal",
    name: meal.strMeal,
    image: meal.strMealThumb,
    servings,
    calories: nutrition.calories * servings,
    protein: nutrition.protein * servings,
    carbs: nutrition.carbs * servings,
    fat: nutrition.fat * servings,
  });

  Swal.fire({
    icon: "success",
    title: "Meal Logged!",
    html: `
    <p> ${meal.strMeal} (${servings} serving${servings !== 1 ? "s" : ""}) was added to today's food log. </p>
    <p class =" text-emerald-600 font-bold text-lg mt-3"> +${Math.round(nutrition.calories * servings)} calories</p>
    `,
    timer: 1600,
    showConfirmButton: false,
  });
});

// ------------------------------------------------------------------
// Product Scanner page
// ------------------------------------------------------------------
function updateProductsCount(count, label) {
  if (!productsCountEl) return;
  productsCountEl.textContent = label || `Showing ${count} product${count === 1 ? "" : "s"}`;
}

function applyNutriScoreFilter(products) {
  const { activeNutriScore } = getState();
  if (!activeNutriScore) return products;
  return products.filter((p) => p.nutriScore === activeNutriScore);
}

function renderProducts() {
  const filtered = applyNutriScoreFilter(getState().products);
  if (!filtered.length) {
    productsGrid.innerHTML = createEmptyState("No products match this filter", "fa-barcode");
  } else {
    renderCards(productsGrid, filtered, createProductCard);
  }
  updateProductsCount(filtered.length);
}

async function runProductSearch(query) {
  if (!query || !query.trim()) return;
  productsGrid.innerHTML = createLoadingSpinner();
  updateProductsCount(0, "Searching...");
  const rawProducts = await searchProducts(query.trim());
  const normalized = rawProducts.map(normalizeProduct).filter((p) => p.name && p.name !== "Unnamed product");
  setProducts(normalized);
  renderProducts();
}

searchProductBtn?.addEventListener("click", () => runProductSearch(productSearchInput.value));
productSearchInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runProductSearch(productSearchInput.value);
});

lookupBarcodeBtn?.addEventListener("click", async () => {
  const code = barcodeInput.value.trim();
  if (!code) return;
  productsGrid.innerHTML = createLoadingSpinner();
  updateProductsCount(0, "Looking up barcode...");
  const product = await lookupBarcode(code);
  if (!product) {
    setProducts([]);
    productsGrid.innerHTML = createEmptyState("No product found for this barcode", "fa-barcode");
    updateProductsCount(0);
    return;
  }
  setProducts([normalizeProduct(product)]);
  renderProducts();
});
barcodeInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") lookupBarcodeBtn.click();
});

nutriScoreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveNutriScore(btn.dataset.grade || "");
    nutriScoreButtons.forEach((b) => {
      b.classList.remove("bg-emerald-600", "text-white");
      b.classList.add("bg-gray-100", "text-gray-700");
    });
    btn.classList.remove("bg-gray-100", "text-gray-700");
    btn.classList.add("bg-emerald-600", "text-white");
    renderProducts();
  });
});

productCategoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const label = btn.textContent.trim();
    productSearchInput.value = label;
    runProductSearch(label);
  });
});

productsGrid?.addEventListener("click", (e) => {
  const logBtn = e.target.closest(".log-product-btn");
  if (!logBtn) return;
  const barcode = logBtn.dataset.barcode;
  const product = getState().products.find((p) => p.barcode === barcode);
  if (!product) return;

  addToFoodLog({
    type: "product",
    name: product.name,
    image: product.image,
    calories: product.calories,
    protein: product.protein,
    carbs: product.carbs,
    fat: product.fat,
  });

  Swal.fire({
    icon: "success",
    title: "Product logged!",
    text: `${product.name} was added to today's food log.`,
    timer: 1600,
    showConfirmButton: false,
  });
});

// ------------------------------------------------------------------
// Food Log page
// ------------------------------------------------------------------
function updateFoodLogDate() {
  if (!foodlogDateEl) return;
  foodlogDateEl.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function updateProgressBars(totals) {
  const map = [
    { key: "calories", unit: "kcal" },
    { key: "protein", unit: "g" },
    { key: "carbs", unit: "g" },
    { key: "fat", unit: "g" },
  ];
  const cards = document.querySelectorAll("#foodlog-today-section .grid.grid-cols-1 > div");
  cards.forEach((card, i) => {
    const { key, unit } = map[i] || {};
    if (!key) return;
    const goal = DAILY_GOALS[key];
    const value = Math.round(totals[key]);
    const pct = Math.min(100, Math.round((value / goal) * 100));
    const label = card.querySelector("span.text-sm.text-gray-500");
    const fillBar = card.querySelector(".rounded-full.h-2\\.5 > div");
    if (label) label.textContent = `${value} / ${goal} ${unit}`;
    if (fillBar) fillBar.style.width = `${pct}%`;
  });
}

function renderFoodLogPage() {
  updateFoodLogDate();
  const todayItems = getTodayLog();
  const totals = getTodayTotals();

  updateProgressBars(totals);
  renderLoggedItems(loggedItemsList, todayItems);

  const countHeading = document.querySelector("#foodlog-today-section h4");
  if (countHeading) countHeading.textContent = `Logged Items (${todayItems.length})`;
  if (clearFoodLogBtn) clearFoodLogBtn.style.display = todayItems.length ? "" : "none";

  renderWeeklyChart();
}

function renderWeeklyChart() {
  if (!weeklyOverviewEl) return;

  const days = getLast7DaysTotals();

  weeklyOverviewEl.innerHTML = days
    .map((day, index) => {
      const dayNumber = new Date(`${day.date}T00:00:00`).getDate();
      const isToday = index === days.length - 1;
      const valueClass = day.calories > 0 ? "text-emerald-600" : "text-gray-300";

      return `
        <div class="text-center ${isToday ? "bg-indigo-100 rounded-xl" : ""}">
          <p class="text-xs text-gray-500 mb-1">${day.label}</p>
          <p class="text-sm font-medium text-gray-900">${dayNumber}</p>

          <div class="mt-2 ${valueClass}">
            <p class="text-lg font-bold">${Math.round(day.calories)}</p>
            <p class="text-xs">kcal</p>
          </div>
        </div>
      `;
    })
    .join("");

  const weeklyTotal = days.reduce((sum, day) => sum + day.calories, 0);

  const weeklyItems = getState().foodLog.filter((item) => days.some((day) => day.date === item.date)).length;

  const daysOnGoal = days.filter((day) => day.calories >= DAILY_GOALS.calories).length;

  weeklyAverageEl.textContent = `${Math.round(weeklyTotal / 7)} kcal`;
  weeklyItemsEl.textContent = `${weeklyItems} item${weeklyItems === 1 ? "" : "s"}`;
  weeklyGoalDaysEl.textContent = `${daysOnGoal} / 7`;
}

clearFoodLogBtn?.addEventListener("click", () => {
  Swal.fire({
    icon: "warning",
    title: "Clear all logged items?",
    text: "This will remove every meal and product logged so far. This can't be undone.",
    showCancelButton: true,
    confirmButtonText: "Yes, clear it",
    confirmButtonColor: "#dc2626",
  }).then((result) => {
    if (result.isConfirmed) {
      clearFoodLog();
      renderFoodLogPage();
    }
  });
});

loggedItemsList?.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".remove-log-btn");
  if (!removeBtn) return;
  removeFromFoodLog(removeBtn.dataset.logId);
  renderFoodLogPage();
});

function openCustomEntryModal() {
  Swal.fire({
    title: "Add Custom Food",
    html: `
      <input id="ce-name" class="swal2-input" placeholder="Food name">
      <input id="ce-calories" type="number" min="0" class="swal2-input" placeholder="Calories (kcal)">
      <input id="ce-protein" type="number" min="0" class="swal2-input" placeholder="Protein (g)">
      <input id="ce-carbs" type="number" min="0" class="swal2-input" placeholder="Carbs (g)">
      <input id="ce-fat" type="number" min="0" class="swal2-input" placeholder="Fat (g)">
    `,
    confirmButtonText: "Add to log",
    confirmButtonColor: "#7c3aed",
    showCancelButton: true,
    preConfirm: () => {
      const name = document.getElementById("ce-name").value.trim();
      if (!name) {
        Swal.showValidationMessage("Please enter a food name");
        return false;
      }
      return {
        name,
        calories: Number(document.getElementById("ce-calories").value) || 0,
        protein: Number(document.getElementById("ce-protein").value) || 0,
        carbs: Number(document.getElementById("ce-carbs").value) || 0,
        fat: Number(document.getElementById("ce-fat").value) || 0,
      };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      addToFoodLog({ type: "custom", ...result.value });
      renderFoodLogPage();
      Swal.fire({ icon: "success", title: "Added!", timer: 1200, showConfirmButton: false });
    }
  });
}

// ------------------------------------------------------------------
// App entry point
// ------------------------------------------------------------------
async function initApp() {
  loadFoodLog();

  await Promise.all([loadDefaultMeals(), loadCategories(), loadAreas()]);

  const initialPage = pageFromHash(location.hash);
  const initialMealId = mealIdFromHash(location.hash);
  navigateTo(initialPage, { mealId: initialMealId, replace: true });

  if (loadingOverlay) {
    loadingOverlay.style.display = "none";
  }
}

initApp();
