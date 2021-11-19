import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const mockData = {
  data: {
    results: [
      {
        name: "Luke Skywalker",
        height: 172,
      },
      {
        name: "Obi-Wan Kenobi",
        height: 123,
      },
      {
        name: "R5-D4",
        height: 97,
      },
    ],
  },
  error: null,
};
jest.mock("./hooks/useFetch", () => ({
  useFetch: () => mockData,
}));
describe("test filters", () => {
  it("test text filter", () => {
    render(<App />);
    const textFilter = screen.getByPlaceholderText(/filter/i);
    const luke = screen.getByText(/Luke/i);
    const obi = screen.getByText(/Obi-Wan Kenobi/i);

    expect(luke).toBeInTheDocument();
    expect(obi).toBeInTheDocument();

    fireEvent.change(textFilter, { target: { value: "luke" } });

    expect(luke).toBeInTheDocument();
    expect(obi).not.toBeInTheDocument();
  });

  it("test if only tall filer is working", () => {
    render(<App />);
    const tallFilter = screen.getByLabelText(/Include only tall/i);
    const luke = screen.getByText(/Luke/i);
    const R5D4 = screen.getByText(/R5-D4/i);

    expect(luke).toBeInTheDocument();
    expect(R5D4).toBeInTheDocument();

    fireEvent.click(tallFilter);

    expect(luke).toBeInTheDocument();
    expect(R5D4).not.toBeInTheDocument();
  });

  it("test tallFilter AND textFilter", () => {
    render(<App />);
    const tallFilter = screen.getByLabelText(/Include only tall/i);
    const textFilter = screen.getByPlaceholderText(/filter/i);
    const luke = screen.getByText(/Luke/i);
    const R5D4 = screen.getByText(/R5-D4/i);
    const obi = screen.getByText(/Obi-Wan Kenobi/i);

    expect(luke).toBeInTheDocument();
    expect(R5D4).toBeInTheDocument();

    fireEvent.click(tallFilter);
    fireEvent.change(textFilter, { target: { value: "luke" } });

    expect(luke).toBeInTheDocument();
    expect(obi).not.toBeInTheDocument();
    expect(R5D4).not.toBeInTheDocument();
  });
});
