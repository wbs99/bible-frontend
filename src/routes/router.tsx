import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { TestPage } from '../pages/TestPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage title="首页" /> },
  { path: '/test', element: <TestPage /> },
])
