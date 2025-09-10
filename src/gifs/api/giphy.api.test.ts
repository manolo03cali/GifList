// Importamos utilidades de testing
import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe("gihpy.api", () => {
  test("should be configured correctly", () => {
    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");
    //Una forma es desestructurando el objeto params
    const params = giphyApi.defaults.params;

    expect(params.lang).toBe("es");
    expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);
    //otra forma es evaluando el objeto completo
    expect(giphyApi.defaults.params).toStrictEqual({
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
      lang: "es",
    });
  });
});
