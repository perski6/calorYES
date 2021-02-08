package middlewares

import (
"github.com/labstack/echo"
"github.com/labstack/echo/middleware"
"net/http"
)

func SetMainMiddlewares(e *echo.Echo)  {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))
}