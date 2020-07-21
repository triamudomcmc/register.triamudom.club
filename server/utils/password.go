package utils

import (
	"github.com/alexedwards/argon2id"
)

// HashPassword hash password with argon2id
func HashPassword(password string) (string, error) {
	hash, err := argon2id.CreateHash(password, argon2id.DefaultParams)
	return hash, err
}

// CheckPasswordHash verify plain password with hash
func CheckPasswordHash(password, hash string) bool {
	match, _ := argon2id.ComparePasswordAndHash(password, hash)
	return match
}
