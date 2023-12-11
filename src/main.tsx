import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

console.log(import.meta.env)
ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
