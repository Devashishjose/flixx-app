// Define a global object to store the current page's path
const global = {
    currentPage: window.location.pathname,
  };
  
  // Asynchronously fetch and display popular movies
  async function displayPopularMovies() {
    try {
      // Fetch popular movie data from an API endpoint
      const { results } = await fetchAPIData('movie/popular');
  
      // Iterate through the movie results and create HTML elements for each movie
      results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
  
        // Append the movie card to the 'popular-movies' container
        document.querySelector('#popular-movies').appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching and displaying popular movies:', error);
    }
  }
  
  async function displayPopularShows() {
    try {
      // Fetch popular shows data from an API endpoint
      const { results } = await fetchAPIData('tv/popular');
  
      // Iterate through the movie results and create HTML elements for each movie
      results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;
  
        // Append the movie card to the 'popular-movies' container
        document.querySelector('#popular-shows').appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching and displaying popular shows:', error);
    }
  }
  
  async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);

    // overlay for background image

    diplayBackgroundImage('movie',movie.backdrop_path);
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
      }
   
    </div>
    <div>
      <h2>${movie.Title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
      ${movie.overview};  
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        
      ${
        movie.genres.map((genre)=>`<li>${genre.name}</li>`).join('')
      }
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span>$${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span>$${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span>${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span>${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies.map((company)=>`<span>${company.name}<span>`).join(',  ')}
    </div>
  </div>
    `;

    document.querySelector('#movie-details').appendChild(div);
  }

// show details
  async function displayShowDetails(){
    const showId = window.location.search.split('=')[1];
    const show = await fetchAPIData(`tv/${showId}`);

    // overlay for background image

    diplayBackgroundImage('tv',show.backdrop_path);
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
        show.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />`
          : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
      }
   
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
      ${show.overview};  
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        
      ${
        show.genres.map((genre)=>`<li>${genre.name}</li>`).join('')
      }
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of episodes : </span>${ show.number_of_episodes}</li>
      <li><span class="text-secondary">Last Episode to Air : </span>${ show.last_episode_to_air.name}</li>
      <li><span class="text-secondary">Status : </span>${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${show.production_companies.map((company)=>`<span>${company.name}<span>`).join(',  ')}
    </div>
  </div>
    `;

    document.querySelector('#show-details').appendChild(div);
  }


  // display backdrop on Details pages

  function diplayBackgroundImage(type,backgroundPath){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.2';
    if(type==='movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }
    else{
        
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

// Display Slider movies

async function displaySlider(){

const {results} = await fetchAPIData('movie/now_playing');

results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `

    <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>  `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
});
}

function initSwiper(){
    const swiper = new Swiper('.swiper',{
    slidesPerView : 1,
    spaceBetween : 30,
    freeMode:true,
    loop:true,
    autoplay:{
        delay:4000,
        disableOnInteraction:false
    } ,
    breakpoints:{
        500:{
            slidesPerView:2
        },
        700:{
            slidesPerView:3
        },
        1200:{
            slidesPerView:4
        }
    }   
    });
}



  // Fetch data from TMDB API
  async function fetchAPIData(endpoint) {
    const API_KEY = '961982a158676f91c267e8d7ef5d113c';
    const API_URL = 'https://api.themoviedb.org/3/';
  

    showSpinner();
    // Asynchronously fetch data from the specified endpoint using the API key
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  
    // Parse the response JSON and return the data
    const data = await response.json();
  
    hideSpinner();
    return data;
  }
  

  function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
  }

  function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
  }

  function addCommasToNumber(numer){
    return numer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }


  // Get the current page's path
  function getCurrentPage() {
    return global.currentPage;
  }
  
  // Highlight the active link in the navigation menu
  function highlightActiveLink() {
    // Select all elements with the class 'nav-link' (assuming these are your navigation links)
    const links = document.querySelectorAll('.nav-link');
  
    // Loop through each link element
    links.forEach((link) => {
      // Check if the 'href' attribute of the link matches the current page's path
      if (link.getAttribute('href') === global.currentPage) {
        // If it matches, add the 'active' class to highlight the link
        link.classList.add('active');
      } else {
        // If it doesn't match, you can add further handling if needed
      }
    });
  }
  
  // Initialize the app
  function init() {
    // Use a switch statement to perform different actions based on the current page
    switch (global.currentPage) {
      case '/':
      case '/index.html':
        // Display popular movies on the home page
        displaySlider();
        displayPopularMovies();
        break;
      case '/shows.html':
        displayPopularShows(); // Handle shows page navigation or content display here
        break;
      case '/movie-details.html':
        displayMovieDetails(); // Handle movie details page navigation or content display here
        break;
      case '/tv-details.html':
        displayShowDetails(); // Handle TV details page navigation or content display here
        break;
      case '/search.html':
        console.log('Search'); // Handle search page navigation or content display here
        break;
      // Add more cases for additional pages as needed
  
      default:
        // Handle cases where the current page doesn't match any specific route
        break;
    }
  
    // Call the function to highlight the active link in the navigation menu
    highlightActiveLink();
  }
  
  // Wait for the DOM to be fully loaded before initializing the app
  document.addEventListener('DOMContentLoaded', init);
  