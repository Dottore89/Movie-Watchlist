const apiKey = '99ba230a'
const watchlistContainer = document.getElementById("watchlist-container")


// Arrays //


// Event listeners //
// Render watchlist
document.addEventListener("DOMContentLoaded", createWatchlist)


// Functions //
// Use fetch on imdbIdArray with forEach method to render watchlist
function createWatchlist() {
    const retrievedimdbIDsArray = JSON.parse(localStorage.getItem("imdbIDsArray"))
    watchlistContainer.innerHTML = ""
    
    retrievedimdbIDsArray.forEach( movie => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie}`)
        .then(res => res.json())
        .then(data => {
            watchlistContainer.innerHTML += `
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
                                <button id="movie-btn" data-movie="${data.imdbID}">-</button>
                                <h4 class="movie-h4">Remove</h4>
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

// Remove watchlist item
function handleRemoveMovie(){
    
}