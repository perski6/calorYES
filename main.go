package main

import (
	"fmt"
	"net/http")

func handlerFunc(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprint(w, "<h1>Welcome</h1>")
}