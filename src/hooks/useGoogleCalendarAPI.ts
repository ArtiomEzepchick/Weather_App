import { useCallback, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { gapi } from 'gapi-script'
// import { useDispatch } from 'react-redux'
// import { Dispatch } from 'redux'

import { LOCAL_STORAGE_ITEMS } from '../helpers/localStorageItems/localStorageItems'
import {
    CLIENT_ID,
    SCOPES,
    SCRIPT_SRC_GOOGLE,
    SCRIPT_SRC_GAPI
} from '../helpers/googleCalendarConstants/googleCalendarConstants'

const { ACCESS_TOKEN } = LOCAL_STORAGE_ITEMS

interface EventsItem {
    id: string
    title: string
    start: string
    end: string
}

const useGoogleCalendarAPI = (setEvents: any) => {
    const formatEvents = (list: gapi.client.calendar.Event[]): EventsItem[] => {
        return list.map((item: any): EventsItem => ({
            id: nanoid(),
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date
        }))
    }

    const listUpcomingEvents = useCallback(async (): Promise<any> => {
        try {
            const response = await window.gapi.client.calendar.events.list({
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                showDeleted: false,
                maxResults: 10,
                orderBy: 'startTime',
                singleEvents: true
            })
    
            const events: gapi.client.calendar.Event[] = response.result.items
    
            if (events.length > 0) {
                setEvents(formatEvents(events))
            }
        } catch(e: any) {
            console.error("Error: can't get events")
        }
    }, [setEvents])

    const handleSignIn = useCallback((): void => {
        window.gapi.auth2.authorize(
            { client_id: CLIENT_ID, scope: SCOPES },
            (res: gapi.auth2.AuthorizeResponse) => {
                if (res) {
                    if (res.access_token) localStorage.setItem(ACCESS_TOKEN, res.access_token)

                    window.gapi.client.load('calendar', 'v3', listUpcomingEvents)
                }
            }
        )
    }, [listUpcomingEvents])

    const handleSignOut = useCallback((): void => {
        if (gapi) {
            const token = localStorage.getItem(ACCESS_TOKEN)

            if (token) {
                google.accounts.id.disableAutoSelect()
                google.accounts.oauth2.revoke(token, (): void => {})
                gapi.client.setToken(null)
                localStorage.removeItem(ACCESS_TOKEN)

                window.location.reload()
            }
        } else {
            console.error('Error: gapi not loaded')
        }
    }, [])

    const gapiLoad = useCallback(async (): Promise<any> => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            handleSignIn()
        } 
    }, [handleSignIn])

    const createGoogleScripts = useCallback((): void => {
        const scriptGoogle: HTMLScriptElement = document.createElement('script')
        const scriptGapi: HTMLScriptElement = document.createElement('script')
        scriptGoogle.src = SCRIPT_SRC_GOOGLE
        scriptGoogle.async = true
        scriptGoogle.defer = true
        scriptGapi.src = SCRIPT_SRC_GAPI
        scriptGapi.async = true
        scriptGapi.defer = true
        document.body.appendChild(scriptGapi)
        document.body.appendChild(scriptGoogle)

        scriptGapi.onload = (): void => {
            gapi.load('client:auth2', gapiLoad)
        }

        scriptGoogle.onload = (): void => {
            google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                prompt: '',
                callback: (): void => { }
            })
        }
    }, [gapiLoad])

    useEffect(() => {
        window.addEventListener('load', createGoogleScripts)
    
        return () => window.removeEventListener('load', createGoogleScripts)
      }, [createGoogleScripts])

    return {
        handleSignIn,
        handleSignOut
    }
}

export default useGoogleCalendarAPI