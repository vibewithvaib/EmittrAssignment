import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from './features/userSlice';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import './index.css';
import { startUser } from './services/api';

function App() {
  const [nameInput, setNameInput] = useState('');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const username = useSelector((state) => state.user.username);

  const handlestart = () => {
    if (nameInput.trim()) {
      dispatch(setUsername(nameInput));
      startUser(nameInput) 
        .then(() => {
          navigate('/game'); 
        })
        .catch((err) => {
          alert("Username has already taken")
          navigate('/')
        });
    } else {
      alert("Please enter a username");
    }
  };


  const toggleLeaderboard = () => {
    setIsLeaderboardOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!username) {
      navigate('/'); 
    }
  }, [username, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500 flex flex-col items-center justify-center">
      <Leaderboard isOpen={isLeaderboardOpen} onClose={toggleLeaderboard} />
      <Routes>
        <Route
          path="/"
          element={
             (
              <div className="text-center">
             
              <h1 className="text-6xl font-bold text-white mb-6">
                Start the Game!
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                  Dive into the fun and challenge yourself to beat the leaderboard!
                  
              </p><p className="text-lg text-gray-200 mb-8">(Enter your unique cool name!!)</p>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="mb-4 px-4 py-2 rounded border-2 border-gray-300 focus:border-indigo-500"
                placeholder="Enter your username"
                />
                
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={handlestart}
              >
              Start Game
              </button>
            </div>
            ) 
          }
        />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
