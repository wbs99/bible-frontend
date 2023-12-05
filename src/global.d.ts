type JSONValue = string | number | boolean | null | { [k: string | number]: JSONValue } | JSONValue[]
type Resource<T> = {
  resource: T
}
type Resources<T> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}
type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}

type LoginForm = {
  email: string
  code: string
}

type BibleItem = {
  id: number
  content: string
  volume: string
  chapter: string
  section: string
  has_read: 'yes' | 'no'
  created_at: string
  updated_at: string
}
