package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

//User handle returning user info to front-end
func (handler *Handler) User(c echo.Context) error {
	User := c.Get("User")

	return c.JSON(http.StatusOK, User)
}
