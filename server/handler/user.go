package handler

import (
	"net/http"

	"github.com/labstack/echo-contrib/session"

	"github.com/iammarkps/clubreg/server/models"
	"github.com/labstack/echo/v4"
)

//User handle returning user info to front-end
func (handler *Handler) User(e echo.Context) error {
	sess, _ := session.Get("SESSION", e)
	User := &models.User{}
	userID := sess.Values["userID"].(uint16)
	handler.DB.Where(&models.User{StudentID: userID}).First(User)

	if User == (&models.User{}) {
		return e.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	return e.JSON(http.StatusOK, User)
}
