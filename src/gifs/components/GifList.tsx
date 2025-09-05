import type { FC } from "react";
import type { Gif } from "../../mock-data/gif.mocks";
interface Props {
  gifs: Gif[];
}

export const GifList: FC<Props> = ({ gifs }) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => {
        return (
          <div key={gif.id} className="gif-card">
            <img src={gif.url} alt={gif.title} />
            <h3>{gif.title}</h3>
            <p>
              {gif.width}x{gif.height}(1.5mb)
            </p>
          </div>
        );
      })}
    </div>
  );
};
