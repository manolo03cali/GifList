import { beforeEach, describe, expect, test, vi } from "vitest";
// Se importan las funciones principales de Vitest:
// - describe: agrupa pruebas
// - test: define un caso de prueba
// - beforeEach: se ejecuta antes de cada test
// - expect: para hacer las afirmaciones
// - vi: para hacer mocks y espías (similar a jest)

import AxiosMockAdapter from "axios-mock-adapter";
// Librería que nos permite simular respuestas de Axios sin hacer llamadas reales a internet

import { getGifsByQuery } from "./get-gifs-by-query.action";
// Función que queremos probar (hace una llamada a la API de Giphy y devuelve gifs)

import { giphyApi } from "../api/giphy.api";
// Instancia de Axios configurada para consumir la API de Giphy

import { giphySearchResponseMock } from "../../../test/mock/giphy.response.data";
// Mock de respuesta de la API de Giphy (imitando datos reales)

// Grupo de pruebas para el archivo get-gifs-by-query.action
describe("get-gifs-by-query.action", () => {
  let mock = new AxiosMockAdapter(giphyApi);
  // Se crea un mock inicial para interceptar las peticiones hechas con giphyApi

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
    // Antes de cada prueba se reinicia el mock para que no se mezclen respuestas
  });

  //   test("should return a list of gifs", async () => {
  //     const gifs = await getGifsByQuery("goku");
  //     //Podemos desestructurar el primero registro del arreglo obtenido de la consulta
  //     const [gif1] = gifs;
  //     //evaluamos solo ese registro de acuerdo a su estructura para que espere cualquier string
  //     //o cualquier numero dependiendo el campo

  //     expect(gifs.length).toBe(10);

  //     expect(gif1).toStrictEqual({
  //       height: expect.any(Number),
  //       id: expect.any(String),
  //       title: expect.any(String),
  //       url: expect.any(String),
  //       width: expect.any(Number),
  //     });
  //   });
  // ⬆️ Este test está comentado, pero valida solo el primer gif retornado verificando tipos con `expect.any`.

  test("should return a list of gifs", async () => {
    // Se simula que la API devuelve el mock al hacer GET a /search
    mock.onGet("/search").reply(200, giphySearchResponseMock);

    // Llamamos la función real con el query "goku"
    const gifs = await getGifsByQuery("goku");

    // Debe devolver 10 resultados (igual que en el mock)
    expect(gifs.length).toBe(10);

    // Recorremos todos los gifs para validar que cada campo tiene el tipo esperado
    gifs.forEach((gifs) => {
      expect(typeof gifs.id).toBe("string");
      expect(typeof gifs.title).toBe("string");
      expect(typeof gifs.url).toBe("string");
      expect(typeof gifs.height).toBe("number");
      expect(typeof gifs.width).toBe("number");
    });
  });

  test("should return an empty list of gifs if query is empty", async () => {
    // mock.onGet("/search").reply(200, { data: [] });
    // ⬆️ Otra forma sería forzar a la API a responder vacío

    mock.restore();
    // En este caso eliminamos el mock para que la función se comporte como en la vida real

    const gifs = await getGifsByQuery(" ");
    // Pasamos un string vacío como consulta

    expect(gifs.length).toBe(0);
    // La función debe devolver un arreglo vacío
  });

  test("should handle error when the api returns an error", async () => {
    // Creamos un espía sobre console.error para verificar que se ejecuta
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {
        console.log("mensaje de error personalizado con mockImplementation");
        // Sobrescribimos el comportamiento normal para personalizar la salida
      });

    // Simulamos que la API responde con un error 400
    mock.onGet("/search").reply(400, {
      data: {
        message: "Bad request",
      },
    });

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(0);
    // Cuando hay error, la función devuelve un arreglo vacío

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    // Validamos que console.error se llamó una sola vez

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    // Validamos que console.error fue llamado con algún argumento
  });
});
