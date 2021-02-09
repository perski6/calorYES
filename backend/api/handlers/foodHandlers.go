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

type Food struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id"`
	Name           string             `json:"name" bson:"name"`
	SugarsPer100   string             `json:"sugars_per_100" bson:"sugars_per_100"`
	ProteinPer100  string             `json:"protein_per_100" bson:"protein_per_100"`
	CarbsPer100    string             `json:"carbs_per_100" bson:"carbs_per_100"`
	CaloriesPer100 string             `json:"calories_per_100" bson:"calories_per_100"`
}

var foodCollection = CNX.Database("Caloryes").Collection("Food")

func ListFood(c echo.Context) error {

	var results []*Food

	cur, err := foodCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var elem Food
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

func AddFood(c echo.Context) error {
	food := Food{
		ID:             primitive.NewObjectID(),
		Name:           c.QueryParam("name"),
		SugarsPer100:   c.QueryParam("sugars_per_100"),
		ProteinPer100:  c.QueryParam("protein_per_100"),
		CarbsPer100:    c.QueryParam("carbs_per_100"),
		CaloriesPer100: c.QueryParam("calories_per_100"),
	}

	result, insertErr := foodCollection.InsertOne(context.TODO(), food)
	if insertErr != nil {
		return c.String(http.StatusConflict, fmt.Sprint(insertErr))
	} else {
		fmt.Println("InsertOne() result type: ", reflect.TypeOf(result))
		fmt.Println("InsertOne() API result:", result)
	}

	log.Printf("this is your user ID %s", food.ID.Hex())
	return c.String(http.StatusCreated, fmt.Sprintf("User created with ID %v", food.ID.Hex()))

}
