package middlewares

import (
	"github.com/iammarkps/clubreg/server/models"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

/*
Access Control
Level 1 - Default
Level 2 - Club's President
Level 3 - TUCMC
Level 4 - Head of Dept.
Level 5 - System Admin Aka. IT TUCMC
 */
func (middleware *Middleware) Auth(level uint8) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			sess, _ := session.Get("SESSION", c)
			User := &models.User{}
			middleware.DB.Where(&models.User{StudentID: sess.Values["userID"].(uint16)}).First(User)
			if User.AccessLevel >= level {
				c.Set("User", User)
				return next(c)
			}
			return echo.ErrUnauthorized
		}
	}
}
