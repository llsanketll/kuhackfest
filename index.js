function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const url = "https://api.themoviedb.org/3/search/movie?api_key=d47fa5c0c7cb3abd9ee5fbe08fa22559&query="
const img_container = document.querySelector(".img-container");
const title = document.querySelector(".movie-title");
const like_button = document.querySelector(".like");
async function getResponse(url) {
  const res = await fetch(url + getRandomNumber(0, letters.length));
  const JSON = await res.json();
  const data = await JSON.results[getRandomNumber(0, JSON.results.length)];
  const suffix = await (data.poster_path);
  const image_URL = `https://image.tmdb.org/t/p/w300/${suffix}`;
  img_container.style.backgroundImage = await `url(${image_URL})`;
  title.innerHTML = await data.title;
}
getResponse(url);



