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

function renderTrendingMovies(movies){
    const trendingBody = document.getElementById("trending-body");
    trendingBody.innerHTML='';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.dataset.movieId = movie.id;  // Assign movie ID to the data attribute
        movieCard.innerHTML = `
            <div class="movie-image">
                <img class="posterImage" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
        `;
        trendingBody.appendChild(movieCard);
    });
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(movieCard => {
        movieCard.addEventListener('click', () => {
            const movieId = movieCard.dataset.movieId;  // Get the movie ID from the data attribute
            console.log(movieId);
            window.location.href = `movie-details.html?movieId=${movieId}`;  // Use the correct parameter name
        });
    });
}



trendingMovies();