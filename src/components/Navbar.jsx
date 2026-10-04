import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi'
import { useState } from 'react'

function Navbar() {
  const { t, i18n } = useTranslation()
  const { isAuthenticated, logout, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'lo' ? 'en' : 'lo')
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="glass-effect border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">VS</span>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text gradient-primary">
              Vath Studio
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/generate" className="hover:text-primary transition-colors">
                  {t('nav.generate')}
                </Link>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-semibold text-sm"
            >
              {i18n.language === 'lo' ? 'EN' : 'ລາວ'}
            </button>
            {isAuthenticated ? (
              <>
                <span className="hidden md:block text-sm text-gray-400">
                  {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 btn-primary"
                >
                  <FiLogOut /> {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link to="/login" className="hidden md:block btn-primary">
                {t('nav.login')}
              </Link>
            )}
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-purple-900/30 rounded-lg">
              {t('nav.home')}
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/generate" className="block px-4 py-2 hover:bg-purple-900/30 rounded-lg">
                  {t('nav.generate')}
                </Link>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-purple-900/30 rounded-lg">
                  {t('nav.dashboard')}
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full btn-primary mt-4 flex items-center justify-center gap-2"
              >
                <FiLogOut /> {t('nav.logout')}
              </button>
            ) : (
              <Link to="/login" className="w-full btn-primary mt-4 inline-block text-center">
                {t('nav.login')}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
