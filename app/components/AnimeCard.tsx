import { NavLink } from "@remix-run/react";

type AnimeCardProps = {
  image: string;
  title: string;
  format: string;
  id: number;
};

function AnimeCard({ image, title, format, id }: AnimeCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative w-[210px] h-[294px] flex items-center justify-center bg-secondary rounded-xl">
        <NavLink to={`/anime/${id}`} unstable_viewTransition>
          {({ isTransitioning }) => (
            <img
              className="rounded-xl w-[195px] h-[279px] object-cover z-10 "
              src={image}
              alt="Cover"
              width={195}
              height={279}
              style={
                isTransitioning
                  ? { viewTransitionName: "expand-image" }
                  : undefined
              }
            />
          )}
        </NavLink>
        <span className="absolute top-1 left-1 z-20 text-sm bg-primary text-primary-foreground rounded-full px-2 py-.5">
          {format}
        </span>
      </div>
      <p className="max-w-[210px] truncate text-sm text-center">{title}</p>
    </div>
  );
}

export default AnimeCard;
