package models

import (
	"time"
)

type Audition struct {
	ID int `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY;AUTO_INCREMENT"`
	ClubID string
	Club Club
	UserID uint16
	User User
	Status string
	UpdatedAt time.Time
	CreatedAt time.Time
}