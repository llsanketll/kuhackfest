const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const genre_IDs = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37];
const url = "https://api.themoviedb.org/3/search/movie?api_key=d47fa5c0c7cb3abd9ee5fbe08fa22559&adu&include_adult=false&query="
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const movie_IDs = [];
const genre_list = [];
const genre_score = {};

//Initialize the dictionary to zero for each element
genre_IDs.forEach(e => {
  genre_score[e] = 0;
})

const img_container = document.querySelector(".img-container");
const title = document.querySelector(".movie-title");
const like_button = document.querySelector(".like");
const dislike_button = document.querySelector(".dislike");
const getSuggestion = document.querySelector(".suggestion");
const notseen_button = document.querySelector(".not-watched");
const react_more_button = document.querySelector(".react-more");

async function getResponse(url, addToList) {
  const res = await fetch(url + letters[getRandomNumber(0, letters.length)]);
  const Json = await res.json();
  const data = await Json.results[getRandomNumber(0, Json.results.length)];
  if (movie_IDs.includes(data.id)) {
    getResponse(url);
    return;
  }
  else {
    const suffix = await (data.poster_path);
    if (suffix === null) {
      getResponse(url);
      return;
    }
    const image_URL = `https://image.tmdb.org/t/p/w300/${suffix}`;
    img_container.style.backgroundImage = await `url(${image_URL})`;
    title.innerHTML = await data.title;
    if (addToList) {
      genre_list.push(data.genre_ids);
      movie_IDs.push(data.id);
    }
    if (movie_IDs.length > 4)
      getSuggestion.classList.remove("hide");
  }
}

getResponse(url);

like_button.addEventListener('click', e => {
  getResponse(url, true);

  if (genre_list.length > 0) {
    genre_list[genre_list.length - 1].forEach(e => {
      genre_score[e] += 1;
    })
  }
})
dislike_button.addEventListener('click', e => {
  getResponse(url, true);

  if (genre_list.length > 0) {
    genre_list[genre_list.length - 1].forEach(e => {
      genre_score[e] -= 1;
    })
  }
})
notseen_button.addEventListener('click', e => {
  getResponse(url, false);
  //return that user hasn't seen the movie
})

getSuggestion.addEventListener('click', async () => {
  //Find best genre
  let best_genre = [];
  let previous_score = 0;
  Object.keys(genre_score).forEach(key => {
    if (genre_score[key] >= previous_score) {
      best_genre[0] = key;
      previous_score = genre_score[key];
    }
  })
  delete genre_score[best_genre[0]];
  previous_score = 0;
  Object.keys(genre_score).forEach(key => {
    if (genre_score[key] > previous_score) {
      best_genre[1] = key;
      previous_score = genre_score[key];
    }
  })


  const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=d47fa5c0c7cb3abd9ee5fbe08fa22559&sort_by=vote_count.desc&page=1&with_genres=" + best_genre);
  const Json = await res.json();
  const best_movie = await Json.results[getRandomNumber(0, Json.results.length)];
  const suffix = await (best_movie.poster_path);
  const image_URL = `https://image.tmdb.org/t/p/w300/${suffix}`;
  img_container.style.backgroundImage = await `url(${image_URL})`;
  title.innerHTML = await best_movie.title;
  document.querySelector(".react-container").style.display = "none";
  document.querySelector("h1").innerText = "Suggested Movie"
  react_more_button.classList.remove("hide");
  document.querySelector(".movie-card").style.gridTemplateRows = "420px 50px";
  getSuggestion.classList.add("hide");
})

react_more_button.addEventListener('click', e => {
  document.querySelector(".movie-card").style.gridTemplateRows = "420px 50px 80px";
  document.querySelector(".react-container").style.display = "flex";
  react_more_button.classList.add("hide");
  getResponse(url, false);
  document.querySelector("h1").innerText = "Rate Movies";
})