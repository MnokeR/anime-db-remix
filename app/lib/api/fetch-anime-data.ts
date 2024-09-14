import axios from "axios";
import { animeDetailQuery, URL } from "./queries";
import { AnimeDetail } from "../types/query-types";

export const fetchAnime = async (id: number) => {
  const variables = {
    id,
  };

  const options = {
    method: "post",
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: animeDetailQuery,
      variables,
    },
  };

  try {
    const res = await axios(options);
    const animes: AnimeDetail = res.data.data.Media;
    return animes;
  } catch (error) {
    console.log(error);
  }
};
