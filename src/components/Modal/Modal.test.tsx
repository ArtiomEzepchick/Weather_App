import React, { ReactNode, ReactPortal } from "react";
import { expect, jest, test } from "@jest/globals";
import ReactDOM from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as reduxHooks from "react-redux";
import * as actions from "../../model/weather/actions/actions";

import Modal from "./Modal";

jest.mock("react-redux");

const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("Modal", () => {
  const oldCreatePortal = ReactDOM.createPortal;
  const inputRef = { current: null };
  const contentText: string = "Content";
  const dispatch = jest.fn();

  const propsModalOpen = {
    isModalOpen: true,
    dispatch,
    contentText,
    inputRef,
  };

  const propsModalClosed = {
    ...propsModalOpen,
    isModalOpen: false,
  };

  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  // it('renders correctly', () => {
  //     render(<Modal { ...propsModalOpen } />)

  //     const overlay = screen.getByTestId('overlay')
  //     const modalHeader = screen.getByTestId('modalHeader')
  //     const modalContent = screen.getByTestId('modalContent')

  //     expect(overlay).toHaveClass('show')
  //     expect(modalHeader).toHaveTextContent('An error has occurred')
  //     expect(modalContent).toHaveTextContent(contentText)
  //     expect(overlay).toMatchSnapshot()
  // })

  // it('handles onClick close modal', () => {
  //     mockedDispatch.mockResolvedValue(dispatch)
  //     const { rerender } = render(<Modal { ...propsModalOpen } />)

  //     const overlay = screen.getByTestId('overlay')
  //     const button = screen.getByText('Ok')

  //     expect(overlay).toHaveClass('show')
  //     fireEvent.click(button)
  //     expect(overlay).toHaveClass('hidden')

  //     rerender(<Modal { ...propsModalClosed }/>)

  //     expect(overlay).not.toHaveClass('hidden')
  //     expect(overlay).not.toHaveClass('show')
  //     expect(overlay).toMatchSnapshot()
  // })

  // it('handles onClick close modal and edit', () => {
  //     const { rerender } = render(<Modal { ...propsModalOpen } />)

  //     const overlay = screen.getByTestId('overlay')
  //     const button = screen.getByText('Return to edit')

  //     expect(overlay).toHaveClass('show')
  //     fireEvent.click(button)
  //     expect(overlay).toHaveClass('hidden')

  //     rerender(<Modal { ...propsModalClosed } />)

  //     expect(overlay).not.toHaveClass('hidden')
  //     expect(overlay).not.toHaveClass('show')
  //     expect(overlay).toMatchSnapshot()
  // })
});
