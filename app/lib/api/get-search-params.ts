export const getSearchParams = (request: Request) => {
  const url = new URL(request.url);

  const term = url.searchParams.get("term") || undefined;
  const type = url.searchParams.get("Type") || undefined;
  const year = url.searchParams.get("Year") || undefined;
  const season = url.searchParams.get("Season") || undefined;
  const format = url.searchParams.get("Format") || undefined;
  const airStatus = url.searchParams.get("Status") || undefined;
  const sort = url.searchParams.get("Sort") || undefined;
  const genres = url.searchParams.get("Genres") || undefined;

  return { term, type, year, season, format, airStatus, sort, genres };
};

export const getNewSearchParams = (searchParams: URLSearchParams) => {
  return {
    term: searchParams.get("term")?.toString() || undefined,
    type: searchParams.get("Type")?.toString() || undefined,
    year: searchParams.get("Year")?.toString() || undefined,
    season: searchParams.get("Season")?.toString() || undefined,
    format: searchParams.get("Format")?.toString() || undefined,
    airStatus: searchParams.get("Status")?.toString() || undefined,
    sort: searchParams.get("Sort")?.toString() || undefined,
    genres: searchParams.get("Genres")?.toString() || undefined,
  };
};
