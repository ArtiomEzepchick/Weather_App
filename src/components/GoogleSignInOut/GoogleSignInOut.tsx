import React, { useEffect } from "react"
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

import './index.scss'

type Props = {
    isLoading: boolean;
    userData: UserDataPayload | null;
}

const GoogleSignInOut: React.FC<Props> = ({ isLoading, userData }) => {
    const dispatch = useDispatch()

    const handleLogin = useGoogleLogin({
        onSuccess: (response) => {
            dispatch(setUserToken(response))
        },
        onError: (error) => dispatch(setUserError(`Login Failed: ${error}`))
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
            const userProfileButton = document.querySelector('#user-profile-button')
            const userProfileImg = document.querySelector('.user-profile-img')
            const userIcon = document.querySelector('.fa-user')
            const userProfileActions = document.querySelector('.user-profile-actions')

            if (userProfileButton && userProfileActions) {
                if (target === userProfileButton || target === userProfileImg || target === userIcon) {
                    userProfileActions.classList.toggle('show')
                } else if (!target.closest('.user-profile-actions')) {
                    userProfileActions.classList.remove('show')
                }
            }
        }

        document.addEventListener('click', handleOutsideUserProfileClick)

        return () => document.removeEventListener('click', handleOutsideUserProfileClick)
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
                    <div className='user-profile-actions'>
                        <span>{userData.name}</span>
                        <span>{userData.email}</span>
                        <Button
                            id='logout-button'
                            onClick={handleLogout}
                            disabled={isLoading}
                        >
                            Logout
                            <i className='fa-solid fa-user-pen' />
                        </Button>
                    </div>
                </div>}
        </>
    )
}

export default GoogleSignInOut