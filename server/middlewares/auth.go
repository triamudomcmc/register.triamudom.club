package middlewares

import (
	"fmt"
	"net/http"

	"github.com/iammarkps/clubreg/server/models"
	"github.com/iammarkps/clubreg/server/utils"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

/*
Auth provide middleware function for authentication
Access Control
Level 1 - Default
Level 2 - Club's President
Level 3 - Superuser
*/
func (middleware *Middleware) Auth(level uint8) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			sess, _ := session.Get("Session", c)
			User := &models.User{}
			ID := fmt.Sprintf("%v", sess.Values["user"])

			if middleware.DB.Where(&models.User{StudentID: ID}).First(User).RecordNotFound() {
				return c.JSON(http.StatusUnauthorized, utils.Unauthorized())
			}

			if User.AccessLevel >= level {
				if User.AccessLevel == 2 {
					Club := &models.Club{}

					if middleware.DB.Where(&models.Club{PresidentID: User.StudentID}).First(Club).RecordNotFound() {
						return c.JSON(http.StatusUnauthorized, utils.Unauthorized())
					}

					c.Set("Club", Club)
				}
				c.Set("User", User)
				return next(c)
			}

			return c.JSON(http.StatusUnauthorized, utils.Unauthorized())
		}
	}
}
