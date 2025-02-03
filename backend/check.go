package main

import (
	"fmt"
	"net"
	"time"
)

func Check(destination string, port string) string {
	address := destination + ":" + port
	timeout := time.Duration(5 * time.Second)
	conn, err := net.DialTimeout("tcp", address, timeout)
	var status string

	if err != nil {
		status = fmt.Sprintf("[DOWN] %v is unreachable,\nError: %v", destination, err)
	} else {
		status = fmt.Sprintf("[UP] %v is reachable,\nFrom: %v to %v", destination, conn.LocalAddr(), conn.RemoteAddr())
		conn.Close() // Close connection to prevent leaks
	}

	return status
}

// func main() {
// 	fmt.Println(Check("google.com", "80"))
// }