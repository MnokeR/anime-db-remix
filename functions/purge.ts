import { json } from "@remix-run/cloudflare";
export const onRequestGet: PagesFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const href = url.href;

    console.log("Request URL:", href); // Log the incoming URL

    const cacheURL = href.replace("purge", "");

    const cache = await caches.open("resources:cache");
    const isDeleted = await cache.delete(cacheURL);

    console.log("Cache URL:", cacheURL); // Log the cache URL
    console.log("Cache cleared:", isDeleted); // Log the cache clearing status

    return json({ cacheCleared: isDeleted });
  } catch (error) {
    console.error("Error occurred:", error); // Log the error
    return json({ error: "Something Went Wrong!" });
  }
};
