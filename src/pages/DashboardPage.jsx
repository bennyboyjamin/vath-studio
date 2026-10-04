import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlay, FiDownload, FiTrash2 } from 'react-icons/fi'

function DashboardPage() {
  const { t } = useTranslation()
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: 'Summer Vibes',
      duration: '3:45',
      createdAt: '2024-01-15',
      genre: 'Pop',
    },
    {
      id: 2,
      title: 'Midnight Jazz',
      duration: '4:20',
      createdAt: '2024-01-14',
      genre: 'Jazz',
    },
  ])

  const handleDelete = (id) => {
    if (window.confirm(t('dashboard.delete_confirm'))) {
      setSongs(songs.filter(song => song.id !== id))
    }
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12">{t('dashboard.title')}</h1>

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
            <div key={song.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 card items-center">
              <div className="font-semibold">{song.title}</div>
              <div className="text-gray-400">{song.genre}</div>
              <div className="text-gray-400">{song.duration}</div>
              <div className="text-gray-400 text-sm">{song.createdAt}</div>
              <div className="flex gap-3">
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Play">
                  <FiPlay className="text-lg" />
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Download">
                  <FiDownload className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(song.id)}
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
  )
}

export default DashboardPage
