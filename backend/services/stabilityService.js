import axios from 'axios'

const STABILITY_API_URL = process.env.STABILITY_API_URL || 'https://api.stability.ai'
const STABILITY_API_KEY = process.env.STABILITY_API_KEY

if (!STABILITY_API_KEY) {
  console.warn('⚠️  STABILITY_API_KEY not configured. Set it in .env file.')
}

export const generateWithStability = async (prompt, genre, mood) => {
  try {
    // Call Stability AI API for music generation
    const response = await axios.post(
      `${STABILITY_API_URL}/v1/generate/music`,
      {
        text_prompts: [{
          text: `${prompt}. Genre: ${genre}. Mood: ${mood}`,
          weight: 1
        }],
        duration_seconds: 210, // 3:30
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const { audio, generation_id } = response.data

    return {
      audioUrl: audio,
      duration: '3:30',
      generationId: generation_id,
      title: `${genre.capitalize()} - ${mood.capitalize()}`
    }
  } catch (error) {
    console.error('Stability API Error:', error.response?.data || error.message)
    throw new Error(`Stability generation failed: ${error.message}`)
  }
}
