export const selectType = [
  { label: "Anime", value: "ANIME", default: true },
  { label: "Manga", value: "MANGA", default: false },
];

const year = new Date().getFullYear();
const maxYear = year + 2;
const years = [];

for (let i = maxYear; i >= 1970; i--) {
  years.push({ label: i, value: `${i}` });
}

export const selectYear = years;

export const selectSeason = [
  { label: "Winter", value: "WINTER" },
  { label: "Spring", value: "SPRING" },
  { label: "Summer", value: "SUMMER" },
  { label: "Fall", value: "FALL" },
];
export const selectFormat = [
  { label: "TV", value: "TV" },
  { label: "Movie", value: "MOVIE" },
  { label: "Special", value: "SPECIAL" },
  { label: "OVA", value: "OVA" },
];

export const selectStatus = [
  { label: "Airing", value: "RELEASING" },
  { label: "Finished", value: "FINISHED" },
  { label: "Coming Soon", value: "NOT_YET_RELEASED" },
  { label: "Canceled", value: "CANCELLED" },
];

export const selectSort = [
  { label: "Score", value: "SCORE_DESC" },
  { label: "Popularity", value: "POPULARITY_DESC" },
  { label: "Trending", value: "TRENDING_DESC" },
  { label: "Status", value: "STATUS_DESC" },
];
