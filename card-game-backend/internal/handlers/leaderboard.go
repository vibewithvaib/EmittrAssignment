package handlers

import (
	"card-game-backend/internal/redis"
	"encoding/json"
	"net/http"
)

var ctx = redis.Ctx

func LeaderboardHandler(w http.ResponseWriter, r *http.Request) {
	// Fetch scores from Redis
	scores, err := redis.Client.HGetAll(ctx, "scores").Result()
	if err != nil {
		http.Error(w, "Failed to fetch scores", http.StatusInternalServerError)
		return
	}

	// Fetch moves from Redis
	moves, err := redis.Client.HGetAll(ctx, "moves").Result()
	if err != nil {
		http.Error(w, "Failed to fetch moves", http.StatusInternalServerError)
		return
	}

	// Prepare leaderboard data
	leaderboard := []map[string]interface{}{}
	for user, score := range scores {
		moveCount := moves[user]
		leaderboard = append(leaderboard, map[string]interface{}{
			"username": user,
			"score":    score,
			"moves":    moveCount,
		})
	}

	// Send response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(leaderboard)
}
