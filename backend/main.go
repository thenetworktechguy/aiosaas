// backend/main.go
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

type Config struct {
	ViteDevServerURL string
	FrontendURL      string
	Environment      string
	Port             string
}

func loadConfig() Config {
	config := Config{
		ViteDevServerURL: "http://localhost:5173",
		FrontendURL:      "http://localhost:8090",
		Environment:      "development",
		Port:             "8090",
	}

	if env := os.Getenv("GO_ENV"); env != "" {
		config.Environment = env
	}

	if url := os.Getenv("VITE_DEV_URL"); url != "" {
		config.ViteDevServerURL = url
	}

	if url := os.Getenv("FRONTEND_URL"); url != "" {
		config.FrontendURL = url
	}

	if port := os.Getenv("PORT"); port != "" {
		config.Port = port
	}

	return config
}

func main() {
	config := loadConfig()

	app := pocketbase.New()

	// Set up routes and initialize collections
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		e.Router.GET("/health", func(c echo.Context) error {
			return c.JSON(http.StatusOK, map[string]string{
				"status": "healthy",
			})
		})

		if err := setupRoutes(e.Router, config); err != nil {
			log.Fatal(err)
		}

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
