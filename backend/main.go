// main.go
package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	// Add before start hook to serve the static files in production
	// and proxy to Vite dev server in development
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// Get the current environment
		env := os.Getenv("GO_ENV")

		if env == "development" {
			// In development, proxy requests to the Vite dev server
			e.Router.GET("/*", func(c echo.Context) error {
				// Skip API routes
				if len(c.Request().URL.Path) >= 4 && c.Request().URL.Path[:4] == "/api" {
					return nil
				}
				proxyURL := "http://localhost:5173" + c.Request().RequestURI
				return c.Redirect(302, proxyURL)
			})
		} else {
			// In production, serve the static files
			staticDir := filepath.Join(os.Args[0], "../dist")
			fsys := os.DirFS(staticDir)
			fileHandler := echo.StaticDirectoryHandler(fsys, false)
			e.Router.GET("/*", func(c echo.Context) error {
				// Skip API routes
				if len(c.Request().URL.Path) >= 4 && c.Request().URL.Path[:4] == "/api" {
					return nil
				}
				return fileHandler(c)
			})
		}

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
