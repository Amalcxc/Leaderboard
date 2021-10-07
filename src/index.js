import './styles/styles.css';
import 'regenerator-runtime/runtime'



const base_url = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QWe6fd15ksAlBbepEHeq/scores/"

// fetch(base_url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
// 	    "name": "new game" 
// }),
//     }).then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });


const refresh = document.querySelector("#Refresh")
const lu = document.querySelector(".ul")



let array_of_scores = []

async function getscores() {
    let response = await fetch(base_url);
    let data = await response.json();
    array_of_scores = data.result;
    console.log(array_of_scores);

    array_of_scores.forEach((score) => {
      const li = document.createElement('li');
      li.innerHTML = `${score.user}: ${score.score}`;
      li.className = 'list_item';
      lu.append(li);
    });
}




const username = document.querySelector("#username")
const score = document.querySelector("#score")
const btn = document.querySelector("#submit")


async function addscores(e) {
  e.preventDefault();
 
  const response = await fetch(base_url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: `${username.value}`,
      score: score.value,
    }),
  });
  getscores()
}

btn.addEventListener('click', addscores);
