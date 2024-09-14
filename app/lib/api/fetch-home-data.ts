import axios from "axios";
import { homeQuery, URL } from "./queries";
import { HomeAnimesList } from "../types/query-types";
import {
  currentSeason,
  currentSeasonYear,
  nextSeason,
  nextSeasonYear,
} from "../seasons";

export const fetchHomeData = async () => {
  const variables = {
    currentSeason,
    currentSeasonYear,
    nextSeason,
    nextSeasonYear,
  };

  const options = {
    method: "post",
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: homeQuery,
      variables,
    },
  };

  try {
    const res = await axios(options);
    const animes: HomeAnimesList = res.data.data;
    return animes;
  } catch (error) {
    console.log(error);
  }
};
