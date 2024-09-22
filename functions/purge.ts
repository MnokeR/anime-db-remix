import { json } from "@remix-run/cloudflare";

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const purgeURL =
      "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache";

    // Your Cloudflare API token here (you should store it securely, not hardcode)
    const API_TOKEN = "YOUR_CLOUDFLARE_API_TOKEN";

    // Cache clearing request payload
    const body = JSON.stringify({
      purge_everything: true, // Purges the entire cache
      // You can also purge specific files by listing them here:
      // files: ["https://anime-db-remix.pages.dev/", "https://anime-db-remix.pages.dev/search/anime"]
    });

    const purgeRequest = await fetch(purgeURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body,
    });

    const result = await purgeRequest.json();

    if (result.success) {
      return json({ message: "Cache purged successfully" });
    } else {
      return json({ error: "Failed to purge cache", details: result.errors });
    }
  } catch (error) {
    return json({ error: "Something went wrong", details: error.message });
  }
};
