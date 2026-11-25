import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

jest.mock("../components/ContactForm", () => {
  return function MockContactForm() {
    return <div>Mock Contact Form</div>;
  };
});

jest.mock("../api/api", () => ({
  contactsApi: {
    create: jest.fn(),
  },
}));

test("renders the contact page heading", () => {
  render(<Contact />);

  expect(
    screen.getByText(/get in touch/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/mock contact form/i)
  ).toBeInTheDocument();
});