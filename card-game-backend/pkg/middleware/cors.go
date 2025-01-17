package middleware

import (
	"net/http"

	"github.com/gorilla/handlers"
)

func CORS(next http.Handler) http.Handler {
    return handlers.CORS(
        handlers.AllowedOrigins([]string{"*"}),
        handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
        handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
    )(next)
}
