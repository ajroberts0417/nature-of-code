
// What is the probability of drawing two aces in a row from a deck of fifty-two cards?

let deckSize = 52
let aces = 4

const firstAceProbability = aces/deckSize

aces = aces - 1 // remove an ace from the number of aces
deckSize = deckSize - 1 // remove an card from the number of cards in the deck

const secondAceProbability = aces/deckSize

// the probability of two events in sequence is the product of their individual probabilities
const probabilityOfBoth = firstAceProbability*secondAceProbability

console.log(probabilityOfBoth*100)