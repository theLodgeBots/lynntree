'use client'

import { JellyTreeProfile } from '@/lib/linktree-import'

export default function ProfilePage({ profile }: { profile: JellyTreeProfile }) {
  const themeStyles = {
    jellyjelly: 'bg-[#0a0a0a] text-white',
    dark: 'bg-[#0a0a0a] text-white',
    light: 'bg-[#f5f5f5] text-[#111]',
  }

  const cardStyles = {
    jellyjelly: 'jj-card hover:border-[#8AABE4]/30',
    dark: 'bg-white/8 border border-white/10 hover:border-white/20',
    light: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
  }

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 py-12 ${themeStyles[profile.theme]}`}>
      {/* JellyJelly branding */}
      <div className="fixed top-4 right-4 opacity-60 hover:opacity-100 transition-opacity">
        <a href="https://jellyjelly.com" target="_blank" className="flex items-center gap-1.5">
          <img src="/jelly-icon.svg" alt="JellyJelly" className="w-5 h-5" />
          <span className="text-xs text-white/50 hover:text-white">JellyJelly</span>
        </a>
      </div>

      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-[#8AABE4]/20 flex items-center justify-center mb-4 shadow-lg shadow-[#8AABE4]/10 border-2 border-[#8AABE4]/20">
        {profile.avatar ? (
          <img src={profile.avatar} alt={profile.displayName} className="w-full h-full rounded-full object-cover" />
        ) : (
          <img src="/jelly-icon.svg" alt="JellyJelly" className="w-12 h-12 opacity-60" />
        )}
      </div>

      {/* Name & Bio */}
      <h1 className="text-2xl font-bold mb-1">{profile.displayName}</h1>
      {profile.jellyjellyHandle && (
        <a href={`https://jellyjelly.com/${profile.jellyjellyHandle}`} className="jj-text text-sm mb-2 hover:underline font-medium">
          {profile.jellyjellyHandle} on JellyJelly
        </a>
      )}
      <p className="text-white/60 text-center max-w-sm mb-8">{profile.bio}</p>

      {/* Links */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {profile.links.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-card ${cardStyles[profile.theme]} rounded-xl px-6 py-4 text-center font-medium transition-all`}
          >
            {link.title}
          </a>
        ))}
      </div>

      {/* Custom domain badge */}
      {profile.customDomain && (
        <div className="mt-8 text-xs text-white/30">
          🔗 {profile.customDomain}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <a href="https://jellyjelly.com" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors">
          <img src="/jelly-icon.svg" alt="" className="w-5 h-5 opacity-50" />
          <span>Get your own <span className="jj-text font-semibold">JellyTree</span></span>
        </a>
      </div>
    </div>
  )
}
