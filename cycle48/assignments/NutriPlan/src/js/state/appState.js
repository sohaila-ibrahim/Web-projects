// for store data in a single place

const state = {
  // for 25 meals
  allMeals: [],
  // that is will show after search and filter
  filteredMeals: [],
  // for categories
  categories: [],
  areas: [],

  currentPage: "home",
  selectedMealId: null,
  activeCategory: "all",
  activeArea: "all",
  searchQuery: "",

  products: [],
  activeNutriScore: "",

  foodLog: [],
};

// Getters
export function getState() {
  return state;
}

// Meals
export function setAllMeals(meals) {
  state.allMeals = meals;
  state.filteredMeals = meals;
}

export function setFilteredMeals(meals) {
  state.filteredMeals = meals;
}

export function setCategories(categories) {
  state.categories = categories;
}

export function setAreas(areas) {
  state.areas = areas;
}

// finds a meal we already fetched (used so the details page doesn't
// have to hit the API again if we already have the data client-side)
export function findMealInCache(id) {
  return state.allMeals.find((meal) => meal.idMeal === id) || null;
}

// Products
export function setProducts(products) {
  state.products = products;
}

export function setActiveNutriScore(grade) {
  state.activeNutriScore = grade;
}

// Navigation
export function setCurrentPage(page) {
  state.currentPage = page;
}

export function setSelectedMealId(id) {
  state.selectedMealId = id;
}

export function setActiveCategory(category) {
  state.activeCategory = category;
}

export function setActiveArea(area) {
  state.activeArea = area;
}

export function setSearchQuery(query) {
  state.searchQuery = query;
}

// ----------------------- Food Log (localStorage) -----------------------
const FOOD_LOG_KEY = "nutriplan_food_log";

function todayKey(date = new Date()) {
  // local YYYY-MM-DD (avoids UTC day-shift issues from toISOString)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function persistFoodLog() {
  localStorage.setItem(FOOD_LOG_KEY, JSON.stringify(state.foodLog));
}

export function loadFoodLog() {
  const saved = localStorage.getItem(FOOD_LOG_KEY);
  try {
    state.foodLog = saved ? JSON.parse(saved) : [];
  } catch {
    state.foodLog = [];
  }
  return state.foodLog;
}

// item: { type: 'meal' | 'product' | 'custom', name, image, calories, protein, carbs, fat }
export function addToFoodLog(item) {
  const entry = {
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    date: todayKey(),
    loggedAt: new Date().toISOString(),
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    ...item,
  };
  state.foodLog.push(entry);
  persistFoodLog();
  return entry;
}

export function removeFromFoodLog(logId) {
  state.foodLog = state.foodLog.filter((item) => item.id !== logId);
  persistFoodLog();
}

export function clearFoodLog() {
  state.foodLog = [];
  localStorage.removeItem(FOOD_LOG_KEY);
}

export function getTodayLog() {
  const key = todayKey();
  return state.foodLog.filter((item) => item.date === key);
}

export function getTodayTotals() {
  return getTodayLog().reduce(
    (totals, item) => {
      totals.calories += Number(item.calories) || 0;
      totals.protein += Number(item.protein) || 0;
      totals.carbs += Number(item.carbs) || 0;
      totals.fat += Number(item.fat) || 0;
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

// last 7 days of calories, oldest -> newest, for the weekly chart
export function getLast7DaysTotals() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = todayKey(d);
    const dayItems = state.foodLog.filter((item) => item.date === key);
    const calories = dayItems.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
    days.push({
      date: key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      calories,
    });
  }
  return days;
}
