import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import search from "./Search";
let wrapper;
test("Switch to different tabs", () => {
  render(<App />);
  const LoginButton = screen.getByText("Login");
  expect(LoginButton).toBeInTheDocument();
  const SearchButton = screen.getByText("Search");
  fireEvent.click(SearchButton);
  expect(LoginButton).not.toBeInTheDocument();
});

test("Enter address", () => {
  const result = render(<App />);
  const inputElement = screen.getByPlaceholderText("Enter an address");
  fireEvent.change(inputElement, { target: { value: "Newark" } });
  const addressButtonElement = screen.getByText("Continue");
  expect(addressButtonElement).toBeInTheDocument();
  fireEvent.click(addressButtonElement);
  expect(addressButtonElement).not.toBeInTheDocument();
});
