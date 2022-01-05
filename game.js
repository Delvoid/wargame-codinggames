// const player1Hand = [
//   10, 13, 6, 10, 8, 14, 12, 3, 7, 13, 9, 2, 11, 13, 3, 2, 12, 14, 11, 7, 13, 10,
//   4, 14, 5, 5,
// ]
// const player2Hand = [
//   2, 9, 8, 4, 5, 14, 11, 12, 7, 5, 4, 6, 6, 12, 9, 10, 4, 11, 6, 3, 8, 3, 7, 9,
//   8, 2,
// ]
const player1Hand = []
const player2Hand = []
let warDeck1 = []
let warDeck2 = []

const formatCard = (card) => {
  if (card[0] === 'J') return 11
  if (card[0] === 'Q') return 12
  if (card[0] === 'K') return 13
  if (card[0] === 'A') return 14

  let matches = card.match(/(\d+)/)
  return +matches[0]
}

const n = parseInt(readline()) // the number of cards for player 1
for (let i = 0; i < n; i++) {
  let cardp1 = readline() // the n cards of player 1
  const newCard = formatCard(cardp1)
  player1Hand.push(newCard)
}
const m = parseInt(readline()) // the number of cards for player 2
for (let i = 0; i < m; i++) {
  let cardp2 = readline() // the m cards of player 2
  const newCard = formatCard(cardp2)
  player2Hand.push(newCard)
}

const war = () => {
  //take the cards from each deck and push them to the war array
  for (var i = 0; i < 3; i++) {
    warDeck1.push(player1Hand.shift())
    warDeck2.push(player2Hand.shift())
  }
}

const compare = (player1, player2) => {
  if (player1 > player2) {
    //pushes current cards from each hand to the back of the player's hand
    player1Hand.push(...warDeck1, ...warDeck2)
  }
  if (player1 < player2) {
    //pushes current cards from each hand to the back of the player's hand
    player2Hand.push(...warDeck1, ...warDeck2)
  }
  warDeck1 = []
  warDeck2 = []
}

let round = 1

while (true) {
  //draw player1 card
  let card1 = player1Hand.shift()
  //draw player 2 card
  let card2 = player2Hand.shift()

  warDeck1.push(card1)
  warDeck2.push(card2)

  if (card1 !== card2) {
    compare(card1, card2)
    // player 2 wins
    if (player1Hand.length === 0) {
      console.log(`2 ${round}`)
      return
    }
    //player1 wins
    if (player2Hand.length === 0) {
      console.log(`1 ${round}`)
      break
    }
    round++
  }

  if (card1 === card2) {
    if (player1Hand.length < 3 || player2Hand.length < 3) {
      console.log('PAT')
      break
    }
    war()
  }
}
