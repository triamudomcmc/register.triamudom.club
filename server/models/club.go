package models

import (
	"time"
)

//Club data model
type Club struct {
	ClubID              string `gorm:"UNIQUE;NOT NULL;PRIMARY_KEY"`
	Name                string
	EnglishName         string
	IsAudition          bool
	IsActive            bool
	Description         string
	MaxMember           uint16
	Member              []User `gorm:"ForeignKey:ClubID"`
	PresidentID         uint16
	President           User
	AuditionLocation    string
	AuditionTime        string
	AuditionInstruction string
	Location            string
	UpdatedAt           time.Time
	CreatedAt           time.Time
}
