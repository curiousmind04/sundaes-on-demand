import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  //check that the button starts out disabled
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(confirmButton).toBeDisabled();
  //check that the checkbox started out unchecked
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});

test("checkbox enables the button on first click and disables the button on second click", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  //click checkbox
  fireEvent.click(checkbox);
  //check that button is enabled
  expect(confirmButton).toBeEnabled();
  //click checkbox
  fireEvent.click(checkbox);
  //check that button is disabled
  expect(confirmButton).toBeDisabled();
});
