package main

import (
	"context"
	"github.com/iammarkps/clubreg/server/app"
	"log"
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
		log.Print("HTTP server gracefully shutdown")
	}
	if err := db.Close(); err != nil {
		e.Logger.Fatal(err)
	} else {
		log.Print("Database connection gracefully stop")
	}
}
