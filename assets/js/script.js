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

var questionIndex = 0
var score = 0
var timer = 20


startBtn.addEventListener('click', function () {
    startContainer.classList.add("hidden")
    getQuestion()
    startTimer()
})

// function to end the game when there are no more questions or time has run out
function endQuiz(reason) {
    console.log('no more questions');
    var resultsContainer = document.getElementById('results-container')

    if (reason = 'timeExpired'){
        resultsContainer.textContent = "Time's Up!"
    }

    if (reason = 'done'){
        resultsContainer.textContent = "All done!"
        timeContainer.classList.add("hidden")
    }
    resultsContainer.append('Your final score is: ' + score);
    var highScore = document.createElement("input");
    highScore.setAttribute("type", "text");
    resultsContainer.append(highScore);
    var initialsBtn = document.createElement('button')
    initialsBtn.textContent = 'Submit'
    resultsContainer.append(initialsBtn)
    initialsBtn.addEventListener('click', function(){
        localStorage.setItem(highScore, score)
    })
}

// function to start the timer after the user starts the quiz
function startTimer() {
    timeContainer.textContent = timer
    questionContainer.append(timeContainer)
    var timeInt = setInterval(() => {
        timer--
        if (timer <= 0) {
            clearInterval(timeInt);
            endQuiz('timeExpired');
            questionContainer.classList.add("hidden")
        }
        timeContainer.textContent = timer
    }, 1000);
}


// function to show the questions and check if the answer is correct
function getQuestion() {
    question.textContent = ""
    optionsContainer.textContent = ""

    // check if there are any more questions, if not call endQuiz function, otherwise contain with this function
    if (questionIndex == questionBank.length) {
        endQuiz('done');
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