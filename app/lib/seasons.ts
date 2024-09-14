const date = new Date();
const monthIndex = date.getMonth();
const month = monthIndex + 1;

const seasons = [
  { label: "WINTER", months: [1, 2, 3] },
  { label: "SPRING", months: [4, 5, 6] },
  { label: "SUMMER", months: [7, 8, 9] },
  { label: "FALL", months: [10, 11, 12] },
];
const currentSeasonYear = date.getFullYear();
let currentSeason: string;
let nextSeason: string;
let nextSeasonYear = currentSeasonYear;

seasons.forEach((season) => {
  if (season.months.includes(month)) {
    currentSeason = season.label;
  }
  const currentIndex = seasons.findIndex((s) => s.label === currentSeason);
  const nextIndex = (currentIndex + 1) % seasons.length;
  nextSeason = seasons[nextIndex].label;
  if (currentSeason === "FALL") nextSeasonYear += 1;
});

export { currentSeasonYear, nextSeasonYear, currentSeason, nextSeason };
