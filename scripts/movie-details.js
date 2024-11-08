const API_KEY = 'd4703e60cf0d1782ebbe2f62ec94230a';
const BASE_URL = 'https://api.themoviedb.org/3';

window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');  // Make sure this matches the parameter used in the URL

    if (movieId) {
        renderMoviesPage(movieId);  // If the movieId is found in the URL, render the details page
    } else {
        const body = document.getElementById("movieDetails");
        body.innerHTML = `
            <h2>Error 404: Movie not found</h2>
            <p>Redirecting you to the homepage...</p>
        `;
        // Redirect to homepage after a 2-second delay
        setTimeout(() => {
            window.location.href = 'index.html';  // Redirect to homepage
        }, 2000);
    }
});

function renderMoviesPage(movieId){
    console.log(movieId);
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        MoviesPage(data);
        // console.log(data);
    })
    .catch(error => console.error('Error:', error));
    
}

function MoviesPage(movie){
    const body = document.getElementById("movieDetails");
    body.innerHTML=`
    <h1>${movie.title}</h1>
    <div class="movie-image">
        <img class="posterImage" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    </div>
    <img class="posterImage" src="https://image.tmdb.org/t/p/w500/16KWBMmfPX0aJzDExDrPxSLj0Pg.png" alt="${movie.title}">
    `;
    body.innerHTML=body.innerHTML+JSON.stringify(movie);
}