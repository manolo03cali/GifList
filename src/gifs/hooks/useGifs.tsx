import { useRef, useState } from "react";

import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
//const gifsCache: Record<string, Gif[]> = {};
export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
    gifsCache.current[term] = gifs;
  };
  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query.trim() === "") return;

    if (previousTerms.includes(query)) return;

    setPreviousTerms([query, ...previousTerms].splice(0, 8));
    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
    gifsCache.current[query] = gifs;
  };
  return {
    //   properties o values
    gifs,
    previousTerms,

    // method /actions
    handleTermClicked,
    handleSearch,
  };
};
