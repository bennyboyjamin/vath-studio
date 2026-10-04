import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { songService, userService } from '../services/songService'
import { FiPlay, FiDownload, FiTrash2, FiLoader } from 'react-icons/fi'

function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSongs()
    fetchStats()
  }, [])

  const fetchSongs = async () => {
    try {
      const response = await songService.getSongs()
      setSongs(response.data || [])
    } catch (err) {
      setError('Failed to load songs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await userService.getStats()
      setStats(response.data)
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm(t('dashboard.delete_confirm'))) {
      try {
        await songService.deleteSong(id)
        setSongs(songs.filter(song => song._id !== id))
      } catch (err) {
        setError('Failed to delete song')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12 flex items-center justify-center">
        <FiLoader className="text-4xl animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-400">Welcome back, {user?.username}!</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <p className="text-gray-400 text-sm mb-2">Songs Generated</p>
            <p className="text-4xl font-bold text-primary">{stats.songsGenerated}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm mb-2">Plan</p>
            <p className="text-2xl font-bold capitalize">{stats.subscription.type}</p>
            <p className="text-gray-400 text-xs mt-2">
              {stats.subscription.generationsPerMonth} songs/month
            </p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm mb-2">Member Since</p>
            <p className="text-lg font-semibold">
              {new Date(stats.memberSince).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Songs List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{t('dashboard.my_songs')}</h2>
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg text-red-300 mb-6">
            {error}
          </div>
        )}

        {songs.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 card font-semibold text-sm uppercase text-gray-400">
              <div>Title</div>
              <div>Genre</div>
              <div>{t('dashboard.duration')}</div>
              <div>{t('dashboard.create_date')}</div>
              <div>{t('dashboard.actions')}</div>
            </div>

            {songs.map((song) => (
              <div key={song._id} className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 card items-center">
                <div className="font-semibold">{song.title}</div>
                <div className="text-gray-400 capitalize">{song.genre}</div>
                <div className="text-gray-400">{song.duration}</div>
                <div className="text-gray-400 text-sm">
                  {new Date(song.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-3">
                  {song.audioUrl && (
                    <button
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Play"
                    >
                      <FiPlay className="text-lg" />
                    </button>
                  )}
                  {song.audioUrl && (
                    <a
                      href={song.audioUrl}
                      download={`${song.title}.mp3`}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Download"
                    >
                      <FiDownload className="text-lg" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(song._id)}
                    className="p-2 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-400 text-lg mb-6">{t('dashboard.no_songs')}</p>
            <a href="/generate" className="inline-block btn-primary">
              {t('nav.generate')}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
