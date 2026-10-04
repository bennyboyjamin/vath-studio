import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { FiAlertCircle } from 'react-icons/fi'

function RegisterPage() {
  const { t, i18n } = useTranslation()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        i18n.language
      )
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 py-20">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2 text-center">ລົງທະບຽນ</h1>
        <p className="text-gray-400 text-center mb-8">ສະ ລາ ຍສະ ລາ ຕາ ສ</p>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-600 rounded-lg flex items-start gap-3">
            <FiAlertCircle className="text-red-500 text-xl mt-1 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">ຊື່ຜູ້ໃຊ້</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500"
              placeholder="ຊື່ຜູ້ໃຊ້"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">ລະຫັດຜ່ານ</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">ຢືນຢັນລະຫັດຜ່ານ</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? t('common.loading') : 'ລົງທະບຽນ'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          ມີບັນຊີແລ້ວ?{' '}
          <Link to="/login" className="text-primary hover:text-purple-400 font-semibold">
            {t('nav.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
