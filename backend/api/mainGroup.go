package api

import (
	"../api/handlers"
	"github.com/labstack/echo"
)

func MainGroup(e *echo.Echo) {
	e.GET("/users", handlers.ListUsers)
	e.GET("/login", handlers.LoginUser)

	e.POST("/addUser", handlers.AddUser)

	e.PUT("/user/:id", handlers.UpdateUser)
}

func FoodGroup(e *echo.Echo) {
	e.GET("/foods", handlers.ListFood)

	e.POST("/addFood", handlers.AddFood)
}

func BalanceGroup(e *echo.Echo) {
	e.GET("/userBalance/:user_id", handlers.GetUserBalance)

	e.POST("addBalance", handlers.AddBalance)
}
