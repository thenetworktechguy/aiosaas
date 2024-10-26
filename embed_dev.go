// embed_dev.go
//go:build !production

package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/labstack/echo/v5"
)

// ServeViteAssets forwards requests to the Vite dev server in development mode
func ServeViteAssets(e *echo.Echo) {
	target, _ := url.Parse("http://localhost:5173")
	proxy := httputil.NewSingleHostReverseProxy(target)

	e.Any("/*", func(c echo.Context) error {
		c.Response().Header().Set("Access-Control-Allow-Origin", "*")
		c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Response().Header().Set("Access-Control-Allow-Headers", "*")

		if c.Request().Method == "OPTIONS" {
			return c.NoContent(http.StatusOK)
		}

		proxy.ServeHTTP(c.Response().Writer, c.Request())
		return nil
	})
}
