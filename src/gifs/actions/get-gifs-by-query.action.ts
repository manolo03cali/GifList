// Importamos el tipo de la respuesta que devuelve la API de Giphy
import type { GiphyResponse } from "../interfaces/giphy.response";

// Importamos el tipo Gif que definimos en nuestro proyecto
// (nos ayuda a trabajar con datos más claros y tipados)
import type { Gif } from "../interfaces/gif.interface";

// Importamos la configuración de la API (axios instance con baseURL y api_key)
import { giphyApi } from "../api/giphy.api";

// Esta función busca GIFs en Giphy según un término de búsqueda (`query`)
export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  // Llamada a la API usando axios y nuestro cliente configurado (`giphyApi`)
  // Tipamos la respuesta con GiphyResponse para tener autocompletado y validación de tipos
  if (query.trim().length === 0) {
    return [];
  }
  try {
    const response = await giphyApi.get<GiphyResponse>("/search", {
      params: {
        q: query, // el término que se busca en Giphy
        limit: 10, // máximo número de resultados que queremos traer
      },
    });

    // Transformamos la respuesta de Giphy al tipo Gif[] que definimos
    // para que el resto de la app trabaje con datos limpios y tipados
    return response.data.data.map((gif) => ({
      id: gif.id, // identificador único del gif
      title: gif.title, // título o nombre del gif
      url: gif.images.original.url, // URL de la imagen en tamaño original
      width: Number(gif.images.original.width), // ancho del gif convertido a número
      height: Number(gif.images.original.height), // alto del gif convertido a número
    }));

    // Forma alternativa (comentada) usando fetch directamente
    // (sin axios ni el cliente `giphyApi`)
    // fetch(
    //   `https://api.giphy.com/v1/gifs/search?api_key=nIjuxTHKWFWIsfYrLQkgif9p2CKE3TJV&q=${query}&limit=10&lang=es`
    // );
  } catch (error) {
    console.error(error);
    return [];
  }
};
