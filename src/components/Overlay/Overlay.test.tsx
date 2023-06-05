import React from "react"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import Overlay from "./Overlay"

describe('Overlay', () => {
    it("renders with 'show' class when isModalOpen equals true", () => {
        render(<Overlay isModalOpen={true} />)

        const overlay = screen.getByTestId<HTMLDivElement>('overlay')

        expect(overlay).toBeInTheDocument()
        expect(overlay).toHaveClass('show')
    })

    it("renders with 'show' class when isModalOpen equals true and with children", () => {
        const mockChild: JSX.Element = <p>Content</p>

        const { getByText } = render(<Overlay isModalOpen={true} children={mockChild}/>)

        const overlay = screen.getByTestId<HTMLDivElement>('overlay')

        expect(overlay).toBeInTheDocument()
        expect(overlay).toHaveClass('show')
        expect(getByText(/Content/i)).toBeInTheDocument()
    })

    it("renders without 'show' class when isModalOpen equals false", () => {
        render(<Overlay isModalOpen={false} />)

        const overlay = screen.getByTestId<HTMLDivElement>('overlay')
        
        expect(overlay).toBeInTheDocument()
        expect(overlay).not.toHaveClass('show')
    })
})