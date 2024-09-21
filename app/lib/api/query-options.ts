import {
  currentSeason,
  currentSeasonYear,
  nextSeason,
  nextSeasonYear,
} from "../seasons";
import { animeQuery, mangaQuery } from "./queries";

const mangaVariables = {
  season: currentSeason,
  seasonYear: currentSeasonYear,
  nextSeason: nextSeason,
  nextYear: nextSeasonYear,
};
export const mangaOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: mangaQuery,
    mangaVariables,
  }),
  cf: {
    cacheTtl: 5,
    cacheEverything: true,
  },
};

const animeVariables = {
  type: "ANIME",
  season: currentSeason,
  seasonYear: currentSeasonYear,
  nextSeason: nextSeason,
  nextYear: nextSeasonYear,
};

export const animeOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: animeQuery,
    animeVariables,
  }),
  cf: {
    cacheTtl: 5,
    cacheEverything: true,
  },
};
