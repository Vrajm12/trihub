import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'crm-local-module-routes',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          const match = request.url?.match(/^\/crm-site\/modules\/([^/?]+)\/?(?:\?.*)?$/)
          if (match?.[1]) {
            request.url = `/crm-site/modules/?module=${encodeURIComponent(match[1])}`
          }
          const automationMatch = request.url?.match(/^\/automation-site\/modules\/([^/?]+)\/?(?:\?.*)?$/)
          if (automationMatch?.[1]) {
            request.url = `/automation-site/modules/?module=${encodeURIComponent(automationMatch[1])}`
          }
          const standaloneMatch = request.url?.match(/^\/(mfg|finance|outreach|leads)-site\/?(?:\?.*)?$/)
          if (standaloneMatch?.[1]) {
            const key = standaloneMatch[1] === 'leads' ? 'lead' : standaloneMatch[1]
            request.url = `/standalone-site/?product=${encodeURIComponent(key)}`
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: { '@': r('./src') },
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        main: r('./index.html'),
        erpLanding: r('./erp-site/index.html'),
        erpModules: r('./erp-site/modules/index.html'),
        erpAbout: r('./erp-site/about/index.html'),
        erpBlogs: r('./erp-site/blogs/index.html'),
        erpContact: r('./erp-site/contact/index.html'),
        crmLanding: r('./crm-site/index.html'),
        crmModules: r('./crm-site/modules/index.html'),
        automationLanding: r('./automation-site/index.html'),
        automationModules: r('./automation-site/modules/index.html'),
        standaloneProducts: r('./standalone-site/index.html'),
        notFound: r('./404.html'),
        solutions: r('./solutions/index.html'),
        products: r('./products/index.html'),
        crm: r('./crm/index.html'),
        erp: r('./erp/index.html'),
        automation: r('./automation/index.html'),
        mfgSystem: r('./mfg-system/index.html'),
        financeSystem: r('./finance-system/index.html'),
        outreachPortal: r('./outreach-portal/index.html'),
        leadScraper: r('./lead-scraper/index.html'),
        customSoftware: r('./custom-software/index.html'),
        industries: r('./industries/index.html'),
        pricing: r('./pricing/index.html'),
        faq: r('./faq/index.html'),
        contact: r('./contact/index.html'),
        privacy: r('./privacy/index.html'),
        terms: r('./terms/index.html'),
      },
    },
  },
})
