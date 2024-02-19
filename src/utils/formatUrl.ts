export function formatUrlLink(url?: string | null) {
  if (!url) return null
  return !url.includes('https') ? `https://api.thekuasar.com/${url}` : url
}
