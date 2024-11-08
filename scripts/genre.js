const API_KEY = 'd4703e60cf0d1782ebbe2f62ec94230a';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch trending movies and render them
async function trendingMovies(genreId,genreName) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            renderMovies(data.results,genreName);
        } else {
            handleError('No trending movies found.');
        }
    } catch (error) {
        handleError(`Error fetching data: ${error.message}`);
    }
}

// Render movie cards
function renderMovies(movies,genreName) {

    const trendingHeader = document.getElementById("trending-header");
    if (!trendingHeader) return;

    trendingHeader.innerHTML=`${genreName}`;

    const body = document.getElementById("genre");
    if (!body) return;

    const movieCardsHtml = movies.map(movie => `
        <div class="movie-card" data-movieid="${movie.id}">
            <div class="movie-image">
                <img class="posterImage"
                     src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                     alt="${movie.title}" 
                     loading="lazy">
            </div>
        </div>
    `).join('');
    
    // Insert the generated HTML into the DOM
    body.innerHTML = movieCardsHtml;

    // Add click event listener for the entire container (event delegation)
    body.addEventListener('click', handleMovieCardClick);
}

// Handle movie card click
function handleMovieCardClick(event) {
    const movieCard = event.target.closest('.movie-card');
    
    if (!movieCard) return;  // Ensure that we clicked on a valid movie card
    
    const movieId = movieCard.dataset.movieid;
    
    if (movieId) {
        // Redirect to movie details page with the movie ID in the URL
        window.location.href = `movie-details.html?movieId=${movieId}`;
    } else {
        console.error('No movieId found in the clicked card.');
    }
}

// Error handling function
function handleError(message) {
    const trendingBody = document.getElementById("trending-body");
    
    if (trendingBody) {
        trendingBody.innerHTML = `
            <div class="error-message">
                <span class="error-icon">⚠️</span> <!-- Error Icon -->
                <p>Error: ${message}</p>
            </div>
        `;
    }
}

// Fetch trending movies when the page loads
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const genreId = urlParams.get('genreId'); // Retrieve the movieId from the URL
    const genreName = urlParams.get('genreName'); // Retrieve the movieId from the URL
    console.log(genreName)

    if (genreId) {
        trendingMovies(genreId,genreName); // Render the movie details page if movieId exists
    } else {
        showErrorPage(); // Show error page if movieId is missing
    }
});

function showErrorPage() {
    const body = document.getElementById("movieDetails");
    if (!body) return;

    body.innerHTML = `
        <h2>Error 404: Movie not found</h2>
        <p>Redirecting you to the homepage...</p>
    `;
    // Redirect to homepage after a 2-second delay
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirect to homepage
    }, 10000);
}