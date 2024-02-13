// let & const //
const apiKey = '99ba230a'
const mainContainer = document.getElementById("main-container")
const watchlistBtn = document.getElementById("watchlist-btn")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")


// Arrays //
// index.html
let moviesArray = []
// watchlist.html
let imdbIdArray = []


// Event listeners //
// Handle add to watchlist & save imdbIDs array on localStorage
document.addEventListener("click", function(e){
    if(e.target.dataset.movie && !imdbIdArray.includes(e.target.dataset.movie)){
        imdbIdArray.push(e.target.dataset.movie)
        localStorage.setItem("imdbIDsArray", JSON.stringify(imdbIdArray))
        console.log(imdbIdArray)
        }
})


// Functions //
// Get movie search data & save it to moviesArray
 async function handleSearch() {
     const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
     const data = await res.json()
     
     moviesArray = data.Search
     
     renderMovies()
 }
 
// Render movies with imdbID from moviesArray
function renderMovies() {
    if(searchInput.value){
        searchInput.value = ""
        mainContainer.innerHTML = ""
        moviesArray.forEach( movie => {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
            .then(res => res.json())
            .then(data => {
                mainContainer.innerHTML += `
                    <div id="movie-container">
                    <img id="movie-img" src=${data.Poster}>
                    <div id="movie-container-4">
                        <div id="movie-container-2">
                            <h2 id="movie-title">${data.Title}</h2>
                            <h4 class="movie-h4">⭐${data.imdbRating}</h4>
                        </div>
                            <div id="movie-container-3">
                                <h4 class="movie-h4">${data.Runtime}</h4>
                                <h4 class="movie-h4">${data.Genre}</h4>
                                <div id="add-btn-container">
                                    <button id="movie-btn" data-movie="${data.imdbID}">+</button>
                                    <h4 class="movie-h4">Watchlist</h4>
                                </div>
                            </div>
                        <span id="movie-span">${data.Plot}</span>
                    </div>
                    </div>
                    <hr>
                `
            })
        })
     }
 }