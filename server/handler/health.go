package handler

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func (handler *Handler) HealthCheck (e echo.Context) error {
	err := handler.DB.DB().Ping()
	if err != nil {
		return e.NoContent(http.StatusServiceUnavailable)
	}
	return e.NoContent(http.StatusOK)
}