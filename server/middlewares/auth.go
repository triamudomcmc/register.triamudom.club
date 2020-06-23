package middlewares

import (
	"github.com/iammarkps/clubreg/server/models"
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
			sess, _ := session.Get("SESSION", c)
			User := &models.User{}
			userID := sess.Values["userID"].(uint16)
			middleware.DB.Where(&models.User{StudentID: userID}).First(User)

			if User.AccessLevel >= level {
				if User.AccessLevel == 2 {
					Club := &models.Club{}
					middleware.DB.Where(&models.Club{President: *User}).First(Club)
					if Club == (&models.Club{}) {
						return echo.ErrUnauthorized
					}
					c.Set("Club", Club)
				}
				c.Set("User", User)
				return next(c)
			}
			return echo.ErrUnauthorized
		}
	}
}
