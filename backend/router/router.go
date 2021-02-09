package router

import (
	"../api"
	"../api/middlewares"
	"github.com/labstack/echo"
)

func New() *echo.Echo {

	e := echo.New()

	//set middlewares
	middlewares.SetMainMiddlewares(e)

	//set main routes
	api.MainGroup(e)
	api.FoodGroup(e)
	api.BalanceGroup(e)
	return e
}
