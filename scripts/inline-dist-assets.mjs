import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist", "public");
const indexPath = path.join(distDir, "index.html");

let html = await readFile(indexPath, "utf8");

html = html.replace(
  /\s*<script\s+defer\s+src="%VITE_ANALYTICS_ENDPOINT%\/umami"\s+data-website-id="%VITE_ANALYTICS_WEBSITE_ID%"><\/script>/,
  "",
);

html = await inlineStyles(html);
html = await inlineScripts(html);

await writeFile(indexPath, html, "utf8");

async function inlineStyles(source) {
  const stylesheetPattern = /<link\s+rel="stylesheet"\s+crossorigin\s+href="\.\/([^"]+\.css)">/g;

  return replaceAsync(source, stylesheetPattern, async (_match, assetPath) => {
    const css = await readFile(path.join(distDir, assetPath), "utf8");
    return `<style>\n${css}\n</style>`;
  });
}

async function inlineScripts(source) {
  const modulePattern = /<script\s+type="module"\s+crossorigin\s+src="\.\/([^"]+\.js)"><\/script>/g;

  return replaceAsync(source, modulePattern, async (_match, assetPath) => {
    const js = await readFile(path.join(distDir, assetPath), "utf8");
    return `<script type="module">\n${js}\n</script>`;
  });
}

async function replaceAsync(source, pattern, replacer) {
  const matches = [...source.matchAll(pattern)];
  let result = source;

  for (const match of matches.reverse()) {
    const replacement = await replacer(...match);
    result = `${result.slice(0, match.index)}${replacement}${result.slice(match.index + match[0].length)}`;
  }

  return result;
}
