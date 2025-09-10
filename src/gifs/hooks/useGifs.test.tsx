import { renderHook } from "@testing-library/react";
// renderHook -> permite montar y probar hooks de React directamente, sin necesidad de un componente real.

import { describe, expect, test, vi } from "vitest";
// Vitest: framework de testing
// - describe: agrupa tests
// - test: define un caso de prueba
// - expect: hace aserciones
// - vi: utilidades para mocks y espías (similar a jest)

import { useGifs } from "./useGifs";
// Hook personalizado que maneja búsquedas de gifs, historial y resultados.

import { act } from "react";
// act -> asegura que todas las actualizaciones de estado de React se apliquen antes de las validaciones.

import * as gifActions from "../actions/get-gifs-by-query.action";
// Importa todas las acciones relacionadas con consultas de gifs (principalmente getGifsByQuery),
// para luego poder espiarlas o mockearlas en las pruebas.

describe("UseGifs", () => {
  // Primer test: validar estado inicial y métodos disponibles
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());
    expect(result.current.gifs.length).toBe(0); // gifs empieza vacío
    expect(result.current.previousTerms.length).toBe(0); // historial vacío
    expect(result.current.handleSearch).toBeDefined(); // función definida
    expect(result.current.handleTermClicked).toBeDefined(); // función definida
  });

  // Segundo test: buscar gifs con handleSearch
  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("goku"); // dispara búsqueda
    });

    expect(result.current.gifs.length).toBe(10); // espera 10 gifs
  });

  // Tercer test: buscar gifs con handleTermClicked (debería ser igual que handleSearch)
  test("should return a list of gif when handleTermClicked if called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("goku"); // simula click en un término previo
    });

    expect(result.current.gifs.length).toBe(10); // también devuelve 10 gifs
  });

  // Cuarto test: usar la caché de búsquedas
  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    // Primer llamado: se obtienen gifs normalmente
    await act(async () => {
      await result.current.handleTermClicked("goku");
    });
    expect(result.current.gifs.length).toBe(10);

    // Ahora simulamos que la API falla
    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is my custom error")
    );

    // Como ya se buscó "goku" antes, debería devolver los resultados de caché
    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10); // sigue devolviendo 10 gracias al caché
  });

  // Quinto test: historial limitado a 8 términos
  test("should return no more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    // Simulamos que las búsquedas no devuelven resultados (para no contaminar el test con gifs reales)
    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    // Hacemos 9 búsquedas diferentes
    await act(async () => {
      await result.current.handleSearch("goku1");
    });
    await act(async () => {
      await result.current.handleSearch("goku2");
    });
    await act(async () => {
      await result.current.handleSearch("goku3");
    });
    await act(async () => {
      await result.current.handleSearch("goku4");
    });
    await act(async () => {
      await result.current.handleSearch("goku5");
    });
    await act(async () => {
      await result.current.handleSearch("goku6");
    });
    await act(async () => {
      await result.current.handleSearch("goku7");
    });
    await act(async () => {
      await result.current.handleSearch("goku8");
    });
    await act(async () => {
      await result.current.handleSearch("goku9");
    });

    // El historial solo debe guardar los últimos 8 términos
    expect(result.current.previousTerms).toStrictEqual([
      "goku9",
      "goku8",
      "goku7",
      "goku6",
      "goku5",
      "goku4",
      "goku3",
      "goku2",
    ]);
    expect(result.current.previousTerms.length).toBe(8); // nunca más de 8
    console.log(result.current.previousTerms);
  });
});
