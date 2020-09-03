import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);

  const header = screen.getByText(/Checkout Form/i);
  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />);

  const firstName = screen.getByLabelText(/First Name:/i);
  const lastName = screen.getByLabelText(/Last Name:/i);
  const address = screen.getByLabelText(/Address:/i);
  const city = screen.getByLabelText(/city:/i);
  const state = screen.getByLabelText(/state:/i);
  const zip = screen.getByLabelText(/zip:/i);

  //events with React Testing Library
  fireEvent.change(firstName, { target: { value: "Alexis" } }); //Pass in event object
  fireEvent.change(lastName, { target: { value: "Villaraza" } }); //Pass in event object
  fireEvent.change(city, { target: { value: "333 Some St" } }); //Pass in event object
  fireEvent.change(state, { target: { value: "Arizona" } }); //Pass in event object
  fireEvent.change(zip, { target: { value: "12345" } }); //Pass in event object

  const submmitButton = screen.getByText(/form/i);
  fireEvent.click(submmitButton);

  // Grab checkout button
  const checkOutButton = screen.getByRole("button", /checkout/i);
  // Fire submit event for checkout button
  fireEvent.submit(checkOutButton);

  // Grab successMessage div
  const successMessage = screen.getByTestId("successMessage");
  // Confirm successMessage div displays after submission
  expect(successMessage).toBeInTheDocument();

  // Grab successMessage div

  expect(firstName.value).toBe("Alexis");
  expect(lastName.value).toBe("Villaraza");
  expect(city.value).toBe("333 Some St");
  expect(state.value).toBe("Arizona");
  expect(zip.value).toBe("12345");
});
