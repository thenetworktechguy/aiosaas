package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v5"
)

func setupRoutes(e *echo.Echo, config Config) error {
	if config.Environment == "development" {
		// Parse the Vite dev server URL
		target, err := url.Parse(config.ViteDevServerURL)
		if err != nil {
			return err
		}

		// Create a reverse proxy
		proxy := httputil.NewSingleHostReverseProxy(target)

		// Optional: Modify the proxy director to adjust headers if needed
		originalDirector := proxy.Director
		proxy.Director = func(req *http.Request) {
			originalDirector(req)
			req.Host = target.Host
		}

		e.GET("/*", func(c echo.Context) error {
			path := c.Request().URL.Path
			if len(path) >= 4 && (path[:4] == "/api" || path[:3] == "/ws") {
				// Skip handling and pass to the next handler
				return nil
			}

			// Serve the request using the proxy
			proxy.ServeHTTP(c.Response().Writer, c.Request())
			return nil
		})
	} else {
		staticDir := filepath.Join(os.Args[0], "../dist")
		fsys := os.DirFS(staticDir)
		fileHandler := echo.StaticDirectoryHandler(fsys, false)
		e.GET("/*", func(c echo.Context) error {
			path := c.Request().URL.Path
			if len(path) >= 4 && (path[:4] == "/api" || path[:3] == "/ws") {
				// Skip handling and pass to the next handler
				return nil
			}
			return fileHandler(c)
		})
	}

	return nil
}
