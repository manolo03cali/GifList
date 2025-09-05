import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const title = "Buscador de gifs";
  const description = "Descubre y comparte el gif perfecto";
  const handleTermClicked = (term: string) => {
    console.log(term);
  };
  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query.trim() === "") return;

    if (previousTerms.includes(query)) return;

    setPreviousTerms([query, ...previousTerms].splice(0, 8));
    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader title={title} description={description} />
      {/* SearchBar */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />
      {/* PreviousSearches */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />
      {/* GifList */}
      <GifList gifs={gifs} />
    </>
  );
};
