import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../signUpLogIn";

describe("basic rendering", () => {
  test("renders the input boxes and labels", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });

  test("renders the buttons", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("Sign up");
    expect(buttons[1]).toHaveTextContent("Log in");
  });
});

describe("signing up", () => {
  test("rejects a name that is in use when signing up", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ handle: ["has already been taken"] })
    );
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const nameField = screen.getByLabelText("Name:");
    fireEvent.change(nameField, { target: { value: "Phil" } });
    fireEvent.click(screen.getByText("Sign up"));
    await waitFor(() =>
      expect(
        screen.getByText(
          "Sorry, that name has already been taken, please choose another"
        )
      )
    );
  });

  test("accepts a name that is not in use when signing up", async () => {
    fetch.mockResponseOnce(JSON.stringify({ handle: "Phil", id: "1" }));
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const nameField = screen.getByLabelText("Name:");
    fireEvent.change(nameField, { target: { value: "Phil" } });
    fireEvent.click(screen.getByText("Sign up"));
    await waitFor(() =>
      expect(screen.getByText("Successfully signed up. Please log in"))
    );
  });
});

describe("logging in", () => {
  test("rejects a login if the username or password are invalid", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ errors: { password: "Invalid username or password" } })
    );
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const nameField = screen.getByLabelText("Name:");
    fireEvent.change(nameField, { target: { value: "Phil" } });
    fireEvent.click(screen.getByText("Log in"));
    await waitFor(() =>
      expect(
        screen.getByText(
          "Sorry, invalid username or password, please try again"
        )
      )
    );
  });
});
