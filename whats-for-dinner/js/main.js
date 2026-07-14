//  Element References
var recipeImage = document.getElementById("recipe-image");
var ratingsAvg = document.getElementById("ratings-avg");
var ratingsQuantity = document.getElementById("ratings-quantity");
var prepTimeNumber = document.getElementById("prep-time-number");
var cookTimeNumber = document.getElementById("cook-time-number");
var servingsNumber = document.getElementById("servings-number");
var difficultyLevel = document.getElementById("difficulty-level");
var category = document.getElementById("category");
var recipeName = document.getElementById("recipe-name");
var recipeDescription = document.getElementById("recipe-description");

var timeWarning = document.getElementById("time-warning");
var ingredientsList = document.getElementById("ingredients-list");
var instructionsList = document.getElementById("instructions-list");
var tipsList = document.getElementById("tips-list");

var caloriesNumber = document.getElementById("calories-number");
var proteinNumber = document.getElementById("protein-number");
var carbohydratesNumber = document.getElementById("carbohydrates-number");
var fatNumber = document.getElementById("fat-number");
var fiberNumber = document.getElementById("fiber-number");
var sodiumNumber = document.getElementById("sodium-number");

//  Recipes Data
var recipesList = [
    // Chicken Stir-Fry
    {
        recipeImage_alt: "Quick and healthy stir-fry with colorful vegetables",
        recipeImage: "images/Chicken Stir-Fry1.jpg",
        prepTimeNumber: 15,
        cookTimeNumber: 15,
        servingsNumber: "4 people",
        ratingsAvg: 4.5,
        ratingsQuantity: 324,
        difficultyLevel: "Easy",
        category: "Asian",
        name: "Chicken Stir-Fry",
        description: "Quick and healthy stir-fry with colorful vegetables",
        ingredients: [
            "500g chicken breast, sliced",
            "2 bell peppers, sliced",
            "1 broccoli head, florets",
            "2 carrots, julienned",
            "3 tablespoons soy sauce",
            "2 tablespoons oyster sauce",
            "1 tablespoon sesame oil",
            "2 cloves garlic, minced",
            "Fresh ginger, grated",
        ],
        instructions: [
            "Mix soy sauce, oyster sauce, and sesame oil for the sauce.",
            "Heat wok over high heat with oil. Cook chicken until golden, remove and set aside.",
            "Add more oil if needed. Stir-fry garlic and ginger for 30 seconds.",
            "Add vegetables, starting with hardest ones (carrots, broccoli). Cook for 3-4 minutes.",
            "Return chicken to wok, add bell peppers and sauce. Toss for 2 minutes.",
            "Serve immediately over steamed rice or noodles.",
        ],
        nutrition: {
            calories: "320 kcal",
            protein: "34g",
            carbohydratesNumber: "18g",
            fat: "12g",
            fiber: "5g",
            sodium: "840mg",
        },
        tips: [
            "Cut all ingredients before starting to cook",
            "Keep heat high for authentic stir-fry texture",
            "Don't overcrowd the wok or vegetables will steam",
            "Add cashews or peanuts for extra crunch",
        ],
    },
    // Chicken Tikka Masala
    {
        name: "Chicken Tikka Masala",
        recipeImage_alt: "fresh chicken tikka masala served with rice, flavorful Indian curry",
        recipeImage: "images/Chicken Tikka Masala1.jpg",
        prepTimeNumber: 20,
        cookTimeNumber: 35,
        servingsNumber: "4 people",
        ratingsAvg: 4.7,
        ratingsQuantity: 180,
        difficultyLevel: "Medium",
        category: "Indian",
        description: "Tender chicken pieces cooked in a creamy spiced tomato sauce",
        ingredients: [
            "500g chicken breast, diced",
            "150g yogurt",
            "2 tbsp tikka masala spice mix",
            "1 onion, chopped",
            "3 garlic cloves, minced",
            "1 inch ginger, grated",
            "400g canned tomatoes",
            "200ml cream",
            "Salt and pepper",
            "Fresh coriander for garnish",
        ],
        instructions: [
            "Marinate chicken in yogurt and tikka masala spice mix for at least 30 minutes.",
            "Heat oil in a skillet and sauté onion, garlic, and ginger until fragrant.",
            "Add marinated chicken and cook until slightly browned.",
            "Pour in canned tomatoes and simmer for 15-20 minutes.",
            "Stir in cream and cook for another 5 minutes until sauce thickens.",
            "Garnish with fresh coriander and serve with rice or naan.",
        ],
        nutrition: {
            calories: "450 kcal",
            protein: "35g",
            carbohydratesNumber: "20g",
            fat: "25g",
            fiber: "3g",
            sodium: "700mg",
        },
        tips: [
            "Marinate chicken overnight for deeper flavor",
            "Use fresh spices for the best aroma",
            "Adjust cream for desired sauce richness",
            "Roast spices lightly before using to enhance flavor",
            "Use chicken thighs instead of breasts for juicier texture",
        ],
    },
    // Pad Thai
    {
        name: "Pad Thai",
        recipeImage_alt: "Popular Thai stir-fried noodles with shrimp and peanuts",
        recipeImage: "images/Pad Thai1.jpg",
        prepTimeNumber: 20,
        cookTimeNumber: 15,
        servingsNumber: "2 people",
        ratingsAvg: 4.8,
        ratingsQuantity: 445,
        difficultyLevel: "Intermediate",
        category: "Asian",
        description: "Popular Thai stir-fried noodles with shrimp and peanuts",
        ingredients: [
            "200g rice noodles",
            "200g shrimp, peeled",
            "2 eggs",
            "3 tablespoons tamarind paste",
            "2 tablespoons fish sauce",
            "1 tablespoon palm sugar",
            "Bean sprouts",
            "Crushed peanuts",
            "Lime wedges and cilantro",
        ],
        instructions: [
            "Soak rice noodles in warm water for 30 minutes. Drain and set aside.",
            "Mix tamarind paste, fish sauce, and palm sugar to make the sauce.",
            "Heat wok over high heat. Scramble eggs and set aside.",
            "Cook shrimp until pink. Add noodles and sauce, toss for 2-3 minutes.",
            "Add scrambled eggs and bean sprouts. Toss everything together.",
            "Serve topped with crushed peanuts, lime wedges, and cilantro.",
        ],
        nutrition: {
            calories: "540 kcal",
            protein: "32g",
            carbohydratesNumber: "62g",
            fat: "16g",
            fiber: "4g",
            sodium: "1120mg",
        },
        tips: [
            "Don't oversoak noodles or they'll be mushy",
            "Cook on high heat for authentic wok flavor",
            "Balance sweet, sour, and salty flavors",
            "Use a very hot wok for authentic stir-fry flavor",
            "Prepare all ingredients before starting to cook",
        ],
    },
    // BBQ Pulled Pork
    {
        name: "BBQ Pulled Pork",
        recipeImage_alt: "Slow-cooked tender pork in smoky barbecue sauce",
        recipeImage: "images/BBQ Pulled Pork1.jpg",
        prepTimeNumber: 15,
        cookTimeNumber: 240,
        servingsNumber: "4 people",
        ratingsAvg: 4.7,
        ratingsQuantity: 412,
        difficultyLevel: "Easy",
        category: "American",
        description: "Slow-cooked tender pork in smoky barbecue sauce",
        ingredients: [
            "1kg pork shoulder",
            "1 cup BBQ sauce",
            "1/2 cup apple cider vinegar",
            "2 tablespoons brown sugar",
            "1 tablespoon paprika",
            "1 tablespoon garlic powder",
            "Burger buns",
            "Coleslaw for serving",
        ],
        instructions: [
            "Mix paprika, garlic powder, brown sugar, salt and pepper. Rub all over pork shoulder.",
            "Place pork in slow cooker with apple cider vinegar and 1/2 cup water.",
            "Cook on low for 8 hours or high for 4 hours until meat is very tender.",
            "Remove pork and shred with two forks. Discard excess fat.",
            "Return shredded pork to slow cooker, mix with BBQ sauce.",
            "Serve on toasted buns with coleslaw on top.",
        ],
        nutrition: {
            calories: "620 kcal",
            protein: "48g",
            carbohydratesNumber: "52g",
            fat: "22g",
            fiber: "3g",
            sodium: "1180mg",
        },
        tips: [
            "Use pork shoulder for best results - it stays moist",
            "Let pork rest before shredding for juicier meat",
            "Make your own BBQ sauce for better flavor",
            "Leftovers freeze well for up to 3 months",
        ],
    },
    // Beef Tacos
    {
        name: "Beef Tacos",
        recipeImage_alt: "Flavorful Mexican tacos with seasoned ground beef",
        recipeImage: "images/Beef Tacos1.jpg",
        prepTimeNumber: 15,
        cookTimeNumber: 20,
        servingsNumber: "2 people",
        ratingsAvg: 4.6,
        ratingsQuantity: 278,
        difficultyLevel: "Easy",
        category: "American",
        description: "Flavorful Mexican tacos with seasoned ground beef",
        ingredients: [
            "500g ground beef",
            "8 taco shells",
            "1 onion, diced",
            "2 tablespoons taco seasoning",
            "Shredded lettuce",
            "Diced tomatoes",
            "Shredded cheddar cheese",
            "Sour cream",
            "Salsa",
        ],
        instructions: [
            "Heat a large skillet over medium-high heat. Cook ground beef until browned.",
            "Add diced onion and cook until softened, about 5 minutes",
            "Stir in taco seasoning and 1/2 cup water. Simmer for 10 minutes.",
            "Warm taco shells according to package directions.",
            "Fill each shell with seasoned beef.",
            "Top with lettuce, tomatoes, cheese, sour cream, and salsa. Serve immediately.",
        ],
        nutrition: {
            calories: "420 kcal",
            protein: "26g",
            carbohydratesNumber: "32g",
            fat: "20g",
            fiber: "4g",
            sodium: "780mg",
        },
        tips: [
            "Drain excess fat from beef for healthier tacos",
            "Warm shells in oven for better texture",
            "Prepare all toppings before cooking beef",
            "Use ground turkey for a lighter option",
        ],
    },
    // Shrimp Scampi
    {
        name: "Shrimp Scampi",
        recipeImage_alt: "Garlicky shrimp in white wine butter sauce",
        recipeImage: "images/Shrimp Scampi1.jpg",
        prepTimeNumber: 10,
        cookTimeNumber: 15,
        servingsNumber: "2 people",
        ratingsAvg: 4.8,
        ratingsQuantity: 256,
        difficultyLevel: "Easy",
        category: "Seafood",
        description: "Garlicky shrimp in white wine butter sauce",
        ingredients: [
            "400g large shrimp, peeled",
            "300g linguine pasta",
            "6 cloves garlic, minced",
            "1/2 cup white wine",
            "4 tablespoons butter",
            "2 tablespoons olive oil",
            "Fresh parsley, chopped",
            "Lemon juice and zest",
            "Red pepper flakes",
        ],
        instructions: [
            "Cook linguine according to package directions. Reserve 1 cup pasta water.",
            "Heat olive oil and 2 tablespoons butter in a large pan. Add garlic and red pepper flakes, cook for 1 minute.",
            "Add shrimp, cook until pink on both sides, about 3-4 minutes. Remove and set aside.",
            "Add white wine to pan, simmer for 2 minutes. Add remaining butter and lemon juice.",
            "Return shrimp to pan, add cooked pasta and toss. Add pasta water if needed.",
            "Garnish with parsley, lemon zest, and serve immediately.",
        ],
        nutrition: {
            calories: "520 kcal",
            protein: "36g",
            carbohydratesNumber: "54g",
            fat: "18g",
            fiber: "3g",
            sodium: "620mg",
        },
        tips: [
            "Don't overcook shrimp - they cook very quickly",
            "Toss pasta in sauce for maximum flavor absorption",
            "Add extra lemon for bright, fresh taste",
        ],
    },
    // Creamy Spaghetti Carbonara
    {
        name: "Creamy Spaghetti Carbonara",
        recipeImage_alt: "A classic Italian pasta dish with eggs, cheese, and pancetta",
        recipeImage: "images/Creamy Spaghetti Carbonara1.jpg",
        prepTimeNumber: 15,
        cookTimeNumber: 20,
        servingsNumber: "4 people",
        ratingsAvg: 4.8,
        ratingsQuantity: 234,
        difficultyLevel: "Easy",
        category: "Italian",
        description: "A classic Italian pasta dish with eggs, cheese, and pancetta",
        ingredients: [
            "400g spaghetti pasta",
            "200g pancetta or guanciale, diced",
            "4 large eggs",
            "100g Pecorino Romano cheese, grated",
            "50g Parmesan cheese, grated",
            "Freshly ground black pepper",
            "Salt for pasta water",
        ],
        instructions: [
            "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.",
            "While pasta cooks, heat a large skillet over medium heat. Add diced pancetta and cook until crispy, about 5-7 minutes.",
            "In a bowl, whisk together eggs, grated Pecorino Romano, and Parmesan cheese. Add plenty of freshly ground black pepper.",
            "Reserve 1 cup of pasta cooking water before draining. Drain pasta and immediately add to the skillet with pancetta.",
            "Remove skillet from heat. Quickly pour in egg mixture while tossing pasta vigorously. Add reserved pasta water as needed to create a creamy sauce.",
            "Serve immediately with extra cheese and black pepper on top. Enjoy your authentic carbonara!",
        ],
        nutrition: {
            calories: "520 kcal",
            protein: "28g",
            carbohydratesNumber: "62g",
            fat: "18g",
            fiber: "3g",
            sodium: "680mg",
        },
        tips: [
            "Use room temperature eggs for a smoother sauce consistency",
            "Work quickly when mixing eggs with hot pasta to avoid scrambling",
            "Reserve extra pasta water - it's the secret to perfect creaminess",
            "Freshly grated cheese makes all the difference in flavor",
            "Never add cream - authentic carbonara is made with eggs only",
        ],
    },
    // Thai Green Curry
    {
        name: "Thai Green Curry",
        recipeImage_alt: "Vibrant and aromatic curry with vegetables and coconut milk",
        recipeImage: "images/Thai Green Curry1.jpg",
        prepTimeNumber: 15,
        cookTimeNumber: 25,
        servingsNumber: "4 people",
        ratingsAvg: 4.7,
        ratingsQuantity: 312,
        difficultyLevel: "Intermediate",
        category: "Asian",
        description: "Vibrant and aromatic curry with vegetables and coconut milk",
        ingredients: [
            "2 tablespoons green curry paste",
            "400ml coconut milk",
            "300g chicken breast, sliced",
            "1 red bell pepper, sliced",
            "100g green beans",
            "1 eggplant, cubed",
            "2 tablespoons fish sauce",
            "1 tablespoon palm sugar",
            "Fresh Thai basil leaves",
        ],
        instructions: [
            "Heat a large pot or wok over medium heat. Add curry paste and cook for 1 minute until fragrant.",
            "Add half the coconut milk and stir to combine with the curry paste.",
            "Add sliced chicken and cook until no longer pink, about 5 minutes.",
            "Add remaining coconut milk, vegetables, fish sauce, and palm sugar.",
            "Simmer for 15-20 minutes until vegetables are tender and sauce has thickened.",
            "Stir in fresh Thai basil leaves. Serve hot with jasmine rice.",
        ],
        nutrition: {
            calories: "420 kcal",
            protein: "26g",
            carbohydratesNumber: "22g",
            fat: "26g",
            fiber: "5g",
            sodium: "890mg",
        },
        tips: [
            "Adjust spice level by using more or less curry paste",
            "Add vegetables in stages based on cooking time needed",
            "Fresh Thai basil is essential for authentic flavor",
            "Use full-fat coconut milk for richest, creamiest sauce",
        ],
    },
    // Greek Moussaka
    {
        name: "Greek Moussaka",
        recipeImage_alt: "Traditional layered eggplant casserole with lamb",
        recipeImage: "images/Greek Moussaka1.jpg",
        prepTimeNumber: 30,
        cookTimeNumber: 60,
        servingsNumber: "4 people",
        ratingsAvg: 4.8,
        ratingsQuantity: 234,
        difficultyLevel: "Intermediate",
        category: "Mediterranean",
        description: "Traditional layered eggplant casserole with lamb",
        ingredients: [
            "3 large eggplants, sliced",
            "500g ground lamb",
            "400g canned tomatoes",
            "1 onion, diced",
            "3 cloves garlic, minced",
            "500ml béchamel sauce",
            "100g parmesan cheese",
            "Cinnamon and oregano",
            "Olive oil",
        ],
        instructions: [
            "Slice eggplants, salt them, and let sit for 30 minutes. Rinse and pat dry",
            "Brush eggplant slices with olive oil, grill or bake until softened.",
            "Cook ground lamb with onion and garlic. Add tomatoes, cinnamon, oregano. Simmer 20 minutes.",
            "Preheat oven to 180°C (350°F).",
            "Layer in baking dish: eggplant, meat sauce, eggplant, meat sauce. Top with béchamel and parmesan.",
            "Bake for 45 minutes until golden. Let rest 15 minutes before serving.",
        ],
        nutrition: {
            calories: "580 kcal",
            protein: "36g",
            carbohydratesNumber: "32g",
            fat: "32g",
            fiber: "8g",
            sodium: "820mg",
        },
        tips: [
            "Salt eggplant to remove bitterness",
            "Don't skip the resting time - it helps set the layers",
            "Use ground beef if lamb is unavailable",
            "Make ahead and reheat for easier serving",
        ],
    },
    // Lasagna Bolognese
    {
        name: "Lasagna Bolognese",
        recipeImage_alt: "Layered Italian pasta with rich meat sauce and béchamel",
        recipeImage: "images/Lasagna Bolognese1.jpg",
        prepTimeNumber: 30,
        cookTimeNumber: 90,
        servingsNumber: "4 people",
        ratingsAvg: 4.9,
        ratingsQuantity: 478,
        difficultyLevel: "Intermediate",
        category: "Italian",
        description: "Layered Italian pasta with rich meat sauce and béchamel",
        ingredients: [
            "12 lasagna sheets",
            "500g ground beef",
            "400g canned tomatoes",
            "1 onion, diced",
            "2 carrots, diced",
            "500ml béchamel sauce",
            "200g mozzarella, grated",
            "100g parmesan cheese",
            "Fresh basil",
        ],
        instructions: [
            "Cook ground beef with onion and carrots until browned. Add tomatoes and simmer for 30 minutes.",
            "Cook lasagna sheets according to package directions. Drain and set aside.",
            "Preheat oven to 180°C (350°F).",
            "In a baking dish, layer: meat sauce, lasagna sheets, béchamel sauce. Repeat 3-4 times.",
            "Top final layer with béchamel, mozzarella, and parmesan cheese. Bake for 45 minutes.",
        ],
        nutrition: {
            calories: "680 kcal",
            protein: "42g",
            carbohydratesNumber: "58g",
            fat: "28g",
            fiber: "6g",
            sodium: "920mg",
        },
        tips: [
            "Make bolognese sauce a day ahead for better flavor",
            "Don't skip the resting time after baking",
            "Use fresh pasta sheets for best texture",
            "Freeze leftovers in individual portions",
        ],
    },
    // Teriyaki Chicken Bowl
    {
        name: "Teriyaki Chicken Bowl",
        recipeImage_alt: "Sweet and savory chicken over rice with vegetables",
        recipeImage: "images/Teriyaki Chicken Bowl1.jpg",
        prepTimeNumber: 15,
        cookTimeNumber: 20,
        servingsNumber: "2 people",
        ratingsAvg: 4.7,
        ratingsQuantity: 367,
        difficultyLevel: "Easy",
        category: "Asian",
        description: "Sweet and savory chicken over rice with vegetables",
        ingredients: [
            "400g chicken thighs, sliced",
            "1/2 cup teriyaki sauce",
            "2 cups cooked rice",
            "1 broccoli head, florets",
            "1 carrot, julienned",
            "Sesame seeds",
            "Green onions, sliced",
            "1 tablespoon sesame oil",
        ],
        instructions: [
            "Heat sesame oil in a pan. Cook chicken until browned on all sides.",
            "Add teriyaki sauce to chicken, simmer for 5 minutes until sauce thickens.",
            "Meanwhile, steam broccoli and carrots until tender-crisp.",
            "Divide rice between bowls.",
            "Top with teriyaki chicken and steamed vegetables.",
        ],
        nutrition: {
            calories: "540 kcal",
            protein: "42g",
            carbohydratesNumber: "58g",
            fat: "14g",
            fiber: "4g",
            sodium: "1240mg",
        },
        tips: [
            "Use chicken thighs for juicier meat",
            "Make homemade teriyaki sauce for better flavor control",
            "Add edamame for extra protein",
            "Meal prep by cooking rice and chicken ahead",
        ],
    },
    // Vegetable Curry
    {
        name: "Vegetable Curry",
        recipeImage_alt: "Hearty vegetarian curry with coconut milk",
        recipeImage: "images/Vegetable Curry1.jpg",
        prepTimeNumber: 20,
        cookTimeNumber: 30,
        servingsNumber: "4 people",
        ratingsAvg: 4.6,
        ratingsQuantity: 289,
        difficultyLevel: "Easy",
        category: "Asian",
        description: "Hearty vegetarian curry with coconut milk",
        ingredients: [
            "2 potatoes, cubed",
            "1 cauliflower, florets",
            "2 carrots, sliced",
            "1 can chickpeas",
            "400ml coconut milk",
            "3 tablespoons curry powder",
            "1 onion, diced",
            "3 cloves garlic, minced",
            "Fresh spinach",
        ],
        instructions: [
            "Heat oil in a large pot. Sauté onion until soft, add garlic and curry powder, cook for 1 minute.",
            "Add potatoes and carrots, cook for 5 minutes",
            "Pour in coconut milk and 1 cup water. Bring to simmer.",
            "Add cauliflower and chickpeas. Cook for 20 minutes until vegetables are tender.",
            "Stir in fresh spinach and cook until wilted.",
            "Serve hot over basmati rice or with naan bread.",
        ],
        nutrition: {
            calories: "380 kcal",
            protein: "14g",
            carbohydratesNumber: "48g",
            fat: "16g",
            fiber: "12g",
            sodium: "480mg",
        },
        tips: [
            "Add vegetables in order of cooking time needed",
            "Adjust curry powder amount to taste",
            "Use full-fat coconut milk for creamier curry",
            "Add protein like tofu or paneer if desired",
        ],
    },
    // Margherita Pizza
    {
        name: "Margherita Pizza",
        recipeImage_alt: "Classic Italian pizza with fresh mozzarella and basil",
        recipeImage: "images/Margherita Pizza1.jpg",
        prepTimeNumber: 90,
        cookTimeNumber: 12,
        servingsNumber: "2 people",
        ratingsAvg: 4.9,
        ratingsQuantity: 512,
        difficultyLevel: "Intermediate",
        category: "Italian",
        description: "Classic Italian pizza with fresh mozzarella and basil",
        ingredients: [
            "300g pizza dough",
            "200g crushed tomatoes",
            "250g fresh mozzarella",
            "Fresh basil leaves",
            "2 tablespoons olive oil",
            "2 cloves garlic, minced",
            "Salt and pepper to taste",
            "Parmesan cheese for topping",
        ],
        instructions: [
            "Let pizza dough come to room temperature and rest for 1 hour.",
            "Preheat oven to maximum temperature (usually 250°C/480°F).",
            "Mix crushed tomatoes with olive oil, garlic, salt, and pepper for the sauce.",
            "Roll out dough on a floured surface to desired thickness.",
            "Spread tomato sauce, add torn mozzarella pieces, and drizzle with olive oil.",
            "Bake for 10-12 minutes until crust is golden. Top with fresh basil and parmesan.",
        ],
        nutrition: {
            calories: "580 kcal",
            protein: "24g",
            carbohydratesNumber: "68g",
            fat: "22g",
            fiber: "4g",
            sodium: "920mg",
        },
        tips: [
            "Use a pizza stone for crispier crust",
            "Don't overload with toppings - less is more",
            "Add basil after baking to keep it fresh",
            "Let dough rest properly for best texture",
        ],
    },
    // Classic Beef Burger
    {
        name: "Classic Beef Burger",
        recipeImage_alt: "Juicy homemade burger with all the fixings",
        recipeImage: "images/Classic Beef Burger1.jpg",
        prepTimeNumber: 20,
        cookTimeNumber: 12,
        servingsNumber: "2 people",
        ratingsAvg: 4.9,
        ratingsQuantity: 512,
        difficultyLevel: "Easy",
        category: "American",
        description: "Juicy homemade burger with all the fixings",
        ingredients: [
            "500g ground beef (80/20)",
            "4 burger buns",
            "4 slices cheddar cheese",
            "Lettuce leaves",
            "Tomato slices",
            "Red onion, sliced",
            "Pickles",
            "Burger sauce or condiments",
        ],
        instructions: [
            "Divide ground beef into 4 equal portions. Form into patties, making a small indent in the center.",
            "Season patties generously with salt and pepper on both sides.",
            "Heat a grill or skillet over high heat. Cook patties for 4-5 minutes per side for medium.",
            "Add cheese slices in the last minute of cooking and cover to melt.",
            "Toast burger buns lightly on the grill or in a pan.",
            "Assemble burgers with lettuce, tomato, onion, pickles, and your favorite sauce.",
        ],
        nutrition: {
            calories: "650 kcal",
            protein: "38g",
            carbohydratesNumber: "42g",
            fat: "35g",
            fiber: "2g",
            sodium: "920mg",
        },
        tips: [
            "Don't press down on burgers while cooking - keeps them juicy",
            "Make indent in center to prevent burger from puffing up",
            "Let patties rest for 2-3 minutes before serving",
            "Toast buns for better texture and flavor",
        ],
    },
    // Mediterranean Quinoa Bowl
    {
        name: "Mediterranean Quinoa Bowl",
        recipeImage_alt: "Healthy bowl with quinoa, vegetables, and tahini dressing",
        recipeImage: "images/Mediterranean Quinoa Bowl1.jpg",
        prepTimeNumber: 20,
        cookTimeNumber: 35,
        servingsNumber: "2 people",
        ratingsAvg: 4.5,
        ratingsQuantity: 156,
        difficultyLevel: "Easy",
        category: "Mediterranean",
        description: "Healthy bowl with quinoa, vegetables, and tahini dressing",
        ingredients: [
            "1 cup quinoa",
            "Cherry tomatoes, halved",
            "Cucumber, diced",
            "Red onion, sliced",
            "Kalamata olives",
            "Feta cheese, crumbled",
            "Fresh parsley",
            "Tahini dressing",
        ],
        instructions: [
            "Rinse quinoa thoroughly. Cook according to package directions, usually 15 minutes.",
            "While quinoa cooks, prepare all vegetables and set aside.",
            "For tahini dressing: mix tahini, lemon juice, garlic, and water until smooth.",
            "Fluff cooked quinoa with a fork and let cool slightly.",
            "Arrange quinoa in bowls. Top with tomatoes, cucumber, onion, and olives.",
            "Sprinkle with feta cheese and fresh parsley. Drizzle with tahini dressing.",
        ],
        nutrition: {
            calories: "480 kcal",
            protein: "18g",
            carbohydratesNumber: "58g",
            fat: "20g",
            fiber: "10g",
            sodium: "540mg",
        },
        tips: [
            "Rinse quinoa well to remove bitter coating",
            "Let quinoa cool before adding fresh ingredients",
            "Make extra tahini dressing - it keeps well in the fridge",
            "Add grilled chicken or chickpeas for extra protein",
        ],
    },
];

