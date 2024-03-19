class Game {
    constructor(deck) {
        // starts players with zerpo points
        this.player1Points = 0
        this.player2Points = 0
        this.deck = deck
    }


    points() {
        // compares player points and prints out which player is winning
        if (this.player1Points > this.player2Points) {
            console.log("Player 1 wins with " + this.player1Points + " points!");
        } else if (this.player1Points < this.player2Points) {
            console.log("Player 2 wins with " + this.player2Points + " points!");
        } else {
            console.log("It's a tie!");
        }
    }


    gameOver() {
        // Check if the game is over (i.e., if the deck is empty)
        if (this.deck.cards.length === 0) {
            // Determine the winner based on the points
            let winner = '';
            if (this.player1Points > this.player2Points) {
                winner = 'Player 1';
            } else if (this.player1Points < this.player2Points) {
                winner = 'Player 2';
            } else {
                winner = 'It\'s a tie!';
            }
    
            // Print the winner
            console.log("Game over. The winner of the game with the highest points is " + winner);
        } 
    }    
    

    playGame() {
        while (this.deck.cards.length > 0) {
            const response = prompt("Do you want to play the game?");
    
            if (response.toLocaleLowerCase() === "yes" || "yeah" || "y") {
                let card1 = this.deck.drawCard();
                let card2 = this.deck.drawCard();
                this.deck.shuffleDeck()
    
                // Check if card1 and card2 are not null before proceeding
                if (card1 && card2) {
                    card1.cardVsCard(card2, this);
                } else {
                    console.log("One of the cards is null. Ending the game.");
                    break;
                }
            } else {
                break; 
            }
        }
    }    
}


class Deck {
    constructor() {
        this.cards = []
        this.initializeDeck()
    }


    initializeDeck() {
        // creates an array of the card classifications
        const suits = ['club', 'diamonds', 'hearts', 'spades']
        // creates an array of the numberical value of the card
        const ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13]
        // creates a new constant named suit and loops through the suits array
        for (const suit of suits) {
            // within the loop
            // creates a new constant named rank and loops through the ranks array
            for (const rank of ranks) {
                // creates a new constant named card and creates a new Card object using the current rank and suit values
                const card = new Card(suit, rank)
                // pushes this card object into the this.cards array, which represents the deck
                this.cards.push(card)
            }
        }
    }


    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    
    drawCard() {
        // creates if statememnt
        // checks if the length of the cards array is 0
        if (this.cards.length === 0) {
            console.log("Deck is empty. Game over.")
            return null
        }
        // removes and returns the top card from the deck
        return this.cards.pop()
    }

}


class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    cardVsCard(card2, game) {
        // compare player cards and adds a point to player if they won
        if (this.rank > card2.rank) {
            console.log("Player 1 wins a point!");
            game.player1Points++;
        } else if (this.rank < card2.rank) {
            console.log("Player 2 wins a point!");
            game.player2Points++;
        } else {
            // If ranks are equal, compare suits
            if (this.suit === card2.suit) {
                console.log("It's a tie; no point for either player");
            } else {
                // Define the suit order
                const suitOrder = ['clubs', 'diamonds', 'hearts', 'spades'];
                // Get the index of the suits in the order
                const thisSuitIndex = suitOrder.indexOf(this.suit);
                const card2SuitIndex = suitOrder.indexOf(card2.suit);

                // Compare the indices to determine the winner
                if (thisSuitIndex < card2SuitIndex) {
                    console.log("Player 1 wins a point!");
                    game.player1Points++;
                } else {
                    console.log("Player 2 wins a point!");
                    game.player2Points++;
                }
            }
        }
    }
}


class Players {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
    }
}


let game = new Game(new Deck());
game.playGame();
game.gameOver()

