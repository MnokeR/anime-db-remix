import { Skeleton } from "./ui/skeleton";

function LoadingSkeleton() {
  return (
    <section className="flex flex-wrap justify-center gap-5">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-[279px] w-[195px]" />
      ))}
    </section>
  );
}

export default LoadingSkeleton;
