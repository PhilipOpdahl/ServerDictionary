let allMovies = [];

document.getElementById('searchButton').addEventListener('click', () => {
  let searchText = document.getElementById('searchInput').value.toLowerCase();
  fetch('/movies')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allMovies = data.movies;
      let movies = data.movies.filter((movie) => movie.Title.toLowerCase().includes(searchText));
      let output = '';
      movies.forEach((movie) => {
        output += `
          <div class="col-md-3">
            <div class="movie-card">
              <img src="${movie.Poster}" class="movie-poster">
              <h5 class="movie-title">${movie.Title}</h5>
              <button onclick="addToWatchlist('${movie.imdbID}')" class="btn btn-primary add-to-watchlist-btn">Add to Watchlist</button>
            </div>
          </div>
        `;
      });
      document.getElementById('movies').innerHTML = output;
    })
    .catch((error) => {
      console.error(error);
    });
});

const addMovieBtn = document.getElementById('addMovieBtn');
const watchlist = document.getElementById('watchlist');

let watchlistMovies = [];

addMovieBtn.addEventListener('click', () => {
  const movieTitle = document.getElementById('movieTitle').value;
  const moviePoster = document.getElementById('moviePoster').value;

  if (movieTitle && moviePoster) {
    const newMovie = {
      imdbID: Date.now().toString(), // Generate a unique ID based on the current timestamp
      Title: movieTitle,
      Poster: moviePoster,
    };

    watchlistMovies.push(newMovie);
    updateWatchlist();
  }
});

function updateWatchlist() {
  let output = '';

  watchlistMovies.forEach((movie) => {
    output += `
    <div class="col-md-3">
      <div class="movie-card">
        <img src="${movie.Poster}" class="movie-poster">
        <h5 class="movie-title">${movie.Title}</h5>
      </div>
    </div>
  `;
  });

  watchlist.innerHTML = output;
}

function addToWatchlist(movieID) {
  const existingMovieInWatchlist = watchlistMovies.find((m) => m.imdbID === movieID);

  if (!existingMovieInWatchlist) {
    const movieToAdd = allMovies.find((m) => m.imdbID === movieID);
    if (movieToAdd) {
      watchlistMovies.push(movieToAdd);
      updateWatchlist();
    }
  } else {
    console.log('Movie is already in the watchlist.');
  }
}

loginBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Logged in:', data);
    document.getElementById('loginForm').style.display = 'none'; // Hide the login form
  } else {
    console.log('Login failed');
  }
});

registerBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Registered:', data);
  } else {
    console.log('Registration failed');
  }
});
