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