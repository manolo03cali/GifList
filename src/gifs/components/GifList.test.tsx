import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { GifList } from "./GifList";
import { mockGifs } from "../../mock-data/gif.mocks";

describe("GifList", () => {
  test("should render whithout erros when there are no gifs ", () => {
    const { container } = render(<GifList gifs={[]} />);
    const div = container.querySelector(".gifs-container");
    //comprobamos que no tiene hijos
    expect(div).not.toBeNull();
  });
  test("should render all gifs passed as props", () => {
    render(<GifList gifs={mockGifs} />);
    const images = screen.getAllByRole("img");
    // cantidad de imágenes renderizadas
    expect(images.length).toBe(mockGifs.length);
  });
  test("should renders each gif with its title and correct alt", () => {
    render(<GifList gifs={mockGifs} />);

    mockGifs.forEach((gif) => {
      // el título debe estar en el documento
      const title = screen.getByText(gif.title);
      expect(title).not.toBeNull();
      // la imagen debe tener src correcto

      const img = screen.getByAltText(gif.title) as HTMLImageElement;
      expect(img).not.toBeNull();
      expect(img.getAttribute("src")).toBe(gif.url);
    });
  });
  test("should renders gif dimensions with (1.5mb)", () => {
    render(<GifList gifs={mockGifs} />);
    mockGifs.forEach((gif) => {
      const dimensions = screen.getByText(`${gif.width}x${gif.height}(1.5mb)`);

      expect(dimensions).not.toBeNull();
    });
  });
});
