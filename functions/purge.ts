import { json } from "@remix-run/cloudflare";

export const onRequestGet: PagesFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const href = url.href;

    // Assume the endpoint is something like /purge/path
    const cacheURL = href.replace("purge", "");

    const cache = await caches.open("resources:cache");

    // Check if the cache exists before trying to delete
    const cachedResponse = await cache.match(cacheURL);
    if (!cachedResponse) {
      return json(
        { error: "Cache not found for the requested URL." },
        { status: 404 }
      );
    }

    const isDeleted = await cache.delete(cacheURL);

    return json({ cacheCleared: isDeleted, url: cacheURL });
  } catch (error) {
    return json(
      { error: "Something went wrong!", details: error.message },
      { status: 500 }
    );
  }
};
