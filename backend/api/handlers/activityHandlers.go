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
)

type Activity struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id"`
	Name           string             `json:"name" bson:"name"`
	CaloriesPerMin string             `json:"calories_per_min" bson:"calories_per_min"`
}

var activitiesCollection = CNX.Database("Caloryes").Collection("Activities")

func ListActivities(c echo.Context) error {

	var results []*Activity

	cur, err := activitiesCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var elem Activity
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	_ = cur.Close(context.TODO())
	return c.JSON(http.StatusOK, results)
}

func AddActivity(c echo.Context) error {
	food := Activity{
		ID:             primitive.NewObjectID(),
		Name:           c.QueryParam("name"),
		CaloriesPerMin: c.QueryParam("calories_per_min"),
	}

	result, insertErr := activitiesCollection.InsertOne(context.TODO(), food)
	if insertErr != nil {
		return c.String(http.StatusConflict, fmt.Sprint(insertErr))
	} else {
		fmt.Println("InsertOne() result type: ", reflect.TypeOf(result))
		fmt.Println("InsertOne() API result:", result)
	}

	log.Printf("this is your activity ID %s", food.ID.Hex())
	return c.String(http.StatusCreated, fmt.Sprintf("Activity created with ID %v", food.ID.Hex()))

}
