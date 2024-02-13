import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSnapshot } from 'valtio'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from '@/routes/index'
import '@/variable.scss'
import '@/index.css'
import { GlobalInfo } from '@/state/base'
import { ClassErrorBoundary } from './utils/error-boundary'

function RootNode() {
  const snap = useSnapshot(GlobalInfo)
  const darkTheme = createTheme({
    palette: {
      mode: snap.theme === 'light' ? 'light' : 'dark'
    }
  })
  return (
    <ClassErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </ClassErrorBoundary>
  )
}
ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <RootNode />
)
