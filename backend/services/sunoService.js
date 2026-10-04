import axios from 'axios'

const SUNO_API_URL = process.env.SUNO_API_URL || 'https://api.suno.ai'
const SUNO_API_KEY = process.env.SUNO_API_KEY

if (!SUNO_API_KEY) {
  console.warn('⚠️  SUNO_API_KEY not configured. Set it in .env file.')
}

export const generateWithSuno = async (prompt, genre, mood) => {
  try {
    // Call Suno API to generate music
    const response = await axios.post(
      `${SUNO_API_URL}/api/generate`,
      {
        prompt,
        genre,
        mood,
        duration: '3:30',
        style: `${genre} ${mood}`
      },
      {
        headers: {
          'Authorization': `Bearer ${SUNO_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    // Extract audio URL and metadata from response
    const { audio_url, duration, title, id } = response.data

    return {
      audioUrl: audio_url,
      duration: duration || '3:30',
      title: title || 'Untitled',
      generationId: id
    }
  } catch (error) {
    console.error('Suno API Error:', error.response?.data || error.message)
    throw new Error(`Suno generation failed: ${error.message}`)
  }
}

export const pollSunoGeneration = async (generationId) => {
  try {
    const response = await axios.get(
      `${SUNO_API_URL}/api/generate/${generationId}`,
      {
        headers: {
          'Authorization': `Bearer ${SUNO_API_KEY}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Suno Poll Error:', error.message)
    throw error
  }
}
