package handlers

import (
	"context"
	"fmt"
	"github.com/labstack/echo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"net/http"
	"reflect"
	"time"
)

type Balance struct {
	Date            primitive.DateTime `json:"date" bson:"date"`
	Activity        string             `json:"activity" bson:"activity"`
	CaloriesBalance string             `json:"calories_balance" bson:"calories_balance"`
	UserId          primitive.ObjectID `json:"user_id" bson:"user_id"`
}

var balanceCollection = CNX.Database("Caloryes").Collection("Balance")

func GetUserBalance(c echo.Context) error {

	var results []*Balance

	userId, _ := primitive.ObjectIDFromHex(c.Param("user_id"))

	cur, err := balanceCollection.Find(context.TODO(), bson.M{"user_id": userId})
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var elem Balance
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, &elem)
	}
	fmt.Print(results)

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	_ = cur.Close(context.TODO())
	return c.JSON(http.StatusOK, results)
}

func AddBalance(c echo.Context) error {

	id, _ := primitive.ObjectIDFromHex(c.QueryParam("user_id"))

	balance := Balance{
		Date:            primitive.NewDateTimeFromTime(time.Now()),
		Activity:        c.QueryParam("activity"),
		CaloriesBalance: c.QueryParam("calories_balance"),
		UserId:          id,
	}

	fmt.Printf("balance %v %v %v %v", balance.Date, balance.Activity, balance.CaloriesBalance, balance.UserId)

	result, insertErr := balanceCollection.InsertOne(context.TODO(), balance)
	if insertErr != nil {
		return c.String(http.StatusConflict, fmt.Sprint(insertErr))
	} else {
		fmt.Println("InsertOne() result type: ", reflect.TypeOf(result))
		fmt.Println("InsertOne() API result:", result)
	}

	return c.String(http.StatusCreated, fmt.Sprint("Balance added"))
}
