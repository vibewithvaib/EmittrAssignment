package main

import (
	"log"
	"net/http"

	"card-game-backend/internal/handlers"
	"card-game-backend/internal/redis"
	"card-game-backend/pkg/middleware"

	// "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
    redis.InitRedis() // Initialize Redis client

    r := mux.NewRouter()
    r.HandleFunc("/start", handlers.StartHandler).Methods("POST")
    r.HandleFunc("/leaderboard", handlers.LeaderboardHandler).Methods("GET")
    r.HandleFunc("/game/updateScore", handlers.UpdateScoreHandler).Methods("POST")

    corsHandler := middleware.CORS(r)

    log.Println("Server running on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", corsHandler))
}
