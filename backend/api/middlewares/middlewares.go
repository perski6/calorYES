package middlewares

import (
	//"context"
	//"fmt"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net/http"

	//"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	//"golang.org/x/crypto/bcrypt"
	//"net/http"
	"pizzeriaServer/Database"
)

var CNX = Database.Connection()
var usersCollection = CNX.Database("Caloryes").Collection("Users")

type User struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	Nickname string             `json:"nickname" bson:"nickname"`
	Password string             `json:"password" bson:"password"`
	Age      string             `json:"age" bson:"age"`
	Height   string             `json:"height" bson:"height"`
	Weight   string             `json:"weight" bson:"weight"`
}

func SetMainMiddlewares(e *echo.Echo) {
	//	e.Use(middleware.BasicAuth(func(nickname, password string, c echo.Context) (bool,error) {
	//		empty := User{}
	//		check := User{}
	//		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	//		if err != nil {
	//			fmt.Print(err)
	//		}
	//		//db check
	//		usersCollection.FindOne(context.TODO(), bson.M{"nickname": nickname,"password":hashedPassword}).Decode(&check)
	//		if check != empty {
	//			return true,nil
	//		}
	//		return false, nil
	//	}))

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))
}
