// Importamos hooks y tipos desde React:
// - useEffect: para manejar efectos secundarios (ej: ejecutar búsqueda con retraso).
// - useState: para guardar el estado del input de búsqueda.
// - KeyboardEvent: tipo para eventos de teclado en inputs.
import { useEffect, useState, type KeyboardEvent } from "react";

// Definimos la interfaz de las props que recibe el componente:
// - placeholder?: texto opcional que aparece dentro del input (default = "Buscar").
// - onQuery: función que recibe un string (el término de búsqueda).
interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

// Definimos el componente SearchBar
export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
  // Estado local para guardar el valor del input
  const [query, setQuery] = useState("");

  // useEffect: se ejecuta cada vez que cambia `query` o la función `onQuery`.
  useEffect(() => {
    // Creamos un "debounce": esperamos 700ms antes de ejecutar la búsqueda.
    const timeoutId = setTimeout(() => {
      onQuery(query); // Llamamos a la función recibida por props con el término actual
    }, 700);

    // Cleanup: si el usuario sigue escribiendo antes de que pasen 700ms,
    // limpiamos el timeout y lo volvemos a iniciar (evita múltiples llamadas).
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]);

  // Función para ejecutar manualmente la búsqueda (ej: al hacer click en el botón)
  const handleSearch = () => {
    onQuery(query);
  };

  // Maneja eventos de teclado dentro del input
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Si el usuario presiona la tecla "Enter", ejecutamos la búsqueda manual
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      {/* Input controlado: su valor depende del estado `query` */}
      <input
        type="text"
        placeholder={placeholder} // texto dentro del input cuando está vacío
        value={query} // valor actual
        onChange={(event) => setQuery(event.target.value)} // actualiza el estado cuando el usuario escribe
        onKeyDown={handleKeyDown} // detecta la tecla "Enter"
      />
      {/* Botón para ejecutar la búsqueda manualmente */}
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
