// embed_prod.go
//go:build production

package main

import (
	"embed"
	"io"
	"io/fs"
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
)

//go:embed dist/*
var distFS embed.FS

// ServeViteAssets serves the embedded Vite assets in production
func ServeViteAssets(e *echo.Echo) {
	fsys, err := fs.Sub(distFS, "dist")
	if err != nil {
		println("Failed to get filesystem:", err.Error())
		return
	}

	fileServer := http.FileServer(http.FS(fsys))

	e.Any("/*", func(c echo.Context) error {
		path := c.PathParam("*")

		// Check if the file exists
		if path != "" {
			if _, err := fsys.Open(path); err == nil {
				// File exists, serve it directly
				fileServer.ServeHTTP(c.Response().Writer, c.Request())
				return nil
			}
		}

		// If no file is found or path is empty, serve index.html
		c.Response().Header().Set("Content-Type", "text/html")
		indexFile, err := fsys.Open("index.html")
		if err != nil {
			println("Failed to open index.html:", err.Error())
			return echo.NewHTTPError(http.StatusNotFound)
		}
		defer indexFile.Close()

		http.ServeContent(c.Response().Writer, c.Request(), "index.html", time.Now(), indexFile.(io.ReadSeeker))
		return nil
	})
}
