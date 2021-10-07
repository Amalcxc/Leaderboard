import './styles/styles.css';
import 'regenerator-runtime/runtime';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QWe6fd15ksAlBbepEHeq/scores/';

const refresh = document.querySelector('#refresh');
const ul = document.querySelector('.ul');

let arrayOfScores = [];

async function getscores() {
  ul.innerHTML = '';
  const response = await fetch(baseUrl);
  const data = await response.json();
  arrayOfScores = data.result;

  arrayOfScores.forEach((score) => {
    const li = document.createElement('li');
    li.innerHTML = `${score.user}: ${score.score}`;
    li.className = 'list-item';
    ul.append(li);
  });
}

refresh.addEventListener('click', getscores);

const username = document.querySelector('#username');
const score = document.querySelector('#score');
const btn = document.querySelector('#submit');

async function addscores(e) {
  e.preventDefault();

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: `${username.value}`,
      score: score.value,
    }),
  });
  getscores();
  return response.json();
}

btn.addEventListener('click', addscores);
