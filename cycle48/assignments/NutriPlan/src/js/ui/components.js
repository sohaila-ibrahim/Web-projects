import { extraIngredients, estimateNutrition } from "../api/mealdb.js";

// -------- بناء الكروت (HTML strings) --------

export function createRecipeCard(meal) {
  const instructions = meal.strInstructions ? meal.strInstructions.trim() : "";
  const description =
    instructions.length > 0
      ? instructions.slice(0, 100) + (instructions.length > 100 ? "..." : "")
      : "Delicious recipe to try!";

  return `
    <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${meal.idMeal}">
      <div class="relative h-48 overflow-hidden">
        <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
             src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy" />
        <div class="absolute bottom-3 left-3 flex gap-2">
          ${meal.strCategory ? `<span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">${meal.strCategory}</span>` : ""}
          ${meal.strArea ? `<span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">${meal.strArea}</span>` : ""}
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
          ${meal.strMeal}
        </h3>
        <p class="text-xs text-gray-600 mb-3 line-clamp-2">${description}</p>
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-gray-900">
            <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
            ${meal.strCategory || "Meal"}
          </span>
          <span class="font-semibold text-gray-500">
            <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
            ${meal.strArea || "-"}
          </span>
        </div>
      </div>
    </div>
  `;
}

// icon + color per category — these are all Tailwind utility classes,
// and they already exist in src/css/index.css (it's a full compiled
// Tailwind build), so nothing extra needs to be installed.
const categoryStyles = {
  Beef: {
    icon: "fa-drumstick-bite",
    card: "from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
    iconBg: "from-rose-400 to-red-500",
  },
  Chicken: {
    icon: "fa-drumstick-bite",
    card: "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
    iconBg: "from-orange-400 to-amber-500",
  },
  Dessert: {
    icon: "fa-ice-cream",
    card: "from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
    iconBg: "from-pink-400 to-rose-500",
  },
  Lamb: {
    icon: "fa-drumstick-bite",
    card: "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
    iconBg: "from-orange-400 to-amber-500",
  },
  Miscellaneous: {
    icon: "fa-bowl-rice",
    card: "from-gray-50 to-black-50 border-gray-200 hover:border-gray-600",
    iconBg: "from-gray-500 to-black-600",
  },
  Pasta: {
    icon: "fa-bowl-food",
    card: "from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-400",
    iconBg: "from-amber-400 to-yellow-500",
  },
  Pork: {
    icon: "fa-bacon",
    card: "from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
    iconBg: "from-rose-400 to-red-500",
  },
  Seafood: {
    icon: "fa-fish",
    card: "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400",
    iconBg: "from-blue-400 to-sky-500",
  },
  Side: {
    icon: "fa-solid fa-plate-wheat",
    card: "from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
    iconBg: "from-emerald-400 to-green-500",
  },
  Starter: {
    icon: "fa-utensils",
    card: "from-cyan-50 to-teal-50 border-cyan-200 hover:border-cyan-400",
    iconBg: "from-cyan-400 to-teal-500",
  },
  Vegan: {
    icon: "fa-leaf",
    card: "from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
    iconBg: "from-emerald-400 to-green-500",
  },
  Vegetarian: {
    icon: "fa-carrot",
    card: "from-lime-50 to-green-50 border-lime-200 hover:border-lime-400",
    iconBg: "from-lime-400 to-green-500",
  },
  Breakfast: {
    icon: "fa-egg",
    card: "from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-400",
    iconBg: "from-amber-400 to-yellow-500",
  },
  Goat: {
    icon: "fa-drumstick-bite",
    card: "from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
    iconBg: "from-rose-400 to-red-500",
  },
};

const defaultStyle = {
  icon: "fa-utensils",
  card: "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-400",
  iconBg: "from-emerald-400 to-green-500",
};

export function createCategoryCard(category) {
  const style = categoryStyles[category.strCategory] || defaultStyle;
  return `
    <div class="category-card bg-gradient-to-br ${style.card} rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group"
         data-category="${category.strCategory}">
      <div class="flex items-center gap-2.5">
        <div class="text-white w-9 h-9 bg-gradient-to-br ${style.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
          <i class="fa-solid ${style.icon}"></i>
        </div>
        <div class="min-w-0">
          <h3 class="text-sm font-bold text-gray-900 truncate">${category.strCategory}</h3>
        </div>
      </div>
    </div>
  `;
}

// pill button for the area/cuisine filter bar
function createAreaButton(label, area, isActive) {
  const classes = isActive
    ? "bg-emerald-600 text-white hover:bg-emerald-700"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
  return `
    <button
      class="area-filter-btn px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${classes}"
      data-area="${area}">
      ${label}
    </button>
  `;
}

// renders the "All Recipes" + all fetched areas as pills
export function renderAreaFilters(container, areas, activeArea = "all") {
  if (!container) return;
  const allBtn = createAreaButton("All cuisines", "all", activeArea === "all");
  const areaBtns = areas
    .map((area) => createAreaButton(area.strArea, area.strArea, area.strArea === activeArea))
    .join("");
  container.innerHTML = allBtn + areaBtns;
}

export function createLoadingSpinner() {
  return `
    <div class="col-span-full flex items-center justify-center py-16">
      <i class="fa-solid fa-spinner fa-spin text-3xl text-emerald-500"></i>
    </div>
  `;
}

export function createEmptyState(message, icon = "fa-inbox") {
  return `
    <div class="empty-state col-span-full text-center text-gray-500 py-16">
      <i class="fa-solid ${icon} text-5xl mb-4 text-gray-300"></i>
      <p class="font-medium">${message}</p>
    </div>
  `;
}

export function renderCards(container, items, cardCreatorFn) {
  if (!container) return;
  if (!items || items.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">مفيش نتائج تتعرض دلوقتي</p>`;
    return;
  }
  container.innerHTML = items.map(cardCreatorFn).join("");
}

