import React from "react"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import Loader from "./Loader"

describe('Loader', () => {
    it("renders with 'margin-added' class when weatherDataLength equals 0", () => {
        render(<Loader weatherDataLength={0}/>)

        const loader = screen.getByTestId('loader')

        expect(loader).toBeInTheDocument()
        expect(loader).toHaveClass('margin-added')
        expect(loader).toMatchSnapshot()
    })

    it("renders without 'margin-added' class when weatherDataLength is more than 0", () => {
        render(<Loader weatherDataLength={1}/>)

        const loader = screen.getByTestId('loader')
        
        expect(loader).toBeInTheDocument()
        expect(loader).not.toHaveClass('margin-added')
        expect(loader).toMatchSnapshot()
    })
})