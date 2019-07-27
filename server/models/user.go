package models

import (
	"time"
)

type User struct {
	StudentID uint16 `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY"`
	Password string
	Level uint8
	Room uint16
	Number uint8
	Title string `gorm:"NOT NULL"`
	FirstName string `gorm:"NOT_NULL"`
	LastName string `gorm:"NOT NULL"`
	ClubID string
	Reason string
	OldClubID string
	UpdatedAt time.Time
	CreatedAt time.Time
}