const API_KEY = 'd4703e60cf0d1782ebbe2f62ec94230a';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch trending movies and render them
async function trendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            renderTrendingMovies(data.results);
        } else {
            handleError('No trending movies found.');
        }
    } catch (error) {
        handleError(`Error fetching data: ${error.message}`);
    }
}

// Render movie cards
function renderTrendingMovies(movies) {
    const trendingBody = document.getElementById("trending-body");
    
    if (!trendingBody) return;

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
    trendingBody.innerHTML = movieCardsHtml;

    // Add click event listener for the entire container (event delegation)
    trendingBody.addEventListener('click', handleMovieCardClick);
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
trendingMovies();
