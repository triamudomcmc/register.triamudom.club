package middlewares

import (
	"github.com/jinzhu/gorm"
)

// Middleware define middleware struct
type Middleware struct {
	DB *gorm.DB
}
