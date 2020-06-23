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
	StudentID uint16 `json:"student_id"`
	Password  string `json:"password"`
}

//Login handles login req
func (handler *Handler) Login(c echo.Context) error {
	type loginResBody struct {
		StudentID uint16 `json:"student_id"`
		ClubID    string `json:"club_id"`
	}

	u := new(loginReqBody)
	if err := c.Bind(&u); err != nil {
		return err
	}
	User := &models.User{}
	handler.DB.Where(&models.User{StudentID: u.StudentID}).First(User)

	if User == (&models.User{}) || !utils.CheckPasswordHash(u.Password, User.Password) {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sess, _ := session.Get("SESSION", c)
	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
		Secure:   true,
	}

	sess.Values["username"] = User.Title + User.FirstName + "  " + User.LastName
	sess.Values["userID"] = User.StudentID
	sess.Values["timestamp"] = time.Now()
	err := sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Cannot logged you in")
	}

	return c.JSON(http.StatusOK, &loginResBody{StudentID: User.StudentID, ClubID: User.ClubID})
}

//Logout handles logout
func (handler *Handler) Logout(c echo.Context) error {
	sess, _ := session.Get("SESSION", c)
	sess.Options.MaxAge = -1

	err := sess.Save(c.Request(), c.Response())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Cannot logged you out")
	}

	return c.JSON(http.StatusOK, "Logged out")
}
