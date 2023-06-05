import React, { ReactNode, ReactPortal } from "react"
import ReactDOM from "react-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'

import Modal from "./Modal"

describe('Modal', () => {
    const oldCreatePortal = ReactDOM.createPortal
    const inputRef = { current: null }
    const contentText = 'Content'

    const propsModalOpen = {
        isModalOpen: true,
        dispatch: jest.fn(),
        contentText,
        inputRef
    }

    const propsModalClosed = {
        ...propsModalOpen,
        isModalOpen: false
    }

    beforeAll(() => {
        ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal
    })

    afterAll(() => {
        ReactDOM.createPortal = oldCreatePortal
    })

    it('renders correctly', () => {
        render(<Modal { ...propsModalOpen } />)

        const overlay = screen.getByTestId('overlay')
        const modalHeader = screen.getByTestId('modalHeader')
        const modalContent = screen.getByTestId('modalContent')

        expect(overlay).toHaveClass('show')
        expect(modalHeader).toHaveTextContent('An error has occurred')
        expect(modalContent).toHaveTextContent(contentText)
    })

    it('handles onClick close modal', () => {
        const { rerender } = render(<Modal { ...propsModalOpen } />)

        const overlay = screen.getByTestId('overlay')
        const button = screen.getByText('Ok')

        expect(overlay).toHaveClass('show')
        fireEvent.click(button)
        expect(overlay).toHaveClass('hidden')

        rerender(<Modal { ...propsModalClosed }/>)

        expect(overlay).not.toHaveClass('hidden')
        expect(overlay).not.toHaveClass('show')
    })

    it('handles onClick close modal and edit', () => {
        const { rerender } = render(<Modal { ...propsModalOpen } />)

        const overlay = screen.getByTestId('overlay')
        const button = screen.getByText('Return to edit')
        
        expect(overlay).toHaveClass('show')
        fireEvent.click(button)
        expect(overlay).toHaveClass('hidden')

        rerender(<Modal { ...propsModalClosed } />)

        expect(overlay).not.toHaveClass('hidden')
        expect(overlay).not.toHaveClass('show')
    })
})