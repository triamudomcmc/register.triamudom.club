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

type (
	login struct {
		StudentID string `json:"student_id"`
		Password  string `json:"password"`
	}

	reg struct {
		Level     string `json:"level"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		Password  string `json:"password"`
		Room      string `json:"room"`
		Number    string `json:"number"`
		StudentID string `json:"studentID"`
		TOS       bool   `json:"tos"`
	}
)

//Login handles login req
func (handler *Handler) Login(c echo.Context) error {
	u := new(login)
	if err := c.Bind(&u); err != nil {
		return err
	}

	User := &models.User{}

	if handler.DB.Where(&models.User{StudentID: u.StudentID}).First(User).RecordNotFound() || !utils.CheckPasswordHash(u.Password, User.Password) {
		return c.JSON(http.StatusUnauthorized, utils.Unauthorized())
	}

	sess, _ := session.Get("Session", c)
	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
		// Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	sess.Values["user"] = User.StudentID
	sess.Values["timestamp"] = time.Now()

	err := sess.Save(c.Request(), c.Response())

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	return c.JSON(http.StatusOK, User)
}

//Logout handles logout
func (handler *Handler) Logout(c echo.Context) error {
	sess, _ := session.Get("Session", c)
	sess.Options.MaxAge = -1

	err := sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	return c.JSON(http.StatusOK, "Logged Out")
}

// Register handles account setup
func (handler *Handler) Register(c echo.Context) error {
	u := new(reg)
	if err := c.Bind(&u); err != nil {
		return err
	}

	User := &models.User{}

	if handler.DB.Where(&models.User{StudentID: u.StudentID}).First(User).RecordNotFound() {
		return c.JSON(http.StatusUnauthorized, utils.Unauthorized())
	}

	hashedPassword, err := utils.HashPassword(u.Password)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	User.Password = hashedPassword
	User.TOS = u.TOS

	handler.DB.Save(User)

	return c.JSON(http.StatusOK, "Success")
}
