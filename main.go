// backend/main.go
package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

type Config struct {
	ViteDevServerURL string
	FrontendURL      string
	Environment      string
	Port             string
	DataDir          string
}

func loadConfig() Config {
	// Get the absolute path of the current working directory
	absCurrentDir, err := filepath.Abs(".")
	if err != nil {
		log.Fatal(err)
	}

	config := Config{
		ViteDevServerURL: "http://localhost:5173",
		FrontendURL:      "http://localhost:8090",
		Environment:      "development",
		Port:             "8090",
		DataDir:          filepath.Join(absCurrentDir, "pb_data"), // Use absolute path
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

	if dataDir := os.Getenv("PB_DATA_DIR"); dataDir != "" {
		// Convert any provided data directory to absolute path
		absDataDir, err := filepath.Abs(dataDir)
		if err != nil {
			log.Fatal(err)
		}
		config.DataDir = absDataDir
	}

	return config
}

func main() {
	config := loadConfig()

	// Create data directory if it doesn't exist
	if err := os.MkdirAll(config.DataDir, 0755); err != nil {
		log.Fatal(err)
	}

	// Initialize PocketBase with the data directory
	app := pocketbase.New()

	// IMPORTANT: Set the data directory explicitly
	if err := app.RootCmd.PersistentFlags().Set("dir", config.DataDir); err != nil {
		log.Fatal(err)
	}

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
