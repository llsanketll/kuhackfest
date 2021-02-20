const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const genre_IDs = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37];
const url = "https://api.themoviedb.org/3/search/movie?api_key=d47fa5c0c7cb3abd9ee5fbe08fa22559&query="
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const movie_IDs = [];
const liked_movies = [];
const disliked_movies = [];
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

async function getResponse(url, addToList) {
  const res = await fetch(url + getRandomNumber(0, letters.length));
  const JSON = await res.json();
  const data = await JSON.results[getRandomNumber(0, JSON.results.length)];
  if (movie_IDs.includes(data.id))
    getResponse(url);
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
      console.log(data.genre_ids);
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
  //return that it liked this movie;
  if (genre_list.length > 0) {
    liked_movies.push(...genre_list[genre_list.length - 1]);
    genre_list[genre_list.length - 1].forEach(e => {
      genre_score[e] += 1;
    })
  }
})
dislike_button.addEventListener('click', e => {
  getResponse(url, true);

  if (genre_list.length > 0) {
    disliked_movies.push(...genre_list[genre_list.length - 1]);
    genre_list[genre_list.length - 1].forEach(e => {
      genre_score[e] -= 1;
    })
  }
})
notseen_button.addEventListener('click', e => {
  getResponse(url, false);
  //return that user hasn't seen the movie
})

getSuggestion.addEventListener('click', e => {
  //What to do when the suggestion button is pressed
  console.log(genre_score);
  console.log(liked_movies);
  console.log(disliked_movies);
  console.log(genre_list);
})