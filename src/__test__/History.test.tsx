import { render, screen } from "@testing-library/react";
import History from "../components/History";

test("renders history heading", () => {
  render(<History />);
  expect(screen.getByText("History")).toBeInTheDocument();
});
