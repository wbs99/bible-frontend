import type { FormError } from '../lib/validate'
import { createImmerStore } from './createImmerStore'

type Data = BibleItem
type CreateBibleStore = {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  resetData: () => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateBibleStore = createImmerStore<CreateBibleStore>(set => ({
  data: {
    content: '',
    volume: '',
    chapter: '',
    section: '',
  },
  setData: data => set(
    (state) => {
      Object.assign(state.data, data)
    },
  ),
  resetData: () => set(
    (state) => {
      Object.assign(state.data, {
        content: '',
        volume: '',
        chapter: '',
        section: '',
      })
    },
  ),
  error: {
    content: [],
    volume: [],
    chapter: [],
    section: []
  },
  setError: error => set(
    (state) => {
      Object.assign(state.error, {
        content: [],
        volume: [],
        chapter: [],
        section: []
      })
      Object.assign(state.error, error)
    },
  ),
}))
