import { filterSearchOptions } from "../../utils/weather/filterSearchOptions"

export const getSearchOptions = async (value: string): Promise<string[]> => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
  const API_URL: string = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${OPENWEATHER_API_KEY}`

  const response: Response = await fetch(API_URL)

  return filterSearchOptions(await response.json())
}