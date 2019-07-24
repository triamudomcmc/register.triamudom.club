package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Settings struct {
	gorm.Model
	ID string `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY"`
	Value interface{} `gorm:"type:varchar(255)"`
	UpdatedAt time.Time
	CreatedAt time.Time
}