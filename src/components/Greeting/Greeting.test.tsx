import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Greeting from "./Greeting";

test("renders correctly", () => {
  const headerText = "Welcome to Weather App!";
  const contentText = "You need to enter the name of the city in the input";

  render(<Greeting />);

  const header = screen.getByTestId<HTMLHeadingElement>("greeting-header");
  const content = screen.getByTestId<HTMLParagraphElement>("greeting-content");

  expect(header).toHaveTextContent(headerText);
  expect(content).toHaveTextContent(contentText);
});
