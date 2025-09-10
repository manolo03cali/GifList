// Importamos utilidades de testing
import { screen, render, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Counter } from "./Counter";

// Definimos funciones simuladas (mocks) que reemplazarán la lógica real del hook
const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

// 🔹 Mockeamos el hook useCounter para que no ejecute la lógica real.
// En lugar de eso, devuelve siempre un counter = 10 y las funciones simuladas.
vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 10,
    handleAdd: handleAddMock,
    handleSubtract: handleSubtractMock,
    handleReset: handleResetMock,
  }),
}));

// 🔹 Agrupamos todos los tests relacionados con el componente Counter
describe("pruebas en counter2 con mock", () => {
  // Antes de cada test, limpiamos los mocks para que no queden llamadas anteriores
  beforeEach(() => {
    vi.clearAllMocks();
  });

  //  Test 1: Renderizado inicial
  test("should render default", () => {
    render(<Counter />);

    // El encabezado H1 debe mostrar "Counter:10" porque el mock fija el valor en 10
    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `Counter:10`
    );

    // Verificamos que los tres botones existen en pantalla
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  // Test 2: Click en botón +1
  test("should increment the counter", () => {
    render(<Counter />);

    const labelH1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);

    // El valor mostrado NO cambia porque el counter está mockeado fijo en 10
    // Solo nos interesa validar que el render es correcto
    expect(labelH1.innerHTML).toContain(`Counter:10`);
  });

  //  Test 3: Click en botón -1
  test("should decrement the counter", () => {
    render(<Counter />);

    const labelH1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);

    // Igual que antes, el número no cambia porque está mockeado
    expect(labelH1.innerHTML).toContain(`Counter:10`);
  });

  //  Test 4: Verificar que handleAdd se llama correctamente
  test("should call handleAdd if button is clicked", () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);

    // Se debe llamar SOLO handleAddMock
    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });

  //  Test 5: Verificar que handleSubtract se llama correctamente
  test("should call handleSubtrac if button is clicked", () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);

    // Se debe llamar SOLO handleSubtractMock
    expect(handleSubtractMock).toHaveBeenCalled();
    expect(handleAddMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });

  //  Test 6: Verificar que handleReset se llama correctamente
  test("should call handleReset if button is clicked", () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: "Reset" });

    fireEvent.click(button);

    // Se debe llamar SOLO handleResetMock
    expect(handleResetMock).toHaveBeenCalled();
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleAddMock).not.toHaveBeenCalled();
  });
});
