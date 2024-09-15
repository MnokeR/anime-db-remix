import axios from "axios";
import { searchQuery, URL } from "./queries";
import { AnimeSearch, SearchParams } from "../types/query-types";

export const fetchSearchResults = async (
  pageParam: number,
  params: SearchParams
) => {
  const variables = {
    search: params.term,
    type: params.type ? params.type : "ANIME",
    genres: params.genres,
    seasonYear: params.year,
    season: params.season,
    format: params.format,
    status: params.airStatus,
    sort: params.term ? "SEARCH_MATCH" : params.sort,
    page: pageParam,
  };

  const options = {
    method: "POST",
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: searchQuery,
      variables,
    },
  };

  try {
    const res = await axios(options);
    if (!res) {
      throw new Error(`Failed to fetch ${res}`);
    }
    const animes: AnimeSearch = res.data.data.Page;
    return animes;
  } catch (error) {
    console.error("Error fetching:", error);
  }
};
