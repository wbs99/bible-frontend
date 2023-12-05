import type { MockMethod } from 'vite-plugin-mock'
import { MockMe } from './mockMe'

export default [
  ...MockMe,
] as MockMethod[]
