package handlers

import (
	"card-game-backend/internal/redis"
	"encoding/json"
	"fmt"
	"net/http"
)

func UpdateScoreHandler(w http.ResponseWriter, r *http.Request) {
	// Define the request structure
	var request struct {
		Username string `json:"username"`
		Moves    int    `json:"moves"`
		Score    int    `json:"score"`
	}

	// Decode the request body
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Validate input
	if request.Username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	fmt.Printf("Received data: Username=%s, Moves=%d, Score=%d\n", request.Username, request.Moves, request.Score)

	// Update score in Redis
	err := redis.Client.HSet(ctx, "scores", request.Username, request.Score).Err()
	if err != nil {
		http.Error(w, "Failed to update score", http.StatusInternalServerError)
		return
	}

	// Update moves in Redis
	err = redis.Client.HSet(ctx, "moves", request.Username, request.Moves).Err()
	if err != nil {
		http.Error(w, "Failed to update moves", http.StatusInternalServerError)
		return
	}

	// Send success response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Score and moves updated successfully",
	})
}
