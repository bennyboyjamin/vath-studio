import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { generationService, songService } from '../services/songService'
import { FiPlay, FiPause, FiDownload, FiEdit2, FiLoader } from 'react-icons/fi'

function GeneratorPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [prompt, setPrompt] = useState('')
  const [genre, setGenre] = useState('pop')
  const [mood, setMood] = useState('happy')
  const [loading, setLoading] = useState(false)
  const [generatedSong, setGeneratedSong] = useState(null)
  const [pollingSongId, setPollingSongId] = useState(null)
  const [error, setError] = useState('')

  // Poll for generation status
  useEffect(() => {
    if (!pollingSongId) return

    const interval = setInterval(async () => {
      try {
        const response = await generationService.getStatus(pollingSongId)
        const { status, progress, audioUrl, duration, error: genError } = response.data

        if (status === 'completed') {
          setGeneratedSong({
            id: pollingSongId,
            title: `Generated Song - ${new Date().toLocaleDateString()}`,
            prompt,
            duration: duration || '3:30',
            audioUrl,
            genre,
            mood,
            createdAt: new Date().toLocaleDateString()
          })
          setPollingSongId(null)
          setLoading(false)
        } else if (status === 'failed') {
          setError(genError || 'Generation failed')
          setPollingSongId(null)
          setLoading(false)
        }
      } catch (err) {
        console.error('Polling error:', err)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [pollingSongId, prompt, genre, mood])

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError('')
    setGeneratedSong(null)

    try {
      const response = await generationService.generateSong(prompt, genre, mood)
      setPollingSongId(response.data.songId)
    } catch (err) {
      setError(err.response?.data?.message || 'Generation failed. Please try again.')
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (generatedSong?.audioUrl) {
      const a = document.createElement('a')
      a.href = generatedSong.audioUrl
      a.download = `${generatedSong.title}.mp3`
      a.click()
    }
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-center mb-2">{t('generator.title')}</h1>
      <p className="text-center text-gray-400 mb-12">Welcome, {user?.username}!</p>

      {/* Generator Form */}
      <div className="max-w-2xl mx-auto card mb-12">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3">ລາຍລະອຽດເພງ</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('generator.prompt_placeholder')}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500 resize-none"
              rows="5"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">ຈາລະນະ</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white"
              >
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="electronic">Electronic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">ຄວາມລາສະດາວະ</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-primary text-white"
              >
                <option value="happy">ດີໃຈ</option>
                <option value="sad">ໂສກ</option>
                <option value="energetic">ກະປັ້ນ</option>
                <option value="calm">ສະງົບ</option>
                <option value="melancholic">ໂລມໂລກ</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
          >
            {loading && <FiLoader className="animate-spin" />}
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
            <p className="text-gray-400 text-sm mb-4">Genre: {generatedSong.genre} | Mood: {generatedSong.mood}</p>
            <p className="text-gray-400">Prompt: {generatedSong.prompt}</p>
          </div>

          {/* Audio Player */}
          {generatedSong.audioUrl && (
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <audio
                controls
                className="w-full"
                src={generatedSong.audioUrl}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <FiEdit2 /> {t('generator.edit')}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 btn-secondary"
            >
              <FiDownload /> {t('generator.download')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GeneratorPage
