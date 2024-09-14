import { useEffect, useRef } from "react";

type UseInViewProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const useInView = ({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: UseInViewProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const options = {
      rootMargin: "0px",
      threshold: 1,
    };

    if (containerRef.current && !observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      }, options);
    }

    if (observer.current && containerRef.current) {
      observer.current.observe(containerRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return containerRef;
};
