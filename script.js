let questions = [];

fetch('questions.json')
    .then(response => response.json())  // Charger le JSON
    .then(data => {
        questions = data;
        afficherQuestion(0);  // Afficher la première question
    })
    .catch(error => console.error("Erreur de chargement du JSON :", error));

let index = 0;

function afficherQuestion(i) {
    let questionEl = document.getElementById("question");
    let answersEl = document.getElementById("answers");
    let nextBtn = document.getElementById("next");

    questionEl.textContent = questions[i].question;
    answersEl.innerHTML = "";

    questions[i].reponses.forEach((reponse, j) => {
        let btn = document.createElement("button");
        btn.textContent = reponse;
        btn.onclick = () => verifierReponse(j, i);
        answersEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function verifierReponse(j, i) {
    if (questions[i].correct === j) {
        alert("Bonne réponse !");
    } else {
        alert("Mauvaise réponse !");
    }
    document.getElementById("next").style.display = "block";
}

document.getElementById("next").onclick = function() {
    index++;
    if (index < questions.length) {
        afficherQuestion(index);
    } else {
        alert("Quiz terminé !");
    }
};
