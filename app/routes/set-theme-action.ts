import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "~/lib/server/theme.server";

export const action = async (args: ActionFunctionArgs) => {
  return createThemeAction(themeSessionResolver)(args);
};
