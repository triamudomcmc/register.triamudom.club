package middlewares

import (
	"github.com/jinzhu/gorm"
)

type Middleware struct {
	DB *gorm.DB
}