// ----------------------------- Meal Details -----------------------------

/**
 * Renders the full meal-details page. Grabs everything it needs from the
 * DOM directly since these elements are unique (one details page at a time).
 */
export function renderMealDetails(meal) {
  const nutrition = estimateNutrition(meal);
  const ingredients = extraIngredients(meal);

  const heroImage = document.getElementById("meal-hero-image");
  const heroTitle = document.getElementById("meal-hero-title");
  const heroBadges = document.getElementById("meal-hero-badges");
  const heroServings = document.getElementById("hero-servings");
  const heroCalories = document.getElementById("hero-calories");
  const ingredientsList = document.getElementById("ingredients-list");
  const ingredientsCount = document.getElementById("ingredients-count");
  const instructionsList = document.getElementById("instructions-list");
  const videoSection = document.getElementById("video-section");
  const videoIframe = document.getElementById("meal-video-iframe");
  const nutritionContainer = document.getElementById("nutrition-facts-container");
  const logBtn = document.getElementById("log-meal-btn");

  if (heroImage) {
    heroImage.src = meal.strMealThumb;
    heroImage.alt = meal.strMeal;
  }
  if (heroTitle) heroTitle.textContent = meal.strMeal;
  if (heroBadges) {
    const tags = (meal.strTags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 2);
    const badgeColors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500"];
    const badges = [meal.strCategory, meal.strArea, ...tags].filter(Boolean);
    heroBadges.innerHTML = badges
      .map(
        (b, i) =>
          `<span class="px-3 py-1 ${badgeColors[i % badgeColors.length]} text-white text-sm font-semibold rounded-full">${b}</span>`,
      )
      .join("");
  }
  if (heroServings) heroServings.textContent = `${nutrition.servings} servings`;
  if (heroCalories) heroCalories.textContent = `${nutrition.calories} cal/serving`;

  if (logBtn) logBtn.dataset.mealId = meal.idMeal;

  // Ingredients
  if (ingredientsCount) ingredientsCount.textContent = `${ingredients.length} items`;
  if (ingredientsList) {
    ingredientsList.innerHTML = ingredients
      .map(
        (item) => `
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
            <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
            <span class="text-gray-700">
              ${item.measure ? `<span class="font-medium text-gray-900">${item.measure}</span>` : ""}
              ${item.ingredient}
            </span>
          </div>
        `,
      )
      .join("");
  }

  // Instructions
  if (instructionsList) {
    const steps = (meal.strInstructions || "")
      .split(/\r?\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    // if the source doesn't have line breaks, fall back to one big paragraph
    const finalSteps = steps.length > 1 ? steps : [meal.strInstructions || "No instructions provided."];
    instructionsList.innerHTML = finalSteps
      .map(
        (step, i) => `
          <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
              ${i + 1}
            </div>
            <p class="text-gray-700 leading-relaxed pt-2">${step}</p>
          </div>
        `,
      )
      .join("");
  }

  // Video
  if (videoIframe && videoSection) {
    const youtubeId = extractYoutubeId(meal.strYoutube);
    if (youtubeId) {
      videoIframe.src = `https://www.youtube.com/embed/${youtubeId}`;
      videoSection.style.display = "";
    } else {
      videoSection.style.display = "none";
    }
  }

  // Nutrition Facts
  if (nutritionContainer) {
    nutritionContainer.innerHTML = renderNutritionFacts(nutrition);
  }

  return { meal, nutrition, ingredients };
}

function extractYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

function renderNutritionFacts(nutrition) {
  const { calories, protein, carbs, fat, fiber, sugar, servings } = nutrition;
  const totalCalories = calories * servings;

  // rough % bars just for visual proportion, capped at 100%
  const bars = [
    {
      label: "Protein",
      value: protein,
      unit: "g",
      color: "emerald",
      pct: Math.min(100, Math.round((protein / 60) * 100)),
    },
    { label: "Carbs", value: carbs, unit: "g", color: "blue", pct: Math.min(100, Math.round((carbs / 100) * 100)) },
    { label: "Fat", value: fat, unit: "g", color: "purple", pct: Math.min(100, Math.round((fat / 50) * 100)) },
    { label: "Fiber", value: fiber, unit: "g", color: "orange", pct: Math.min(100, Math.round((fiber / 15) * 100)) },
    { label: "Sugar", value: sugar, unit: "g", color: "pink", pct: Math.min(100, Math.round((sugar / 30) * 100)) },
  ];

  return `
    <p class="text-sm text-gray-500 mb-4">Per serving</p>
    <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
      <p class="text-sm text-gray-600">Calories per serving</p>
      <p class="text-4xl font-bold text-emerald-600">${calories}</p>
      <p class="text-xs text-gray-500 mt-1">Total: ${totalCalories} cal</p>
    </div>
    <div class="space-y-4">
      ${bars
        .map(
          (b) => `
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-${b.color}-500"></div>
                <span class="text-gray-700">${b.label}</span>
              </div>
              <span class="font-bold text-gray-900">${b.value}${b.unit}</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-${b.color}-500 h-2 rounded-full" style="width: ${b.pct}%"></div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

// ----------------------------- Products -----------------------------

const nutriScoreColors = {
  a: "bg-green-500",
  b: "bg-lime-500",
  c: "bg-yellow-500",
  d: "bg-orange-500",
  e: "bg-red-500",
};

export function createProductCard(product) {
  const scoreColor = nutriScoreColors[product.nutriScore] || "bg-gray-400";
  const scoreLabel = product.nutriScore ? product.nutriScore.toUpperCase() : "?";
  const image = product.image || "https://placehold.co/300x300?text=No+Image";

  return `
    <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${product.barcode}">
      <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
             src="${image}" alt="${product.name}" loading="lazy"
             onerror="this.src='https://placehold.co/300x300?text=No+Image'" />
        <div class="absolute top-2 left-2 ${scoreColor} text-white text-xs font-bold px-2 py-1 rounded uppercase">
          Nutri-Score ${scoreLabel}
        </div>
        ${
          product.nova
            ? `<div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${product.nova}">${product.nova}</div>`
            : ""
        }
      </div>
      <div class="p-4">
        <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${product.brand}</p>
        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          ${product.name}
        </h3>
        <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span><i class="fa-solid fa-weight-scale mr-1"></i>${product.quantity || "N/A"}</span>
          <span><i class="fa-solid fa-fire mr-1"></i>${product.calories} kcal/100g</span>
        </div>
        <div class="grid grid-cols-4 gap-1 text-center mb-3">
          <div class="bg-emerald-50 rounded p-1.5">
            <p class="text-xs font-bold text-emerald-700">${product.protein}g</p>
            <p class="text-[10px] text-gray-500">Protein</p>
          </div>
          <div class="bg-blue-50 rounded p-1.5">
            <p class="text-xs font-bold text-blue-700">${product.carbs}g</p>
            <p class="text-[10px] text-gray-500">Carbs</p>
          </div>
          <div class="bg-purple-50 rounded p-1.5">
            <p class="text-xs font-bold text-purple-700">${product.fat}g</p>
            <p class="text-[10px] text-gray-500">Fat</p>
          </div>
          <div class="bg-orange-50 rounded p-1.5">
            <p class="text-xs font-bold text-orange-700">${product.sugar}g</p>
            <p class="text-[10px] text-gray-500">Sugar</p>
          </div>
        </div>
        <button class="log-product-btn w-full py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all" data-barcode="${product.barcode}">
          <i class="fa-solid fa-plus mr-1"></i>Log This Product
        </button>
      </div>
    </div>
  `;
}

// ----------------------------- Food Log -----------------------------

const typeIcons = {
  meal: "fa-utensils",
  product: "fa-barcode",
  custom: "fa-pencil",
};

// for log meal page ui
const typeLabels = {
  meal: "Recipe",
  product: "Product",
  custom: "Custom Entry",
};

export function createLoggedItemRow(entry) {
  const time = new Date(entry.loggedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const typeLabel = typeLabels[entry.type] || "Entry";
  const servingsText = entry.servings ? `${entry.servings} serving${entry.servings !== 1 ? "s" : ""} • ` : "";

  return `
    <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl" data-log-id="${entry.id}">
      <div class="w-11 h-11 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
        ${
          entry.image
            ? `<img src="${entry.image}" alt="${entry.name}" class="w-full h-full object-cover" onerror="this.remove()" />`
            : `<i class="fa-solid ${typeIcons[entry.type] || "fa-utensils"} text-gray-500"></i>`
        }
      </div>

      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-900 text-sm truncate">${entry.name}</p>
        <p class="text-xs text-gray-500 mb-1">${servingsText}<span class="text-emerald-600 font-medium">${typeLabel}</span></p>
        <p class="text-xs text-gray-400">${time}</p>
      </div>

      <div class="text-center shrink-0">
        <p class="text-lg font-bold text-emerald-600">${entry.calories}</p>
        <p class="text-xs text-gray-500">kcal</p>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">${entry.protein}g P</span>
        <span class="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded">${entry.carbs}g C</span>
        <span class="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded">${entry.fat}g F</span>
      </div>

      <button class="remove-log-btn text-gray-400 hover:text-red-500 transition-colors shrink-0" data-log-id="${entry.id}" title="Remove">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
}

export function renderLoggedItems(container, items) {
  if (!container) return;
  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No meals logged today</p>
        <p class="text-sm">Add meals from the Meals page or scan products</p>
      </div>
    `;
    return;
  }
  container.innerHTML = items.slice().reverse().map(createLoggedItemRow).join("");
}
