package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Club struct {
	gorm.Model
	ClubID string `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY"`
	Name string
	EnglishName string
	IsAudition bool
	IsActive bool
	Description string
	MaxMember uint16
	PresidentID uint16
	President User
	AuditionLocation string
	AuditionTime string
	AuditionInstruction string
	Location string
	UpdatedAt time.Time
	CreatedAt time.Time
}