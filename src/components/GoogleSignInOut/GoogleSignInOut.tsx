import React, { useCallback, useEffect, useRef } from "react"
import { Button } from "antd"
import { useGoogleLogin, googleLogout } from "@react-oauth/google"
import { Dispatch } from "redux"

import {
    setUserToken,
    setUserError,
    resetUserState,
    getUserData,
    getCalendarEvents
} from "../../model/user/actions/actions"
import { setIsLoading } from "../../model/weather/actions/actions"
import { UserDataPayload } from "../../types/user/user"
import { SCOPE } from "../../helpers/constants/user/user"
import { LOCAL_STORAGE_ITEMS } from "../../helpers/localStorageItems/localStorageItems"
import { logOutUser } from "../../helpers/requests/user/logOutUser"

import './index.scss'

type Props = {
    dispatch: Dispatch;
    isLoading: boolean;
    userToken: string | null;
    userData: UserDataPayload | null;
    userError: string | null;
}

const GoogleSignInOut: React.FC<Props> = ({ 
    dispatch,
    isLoading, 
    userData,
    userToken,
    userError 
}) => {
    const profileActionsRef = useRef<HTMLDivElement>(null)

    const handleLogin = useGoogleLogin({
        scope: SCOPE,
        onSuccess: (response) => {
            dispatch(setUserToken(response.access_token))
            localStorage.setItem(LOCAL_STORAGE_ITEMS.USER_TOKEN, response.access_token)
        },
        onError: (error) => dispatch(setUserError(`Login Failed: ${error}`)),
    })

    const handleLogout = useCallback(async () => {
        try {
            dispatch(setIsLoading(true))
            googleLogout()
            
            if (userToken) await logOutUser(userToken)

            localStorage.removeItem(LOCAL_STORAGE_ITEMS.USER_TOKEN)
            dispatch(resetUserState())
            dispatch(setIsLoading(false))
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }, [dispatch, userToken])

    useEffect(() => {
        const lsUserToken = localStorage.getItem(LOCAL_STORAGE_ITEMS.USER_TOKEN)

        if (lsUserToken) {
            dispatch(setUserToken(lsUserToken))
        }

        if (userToken && !userData) {
            dispatch(getUserData(userToken))
        }

        if (userToken && userData) {
            dispatch(getCalendarEvents(userToken))
        }

        if (userError) {
            localStorage.removeItem(LOCAL_STORAGE_ITEMS.USER_TOKEN)
            dispatch(resetUserState())
            handleLogin()
        }
    }, [
        userData,
        userToken,
        userError,
        handleLogin,
        dispatch
    ])

    useEffect(() => {
        const handleOutsideUserProfileClick = (e: MouseEvent): void => {
            const target = e.target as HTMLElement
            const userProfileContainer = document.querySelector('.user-profile-container')

            if (profileActionsRef.current) {
                if (userProfileContainer?.contains(target) && !profileActionsRef.current.contains(target)) {
                    profileActionsRef.current.classList.toggle('show')
                } else if (!profileActionsRef.current?.contains(target)) {
                    profileActionsRef.current.classList.remove('show')
                }
            }
        }

        document.addEventListener('mousedown', handleOutsideUserProfileClick)

        return () => document.removeEventListener('mousedown', handleOutsideUserProfileClick)
    }, [])

    return (
        <>
            {!userData &&
                <Button
                    id='login-button'
                    disabled={isLoading}
                    onClick={() => handleLogin()}
                >
                    Sign in
                </Button>}
            {userData &&
                <div className='user-profile-container'>
                    <button id='user-profile-button'>
                        {userData.picture
                            ? <img
                                className='user-profile-img'
                                src={userData.picture}
                                alt='User'
                            />
                            : <i className='fa-solid fa-user' />}
                    </button>
                    <p
                        className='user-profile-actions'
                        ref={profileActionsRef}
                    >
                        <span>{userData.name}</span>
                        <span>{userData.email}</span>
                        <Button
                            id='logout-button'
                            onClick={handleLogout}
                            disabled={isLoading}
                        >
                            Logout
                            <i className="fa-solid fa-arrow-right-from-bracket"/>
                        </Button>
                    </p>
                </div>}
        </>
    )
}

export default GoogleSignInOut