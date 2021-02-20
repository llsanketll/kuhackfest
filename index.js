function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const IDs = [];
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const url = "https://api.themoviedb.org/3/search/movie?api_key=d47fa5c0c7cb3abd9ee5fbe08fa22559&query="
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
  if (IDs.includes(data.id)) {
    getResponse(url);
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
    if (addToList)
      IDs.push(data.id);
    if (IDs.length > 4)
      getSuggestion.classList.remove("hide");
  }
}

getResponse(url);

like_button.addEventListener('click', e => {
  getResponse(url, true);
  //return that it liked this movie;
})
dislike_button.addEventListener('click', e => {
  getResponse(url, true);
  //return that you disliked it
})
notseen_button.addEventListener('click', e => {
  getResponse(url, false);
  //return that user hasn't seen the movie
})

getSuggestion.addEventListener('click', e => {
  //What to do when the suggestion button is pressed
})