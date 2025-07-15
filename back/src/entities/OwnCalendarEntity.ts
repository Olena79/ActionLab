export interface OwnCalendarEntity {
  dates: string[] // ISO string або формат YYYY-MM-DD
  type: string
  title: string
  description?: string
  userId: string // хто створив (адмін)
}
