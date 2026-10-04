import api from './api'

export const songService = {
  getSongs: async () => {
    const response = await api.get('/songs')
    return response.data
  },

  getSong: async (id) => {
    const response = await api.get(`/songs/${id}`)
    return response.data
  },

  updateSong: async (id, data) => {
    const response = await api.patch(`/songs/${id}`, data)
    return response.data
  },

  deleteSong: async (id) => {
    const response = await api.delete(`/songs/${id}`)
    return response.data
  }
}

export const generationService = {
  generateSong: async (prompt, genre = 'pop', mood = 'happy', model = 'suno') => {
    const response = await api.post('/generate/generate', {
      prompt,
      genre,
      mood,
      model
    })
    return response.data
  },

  getStatus: async (songId) => {
    const response = await api.get(`/generate/status/${songId}`)
    return response.data
  },

  pollStatus: async (songId, interval = 2000, maxAttempts = 300) => {
    return new Promise((resolve, reject) => {
      let attempts = 0
      
      const poll = async () => {
        try {
          const data = await generationService.getStatus(songId)
          
          if (data.data.status === 'completed') {
            resolve(data.data)
          } else if (data.data.status === 'failed') {
            reject(new Error(data.data.error || 'Generation failed'))
          } else if (attempts >= maxAttempts) {
            reject(new Error('Generation timeout'))
          } else {
            attempts++
            setTimeout(poll, interval)
          }
        } catch (error) {
          reject(error)
        }
      }
      
      poll()
    })
  }
}

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/me')
    return response.data
  },

  updateProfile: async (data) => {
    const response = await api.patch('/users/me', data)
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/users/stats')
    return response.data
  }
}
