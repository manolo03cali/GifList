// Importamos los componentes y hooks necesarios para armar la aplicación de gifs
import { GifList } from "./gifs/components/GifList"; // Lista de gifs
import { PreviousSearches } from "./gifs/components/PreviousSearches"; // Búsquedas previas clickeables
import { useGifs } from "./gifs/hooks/useGifs"; // Custom hook para manejar lógica (estado, búsquedas, historial)
import { CustomHeader } from "./shared/components/CustomHeader"; // Encabezado con título y descripción
import { SearchBar } from "./shared/components/SearchBar"; // Barra de búsqueda con debounce

// Componente principal de la aplicación
export const GifsApp = () => {
  // Usamos el custom hook `useGifs` que nos provee:
  // - gifs: los resultados actuales de la búsqueda
  // - previousTerms: lista de términos buscados anteriormente
  // - handleTermClicked: función para volver a buscar al hacer click en un término anterior
  // - handleSearch: función para realizar una nueva búsqueda
  const { gifs, previousTerms, handleTermClicked, handleSearch } = useGifs();

  return (
    <>
      {/* Encabezado de la aplicación */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* Barra de búsqueda */}
      {/* placeholder → texto dentro del input */}
      {/* onQuery → callback que ejecuta la búsqueda usando handleSearch */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

      {/* Búsquedas previas */}
      {/* Muestra un listado de términos buscados antes */}
      {/* onLabelClicked → si se hace click en un término, se vuelve a buscar */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Lista de gifs */}
      {/* Renderiza las tarjetas de los gifs obtenidos de la búsqueda */}
      <GifList gifs={gifs} />
    </>
  );
};
