package redis

import (
	"log"

	"github.com/go-redis/redis/v8"
	"golang.org/x/net/context"
)

var Ctx = context.Background()
var Client *redis.Client

func InitRedis() {
    Client = redis.NewClient(&redis.Options{
        Addr:     "redis_add",
        Password: "redis_pwd",
        DB:       0,
    })

    if err := Client.Ping(Ctx).Err(); err != nil {
        log.Fatalf("Failed to connect to Redis: %v", err)
    }
    log.Println("Connected to Redis")
}
