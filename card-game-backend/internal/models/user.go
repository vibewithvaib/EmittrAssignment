package models

type StartRequest struct {
	Username string `json:"username"`
}

type UpdateScoreRequest struct {
	Username string `json:"username"`
	Moves    int    `json:"moves"`
	Score    int    `json:"score"`
}
