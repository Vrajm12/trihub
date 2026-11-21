/**
 * Prerenders every page to static HTML after the client build.
 *
 * Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot…) and some search bots do
 * not execute JavaScript. Prerendering puts all copy, the FAQ and the JSON-LD
 * graph directly into the HTML; the client then hydrates it.
 */
import { build } from 'vite'
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const ssrOut = resolve(root, 'dist-ssr')

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, emptyOutDir: true, rollupOptions: { input: 'src/entry-server.tsx' } },
})

const { render, renderErpLanding, renderErpModule, renderErpAbout, renderErpBlogs, renderErpContact, erpModules, renderCrmLanding, renderCrmModule, crmModules, renderAutomationLanding, renderAutomationModule, automationModules, renderStandaloneProduct, standaloneProducts } = await import(pathToFileURL(resolve(ssrOut, 'entry-server.js')).href)

function escapeHtml(value) {
  return value.replace(/[&"<>']/g, (character) => ({
    '&': '&amp;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
  })[character])
}

const pages = [
  ['dist/404.html', 'not-found'],
  ['dist/index.html', 'home'],
  ['dist/solutions/index.html', 'solutions'],
  ['dist/products/index.html', 'products'],
  ['dist/crm/index.html', 'crm'],
  ['dist/erp/index.html', 'erp'],
  ['dist/automation/index.html', 'automation'],
  ['dist/mfg-system/index.html', 'mfg-system'],
  ['dist/finance-system/index.html', 'finance-system'],
  ['dist/outreach-portal/index.html', 'outreach-portal'],
  ['dist/lead-scraper/index.html', 'lead-scraper'],
  ['dist/custom-software/index.html', 'custom-software'],
  ['dist/industries/index.html', 'industries'],
  ['dist/pricing/index.html', 'pricing'],
  ['dist/faq/index.html', 'faq'],
  ['dist/contact/index.html', 'contact'],
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

const erpLandingPath = resolve(root, 'dist/erp-site/index.html')
const erpLandingHtml = await readFile(erpLandingPath, 'utf8')
if (!erpLandingHtml.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/erp-site/index.html')
await writeFile(erpLandingPath, erpLandingHtml.replace('<!--app-->', renderErpLanding()))
console.log('prerendered dist/erp-site/index.html')

const erpModulePath = resolve(root, 'dist/erp-site/modules/index.html')
const erpModuleHtml = await readFile(erpModulePath, 'utf8')
if (!erpModuleHtml.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/erp-site/modules/index.html')
const moduleTemplate = erpModuleHtml
for (const module of erpModules) {
  const outputPath = resolve(root, `dist/erp-site/modules/${module.slug}/index.html`)
  await mkdir(resolve(root, `dist/erp-site/modules/${module.slug}`), { recursive: true })
  const modulePageHtml = moduleTemplate
    .replace('<!--app-->', renderErpModule(module.slug))
    .replaceAll('__ERP_MODULE_TITLE__', escapeHtml(module.label))
    .replaceAll('__ERP_MODULE_DESCRIPTION__', escapeHtml(`${module.label}: workflows, dashboard, product details, and frequently asked questions for education teams.`))
    .replaceAll('__ERP_MODULE_SLUG__', module.slug)
  await writeFile(outputPath, modulePageHtml)
  console.log(`prerendered dist/erp-site/modules/${module.slug}/index.html`)
}
const defaultModuleHtml = moduleTemplate
  .replace('<!--app-->', renderErpModule('campus-management-system'))
  .replaceAll('__ERP_MODULE_TITLE__', 'Campus Management System')
  .replaceAll('__ERP_MODULE_DESCRIPTION__', 'Explore Trihub Education ERP modules for campus teams.')
  .replaceAll('__ERP_MODULE_SLUG__', 'campus-management-system')
await writeFile(erpModulePath, defaultModuleHtml)
console.log('prerendered dist/erp-site/modules/index.html')

const erpAboutPath = resolve(root, 'dist/erp-site/about/index.html')
const erpAboutHtml = await readFile(erpAboutPath, 'utf8')
if (!erpAboutHtml.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/erp-site/about/index.html')
await writeFile(erpAboutPath, erpAboutHtml.replace('<!--app-->', renderErpAbout()))
console.log('prerendered dist/erp-site/about/index.html')

const erpBlogsPath = resolve(root, 'dist/erp-site/blogs/index.html')
const erpBlogsHtml = await readFile(erpBlogsPath, 'utf8')
if (!erpBlogsHtml.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/erp-site/blogs/index.html')
await writeFile(erpBlogsPath, erpBlogsHtml.replace('<!--app-->', renderErpBlogs()))
console.log('prerendered dist/erp-site/blogs/index.html')

const erpContactPath = resolve(root, 'dist/erp-site/contact/index.html')
const erpContactHtml = await readFile(erpContactPath, 'utf8')
if (!erpContactHtml.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/erp-site/contact/index.html')
await writeFile(erpContactPath, erpContactHtml.replace('<!--app-->', renderErpContact()))
console.log('prerendered dist/erp-site/contact/index.html')

const crmLandingPath = resolve(root, 'dist/crm-site/index.html')
const crmLandingHtml = await readFile(crmLandingPath, 'utf8')
if (!crmLandingHtml.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/crm-site/index.html')
await writeFile(crmLandingPath, crmLandingHtml.replace('<!--app-->', renderCrmLanding()))
console.log('prerendered dist/crm-site/index.html')

const crmModulePath = resolve(root, 'dist/crm-site/modules/index.html')
const crmModuleTemplate = await readFile(crmModulePath, 'utf8')
if (!crmModuleTemplate.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/crm-site/modules/index.html')
for (const module of crmModules) {
  const outputDir = resolve(root, `dist/crm-site/modules/${module.slug}`)
  await mkdir(outputDir, { recursive: true })
  const html = crmModuleTemplate
    .replace('<!--app-->', renderCrmModule(module.slug))
    .replaceAll('__CRM_MODULE_TITLE__', escapeHtml(module.label))
    .replaceAll('__CRM_MODULE_DESCRIPTION__', escapeHtml(`${module.label}: workflows, dashboard, product details, and frequently asked questions for Trihub CRM.`))
    .replaceAll('__CRM_MODULE_SLUG__', module.slug)
  await writeFile(resolve(outputDir, 'index.html'), html)
  console.log(`prerendered dist/crm-site/modules/${module.slug}/index.html`)
}
const crmDefaultModule = crmModuleTemplate
  .replace('<!--app-->', renderCrmModule('lead-management'))
  .replaceAll('__CRM_MODULE_TITLE__', 'Lead Management')
  .replaceAll('__CRM_MODULE_DESCRIPTION__', 'Explore lead management workflows in Trihub CRM.')
  .replaceAll('__CRM_MODULE_SLUG__', 'lead-management')
await writeFile(crmModulePath, crmDefaultModule)
console.log('prerendered dist/crm-site/modules/index.html')

const automationLandingPath = resolve(root, 'dist/automation-site/index.html')
const automationLandingHtml = await readFile(automationLandingPath, 'utf8')
if (!automationLandingHtml.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/automation-site/index.html')
await writeFile(automationLandingPath, automationLandingHtml.replace('<!--app-->', renderAutomationLanding()))
console.log('prerendered dist/automation-site/index.html')

const automationModulePath = resolve(root, 'dist/automation-site/modules/index.html')
const automationModuleTemplate = await readFile(automationModulePath, 'utf8')
if (!automationModuleTemplate.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/automation-site/modules/index.html')
for (const module of automationModules) {
  const outputDir = resolve(root, `dist/automation-site/modules/${module.slug}`)
  await mkdir(outputDir, { recursive: true })
  const html = automationModuleTemplate
    .replace('<!--app-->', renderAutomationModule(module.slug))
    .replaceAll('__AUTOMATION_MODULE_TITLE__', escapeHtml(module.label))
    .replaceAll('__AUTOMATION_MODULE_DESCRIPTION__', escapeHtml(`${module.label}: workflows, dashboard, product details, and frequently asked questions for Trihub Automation.`))
    .replaceAll('__AUTOMATION_MODULE_SLUG__', module.slug)
  await writeFile(resolve(outputDir, 'index.html'), html)
  console.log(`prerendered dist/automation-site/modules/${module.slug}/index.html`)
}
const automationDefaultModule = automationModuleTemplate
  .replace('<!--app-->', renderAutomationModule('automated-workflows'))
  .replaceAll('__AUTOMATION_MODULE_TITLE__', 'Automated Workflows')
  .replaceAll('__AUTOMATION_MODULE_DESCRIPTION__', 'Explore automated workflow capabilities in Trihub Automation.')
  .replaceAll('__AUTOMATION_MODULE_SLUG__', 'automated-workflows')
await writeFile(automationModulePath, automationDefaultModule)
console.log('prerendered dist/automation-site/modules/index.html')

const standaloneTemplate = await readFile(resolve(root, 'dist/standalone-site/index.html'), 'utf8')
if (!standaloneTemplate.includes('<!--app-->')) throw new Error('Missing <!--app--> placeholder in dist/standalone-site/index.html')
for (const product of standaloneProducts) {
  const outputDir = resolve(root, `dist/${product.subdomain}-site`)
  await mkdir(outputDir, { recursive: true })
  const host = product.subdomain === 'leads' ? 'leads' : product.subdomain
  const html = standaloneTemplate
    .replace('<!--app-->', renderStandaloneProduct(product.key))
    .replaceAll('__PRODUCT_LABEL__', escapeHtml(product.label))
    .replaceAll('__PRODUCT_DESCRIPTION__', escapeHtml(product.description))
    .replaceAll('__PRODUCT_CANONICAL__', `https://${host}.trihub.tech/`)
  await writeFile(resolve(outputDir, 'index.html'), html)
  console.log(`prerendered dist/${product.subdomain}-site/index.html`)
}

await rm(ssrOut, { recursive: true, force: true })
