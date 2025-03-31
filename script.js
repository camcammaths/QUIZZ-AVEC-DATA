// Récupérer les données du fichier JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        let currentQuestion = 0;
        let score = 0;

        // Afficher la question actuelle et les options
        function showQuestion() {
            const questionContainer = document.getElementById('quiz');
            questionContainer.innerHTML = '';
            const questionData = questions[currentQuestion];
            const questionText = document.createElement('h2');
            questionText.innerText = questionData.question;
            questionContainer.appendChild(questionText);

            questionData.options.forEach(option => {
                const button = document.createElement('button');
                button.innerText = option;
                button.onclick = function () {
                    if (option === questionData.answer) {
                        score++;
                    }
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        showQuestion();
                    } else {
                        showResult();
                    }
                };
                questionContainer.appendChild(button);
            });
        }

        // Afficher le résultat final
        function showResult() {
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = `Vous avez obtenu ${score} / ${questions.length}`;
            document.getElementById('submit-btn').style.display = 'none';
        }

        showQuestion();
    })
    .catch(err => console.error('Erreur de chargement du fichier JSON:', err));
