package models

import (
	"time"
)

//User data model
type User struct {
	StudentID   uint16 `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY"`
	Password    string
	Level       uint8
	Room        uint16
	Number      uint8
	Title       string `gorm:"NOT NULL"`
	FirstName   string `gorm:"NOT NULL"`
	LastName    string `gorm:"NOT NULL"`
	AccessLevel uint8  `gorm:"NOT NULL;default:1"`
	ClubID      string
	Reason      string
	OldClubID   string
	UpdatedAt   time.Time
	CreatedAt   time.Time
}
