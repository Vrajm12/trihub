/**
 * Prerenders every page to static HTML after the client build.
 *
 * Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot…) and some search bots do
 * not execute JavaScript. Prerendering puts all copy, the FAQ and the JSON-LD
 * graph directly into the HTML; the client then hydrates it.
 */
import { build } from 'vite'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const ssrOut = resolve(root, 'dist-ssr')

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, emptyOutDir: true, rollupOptions: { input: 'src/entry-server.tsx' } },
})

const { render } = await import(pathToFileURL(resolve(ssrOut, 'entry-server.js')).href)

const pages = [
  ['dist/index.html', 'home'],
  ['dist/privacy/index.html', 'privacy'],
  ['dist/terms/index.html', 'terms'],
]
for (const [file, page] of pages) {
  const path = resolve(root, file)
  const html = await readFile(path, 'utf8')
  if (!html.includes('<!--app-->')) throw new Error(`Missing <!--app--> placeholder in ${file}`)
  await writeFile(path, html.replace('<!--app-->', render(page)))
  console.log(`prerendered ${file}`)
}

await rm(ssrOut, { recursive: true, force: true })
