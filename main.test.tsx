// main.test.tsx
import { act } from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
});

describe("main entry point", () => {
  it("should render GifsApp inside #root", async () => {
    // importamos dentro de act para evitar warnings
    await act(async () => {
      await import("./src/main");
    });

    const root = document.getElementById("root");
    screen.debug();

    expect(root).not.toBeNull();
    expect(root!.innerHTML).not.toBe(""); // confirma que algo se montó

    //  validar texto específico:
    expect(root!.innerHTML).toMatch(/Buscador de gifs/i);
    expect(root!.innerHTML).toMatch(/Busquedas previas/i);
    expect(root!.innerHTML).toMatch(/Busquedas previas/i);
    //Parrafo de descripción
    const title = screen.getByText(/Descubre y comparte el gif perfecto/i);
    expect(title).not.toBeNull();
    //Input de busqueda
    const input = screen.getByPlaceholderText("Busca lo que quieras");
    expect(input).not.toBeNull();
    // Botón de búsqueda
    const button = screen.getByRole("button", { name: /buscar/i });
    expect(button).not.toBeNull();

    // Sección de búsquedas previas
    const prevTitle = screen.getByRole("heading", {
      level: 2,
      name: /busquedas previas/i,
    });
    expect(prevTitle).not.toBeNull();

    const prevList = document.querySelector(".previous-searches-list");
    expect(prevList).not.toBeNull();
    expect(prevList?.children.length).toBe(0); // empieza vacío

    // Contenedor de gifs
    const gifsContainer = document.querySelector(".gifs-container");
    expect(gifsContainer).not.toBeNull();
    expect(gifsContainer?.children.length).toBe(0); // también vacío al inicio
  });
});
