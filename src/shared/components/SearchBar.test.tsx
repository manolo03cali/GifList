// Importamos dependencias necesarias
import { describe, expect, test, vi } from "vitest";
// describe -> agrupa un conjunto de pruebas relacionadas
// test -> define un caso de prueba
// expect -> permite hacer afirmaciones sobre el resultado esperado
// vi -> utilidades para crear mocks/espías (similar a jest.fn())

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// render -> renderiza el componente en un entorno de prueba
// screen -> facilita buscar elementos renderizados
// fireEvent -> simula eventos del usuario (ej: click, change, etc.)
// waitFor -> espera a que ocurra algo asíncrono antes de continuar

import { SearchBar } from "./SearchBar"; // Componente a probar

// Grupo de pruebas para SearchBar
describe("SearchBar", () => {
  // Test 1: renderizado básico
  test("should render searchbar correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot(); // compara contra snapshot guardado
    expect(screen.getByRole("textbox")).toBeDefined(); // el input debe existir
    expect(screen.getByRole("button")).toBeDefined(); // el botón debe existir
  });

  // Test 2: onQuery debe ejecutarse con debounce (700ms)
  test("should call onQuery with the correct value after 700 ms", async () => {
    const onQuery = vi.fn(); // espía de función
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } }); // simulamos escribir

    // esperamos hasta que debounce ejecute la llamada
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled(); // debe llamarse
      expect(onQuery).toHaveBeenCalledWith("test"); // con el valor escrito
    });
  });

  // Test 3: debounce debe ejecutar solo la última llamada
  test("should call only once the last value(debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");

    // Simulamos teclear varias veces rápido
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    // Solo debe llamarse una vez, con el último valor
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledWith("test");
      expect(onQuery).toHaveBeenCalledTimes(1);
    });
  });

  // Test 4: clic en botón debe ejecutar onQuery inmediatamente
  test("should call onQuery when button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } }); // escribimos
    const button = screen.getByRole("button");
    fireEvent.click(button); // simulamos clic en el botón

    expect(onQuery).toHaveBeenCalledTimes(1); // una sola vez
    expect(onQuery).toHaveBeenCalledWith("test"); // con el valor actual del input
  });

  // Test 5: el input debe mostrar el placeholder recibido
  test("should the input has the correct placeholder value", () => {
    const value = "Buscar gif";
    render(<SearchBar onQuery={() => {}} placeholder={value} />);

    expect(screen.getByPlaceholderText(value)).toBeDefined(); // debe encontrarse el placeholder
  });
  test("should call onQuery when Enter key is pressed", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");
    //simulamos que el usuario escribe algo
    fireEvent.change(input, { target: { value: "test" } });
    //simulamos que presiona enter
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test");
  });
});
