// Importamos el tipo FC (Functional Component) desde React
// Esto nos ayuda a tipar el componente como un componente funcional.
import type { FC } from "react";

// Importamos el tipo Gif que define la estructura de un gif
// (id, url, title, width, height, etc.).
import type { Gif } from "../../mock-data/gif.mocks";

// Definimos la interfaz de las props que recibirá el componente
// En este caso, recibe un arreglo de gifs (Gif[]).
interface Props {
  gifs: Gif[];
}

// Definimos el componente GifList como un Functional Component (FC)
// con las props tipadas según la interfaz anterior.
export const GifList: FC<Props> = ({ gifs }) => {
  return (
    // Contenedor principal de la lista de gifs
    <div className="gifs-container">
      {/* Recorremos el arreglo de gifs con map */}
      {gifs.map((gif) => {
        return (
          // Cada gif se envuelve en un div con una key única (gif.id)
          <div key={gif.id} className="gif-card">
            {/* Mostramos la imagen del gif */}
            <img src={gif.url} alt={gif.title} />

            {/* Título del gif */}
            <h3>{gif.title}</h3>

            {/* Medidas del gif + un texto fijo "(1.5mb)" */}
            <p>
              {gif.width}x{gif.height}(1.5mb)
            </p>
          </div>
        );
      })}
    </div>
  );
};
