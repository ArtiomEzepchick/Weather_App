import React, { useEffect, useRef } from "react"
import { Button } from "antd"
import { useGoogleLogin, googleLogout } from "@react-oauth/google"
import { useDispatch } from "react-redux"

import {
    setUserToken,
    setUserError,
    resetUserState
} from "../../model/user/actions/actions"
import { setIsLoading } from "../../model/weather/actions/actions"
import { UserDataPayload } from "../../types/user/user"
import { SCOPE } from "../../helpers/constants/googleConstants"

import './index.scss'

type Props = {
    isLoading: boolean;
    userData: UserDataPayload | null;
}

const GoogleSignInOut: React.FC<Props> = ({ isLoading, userData }) => {
    const profileActionsRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()

    const handleLogin = useGoogleLogin({
        scope: SCOPE,
        onSuccess: (response) => {
            dispatch(setUserToken(response))
        },
        onError: (error) => dispatch(setUserError(`Login Failed: ${error}`)),
    })

    const handleLogout = () => {
        googleLogout()
        dispatch(setIsLoading(true))

        setTimeout(() => {
            dispatch(resetUserState())
            dispatch(setIsLoading(false))
        }, 200)
    }

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