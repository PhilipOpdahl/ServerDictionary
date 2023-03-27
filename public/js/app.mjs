import CheckLanguage from './languageChanger.mjs';

document.addEventListener('DOMContentLoaded', () => CheckLanguage());

let movies = [];

document.getElementById('searchButton').addEventListener('click', () => {
  let searchText = document.getElementById('searchInput').value.toLowerCase();
  fetch('/movies')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      movies = data.movies.filter((movie) => movie.Title.toLowerCase().includes(searchText));
      const movieContainer = document.getElementById('movies');

      movieContainer.innerHTML = '';

      movies.forEach((movie) => {
        const movieTemplate = document.getElementById('movieTemplate');
        const movieElement = movieTemplate.cloneNode(true);
        movieElement.removeAttribute('id');
        movieElement.style.display = '';
    
        const poster = movieElement.querySelector('.movie-poster');
        const title = movieElement.querySelector('.movie-title');
        const addButton = movieElement.querySelector('.add-to-watchlist-btn');
    
        poster.src = movie.Poster;
        title.textContent = movie.Title;
        addButton.onclick = () => addToWatchlist(movie.imdbID);
    
        movieContainer.appendChild(movieElement);
      });
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

  const response = await fetch('/users/login', {
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
    console.log('Login failed', await response.json());
  }
});

registerBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/users/register', {
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
    console.log('Registration failed', await response.json());
  }
});

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function displayWatchlist() {
  const watchlistContainer = document.getElementById('watchlist');
  watchlistContainer.innerHTML = '';

  userWatchlist.forEach((movie) => {
    const watchlistMovieTemplate = document.getElementById('watchlistMovieTemplate');
    const watchlistMovieElement = watchlistMovieTemplate.content.cloneNode(true);

    const moviePoster = watchlistMovieElement.querySelector('.movie-poster');
    const movieTitle = watchlistMovieElement.querySelector('.movie-title');

    moviePoster.src = movie.Poster;
    movieTitle.textContent = movie.Title;

    watchlistContainer.appendChild(watchlistMovieElement);
  });
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
