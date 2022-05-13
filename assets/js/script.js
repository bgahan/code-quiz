var questionBank = [
    {
        question: "Arrays in JavaScript can be used to store ______",
        choices: ["1. Numbers and string", "2. Other arrays", "3. Booleans", "4. All of the above"],
        correctAnswer: "4. All of the above"
    },
    {
        question: "Commonly used data types do NOT include",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        correctAnswer: "Alerts"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal/bash", "For loops", "Console.log"],
        correctAnswer: "Console.log"
    },
    {
        question: "The condition in an if/else is enclosed with _____",
        choices: ["Quotes", "Curly brackets", "Parenthesis", "Square backets"],
        correctAnswer: "Parenthesis"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        choices: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
        correctAnswer: "Quotes"
    }
]
var startBtn = document.getElementById('start-btn')
var startContainer = document.getElementById('start-container')
var questionContainer = document.getElementById('question-container')
var question = document.getElementById('question')
var optionsContainer = document.getElementById('options-container')
var timeContainer = document.createElement('h2')
var resultsContainer = document.getElementById('results-container')
var results = document.getElementById('results')
var finalScore = document.getElementById('final-score')
var saveResults = document.getElementById('save-results')

var questionIndex = 0
var score = 0
var timer = 50


startBtn.addEventListener('click', function () {
    startContainer.classList.add("hidden")
    getQuestion()
    startTimer()
})

// function to load high scores
// function getHighScore() {
//     localStorage.getItem();
// }

// function to end the game when there are no more questions or time has run out
function endQuiz() {
    // display that user is finished and show final score
    results.textContent = "All done!"
    timeContainer.classList.add("hidden")
    finalScore.append('Your final score is: ' + score);

    // allow user to enter initials and submit high score
    var enterInitials = document.createElement("input");
    enterInitials.setAttribute("type", "text");
    saveResults.textContent = 'Enter initials: '
    saveResults.append(enterInitials);
    var highScoreBtn = document.createElement('button')
    highScoreBtn.textContent = 'Submit'
    saveResults.append(highScoreBtn)
    highScoreBtn.addEventListener('click', function () {
        // function to submit high scores; will add initials and high score to local storage
        var addInitials = enterInitials.value;
        console.log(addInitials)
    
        // localStorage.setItem(addInitials, score)
        var storage = JSON.parse(localStorage.getItem('userScoreStorage'))
        if (storage === null) {
            storage = []
        }

        var user = {
            name: addInitials,
            userScore: score 
        }

        storage.push(user)
        localStorage.setItem('userScoreStorage', JSON.stringify(storage))

        // after adding initials user is taken to the highscore.html page
        window.location.href = 'highscore.html';


    })
}

// function to start the timer after the user starts the quiz
function startTimer() {
    timeContainer.textContent = 'Timer:' + timer
    questionContainer.append(timeContainer)
    var timeInt = setInterval(() => {
        timer--
        if (timer <= 0 || questionIndex == questionBank.length) {
            clearInterval(timeInt);
            endQuiz();
            questionContainer.classList.add("hidden")
        }
        timeContainer.textContent = 'Timer:' + timer
    }, 1000);
}


// function to show the questions and check if the answer is correct
function getQuestion() {
    question.textContent = ""
    optionsContainer.textContent = ""

    // check if there are any more questions, if not call endQuiz function, otherwise contain with this function
    if (questionIndex == questionBank.length) {
        return
    } else {
        question.textContent = questionBank[questionIndex].question

        for (var i = 0; i < questionBank[questionIndex].choices.length; i++) {
            var choiceBtn = document.createElement('button')
            choiceBtn.setAttribute('id', questionBank[questionIndex].choices[i])
            choiceBtn.textContent = questionBank[questionIndex].choices[i]
            optionsContainer.append(choiceBtn)

            choiceBtn.addEventListener('click', function (event) {
                if (event.target.id === questionBank[questionIndex].correctAnswer) {
                    console.log('correct');
                    score = score + 20;
                } else {
                    console.log('incorrect');
                    timer = timer - 10
                }
                questionIndex++
                getQuestion()
            })
        }
    }


}