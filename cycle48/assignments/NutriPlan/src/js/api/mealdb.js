const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const OFF_BASE = "https://world.openfoodfacts.org";

// fetch from TheMealDB api
async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("errorrrrrr:", error);
    return null;
  }
}

// api for categories
export async function getCategories() {
  const data = await fetchFromAPI("categories.php");
  return data?.categories || [];
}

// The normal endpoint is fast, but it does not reliably return meals when the
// user searches for a word in the middle of a meal name. Keep one catalogue
// cache as a fallback for those searches.
let mealsCataloguePromise = null;

async function getMealsCatalogue() {
  if (!mealsCataloguePromise) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    mealsCataloguePromise = Promise.all(letters.map((letter) => fetchFromAPI(`search.php?f=${letter}`))).then((responses) => {
      const byId = new Map();
      responses.flatMap((data) => data?.meals || []).forEach((meal) => byId.set(meal.idMeal, meal));
      return [...byId.values()];
    });
  }
  return mealsCataloguePromise;
}

// Search meal names. If the API has no match, search every cached meal name so
// words such as "halloumi" still return the matching recipe.
export async function searchMealsByName(query) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return [];

  const data = await fetchFromAPI(`search.php?s=${encodeURIComponent(normalizedQuery)}`);
  const directMatches = data?.meals || [];
  if (directMatches.length) return directMatches;

  const catalogue = await getMealsCatalogue();
  return catalogue.filter((meal) => meal.strMeal?.toLocaleLowerCase().includes(normalizedQuery));
}

// get list of all areas/cuisines
export async function getAreas() {
  const data = await fetchFromAPI("list.php?a=list");
  return data?.meals || [];
}

// filter by categories
export async function filterByCategory(category) {
  const data = await fetchFromAPI(`filter.php?c=${encodeURIComponent(category)}`);
  return data?.meals || [];
}

// filter by Area
export async function filterByArea(area) {
  const data = await fetchFromAPI(`filter.php?a=${encodeURIComponent(area)}`);
  return data?.meals || [];
}

// filter by Id
export async function filterById(id) {
  const data = await fetchFromAPI(`lookup.php?i=${encodeURIComponent(id)}`);
  return data?.meals?.[0] || null;
}

// get random meal
export async function getRandomMeal() {
  const data = await fetchFromAPI("random.php");
  return data?.meals?.[0] || null;
}

// get extra ingredients
export function extraIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return ingredients;
}

/**
 * TheMealDB doesn't provide any nutrition info, so we generate a
 * realistic-looking (but deterministic) nutrition profile per meal.
 * Same meal id will always produce the same numbers, so it stays
 * consistent between the recipe card, the details page and the food log.
 */
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function estimateNutrition(meal) {
  const idNum = parseInt(meal.idMeal, 10) || 1;

  const calories = Math.round(320 + seededRandom(idNum * 1.1) * 480); // 320-800
  const protein = Math.round(14 + seededRandom(idNum * 2.3) * 36); // 14-50
  const carbs = Math.round(18 + seededRandom(idNum * 3.7) * 62); // 18-80
  const fat = Math.round(6 + seededRandom(idNum * 5.9) * 32); // 6-38
  const fiber = Math.round(2 + seededRandom(idNum * 7.1) * 8); // 2-10
  const sugar = Math.round(3 + seededRandom(idNum * 9.3) * 22); // 3-25
  const servings = 2 + Math.floor(seededRandom(idNum * 4.2) * 4); // 2-5

  return { calories, protein, carbs, fat, fiber, sugar, servings };
}

// ------------------- Product Scanner (OpenFoodFacts) -------------------

// search products by name
export async function searchProducts(query) {
  try {
    const url = `${OFF_BASE}/cgi/search.pl?search_terms=${encodeURIComponent(
      query,
    )}&search_simple=1&action=process&json=1&page_size=24`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data?.products || [];
  } catch (error) {
    console.error("product search error:", error);
    return [];
  }
}

// look up a single product by its barcode
export async function lookupBarcode(barcode) {
  try {
    const response = await fetch(`${OFF_BASE}/api/v0/product/${encodeURIComponent(barcode)}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (data?.status === 1 && data.product) return data.product;
    return null;
  } catch (error) {
    console.error("barcode lookup error:", error);
    return null;
  }
}

// browse products by a known OpenFoodFacts category
export async function searchProductsByCategory(category) {
  try {
    const url = `${OFF_BASE}/category/${encodeURIComponent(category)}.json?page_size=24`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data?.products || [];
  } catch (error) {
    console.error("product category error:", error);
    return [];
  }
}

// normalizes a raw OpenFoodFacts product into the shape our UI/food log needs
export function normalizeProduct(product) {
  const nutriments = product.nutriments || {};
  return {
    barcode: product.code || product._id || "",
    name: product.product_name || product.generic_name || "Unnamed product",
    brand: (product.brands || "").split(",")[0].trim() || "Unknown brand",
    image: product.image_front_small_url || product.image_url || product.image_small_url || "",
    quantity: product.quantity || "",
    nutriScore: (product.nutrition_grades || product.nutriscore_grade || "").toLowerCase(),
    nova: product.nova_group || null,
    calories: Math.round(nutriments["energy-kcal_100g"] ?? nutriments["energy-kcal"] ?? 0),
    protein: Math.round((nutriments.proteins_100g ?? 0) * 10) / 10,
    carbs: Math.round((nutriments.carbohydrates_100g ?? 0) * 10) / 10,
    fat: Math.round((nutriments.fat_100g ?? 0) * 10) / 10,
    sugar: Math.round((nutriments.sugars_100g ?? 0) * 10) / 10,
  };
}
