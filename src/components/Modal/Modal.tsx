import React, { useRef, useEffect, useCallback, RefObject } from "react"
import { Button, InputRef } from "antd"
import { createPortal } from "react-dom"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"

import Overlay from "../Overlay/Overlay"

import { useScrollLock } from "../../hooks/useScrollLock"
import { clearError, setInputCityValue } from "../../model/weather/actions/actions"
import { closeModal } from "./closeModal"

import "./index.scss"

type Props = {
    contentText: string;
    isModalOpen: boolean;
    inputRef: RefObject<InputRef>;
}

const Modal: React.FC<Props> = ({
    contentText,
    isModalOpen,
    inputRef
}) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const { lockScroll, unlockScroll } = useScrollLock()
    const modalRoot = document.getElementById('modal') as HTMLElement
    const dispatch: Dispatch = useDispatch()

    const handleCloseModal = useCallback((): void => {
        closeModal()
        unlockScroll()

        setTimeout(() => {
            dispatch(clearError())
        }, 200)
    }, [dispatch, unlockScroll])

    const handleCloseModalAndEdit = useCallback((): void => {
        if (inputRef.current) inputRef.current.focus()

        closeModal()
        unlockScroll()

        setTimeout(() => {
            dispatch(clearError())
            dispatch(setInputCityValue(''))
        }, 200)
    }, [dispatch, inputRef, unlockScroll])

    useEffect(() => {
        isModalOpen ? lockScroll() : unlockScroll()

        const handleClickOutside = (e: MouseEvent): void => {
            const target = e.target as HTMLDivElement
            if (modalRef.current && !modalRef.current.contains(target)) {
                handleCloseModal()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [
        modalRef,
        isModalOpen,
        lockScroll,
        unlockScroll,
        handleCloseModal
    ])

    return (
        createPortal(
            <Overlay isModalOpen={isModalOpen}>
                <div className="modal-container">
                    <div
                        className="modal-window"
                        ref={modalRef}
                    >
                        <section className="modal-content">
                            <h2>An error has occurred</h2>
                            <span>{contentText}</span>
                        </section>
                        <section className="modal-buttons">
                            <Button onClick={handleCloseModal}>Ok</Button>
                            <Button onClick={handleCloseModalAndEdit}>Return to edit</Button>
                        </section>
                    </div>
                </div>
            </Overlay>, modalRoot
        )
    )
}

export default Modal