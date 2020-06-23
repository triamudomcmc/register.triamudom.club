package handler

import (
	"github.com/jinzhu/gorm"
)

//Handler handles all request and inject DB to ctx
type Handler struct {
	DB *gorm.DB
}
