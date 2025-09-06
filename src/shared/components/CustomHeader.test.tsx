// Importamos lo necesario para las pruebas
import { describe, test, expect } from "vitest"; // funciones de Vitest (describe, test, expect)
import { render, screen } from "@testing-library/react"; // helpers de Testing Library para renderizar y consultar el DOM
import { CustomHeader } from "./CustomHeader"; // el componente que vamos a probar

// Grupo de pruebas para el componente CustomHeader
describe("CustomHeader", () => {
  const title = "Test Title"; // valor de prueba que vamos a reutilizar

  // ✅ Primer test: debería renderizar el título correctamente
  test("should render the title correctly", () => {
    render(<CustomHeader title={title} />); // Renderizamos el componente con un título

    // Buscamos un heading <h1> cuyo contenido sea exactamente "Test Title"
    const titleElement = screen.getByRole("heading", {
      level: 1, // heading de nivel 1 → <h1>
      name: title, // el texto que esperamos en ese heading
    });

    // Verificamos que el texto del elemento encontrado es correcto
    expect(titleElement.textContent).toBe("Test Title");

    // Alternativamente, comprobamos que también podemos obtenerlo con getByText
    expect(screen.getByText(title)).toBeDefined();
  });

  // ✅ Segundo test: debería renderizar la descripción cuando se proporciona
  test("should render the description when provided", () => {
    const description = "Test Description"; // descripción de prueba

    // Renderizamos el componente con título y descripción
    render(<CustomHeader title={title} description={description} />);

    // Verificamos que aparece el texto de la descripción en el DOM
    expect(screen.getByText(description)).toBeDefined();
    //otra forma verificamos que el parrafo este definido
    expect(screen.getByRole("paragraph")).toBeDefined();

    // Intentamos acceder al <p> (aunque ojo: "paragraph" no es un rol estándar accesible)
    // y verificamos que su contenido HTML es exactamente "Test Description"
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });

  // ✅ Tercer test: no debería renderizar la descripción cuando no se proporciona
  test("should not render description when not provided", () => {
    // Renderizamos el componente SOLO con el título
    const { container } = render(<CustomHeader title="Test Title" />);

    // Buscamos manualmente dentro del contenedor el div con clase "content-center"
    const divElement = container.querySelector(".content-center");

    // Dentro del div, seleccionamos el <h1> y el <p> si existieran
    const h1 = divElement?.querySelector("h1");
    const p = divElement?.querySelector("p");

    // Verificamos que el <h1> contiene el título esperado
    expect(h1?.innerHTML).toBe(title);

    // Y comprobamos que el <p> NO se renderiza porque no pasamos "description"
    expect(p).toBeNull();
  });
});
