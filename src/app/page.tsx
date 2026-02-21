'use client'

import { useState } from 'react'
import { JellyTreeProfile, getDemoProfile } from '@/lib/linktree-import'
import ImportFlow from '@/components/ImportFlow'
import ProfilePage from '@/components/ProfilePage'
import PhonePreview from '@/components/PhonePreview'

export default function Home() {
  const [profile, setProfile] = useState<JellyTreeProfile | null>(null)
  const [mode, setMode] = useState<'import' | 'preview'>('import')

  function handleImport(p: JellyTreeProfile) {
    setProfile(p)
    setMode('preview')
  }

  function handleDemo() {
    setProfile(getDemoProfile())
    setMode('preview')
  }

  if (mode === 'preview' && profile) {
    return (
      <div>
        {/* Editor bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setMode('import')}
            className="text-sm text-white/60 hover:text-white flex items-center gap-1"
          >
            ← Back to editor
          </button>
          <div className="flex items-center gap-2">
            <img src="/jelly-icon.svg" alt="" className="w-4 h-4 opacity-50" />
            <span className="text-sm font-semibold jj-text">JellyTree</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30 hidden sm:inline">
              tree.jellyjelly.com/{profile.username || 'yourname'}
            </span>
            <button
              onClick={() => {
                const url = profile.customDomain
                  ? `https://${profile.customDomain}`
                  : `https://tree.jellyjelly.com/${profile.username}`
                navigator.clipboard.writeText(url)
              }}
              className="text-xs bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 transition-colors"
            >
              📋 Copy Link
            </button>
            <button className="text-xs jj-gradient rounded-lg px-3 py-1.5 font-semibold flex items-center gap-1">
              <img src="/jelly-icon.svg" alt="" className="w-3.5 h-3.5" /> Publish
            </button>
          </div>
        </div>

        {/* Desktop: side-by-side phone preview + full page */}
        <div className="pt-14 min-h-screen">
          {/* Mobile: just show the page */}
          <div className="lg:hidden">
            <ProfilePage profile={profile} />
          </div>
          
          {/* Desktop: phone preview + full page */}
          <div className="hidden lg:flex items-start justify-center gap-12 py-12 px-8">
            <div className="sticky top-24">
              <PhonePreview profile={profile} />
            </div>
            <div className="flex-1 max-w-lg">
              <ProfilePage profile={profile} showAnalytics />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <ImportFlow onImport={handleImport} onDemo={handleDemo} />
    </div>
  )
}
