var questionBank = [
    {
        question: "this is question 1",
        choices: ["answer 1 of 1", "answer 2 of 1", "answer 3 of 1"],
        correctAnswer: "answer 1 of 1"
    },
    {
        question: "this is question 2",
        choices: ["answer 1 of 2", "answer 2 of 2", "answer 3 of 2"],
        correctAnswer: "answer 2 of 2"
    },
    {
        question: "this is question 3",
        choices: ["answer 1 of 3", "answer 2 of 3", "answer 3 of 3"],
        correctAnswer: "answer 3 of 3"
    }
]

var startBtn = document.getElementById('start-btn')
var startContainer = document.getElementById('start-container')
var questionContainer = document.getElementById('question-container')
var question = document.getElementById('question')
var optionsContainer = document.getElementById('options-container')

var questionIndex = 0
var score = 0
var timer = 2


startBtn.addEventListener('click', function () {
    startContainer.classList.add("hidden")
    getQuestion()
    startTimer()
})

function startTimer() {
    var timeContainer = document.createElement('h2')
    timeContainer.textContent = timer
    questionContainer.append(timeContainer)
    var timeInt = setInterval(() => {
        timer--
        if (timer <= 0) {
            clearInterval(timeInt)
        }
        timeContainer.textContent = timer
    }, 1000);
}

function getQuestion() {
    question.textContent = ""
    optionsContainer.textContent = ""

    // check if there are any more questionB, if not call and create the endQuiz function, otherwise contine with this function
    
    question.textContent = questionB[questionIndex].question

    for(var i = 0; i < questionB[questionIndex].choices.length; i++) {
        var choiceBtn = document.createElement('button')
        choiceBtn.setAttribute('id', questionBan[questionIndex].choices[i])
        choiceBtn.textContent = questionBank[questionIndex].choices[i]
        optionsContainer.append(choiceBtn)

        choiceBtn.addEventListener('click', function(event) {
            if(event.target.id === questionB[questionIndex].correctAnswer) {
                console.log('correct');
                score =+ 20
            } else {
                console.log('incorrect');
                timer =- 10
            }
            questionIndex++
            getQuestion()
        })
    }
}