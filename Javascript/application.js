document.addEventListener('DOMContentLoaded', function(){
    fetchCustomers()
    fetchItems()
    fetchHighScores()
})

function fetchHighScores() {
    fetch(`http://brunch-madness.herokuapp.com/high_scores`)
    .then(response => response.json())
    .then(highScores => displayHighScores(highScores))
}

function displayHighScores(highScores) {
    let highScoresDiv = document.getElementById('high-scores')
    let ol = document.createElement('ol')
    ol.style.paddingInlineStart = "20px"
    highScoresDiv.append(ol)
    highScores.forEach(score => {
        let li = document.createElement('li')
        let p1 = document.createElement('p')
        p1.style.margin = "0px"
        p1.style.marginLeft = "5px"
        p1.style.fontWeight = "bold"
        let p2 = document.createElement('p')
        p2.style.margin = "0px"
        p2.style.marginLeft = "5px"
        li.style.textDecoration = "none"
        li.style.fontSize = "16px"
        li.style.textAlign = "left"
        p2.innerText = `Tips: $${score.tips}, Tables: ${score.tables_served}` 
        p1.innerText = `${score.user.username}`
        li.append(p1)
        li.append(p2)
        ol.append(li)
    })
}

let howToPlay = document.getElementById('how-to')
howToPlay.addEventListener('click', displayInstructions)

function displayInstructions() {
    Swal.fire({
        icon: "info",
        title: "How to Play",
        html: "<p>Object: Serve the customers as fast as possible.  Make 3 mistakes and you’re fired.<br><br>Use the ⬇️➡️⬅️⬆️ keys to move the waiter around the restaurant.<br><br>Run to 🤗 to take a new order. Run to the bar entrance to submit the order by entering the table number and drinks.  Don’t let the customers get too angry. 🤬 means you have 10 seconds left to complete an order or it’s a mistake!<br><br>When ✍️, 💵, or 💳 appear at a table, run to the register to either deliver the check or close out a table.  Don’t leave the customers waiting!<br><br>Score: $1 tip for every correct order plus 20% tips for every closed table.</p>"})
}







