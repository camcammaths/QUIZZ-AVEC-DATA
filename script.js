document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    let score = 0;
    let questions = [];

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");

    // Charger le fichier JSON
    fetch("quiz.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            afficherQuestion();
        })
        .catch(error => console.error("Erreur de chargement du quiz :", error));

    function afficherQuestion() {
        if (index >= questions.length) {
            questionText.textContent = `🎉 Quiz terminé ! Score : ${score}/${questions.length}`;
            optionsContainer.innerHTML = "";
            nextBtn.style.display = "none";
            return;
        }

        let question = questions[index];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = "";

        question.options.forEach((option, i) => {
            let btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => verifierReponse(i, question.answer, btn);
            optionsContainer.appendChild(btn);
        });

        nextBtn.disabled = true;
    }

    function verifierReponse(selected, correct, btn) {
        let boutons = optionsContainer.getElementsByTagName("button");

        for (let i = 0; i < boutons.length; i++) {
            boutons[i].disabled = true;
            if (i === correct) {
                boutons[i].style.background = "green";
            } else {
                boutons[i].style.background = "red";
            }
        }

        if (selected === correct) score++;
        nextBtn.disabled = false;
    }

    nextBtn.addEventListener("click", () => {
        index++;
        afficherQuestion();
    });
});
