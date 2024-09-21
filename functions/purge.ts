import { json } from "@remix-run/cloudflare";
export const onRequestGet: PagesFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const href = url.href;

    const cacheURL = href.replace("purge", "");
    const cache = await caches.open("resources:cache");

    // Log the cache entries
    const cacheKeys = await cache.keys();
    const cacheEntries = await Promise.all(
      cacheKeys.map(async (key) => {
        const response = await cache.match(key);
        return {
          url: key.url,
          status: response ? response.status : "Not found",
        };
      })
    );

    console.log("Current cache entries:", cacheEntries);

    // Attempt to delete the specified URL
    const isDeleted = await cache.delete(cacheURL);
    return json({ cacheCleared: isDeleted, cacheEntries });
  } catch (error) {
    return json({ error: "Something Went Wrong!" });
  }
};
