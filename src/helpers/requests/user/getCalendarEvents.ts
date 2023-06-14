import { CALENDAR_URL } from "../../constants/user/user"

export const getCalendarEvents = async (token: string): Promise<gapi.client.calendar.Event[]> => {
  try {
      const response: Response = await fetch(CALENDAR_URL, {
          headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
          }
      })

      if (response.status !== 200) {
          throw new Error(`${response}`)
      }

      return await response.json()
  } catch (error: any) {
      throw new Error(error)
  }
}