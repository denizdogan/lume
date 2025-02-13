import lume from "../mod.ts";
import { toFileUrl } from "../deps/path.ts";
import { dim, red } from "../deps/colors.ts";
import { getConfigFile } from "../core/utils.ts";

import type { Site } from "../core.ts";

/** Create a site instance */
export async function createSite(root: string, config?: string): Promise<Site> {
  const path = await getConfigFile(root, config);

  if (path) {
    console.log(`Loading config file ${dim(path)}`);
    console.log();
    const mod = await import(toFileUrl(path).href);
    return mod.default;
  }

  return lume();
}

/** A list of the available optional plugins */
export const pluginNames = [
  "attributes",
  "base_path",
  "code_highlight",
  "date",
  "esbuild",
  "eta",
  "imagick",
  "inline",
  "jsx",
  "liquid",
  "metas",
  "modify_urls",
  "netlify_cms",
  "on_demand",
  "parcel_css",
  "postcss",
  "prism",
  "pug",
  "relative_urls",
  "resolve_urls",
  "sass",
  "slugify_urls",
  "svgo",
  "terser",
];

export function log(...lines: (string | undefined)[]) {
  console.log("----------------------------------------");
  lines.forEach((line) => line && console.log(line));
  console.log("----------------------------------------");
}

export function promptConfigUpdate(data: unknown) {
  log(
    red("deno.jsonc needs to be manually updated:"),
    JSON.stringify(data, null, 2),
  );
}
