export const CLIENT_ID: string = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`
export const API_KEY: string = `${process.env.REACT_APP_GOOGLE_API_KEY}`
export const SCOPE = 'https://www.googleapis.com/auth/calendar.events.readonly'
export const CALENDAR_URL: string = 
`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}
&timeMin=${new Date().toISOString()}&maxResults=10&orderBy=startTime&singleEvents=true`