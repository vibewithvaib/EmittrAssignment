import { createSlice } from '@reduxjs/toolkit';



const initialDeck = ["😼", "🙅‍♂️", "🔀", "💣", "😼"];

const shuffleDeck = (deck) => {
    return [...deck].sort(() => Math.random() - 0.5);
};

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        deck: shuffleDeck(initialDeck),
        defuseCount: 0,
        currentCard: null,
        status: 'ready', 
        message: '',
        moves: 0,
        score:0
    },
    reducers: {
        drawCard: (state) => {
            // state.deck.length = 0---testing
            if (state.deck.length === 0) {
                state.status = 'won';
                state.message = 'Congratulations! You have drawn all the cards and won the game.';
                state.score = 1
                return;
            }

            const card = state.deck.pop();
            state.currentCard = card;

            switch (card) {
                case "😼":
                    state.message = 'You drew a Cat card! Keep going!';
                    state.moves+=1
                    break;
                case "🙅‍♂️":
                    state.defuseCount += 1;
                    state.message = 'You drew a Defuse card! It will save you from a bomb.';
                    state.moves+=1
                    break;
                case "🔀":
                    state.deck = shuffleDeck(initialDeck);
                    state.message = 'You drew a Shuffle card! The deck is reshuffled.';
                    state.moves+=1
                    break;
                case "💣":
                    if (state.defuseCount > 0) {
                        state.defuseCount -= 1;
                        state.message = 'You drew a Bomb! Luckily, you had a Defuse card to save you!';
                    } else {
                        
                        state.score = 0
                        state.status = 'lost';
                        state.message = 'Boom! You drew a Bomb and lost the game.';
                    }
                    break;
                default:
                    state.message = 'Unknown card drawn!';
            }
        },

        restartGame: (state) => {
            state.deck = shuffleDeck(initialDeck);
            state.defuseCount = 0;
            state.currentCard = null;
            state.status = 'ready';
            state.message = 'The game has been restarted. Good luck!';
        }
    }
});

export const { drawCard, restartGame } = gameSlice.actions;
export default gameSlice.reducer;
