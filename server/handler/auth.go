package handler

import (
	"github.com/gorilla/sessions"
	"github.com/iammarkps/clubreg/server/models"
	"github.com/iammarkps/clubreg/server/utils"
	"github.com/labstack/echo"
	"github.com/labstack/echo-contrib/session"
	"net/http"
	"time"
)

type LoginReqBody struct {
	StudentID uint16 `json:"student_id"`
	Password string `json:"password"`
}

type LoginResBody struct {
	StudentID uint16 `json:"student_id"`
}

func (handler *Handler) Login(c echo.Context) error {
	u := new(LoginReqBody)
	if err := c.Bind(&u); err != nil {
		return err
	}
	User := &models.User{}
	Club := &models.Club{}
	handler.DB.Where(&models.User{StudentID: u.StudentID}).First(User)

	if !utils.CheckPasswordHash(u.Password, User.Password) || User == (&models.User{}) {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sess, _ := session.Get("SESSION", c)
	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
		Secure:   true,
	}

	if handler.DB.Where(&models.Club{PresidentID: u.StudentID}).First(Club).RecordNotFound() {
		sess.Values["role"] = "student"
	} else {
		sess.Values["role"] = "president"
	}

	sess.Values["username"] = User.Title + User.FirstName + "  " + User.LastName
	sess.Values["userID"] = User.StudentID
	sess.Values["timestamp"] = time.Now()
	err := sess.Save(c.Request(), c.Response()); if err != nil {
		return c.JSON(http.StatusInternalServerError, "Cannot logged you in")
	}

	return c.JSON(http.StatusOK, &LoginResBody{StudentID: User.StudentID})
}

func (handler *Handler) Logout(c echo.Context) error {
		sess, _ := session.Get("SESSION", c)
		sess.Options.MaxAge = -1

		err := sess.Save(c.Request(), c.Response()); if err != nil {
			return c.JSON(http.StatusInternalServerError, "Cannot logged you out")
		}

		return c.JSON(http.StatusOK, "Logged out")
}
