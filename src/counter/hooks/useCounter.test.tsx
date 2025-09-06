import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../hooks/useCounter";
describe("Pruebas en <useCounter/>", () => {
  const initialValue = 10;
  test("should initialize with default of 5", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(5);
  });
  test("should initialize with value  10", () => {
    const { result } = renderHook(() => useCounter(initialValue));
    expect(result.current.counter).toBe(10);
  });
  test("should increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(11);
  });
  test("should decrement counter when handleSubtract is called", () => {
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.handleSubtract();
    });
    expect(result.current.counter).toBe(9);
  });
  test("should Reset to initial value when handleReset is called", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.handleAdd();
    });
    act(() => {
      result.current.handleAdd();
    });
    console.log(result.current.counter);
    act(() => {
      result.current.handleReset();
    });
    console.log(result.current.counter);
    expect(result.current.counter).toBe(5);
  });
});
