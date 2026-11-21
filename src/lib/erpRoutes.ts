export function erpPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return import.meta.env.DEV ? `/erp-site${normalizedPath}` : normalizedPath
}

export function erpProductsHref() {
  return import.meta.env.DEV ? '/erp-site/modules/' : '/products/'
}

export function erpModuleHref(slug: string) {
  return import.meta.env.DEV
    ? `/erp-site/modules/?module=${encodeURIComponent(slug)}`
    : `/products/${slug}/`
}
