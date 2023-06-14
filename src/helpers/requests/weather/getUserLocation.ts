import { UserLocation } from "../../../types/weather/weather"

export const getUserLocation = async (): Promise<string> => {
  const ABSTRACT_API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY
  const API_URL: string = `https://ipgeolocation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}`

  try {
      const response: Response = await fetch(API_URL)
      const data: UserLocation = await response.json()

      return `${data.city}, ${data.country_code}`
  } catch (error: any) {
      throw new Error("Can't get user's ip address")
  }
}