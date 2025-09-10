// Importamos herramientas de testing
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Counter } from "./Counter"; // Componente a probar

// 🔹 Agrupamos todos los tests relacionados con Counter
describe("component counter", () => {
  //  Test 1: Render inicial del componente
  test("should render default", () => {
    render(<Counter />); // Renderiza el componente en un entorno de prueba

    screen.debug(); // Muestra en consola el árbol del DOM renderizado (útil para depuración)

    // Verifica que el encabezado H1 muestre el valor inicial "Counter:8"
    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `Counter:8`
    );

    // Verifica que existen los tres botones principales
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  //  Test 2: Incrementar contador
  test("should increment the counter", () => {
    render(<Counter />);

    const labelH1 = screen.getByRole("heading", { level: 1 }); // Captura el H1
    const button = screen.getByRole("button", { name: "+1" }); // Captura el botón "+1"

    fireEvent.click(button); // Simula un clic en el botón

    // Ahora el valor debería haber incrementado de 8 a 9
    expect(labelH1.innerHTML).toContain(`Counter:9`);
  });

  // Test 3: Decrementar contador
  test("should decrement the counter", () => {
    render(<Counter />);

    const labelH1 = screen.getByRole("heading", { level: 1 }); // Captura el H1
    const button = screen.getByRole("button", { name: "-1" }); // Captura el botón "-1"

    fireEvent.click(button); // Simula un clic en el botón

    // Ahora el valor debería haber decrementado de 8 a 7
    expect(labelH1.innerHTML).toContain(`Counter:7`);
  });
});
