import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GeneratorPage from './pages/GeneratorPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

function App() {
  const { i18n } = useTranslation()

  return (
    <Router>
      <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GeneratorPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
