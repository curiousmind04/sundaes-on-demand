import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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

test("checkbox enables the button on first click and disables the button on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  //click checkbox
  await user.click(checkbox);
  //check that button is enabled
  expect(confirmButton).toBeEnabled();
  //click checkbox
  await user.click(checkbox);
  //check that button is disabled
  expect(confirmButton).toBeDisabled();
});

test("popover response to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  //popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  //popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
