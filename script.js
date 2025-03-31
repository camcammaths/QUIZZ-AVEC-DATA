// Charger le quiz JSON
fetch("quiz.json")
  .then(response => response.json())
  .then(questions => {
    let index = 0;
    let score = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");

    function afficherQuestion() {
      let question = questions[index];
      questionText.textContent = question.question;
      optionsContainer.innerHTML = "";

      question.options.forEach((option, i) => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => verifierReponse(i, question.answer);
        optionsContainer.appendChild(btn);
      });

      nextBtn.disabled = true;
    }

    function verifierReponse(selected, correct) {
      let boutons = optionsContainer.getElementsByTagName("button");
      for (let i = 0; i < boutons.length; i++) {
        if (i === correct) {
          boutons[i].style.background = "green";
        } else {
          boutons[i].style.background = "red";
        }
        boutons[i].disabled = true;
      }

      if (selected === correct) score++;
      nextBtn.disabled = false;
    }

    nextBtn.addEventListener("click", () => {
      index++;
      if (index < questions.length) {
        afficherQuestion();
      } else {
        questionText.textContent = `🎉 Quiz terminé ! Score : ${score}/${questions.length}`;
        optionsContainer.innerHTML = "";
        nextBtn.style.display = "none";
      }
    });

    afficherQuestion();
  })
  .catch(error => console.error("Erreur lors du chargement des questions :", error));
