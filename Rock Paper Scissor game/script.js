const rulesPopup = document.getElementsByClassName("rules-popup")
const choice = document.getElementsByClassName("choice")
const rulesClose = document.getElementById("close")
const choiceDisable = document.getElementsByClassName("choice-disable")
const userChoice = document.getElementById("user-choice")
const aiChoice = document.getElementById("ai-choice")
const optionContainer = document.getElementsByClassName("option-container")
const resultContainer = document.getElementsByClassName("result-container")
const result = document.getElementById("result")
const scoreDisplay = document.getElementById("score")

const choiceDisc = [
    '<div class="choice" style="--bg-color: 230 89% 65%; --shadow: 230 89% 45%;"><img src="images/icon-paper.svg" alt=""></div>',
    '<div class="choice" style="--bg-color: 39 89% 49%; --shadow: 39 89% 35%;"><img src="images/icon-scissors.svg" alt=""></div>',
    '<div class="choice" style="--bg-color: 349 71% 52%; --shadow: 349 71% 35%;"><img src="images/icon-rock.svg" alt=""></div>'
]
const choices = {"paper" : 0, "scissors" : 1, "rock" : 2}

let user = 0
let house = 0

let score = 00

function displayRules(value) {
    if (value === true) {
        rulesPopup[0].classList.add("active")
        choiceDisable[0].classList.add("active")
    } else {
        rulesPopup[0].classList.remove("active")
        choiceDisable[0].classList.remove("active")
    }
}

function generateResult(value, container) {
    const selected = document.createElement("div");
    selected.innerHTML = choiceDisc[value]
    container.appendChild(selected)
}

function removePreviousChoices() {
    var el = document.getElementsByClassName('selected');
    while ( el[0].firstChild ) el[0].removeChild( el[0].firstChild );
    while ( el[1].firstChild ) el[1].removeChild( el[1].firstChild );
}

function ai() {
    let number = Math.floor(Math.random()*3);
    return number
}

function gameLogic() {
    let decision = ""
    if (user === 0 && house === 0) {
        decision = "draw"
    } else if (user === 0 && house === 1) {
        decision = "you loose"
    } else if (user === 0 && house === 2) {
        decision = "you win"
    } else if (user === 1 && house === 0) {
        decision = "you win"
    } else if (user === 1 && house === 1) {
        decision = "draw"
    } else if (user === 1 && house === 2) {
        decision = "you loose"
    } else if (user === 2 && house === 0) {
        decision = "you loose"
    } else if (user === 2 && house === 1) {
        decision = "you win"
    } else if (user === 2 && house === 2) {
        decision = "draw"
    }

    if (decision === "you win") {
        score += 1
    }
    return decision
}


function getEvent(e) {
    if (e.target.id === "rules") {
        displayRules(true)
    } 
    else if (e.target.id === "close"){
        displayRules(false)
    }

    if (e.target.id in choices) {
        optionContainer[0].classList.add("rotate")
        resultContainer[0].classList.add("rotate")
        user = choices[e.target.id]
        house = ai()
        generateResult(choices[e.target.id], userChoice)
        generateResult(house, aiChoice)
        result.textContent = gameLogic()
        scoreDisplay.textContent = score
    }

    if (e.target.id === "play-again") {
        removePreviousChoices()
        optionContainer[0].classList.remove("rotate")
        resultContainer[0].classList.remove("rotate")
    }

    if (e.target.id === "clear-score") {
        scoreDisplay.textContent = 0
    }
}

window.addEventListener("click", getEvent)