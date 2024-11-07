const API_KEY = 'd4703e60cf0d1782ebbe2f62ec94230a';
const BASE_URL = 'https://api.themoviedb.org/3';

function trendingMovies(){
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => renderTrendingMovies(data.results))
    .catch(error => console.error('Error:', error));
}

// https://api.themoviedb.org/3/movie/933260?api_key=d4703e60cf0d1782ebbe2f62ec94230a
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=YOUR_API_KEY


function renderMoviesPage(movieId){
    console.log(movieId);
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => MoviesPage(data))
    .catch(error => console.error('Error:', error));
    
}

function MoviesPage(movie){
    console.log(movie);
    const body = document.getElementById("trending");
    body.innerHTML=`
    <h1>${movie.title}</h1>
    <div class="movie-image">
        <img class="posterImage" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    </div>
    <img class="posterImage" src="https://image.tmdb.org/t/p/w500/16KWBMmfPX0aJzDExDrPxSLj0Pg.png" alt="${movie.title}">
    `;
    body.innerHTML=body.innerHTML+JSON.stringify(movie);
}
    

function renderTrendingMovies(movies){
    console.log(movies);
    const trendingBody = document.getElementById("trending-body");
    trendingBody.innerHTML='';
    movies.forEach(movie => {
        trendingBody.innerHTML+=`
        <div id=${movie.id} class="movie-card-${movie.id} movie-card">
            <div class="movie-image">
                <img class="posterImage" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
        </div>
        `;
    });
    const movieCard =document.querySelectorAll(`.movie-card`);
    movieCard.forEach(movieCard => {
        movieCard.addEventListener('click', () => {
            const movieCardId = movieCard.id; // Get the id of the clicked card
            window.location.href = window.location.href+`?movieId=${movieCardId}`;
            renderMoviesPage(movieCardId); // Redirect to the page with the card id
        });
    });
        const urlParams = new URLSearchParams(window.location.search);
        const movieCardId = urlParams.get('movieId');
        if (movieCardId) {
            // Redirect to homepage if 'id' is not found in the URL
            // trendingBody.innerHTML=`${movieCardId}`
            renderMoviesPage(movieCardId);
        }
        // else{
        //     trendingBody.innerHTML=``
        //     // renderMoviesPage(movieCardId);
        // }
}

trendingMovies();