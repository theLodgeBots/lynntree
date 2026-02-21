import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  if (!username) return NextResponse.json({ error: 'Missing username' }, { status: 400 })

  try {
    // Fetch the Linktree page HTML
    const res = await fetch(`https://linktr.ee/${username}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JellyTree/1.0)' }
    })
    if (!res.ok) throw new Error(`Linktree returned ${res.status}`)
    
    const html = await res.text()

    // Extract __NEXT_DATA__ JSON from Linktree (they use Next.js too)
    const dataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)
    
    let displayName = username
    let bio = ''
    let avatar = ''
    const links: { id: string; title: string; url: string }[] = []

    if (dataMatch) {
      try {
        const data = JSON.parse(dataMatch[1])
        const account = data?.props?.pageProps?.account
        if (account) {
          displayName = account.pageTitle || account.username || username
          bio = account.description || ''
          avatar = account.profilePictureUrl || ''
          
          const ltLinks = account.links || []
          for (const link of ltLinks) {
            if (link.url && link.title) {
              links.push({
                id: link.id?.toString() || Math.random().toString(36).slice(2),
                title: link.title,
                url: link.url,
              })
            }
          }
        }
      } catch { /* parse error, use fallbacks */ }
    }

    // Fallback: basic regex extraction if __NEXT_DATA__ isn't available
    if (links.length === 0) {
      const linkMatches = html.matchAll(/data-testid="LinkButton"[^>]*>.*?<a[^>]*href="([^"]+)"[^>]*>.*?<p[^>]*>([^<]+)<\/p>/gs)
      for (const m of linkMatches) {
        links.push({
          id: Math.random().toString(36).slice(2),
          title: m[2].trim(),
          url: m[1],
        })
      }
    }

    return NextResponse.json({
      username,
      displayName,
      bio,
      avatar,
      links,
      theme: 'jellyjelly' as const,
      jellyjellyHandle: '',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
