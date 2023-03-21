let movies = [];

document.getElementById('searchButton').addEventListener('click', () => {
  let searchText = document.getElementById('searchInput').value.toLowerCase();
  fetch('/movies')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      movies = data.movies.filter((movie) => movie.Title.toLowerCase().includes(searchText));
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

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
let userWatchlist = [];

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
    document.getElementById('loginForm').style.display = 'none';
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

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function displayWatchlist() {
  let output = '';
  userWatchlist.forEach((movie) => {
    output += `
      <div class="movie-card">
        <img src="${movie.Poster}" class="movie-poster">
        <h5 class="movie-title">${movie.Title}</h5>
      </div>
    `;
  });
  document.getElementById('watchlist').innerHTML = output;
}

function addToWatchlist(imdbID) {
  const movie = movies.find((movie) => movie.imdbID === imdbID);
  
  if (movie) {
    const isMovieInWatchlist = userWatchlist.some(
      (watchlistMovie) => watchlistMovie.imdbID === imdbID
    );

    if (!isMovieInWatchlist) {
      userWatchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(userWatchlist));
      displayWatchlist();
    } else {
      console.warn('Movie is already in the watchlist');
    }
  } else {
    console.error('Movie not found');
  }
}

window.addToWatchlist = addToWatchlist;

function removeFromWatchlist(imdbID) {
  userWatchlist = userWatchlist.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem('watchlist', JSON.stringify(userWatchlist));
  displayWatchlist();
}

window.removeFromWatchlist = removeFromWatchlist;
