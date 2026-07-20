import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders decorative background orbs for the page backdrop", () => {
    render(<App />);

    const backdrop = screen.getByTestId("background-backdrop");
    expect(backdrop.className).toContain("relative");
    expect(backdrop.className).toContain("overflow-hidden");

    const orbs = screen.getAllByTestId("background-orb");
    expect(orbs).toHaveLength(2);
  });
});
