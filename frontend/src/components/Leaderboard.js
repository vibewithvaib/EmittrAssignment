import React from "react";

const Leaderboard = ({ isOpen, onClose, leaderboard }) => {
  // Filter out players who lost the game
  const sortedLeaderboard = (leaderboard || [])
    .filter((player) => player.status !== "lost") // Exclude players who lost
    .sort((a, b) => a.moves - b.moves); // Sort players by number of moves (ascending)

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <ul>
            {sortedLeaderboard.length === 0 ? (
              <li className="text-center">No players yet</li>
            ) : (
              sortedLeaderboard.map((player, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{player.username}:</span>{" "}
                  {player.moves} moves
                </li>
              ))
            )}
          </ul>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Leaderboard;
