package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo-contrib/session"

	"github.com/iammarkps/clubreg/server/models"
	"github.com/labstack/echo/v4"
)

//User handle returning user info to front-end
func (handler *Handler) User(c echo.Context) error {
	sess, _ := session.Get("Session", c)
	User := &models.User{}
	ID := fmt.Sprintf("%v", sess.Values["user"])

	log.Print(sess.Values)

	if handler.DB.Where(&models.User{StudentID: ID}).First(User).RecordNotFound() {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	return c.JSON(http.StatusOK, User)
}
