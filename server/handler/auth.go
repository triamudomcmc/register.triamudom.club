package handler

import (
	"net/http"
	"time"

	"github.com/gorilla/sessions"
	"github.com/iammarkps/clubreg/server/models"
	"github.com/iammarkps/clubreg/server/utils"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

type loginReqBody struct {
	StudentID string `json:"student_id"`
	Password  string `json:"password"`
}

//Login handles login req
func (handler *Handler) Login(c echo.Context) error {
	u := new(loginReqBody)
	if err := c.Bind(&u); err != nil {
		return err
	}

	User := &models.User{}

	if handler.DB.Where(&models.User{StudentID: u.StudentID}).First(User).RecordNotFound() || !utils.CheckPasswordHash(u.Password, User.Password) {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sess, _ := session.Get("Session", c)
	sess.Options = &sessions.Options{
		Path:   "/",
		MaxAge: 86400 * 7,
		// HttpOnly: true,
		// Secure:   true,
	}

	sess.Values["user"] = User.StudentID
	sess.Values["timestamp"] = time.Now()

	err := sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Cannot logged you in")
	}

	return c.JSON(http.StatusOK, User)
}

//Logout handles logout
func (handler *Handler) Logout(c echo.Context) error {
	sess, _ := session.Get("Session", c)
	sess.Options.MaxAge = -1

	err := sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Cannot logged you out")
	}

	return c.JSON(http.StatusOK, "Logged out")
}
