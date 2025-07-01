// src/entities/UserEntity.ts

export type Role = 'user' | 'coach' | 'admin'
export type Language = 'ua' | 'en'

export interface UserEntity {
  id: string
  name: string
  email: string
  role: Role
  verified: boolean
  language: Language
}
