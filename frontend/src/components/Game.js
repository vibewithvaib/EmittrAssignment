import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawCard, restartGame } from "../features/gameSlice";
import Leaderboard from "./Leaderboard"; 
import { saveScore } from "../services/api"; 
import { fetchLeaderboard } from "../services/api"; 

import { logout } from "../features/userSlice"; 
import { useNavigate } from "react-router-dom"; 

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false); 
  const [leaderboard, setLeaderboard] = useState([]); 

  
  const { deck, currentCard, defuseCount, status, message, moves,score } = useSelector(
    (state) => state.game
  );
  const username = useSelector((state) => state.user.username);

  const openLeaderboard = () => setIsLeaderboardOpen(true);
  const closeLeaderboard = () => setIsLeaderboardOpen(false);

  useEffect(() => {
    if (status === "won" || status === "lost") {
      
      const gameData = {
        deck,
        defuseCount,
        currentCard,
        status,
        moves,
        score
      };

     
      if (status === "won" || status === "lost") {
        saveScore(username, moves, score) 
          .then(() => {
            console.log("Score saved successfully.");
            fetchLeaderboard()
              .then((data) => {
                setLeaderboard(data); 
              })
              .catch((err) => console.error("Error fetching leaderboard:", err));
          })
          .catch((err) => console.error("Error saving score:", err));
      }
    }
  }, [status, deck, defuseCount, currentCard, username, moves, score]);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("userToken"); 
    sessionStorage.removeItem("userToken"); 

    localStorage.removeItem("userPreferences");

    navigate("/"); 
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Exploding Cats Game</h1>

      
      <div className="flex justify-center items-center w-48 h-48 bg-yellow-400 rounded-xl shadow-xl text-6xl mb-6">
        {currentCard || "None"}
      </div>

   
      {status === "ready" && (
        <p className="text-lg text-center mb-4">Press "Draw Card" to start the game!</p>
      )}

      {status === "ready" && (
        <div className="text-center mb-4">
          <h2 className="text-xl">Current Card</h2>
          <p>Remaining Cards: {deck.length}</p>
          <p>Defuse Count: {defuseCount}</p>
        </div>
      )}

      <p className="text-md text-center mt-4">{message}</p>

      <div className="mt-6 flex justify-center items-center space-x-4">
        {status === "ready" && (
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            onClick={() => dispatch(drawCard())}
          >
            Draw Card
          </button>
        )}

        {(status === "lost" || status === "won" || status === "ready") && (
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => dispatch(restartGame())}
          >
            Restart Game
          </button>
        )}

        {(status === "won" || status === "lost") && (
          <button
            className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
            onClick={openLeaderboard}
          >
            View Leaderboard
          </button>
        )}
      </div>

      {username && (
        <button
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

      <Leaderboard isOpen={isLeaderboardOpen} onClose={closeLeaderboard} leaderboard={leaderboard} />
    </div>
  );
};

export default Game;
