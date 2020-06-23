package models

import (
	"time"
)

// Settings data model
type Settings struct {
	ID        string      `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY"`
	Value     interface{} `gorm:"type:varchar(255)"`
	UpdatedAt time.Time
	CreatedAt time.Time
}
