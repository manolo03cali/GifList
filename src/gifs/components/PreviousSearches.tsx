// Importamos el tipo FC (Functional Component) desde React.
// Esto sirve para tipar nuestro componente como un Functional Component.
import type { FC } from "react";

// Definimos la interfaz Props, que describe las propiedades que recibe el componente:
// - searches: un array de strings que contiene las búsquedas previas.
// - onLabelClicked: una función que recibe un término (string) cuando se hace click en un item de la lista.
interface Props {
  searches: string[];
  onLabelClicked: (term: string) => void;
}

// Definimos el componente PreviousSearches como un FC que recibe Props.
export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {
  return (
    // Contenedor principal con clase CSS "previous-searches"
    <div className="previous-searches">
      {/* Título de la sección */}
      <h2>Busquedas previas</h2>

      {/* Lista de términos de búsqueda */}
      <ul className="previous-searches-list">
        {/* Recorremos el array `searches` con map */}
        {searches.map((term) => (
          // Cada término se muestra como un <li> con key única = el propio término.
          // Cuando se hace click en el <li>, se llama a la función onLabelClicked pasando ese término.
          <li key={term} onClick={() => onLabelClicked(term)}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
