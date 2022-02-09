import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe("'New card' button", () => {
  test("changes the words on the card", () => {
    render(<App/>)
    const initialCells = screen.queryAllByRole("cell")
    const firstWord = initialCells[0].textContent
    const secondWord = initialCells[1].textContent

    fireEvent.click(screen.getByText("New card"))

    const updatedCells = screen.queryAllByRole("cell")
    expect(updatedCells[0].textContent).not.toEqual(firstWord)
    expect(updatedCells[1].textContent).not.toEqual(secondWord)
  });

  test("clears any stamped cells", () => {
    render(<App/>)
    const cells = screen.queryAllByRole("cell")
    const firstCell = cells[0]

    fireEvent.click(firstCell)

    expect(firstCell).toHaveClass("stamped")

    fireEvent.click(screen.getByText("New card"))

    expect(firstCell).not.toHaveClass("stamped")
  });
});
