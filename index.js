const newDeckBtn = document.getElementById("new-deck-btn")
const getCardsBtn = document.getElementById("get-cards-btn")
const cards = document.getElementById("cards")
const players = document.getElementById("players")
const yourCard = document.getElementById("your-card")
const compCard = document.getElementById("comp-card")
const remainderH1 = document.getElementById("remainder-h1")
let yourScore = 0
let compScore = 0

compCard.innerText = `Game of War`
yourCard.style.display = "none"
players.style.justifyContent = "center"

function startPosition() {
    compCard.innerText = `Game of War`
    yourCard.style.display = "none"
    players.style.justifyContent = "center"
    setTimeout(getDeck, 500)
}

async function getDeck() {
    players.style.justifyContent = "flex-start"
    yourScore = 0
    compScore = 0
    getCardsBtn.disabled = false
    newDeckBtn.disabled = true
    compCard.innerText = `Computer : 0`
    yourCard.style.display = "block"
    // yourCard.style.position = "fixed"
    yourCard.innerText = `You : 0`
    cards.innerHTML = ``
    deckId = ``
    cardsHtml = ``
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    getCards()
}

async function getCards() {
    let values = []
    cardsHtml = ``
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    let cardsArr = data.cards
    remainderH1.innerText = `Cards remaining: ${data.remaining}`
    cardsArr.map(card => {
        card.value == "JACK" ? values.push(11) 
        : card.value == "QUEEN" ? values.push(12) 
        : card.value == "KING" ? values.push(13) 
        : card.value == "ACE" ? values.push(14) 
        : values.push(card.value)
        cardsHtml += `<img class="card" src="${card.image}">`
    })
    cards.innerHTML = cardsHtml
    updateScore(values)
    noCardsLeft(data)
}

function updateScore(values) {
    if (values[0] > values[1]) {
        compScore += 1
        compCard.innerText = `Computer : ${compScore}`
    } else if (values[0] < values[1]) {
        yourScore += 1
        yourCard.innerText = `You : ${yourScore}`
    }
}

function noCardsLeft(data) {
    if (data.remaining == 0) {
        console.log("Going in the if");
        getCardsBtn.disabled = true
        newDeckBtn.disabled = false
        if (compScore > yourScore) {
            compCard.innerText = `Computer wins with ${compScore} against ${yourScore}`
            players.style.justifyContent = "center"
            yourCard.style.display = "none"
        } else if (compScore < yourScore) {
            compCard.innerText = `You win with  ${yourScore} against ${compScore}`
            players.style.justifyContent = "center"
            yourCard.style.display = "none"
        } else {
            compCard.innerText = `It's a tie!`
            players.style.justifyContent = "center"
            yourCard.style.display = "none"
        }  
    }
}

newDeckBtn.disabled = false
getCardsBtn.disabled = true
newDeckBtn.addEventListener("click", startPosition)
getCardsBtn.addEventListener("click", getCards)