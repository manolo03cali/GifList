import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Counter } from "./Counter";

describe("component counter", () => {
  test("should render default", () => {
    render(<Counter />);
    screen.debug();
    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `Counter:8`
    );
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });
  test("should increment the counter", () => {
    render(<Counter />);

    const labelH1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "+1" });
    fireEvent.click(button);
    expect(labelH1.innerHTML).toContain(`Counter:9`);
  });
  test("should decrement the counter", () => {
    render(<Counter />);

    const labelH1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "-1" });
    fireEvent.click(button);
    expect(labelH1.innerHTML).toContain(`Counter:7`);
  });
});