//  State
var lastRecipeIndex = -1;

//  Helper Functions to build list HTML
function buildIngredientsHTML(ingredients) {
    var html = "";
    for (var i = 0; i < ingredients.length; i++) {
        html += `
        <li class="d-flex align-items-center">
            <div class="icon-container rounded-circle d-flex justify-content-center align-items-center">
                ${i + 1}
            </div>
            <span>${ingredients[i]}</span>
        </li>`;
    }
    return html;
}

function buildInstructionsHTML(instructions) {
    var html = "";
    for (var i = 0; i < instructions.length; i++) {
        html += `
        <li class="d-flex justify-content-start mb-4 align-items-center">
            <div class="icon-container d-flex justify-content-center align-items-center me-3">
                ${i + 1}
            </div>
            <p>${instructions[i]}</p>
        </li>`;
    }
    return html;
}

function buildTipsHTML(tips) {
    var html = "";
    for (var i = 0; i < tips.length; i++) {
        html += `
        <div class="d-flex justify-content-start align-items-center p-3">
            <i class="fa fa-circle-check"></i>
            <p>${tips[i]}</p>
        </div>`;
    }
    return html;
}

//  Display a Recipe
function displayRecipe(index) {
    var recipe = recipesList[index];

    recipeImage.src = recipe.recipeImage;
    recipeImage.alt = recipe.recipeImage_alt;

    ratingsAvg.textContent = recipe.ratingsAvg;
    ratingsQuantity.textContent = `(${recipe.ratingsQuantity} reviews)`;

    prepTimeNumber.textContent = recipe.prepTimeNumber + " min";
    cookTimeNumber.textContent = recipe.cookTimeNumber + " min";
    servingsNumber.textContent = recipe.servingsNumber;

    difficultyLevel.textContent = recipe.difficultyLevel;
    category.textContent = recipe.category;

    recipeName.textContent = recipe.name;
    recipeDescription.textContent = recipe.description;

    // Show & hide the "extended prep time" warning
    var totalTime = recipe.prepTimeNumber + recipe.cookTimeNumber;
    timeWarning.classList.toggle("d-none", totalTime <= 45);

    // Ingredients
    ingredientsList.innerHTML = buildIngredientsHTML(recipe.ingredients);

    // Instructions
    instructionsList.innerHTML = buildInstructionsHTML(recipe.instructions);

    // Nutrition
    caloriesNumber.textContent = recipe.nutrition.calories;
    proteinNumber.textContent = recipe.nutrition.protein;
    carbohydratesNumber.textContent = recipe.nutrition.carbohydratesNumber;
    fatNumber.textContent = recipe.nutrition.fat;
    fiberNumber.textContent = recipe.nutrition.fiber;
    sodiumNumber.textContent = recipe.nutrition.sodium;

    // Chef's tips
    tipsList.innerHTML = buildTipsHTML(recipe.tips);
}

//  Pick a Random Recipe (never the same twice in a row)
function showAnotherRecipe() {
    var currentRecipeIndex;
    do {
        currentRecipeIndex = Math.floor(Math.random() * recipesList.length);
    } while (currentRecipeIndex === lastRecipeIndex && recipesList.length > 1);

    lastRecipeIndex = currentRecipeIndex;
    displayRecipe(currentRecipeIndex);
}

showAnotherRecipe();