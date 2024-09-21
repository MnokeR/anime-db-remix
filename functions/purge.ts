import { json } from "@remix-run/cloudflare";

export const onRequestGet: PagesFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get("path"); // Get the path from query parameters

    if (!path) {
      return json({ error: "No path provided!" }, { status: 400 });
    }

    const cacheURL = new URL(path, "https://anime-db-remix.pages.dev").href;

    const cache = await caches.open("resources:cache");
    const isDeleted = await cache.delete(cacheURL);

    return json({ cacheCleared: isDeleted, url: cacheURL });
  } catch (error) {
    return json({ error: "Something Went Wrong!" });
  }
};
