// JavaScript code to handle search functionality
document.getElementById('searchBtn').addEventListener('click', function() {
    let searchText = document.getElementById('searchInput').value.trim();
    if (searchText !== '') {
        searchMeal(searchText);
    }
});
