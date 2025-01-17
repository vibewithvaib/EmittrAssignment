import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const startUser = async (username) => {
  const response = await axios.post(`${API_BASE}/start`, { username });
  return response.data;
};

export const fetchLeaderboard = async () => {
  const response = await axios.get(`${API_BASE}/leaderboard`);
  return response.data;
};

export const saveScore = async (username, moves,score) => {
  const response = await axios.post(`${API_BASE}/game/updateScore`, { username, moves,score });
  return response.data;
};
