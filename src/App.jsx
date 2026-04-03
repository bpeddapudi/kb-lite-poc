import { Navigate, Route, Routes } from 'react-router-dom'

import { LandingPage } from './pages/LandingPage.jsx'
import { LiteGallery } from './pages/LiteGallery.jsx'
import { ChatInterfacePage } from './pages/ChatInterfacePage.jsx'
import { ThemeWorkbench } from './pages/ThemeWorkbench.jsx'
import { MapPreloaderExperiment } from './pages/MapPreloaderExperiment.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatInterfacePage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/lite" element={<LiteGallery />} />
      <Route path="/chat-interface" element={<ChatInterfacePage />} />
      <Route path="/map-preloader" element={<MapPreloaderExperiment />} />
      <Route path="/theme" element={<ThemeWorkbench />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
