// JavaScript code to handle search functionality
document.getElementById('searchBtn').addEventListener('click', function() {
    let searchText = document.getElementById('searchInput').value.trim();
    if (searchText !== '') {
        searchMeal(searchText);
    }
});
function searchMeal(keyword) {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMeals(data.meals);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
function displayMeals(meals) {
    let mealRow = document.getElementById('mealRow');
    mealRow.innerHTML = ''; // Clear previous results
    let showAllRow = document.getElementById('showAllRow');
    if (meals) {
        for (let i = 0; i < Math.min(meals.length, 3); i++) {
            let meal = meals[i];
            mealRow.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text collapsed">${meal.strInstructions}</p>
                            <button class="btn btn-primary btn-details">More Details</button>
                        </div>
                    </div>
                </div>
            `;
        }
        if (meals.length > 3) {
            showAllRow.style.display = 'block';
            document.getElementById('showAllBtn').addEventListener('click', function() {
                displayAllMeals(meals);
                showAllRow.style.display = 'none';
            });
        } else {
            showAllRow.style.display = 'none';
        }
    } else {
        mealRow.innerHTML = '<p class="col-12">No meals found.</p>';
        showAllRow.style.display = 'none';
    }
}

function displayAllMeals(meals) {
    let mealRow = document.getElementById('mealRow');
    mealRow.innerHTML = ''; // Clear previous results
    meals.forEach(meal => {
        mealRow.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text collapsed">${meal.strInstructions}</p>
                        <button class="btn btn-primary btn-details">More Details</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Add event listener to toggle the 'collapsed' class on card text
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-details')) {
        let cardText = e.target.previousElementSibling;
        cardText.classList.toggle('collapsed');
        if (cardText.classList.contains('collapsed')) {
            e.target.textContent = 'More Details';
        } else {
            e.target.textContent = 'Less Details';
        }
    }
});
