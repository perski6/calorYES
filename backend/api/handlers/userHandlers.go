package handlers

import (
	"../../Database"
	"context"
	"fmt"
	"github.com/labstack/echo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	//"golang.org/x/crypto/ssh/agent"
	"log"
	"net/http"
	"reflect"
)

type User struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	Nickname string             `json:"nickname" bson:"nickname"`
	Password string             `json:"password" bson:"password"`
	Age      string             `json:"age" bson:"age"`
	Height   string             `json:"height" bson:"height"`
	Weight   string             `json:"weight" bson:"weight"`
}

var CNX = Database.Connection()
var usersCollection = CNX.Database("Caloryes").Collection("Users")

func ListUsers(c echo.Context) error {

	var results []*User

	cur, err := usersCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var elem User
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

func LoginUser(c echo.Context) error {

	nickname := c.QueryParam("nickname")
	password := c.QueryParam("password")

	user := User{}

	//db check
	usersCollection.FindOne(context.TODO(), bson.M{"nickname": nickname}).Decode(&user)
	hashIsEqual := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if hashIsEqual != nil {
		return c.JSON(http.StatusUnauthorized, nil)
	} else {
		return c.JSON(http.StatusOK, user)
	}
}

func AddUser(c echo.Context) error {

	user := User{}

	//hashing users password
	password := c.QueryParam("password")
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	user.ID = primitive.NewObjectID()
	user.Nickname = c.QueryParam("nickname")
	user.Password = string(hashedPassword)
	user.Age = c.QueryParam("age")
	user.Height = c.QueryParam("height")
	user.Weight = c.QueryParam("weight")

	//check if user already exists
	empty := User{}
	check := User{}
	usersCollection.FindOne(context.TODO(), bson.M{"nickname": user.Nickname}).Decode(&check)
	if check != empty {
		return c.String(http.StatusUnprocessableEntity, "User already exists")
	}

	result, insertErr := usersCollection.InsertOne(context.TODO(), user)
	if insertErr != nil {
		return c.String(http.StatusConflict, fmt.Sprint(insertErr))
	} else {
		fmt.Println("InsertOne() result type: ", reflect.TypeOf(result))
		fmt.Println("InsertOne() API result:", result)
	}

	log.Printf("this is your user ID %s", user.ID.Hex())
	return c.String(http.StatusCreated, fmt.Sprintf("User created with ID %v", user.ID.Hex()))
}

func UpdateUser(c echo.Context) error {

	id, _ := primitive.ObjectIDFromHex(c.Param("id"))
	weight := c.QueryParam("weight")
	height := c.QueryParam("height")

	result, err := usersCollection.UpdateOne(
		context.TODO(),
		bson.M{"_id": id},
		bson.D{
			{"$set", bson.D{{"weight", weight}, {"height", height}}},
		},
	)
	if err != nil {
		log.Fatal(err)
	}
	log.Print(result)
	return c.String(http.StatusOK, " User updated")
}
