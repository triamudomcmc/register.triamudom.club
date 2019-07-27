package main

import (
	"context"
	"fmt"
	"github.com/iammarkps/clubreg/server/app"
	"os"
	"os/signal"
	"syscall"
	"time"
)


func main() {
	e, db := app.New()

	go func() {
		if err := e.Start(":1323"); err != nil {
			e.Logger.Info("🔥🔥🔥")
		}
	}()

	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	} else {
		fmt.Println("HTTP server gracefully shutdown at", time.Now())
	}
	if err := db.Close(); err != nil {
		e.Logger.Fatal(err)
	} else {
		fmt.Println("Database connection gracefully stop at", time.Now())
	}
}
