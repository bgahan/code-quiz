var userScoreContainer = document.querySelector('.user-scores')

var storage = JSON.parse(localStorage.getItem('userScoreStorage'))

var clearBtn = document.querySelector('.clear-scores')

if (storage === [] || storage === null) {
    userScoreContainer.textContent = 'No Highscores'
} else {
    userScoreContainer.textContent = ""
    for (var i = 0; i < storage.length; i++) {
        var highScoreName = document.createElement('p')
        highScoreName.textContent = "Name: " + storage[i].name;
        userScoreContainer.append(highScoreName)
        var highScore = document.createElement('p')
        highScore.textContent = "Score: " + storage[i].userScore;
        highScoreName.append(highScore)
        var br = document.createElement('br');
        userScoreContainer.append(br);
    }
}

clearBtn.addEventListener('click', function() {
    localStorage.clear('userScoreStorage')
    window.location.reload()
})