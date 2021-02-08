package api

import (
	"../api/handlers"
	"github.com/labstack/echo"
)

func MainGroup(e *echo.Echo)  {
	e.GET("/users", handlers.ListUsers)
	e.GET("/user/:id", handlers.GetUser)
	e.POST("addUser",handlers.AddUser)
}