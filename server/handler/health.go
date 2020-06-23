package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

//HealthCheck handles status check for cluster ping
func (handler *Handler) HealthCheck(e echo.Context) error {
	err := handler.DB.DB().Ping()
	if err != nil {
		return e.NoContent(http.StatusServiceUnavailable)
	}
	return e.NoContent(http.StatusOK)
}
