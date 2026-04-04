import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeProvider.jsx'
import './index.css'
import App from './App.jsx'

// Must match Vite `base` so <Link> and routes work on GitHub Pages (/kb-lite-poc/).
const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
