package main
import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net/http"
)
func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.Use(middleware.Gzip())
	e.Use(middleware.Secure())

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}