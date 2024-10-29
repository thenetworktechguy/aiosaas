package main

import (
	"log"
	"net/http"
	"os"
	"pocket-react/backend"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	config := backend.LoadConfig()

	if err := os.MkdirAll(config.DataDir, 0755); err != nil {
		log.Fatal(err)
	}

	app := pocketbase.New()

	if err := app.RootCmd.PersistentFlags().Set("dir", config.DataDir); err != nil {
		log.Fatal(err)
	}

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/health", func(c echo.Context) error {
			return c.JSON(http.StatusOK, map[string]string{
				"status": "healthy",
			})
		})

		ServeViteAssets(e.Router)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
