import { transformWeatherPayload } from "../../transformWeatherPayload/transformWeatherPayload"

const API_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = process.env.REACT_APP_API_KEY

export const getWeatherByCityName = async (city: string) => {
  const response = await fetch(`${API_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`)
  const data = await response.json()

  console.log(data)
  console.log(transformWeatherPayload(data))

  return transformWeatherPayload(data)
}