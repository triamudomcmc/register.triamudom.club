package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Audition struct {
	gorm.Model
	ID int `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY;AUTO_INCREMENT"`
	ClubID string
	Club Club
	UserID string
	User User
	Status string
	UpdatedAt time.Time
	CreatedAt time.Time
}