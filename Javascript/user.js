const submitBtn = document.getElementById('submit-btn')
const usernameInput = document.getElementById('username')
submitBtn.addEventListener('click', getUserData)
let currentUser = ""
let currentUserId
let finalMin 
let finalSec
let finalMilisec
let currentGameId = 0

function getUserData(e) {
    if (e) {
    e.preventDefault()}

    let userObj = {
        username: usernameInput.value
    }
    
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userObj)
    }

    fetch(`https://brunch-madness.herokuapp.com/users`, configObj)
    .then(response => response.json())
    .then(userData => createUserScores(userData))
}

function createUserScores(userInfo) {
    const loginForm = document.getElementById('login-form')
    const userInfoDiv = document.getElementById('user-info')
    userInfoDiv.style.marginTop = "-25px"
    
    let ol = document.createElement('ol')
    ol.style.marginBottom = "15px"
    ol.style.marginTop = "0px"
    let playBtn = document.createElement('button')
    playBtn.textContent = checkIfCurrentGame() 
    playBtn.id = "play-button"
    playBtn.style.marginLeft = "37px"

    loginForm.style.display = "none"

    let currentUserDiv = document.createElement("div")
    currentUserDiv.id = "current-user-div"
    if (currentUser === "") {
        currentUser = userInfo.username
        currentUserId = userInfo.id
        let h3 = document.createElement('h3')
        h3.id = "username-text"
        h3.innerText = `${userInfo.username}`
        h3.style.textAlign = "center"
        h3.style.marginTop = "40px"
        h3.style.marginBottom = "0px"
        userInfoDiv.append(h3)
    }

    let h4 = document.createElement('h4')
    h4.innerText = "My High Scores"
    h4.style.textAlign = "center"
    h4.style.margin = "2px"
    h4.style.marginTop = "8px"
    
    userInfoDiv.append(currentUserDiv)
    currentUserDiv.append(h4)
    if (userInfo.highest_tips !== []) {
        userInfo.highest_tips.forEach(score => {
        let li = document.createElement('li')
        li.id = score.id
        li.innerText = `Tips: $${score.tips}, Tables: ${score.tables_served}`
        ol.appendChild(li)
    })
    currentUserDiv.append(ol)
    currentUserDiv.append(playBtn)
    let highScoreDiv = document.getElementById('high-scores')
    highScoreDiv.children[1].style.marginTop = "25px"
    highScoreDiv.style.paddingInlineStart = "10px"
    highScoreDiv.style.marginTop = "10px"
    highScoreDiv.children[2].style.marginTop = "12px"
    let howToBtn = document.getElementById('how-to')
    howToBtn.style.marginTop = "0px"
    checkCurrentScore()
    playBtn.addEventListener('click', startGame)
}
}

function recordUserScore() {
    finalMin = document.getElementById('min').innerText
    finalSec = document.getElementById('sec').innerText
    finalMilisec = document.getElementById('milisec').innerText
    let userObj = {
        duration: "00:" + finalMin + finalSec + finalMilisec,
        tips: totalTips,
        tables_served: totalTables
    }
    
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userObj)
    }

    fetch(`https://brunch-madness.herokuapp.com/users/${currentUserId}/scores`, configObj)
    .then(response => response.json())
    .then(userData => handleNewScore(userData))
}

function handleNewScore(userData) {
    currentGameId = userData.id
    let currentUserDivNow = document.getElementById('current-user-div')
    currentUserDivNow.style.display = "none"
    currentUserDivNow.id = "old-game"
    getUserData()
}

function checkCurrentScore() {
    let element = document.getElementById(`${currentGameId}`)
    if(typeof(element) != 'undefined' && element != null){
        element.style.backgroundColor = "greenyellow"
        element.style.fontWeight = "bold"
    }
}

function checkIfCurrentGame() {
    let element = document.getElementById("current-game")
    if(typeof(element) != 'undefined' && element != null){
        return "Play Again"
    } else {
        return "New Game"
    }
}
