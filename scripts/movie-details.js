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
        // Fetch movie details
        const movieResponse = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        if (!movieResponse.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const movieData = await movieResponse.json();

        // Fetch cast and crew details
        const creditsResponse = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
        if (!creditsResponse.ok) {
            throw new Error('Failed to fetch cast and crew details');
        }
        const creditsData = await creditsResponse.json();

        // Display movie details, cast, and crew
        displayMovieDetails(movieData, creditsData);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('moviedetails').innerHTML = 'Failed to load movie details.';
    }
}

// Function to fetch movie details from the API
// async function fetchMovieDetails(movieId) {
//     const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);   
//     if (!response.ok) {
//         throw new Error('Failed to fetch movie details');
//     }
//     const data = await response.json();
//     return data || null;
// }

// async function fetchCastDetails(movieId) {
//     const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch movie details');
//     }

//     const data = await response.json();
//     return data || null;
// }

// Function to display the movie details on the page (reverted to original)
function displayMovieDetails(movie,cast) {

    console.log(movie);
    console.log(cast);
    const body = document.getElementById("movieDetails");
    if (!body) return;

    // Build the HTML content for the movie details page
    const genresHTML = movie.genres.map(genre => {
        return `<div data-genreid="${genre.id}" data-genrename="${genre.name}" id="genre-button" class="genre-button">${genre.name}</div>`;
    }).join('');

    const popularCast = cast.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 4);

    const castHTML = popularCast.map(cast => {
        return `<div id="cast-button" class="cast-button">
                    <div class="title3">${cast.name}</div>
                    <div class="subtitle">${cast.character}</div>
                </div>`;
    }).join('');

    const uniqueCrew = [];
            const crewRoles = ['Director', 'Director of Photography', 'Editor', 'Writer', 'Screenplay'];

            // For each role, select the most popular crew member
            crewRoles.forEach(role => {
                const crewMember = cast.crew
                    .filter(crew => crew.job === role)
                    .sort((a, b) => b.popularity - a.popularity)[0];  // Get the most popular one
                if (crewMember && !uniqueCrew.some(crew => crew.job === crewMember.job)) {
                    uniqueCrew.push(crewMember);
                }
            });

    const crewHTML = uniqueCrew.map(crew => {
        return `<div id="cast-button class="cast-button">
                    <div class="title3">${crew.name}</div>
                    <div class="subtitle">${crew.job}</div>
                </div>`;
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
                <div class="title2">Overview</div>
                <div class="overview">${movie.overview}</div>
                <div class="crew">${crewHTML}</div>
                <div class="cast">${castHTML}</div>
            </div>
        </div>
    `;
    // Update the page with movie details
    body.innerHTML = movieHtml;

    body.addEventListener('click', handleButtonClick);
}

function handleButtonClick(event){
    const genreButton = event.target.closest('.genre-button');
    
    if (!genreButton) return;  // Ensure that we clicked on a valid movie card
    
    const genreId = genreButton.dataset.genreid;
    const genreName = genreButton.dataset.genrename;
    
    if (genreName) {
        // Redirect to movie details page with the movie ID in the URL
        window.location.href = `genre.html?genreId=${genreId}&genreName=${genreName}`;
    } else {
        console.error('No genreId found in the clicked card.');
    }
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
    }, 10000);
}
