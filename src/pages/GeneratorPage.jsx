import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlay, FiPause, FiDownload, FiEdit2 } from 'react-icons/fi'

function GeneratorPage() {
  const { t } = useTranslation()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedSong, setGeneratedSong] = useState(null)

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    // Simulated API call - replace with actual API
    setTimeout(() => {
      setGeneratedSong({
        id: Date.now(),
        title: 'Generated Song',
        prompt: prompt,
        duration: '3:45',
        createdAt: new Date().toLocaleDateString(),
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-center mb-12">{t('generator.title')}</h1>

      {/* Generator Form */}
      <div className="max-w-2xl mx-auto card mb-12">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3">{t('generator.prompt_placeholder')}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('generator.prompt_placeholder')}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500 resize-none"
              rows="5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Genre</label>
              <select className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white">
                <option>Pop</option>
                <option>Rock</option>
                <option>Hip-Hop</option>
                <option>Jazz</option>
                <option>Classical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Mood</label>
              <select className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white">
                <option>Happy</option>
                <option>Sad</option>
                <option>Energetic</option>
                <option>Calm</option>
                <option>Melancholic</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? t('generator.generating') : t('generator.generate_button')}
          </button>
        </form>
      </div>

      {/* Generated Song Preview */}
      {generatedSong && (
        <div className="max-w-2xl mx-auto card">
          <h2 className="text-2xl font-bold mb-6">{t('generator.song_details')}</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{generatedSong.title}</h3>
            <p className="text-gray-400 text-sm mb-4">Duration: {generatedSong.duration}</p>
            <p className="text-gray-400 text-sm mb-4">Created: {generatedSong.createdAt}</p>
            <p className="text-gray-400">Prompt: {generatedSong.prompt}</p>
          </div>

          {/* Audio Player */}
          <div className="bg-slate-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center gap-4">
              <button className="p-3 gradient-primary rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all">
                <FiPlay className="text-2xl" />
              </button>
              <div className="flex-1 h-2 bg-slate-700 rounded-full">
                <div className="h-full w-1/3 bg-primary rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400">1:15 / {generatedSong.duration}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <FiEdit2 /> {t('generator.edit')}
            </button>
            <button className="flex items-center justify-center gap-2 btn-secondary">
              <FiDownload /> {t('generator.download')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GeneratorPage
