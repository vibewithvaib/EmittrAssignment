package handlers

import (
	"card-game-backend/internal/redis"
	"encoding/json"
	"net/http"
)

// var ctx = redis.Ctx

func StartHandler(w http.ResponseWriter, r *http.Request) {
    var request struct {
        Username string `json:"username"`
    }

    if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }

    if request.Username == "" {
        http.Error(w, "Username is required", http.StatusBadRequest)
        return
    }

    if _, err := redis.Client.HGet(ctx, "scores", request.Username).Result(); err == nil {
        http.Error(w, "Username already taken", http.StatusConflict)
        return
    }

    if err := redis.Client.HSetNX(ctx, "scores", request.Username, 0).Err(); err != nil {
        http.Error(w, "Failed to create user", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{
        "message": "User started successfully",
    })
}
