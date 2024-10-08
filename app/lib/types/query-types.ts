export type AnimesList = {
  nextSeason: { media: AnimeShort[] };
  popular: { media: AnimeShort[] };
  season: { media: AnimeShort[] };
  top: { media: AnimeShort[] };
  trending: { media: AnimeShort[] };
};

export type MangaList = {
  manhwa: { media: AnimeShort[] };
  popular: { media: AnimeShort[] };
  top: { media: AnimeShort[] };
  trending: { media: AnimeShort[] };
};

export type AnimeDetail = { Media: AnimeShort & AnimeFull };

export type AnimeSearch = {
  Page: { media: AnimeShort[]; pageInfo: PageInfo };
};

export type PageInfo = {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
};

export type AnimeShort = {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    color: string;
  };
  format: string;
};

export type AnimeFull = {
  description: string;
  bannerImage: string;

  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  countryOfOrigin: string;
  source: string;
  chapters: string;

  characterPreview: {
    edges: {
      id: number;
      role: string;
      node: {
        id: number;
        name: {
          userPreferred: string;
        };
        image: {
          large: string;
        };
      };
      voiceActors: {
        id: number;
        name: {
          userPreferred: string;
        };
        image: {
          large: string;
        };
      }[];
    }[];
  };

  relations: {
    edges: {
      id: number;
      relationType: string;
      node: {
        id: number;
        bannerImage: string;
        coverImage: {
          large: string;
        };
        format: string;
        status: string;
        title: {
          userPreferred: string;
        };
        type: string;
      };
    }[];
  };

  externalLinks: {
    id: number;
    site: string;
    url: string;
  }[];

  season: string;
  seasonYear: number;

  type: string;
  format: string;
  status: string;
  episodes: number;
  duration: number;

  genres: string[];

  isAdult: boolean;
  averageScore: number;
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };

  studios: {
    edges: {
      isMain: boolean;
      node: {
        id: number;
        name: string;
      };
    }[];
  };
};

export type SearchParams = {
  page?: number;
  term?: string;
  type?: string;
  sort?: string;
  year?: string;
  season?: string;
  format?: string;
  airStatus?: string;
  genres?: string;
};
