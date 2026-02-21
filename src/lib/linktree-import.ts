export interface LinkItem {
  id: string
  title: string
  url: string
  icon?: string
  thumbnail?: string
}

export interface JellyTreeProfile {
  username: string
  displayName: string
  bio: string
  avatar: string
  links: LinkItem[]
  jellyjellyHandle?: string
  customDomain?: string
  theme: 'dark' | 'light' | 'jellyjelly'
}

// Parse a Linktree URL and scrape the profile data
export async function importFromLinktree(url: string): Promise<JellyTreeProfile> {
  // Extract username from URL
  const username = url.replace(/https?:\/\/(www\.)?linktr\.ee\//, '').replace(/\/$/, '')
  
  const res = await fetch(`/api/import-linktree?username=${encodeURIComponent(username)}`)
  if (!res.ok) throw new Error('Failed to import Linktree profile')
  return res.json()
}

// Generate a unique JellyTree URL
export function getJellyTreeUrl(username: string, customDomain?: string): string {
  if (customDomain) return `https://${customDomain}`
  return `https://tree.jellyjelly.com/${username}`
}

// Demo data for prototype
export function getDemoProfile(): JellyTreeProfile {
  return {
    username: 'jellyjelly',
    displayName: 'JellyJelly',
    bio: '🪼 The social app that vibes different',
    avatar: '/jj-avatar.png',
    theme: 'jellyjelly',
    jellyjellyHandle: '@jellyjelly',
    links: [
      { id: '1', title: '🪼 Follow me on JellyJelly', url: 'https://jellyjelly.com/@jellyjelly' },
      { id: '2', title: '📱 Download JellyJelly', url: 'https://jellyjelly.com/download' },
      { id: '3', title: '🎵 My Latest Mix', url: 'https://soundcloud.com/example' },
      { id: '4', title: '📸 Instagram', url: 'https://instagram.com/jellyjelly' },
      { id: '5', title: '🐦 Twitter / X', url: 'https://x.com/jellyjelly' },
      { id: '6', title: '🛍️ Merch Store', url: 'https://shop.jellyjelly.com' },
      { id: '7', title: '📧 Contact / Booking', url: 'mailto:hello@jellyjelly.com' },
    ]
  }
}
