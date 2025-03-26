import axios from 'axios'

const api = axios.create({
  baseURL: "https://8863-206-84-234-161.ngrok-free.app",
  headers: {
    'Content-Type': 'application/json'
  }
})
export const vitalService = {
    getDashboardStats: async () => {
      try {
        const response = await api.post('/home/get-vitals')
        const response2 = await api.post('/home/get-aggregated')
        const combinedResponse = {
          vitals: response.data,
          aggregated: response2.data
        }
        return combinedResponse
        // console.log("REsp",response.data)
        // return response.data
      } catch (error) {
        throw error.response?.message || error
      }
    }
}