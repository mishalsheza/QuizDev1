document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: 'Which HTML tag is used to define an inline style?',
            answers: [
                {text: '<script>', correct: false},
                {text: '<css>', correct: false},
                {text: '<style>', correct: true},
                {text: '<span>', correct: false},
            ]
        },
        {
            question: 'Which property is used to change the text color in CSS?',
            answers: [
                {text: 'text-color', correct: false},
                {text: 'font-color', correct: false},
                {text: 'text-style', correct: false},
                {text: 'color', correct: true},
            ]
        },
        {
            question: 'Which of the following is the correct way to comment in HTML?',
            answers: [
                {text: '// Comment', correct: false},
                {text: '<!-- Comment -->', correct: true},
                {text: '/* Comment */', correct: false},
                {text: '<! Comment>', correct: false},
            ]
        },
    ];

    const questionElement = document.getElementById("question");
    const answerButtons = document.querySelectorAll(".option-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    // Function to shuffle the questions array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        shuffle(questions); // Shuffle questions before starting the quiz
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

        currentQuestion.answers.forEach((answer, index) => {
            const button = answerButtons[index];
            button.querySelector('span').innerText = answer.text;
            button.dataset.correct = answer.correct;
            button.classList.remove('correct', 'incorrect');
            button.disabled = false;
        });
        // // Update HUD
        // progressText.innerText = `Question: ${currentQuestionIndex + 1}/${questions.length}`;
        // progressBarFull.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    }

    function selectAnswer(e) {
        const selectedButton = e.currentTarget;
        const isCorrect = selectedButton.dataset.correct === "true";
        
        if (isCorrect) {
            selectedButton.classList.add("correct");
            score++;
        } else {
            selectedButton.classList.add("incorrect");
        }

        Array.from(answerButtons).forEach(button => {
            button.disabled = true;
        });



        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                alert(`Quiz finished! Your score is: ${score}`);
                startQuiz();
            }
        }, 1500); 
        progressText.innerText = `Question: ${currentQuestionIndex + 1}/${questions.length}`;
        progressBarFull.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    }

    answerButtons.forEach(button => {
        button.addEventListener("click", selectAnswer);
    });

    startQuiz();
});
