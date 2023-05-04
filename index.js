const container = document.getElementById("container");
const previousBtn = document.getElementById("previousbtn");
const nextBtn = document.getElementById("nextbtn");
const form = document.getElementById('search-form');
const API_URL = "https://imdb-api.com/en/API/Top250Movies/k_k78384yh";
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const title = searchInput.value;
  const url = `https://imdb-api.com/en/API/SearchMovie/k_k78384yh/${title}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      showMovies(movies);
    })
    .catch(error => console.error(error));
});

function showMovies(movies) {
  // Code to display movies on the page
}


function showMovies(movies) {
  // Code to display movies on the page
}
function showMovies() {
  const container = document.querySelector('#movie-container');

  // Clear any previous movies
  container.innerHTML = '';

  // Loop through each movie and create an element to display it
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.title;
    movieElement.appendChild(titleElement);

    const ratingElement = document.createElement('p');
    ratingElement.textContent = `Rating: ${movie.imDbRating}`;
    movieElement.appendChild(ratingElement);

    container.appendChild(movieElement);
  });
}

let movies = [];
let currentMoviesPage = 1;
const moviesPerPage = 16;

async function fetchMovies() {
  const response = await fetch(`https://imdb-api.com/en/API/Top250Movies/k_k78384yh/`);

  const data = await response.json();
  movies = data.items;
  showMovies();
}

function showMovies() {
  const startIndex = (currentMoviesPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);
  container.innerHTML = "";
  currentMovies.forEach((movie) => {
    const { title, image } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("title");
    titleElement.innerText = title;

    const imageElement = document.createElement("img");
    imageElement.classList.add("poster");
    imageElement.src = image;

    movieElement.appendChild(titleElement);
    movieElement.appendChild(imageElement);
    container.appendChild(movieElement);

  });
}

function showPreviousMoviesPage() {
  currentMoviesPage--;
  if (currentMoviesPage < 1) {
    currentMoviesPage = 1;
  }
  showMovies();
}

function showNextMoviesPage() {
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  currentMoviesPage++;
  if (currentMoviesPage > totalPages) {
    currentMoviesPage = totalPages;
  }
  showMovies();
}

previousBtn.addEventListener("click", showPreviousMoviesPage);
nextBtn.addEventListener("click", showNextMoviesPage);

fetchMovies();
