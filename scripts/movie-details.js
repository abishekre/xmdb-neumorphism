const API_KEY = 'd4703e60cf0d1782ebbe2f62ec94230a';
const BASE_URL = 'https://api.themoviedb.org/3';

// Wait for the window to load and process the URL parameters
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId'); // Retrieve the movieId from the URL

    if (movieId) {
        renderMoviesPage(movieId); // Render the movie details page if movieId exists
    } else {
        showErrorPage(); // Show error page if movieId is missing
    }
});

// Function to render the movie details page
async function renderMoviesPage(movieId) {
    try {
        const movie = await fetchMovieDetails(movieId);
        if (movie) {
            displayMovieDetails(movie); // Render movie details if valid
        } else {
            showErrorPage(); // Show error if movie data is invalid
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        showErrorPage(); // Show error page if an exception occurs
    }
}

// Function to fetch movie details from the API
async function fetchMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    return data || null;
}

// Function to display the movie details on the page (reverted to original)
function displayMovieDetails(movie) {
    const body = document.getElementById("movieDetails");
    if (!body) return;

    // Build the HTML content for the movie details page
    const genresHTML = movie.genres.map(genre => {
        return `<div class="genre-button">${genre.name}</div>`;
    }).join('');
    const movieHtml = `
        <div class="movie-details">
            <div class="movie-image">
                <img class="posterImage"
                     src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                     alt="${movie.title}" 
                     loading="lazy">
            </div>
            <div class="details">
                <div class="title">${movie.title}</div>
                <div class="subtitle">${movie.tagline}</div>
                <div class="genres">${genresHTML}</div>
                <div class="overview">${movie.overview}</div>
            </div>
        </div>
    `;


    // Update the page with movie details
    body.innerHTML = movieHtml;

    // Optional: Render the full movie object for debugging purposes
    // body.innerHTML += `<pre>${JSON.stringify(movie, null, 2)}</pre>`;
}

// Function to display error page
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
    }, 2000);
}
