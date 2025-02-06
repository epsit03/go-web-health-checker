package main

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"time"

	"github.com/rs/cors"
)

type Response struct {
	Status string `json:"status"`
}

func checkHealth(destination, port string) string {
	address := destination + ":" + port
	timeout := 5 * time.Second
	conn, err := net.DialTimeout("tcp", address, timeout)

	if err != nil {
		return fmt.Sprintf("[DOWN] %v is unreachable. Error: %v", destination, err)
	}
	defer conn.Close()
	return fmt.Sprintf("[UP] %v is reachable from %v to %v", destination, conn.LocalAddr(), conn.RemoteAddr())
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	// Handle CORS preflight request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	url := r.URL.Query().Get("url")
	port := r.URL.Query().Get("port")
	if url == "" || port == "" {
		http.Error(w, "Missing url or port parameter", http.StatusBadRequest)
		return
	}

	status := checkHealth(url, port)
	response := Response{Status: status}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/check", healthHandler)

	// Enable CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"localhost:3000"}, // No trailing '/'
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	handler := c.Handler(mux)

	fmt.Println("Server running on :8080")
	err := http.ListenAndServe(":8080", handler)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
