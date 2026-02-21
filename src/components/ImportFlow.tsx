'use client'

import { useState } from 'react'
import { LynnTreeProfile } from '@/lib/linktree-import'
import ThemePicker from './ThemePicker'
import AddLinkModal from './AddLinkModal'

interface ImportFlowProps {
  onImport: (profile: LynnTreeProfile) => void
  onDemo: () => void
}

export default function ImportFlow({ onImport, onDemo }: ImportFlowProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'start' | 'customize'>('start')
  const [profile, setProfile] = useState<LynnTreeProfile | null>(null)
  const [showAddLink, setShowAddLink] = useState(false)

  async function handleImport() {
    if (!url.trim()) return
    setLoading(true)
    setError('')

    try {
      const username = url.replace(/https?:\/\/(www\.)?linktr\.ee\//, '').replace(/\/$/, '')
      const res = await fetch(`/api/import-linktree?username=${encodeURIComponent(username)}`)
      if (!res.ok) throw new Error('Could not find that Linktree profile')
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setProfile(data)
      setStep('customize')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'customize' && profile) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <h2 className="text-xl font-bold text-center">Customize Your LynnTree</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/50 mb-1 block">Display Name</label>
            <input
              type="text"
              value={profile.displayName}
              onChange={e => setProfile({ ...profile, displayName: e.target.value })}
              className="w-full bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div>
            <label className="text-sm text-white/50 mb-1 block">Bio</label>
            <textarea
              value={profile.bio}
              onChange={e => setProfile({ ...profile, bio: e.target.value })}
              className="w-full bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm text-white/50 mb-1 block">JellyJelly Handle</label>
            <input
              type="text"
              placeholder="@yourhandle"
              value={profile.jellyjellyHandle || ''}
              onChange={e => setProfile({ ...profile, jellyjellyHandle: e.target.value })}
              className="w-full bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="text-sm text-white/50 mb-1 block">Custom Domain (optional)</label>
            <input
              type="text"
              placeholder="links.yourdomain.com"
              value={profile.customDomain || ''}
              onChange={e => setProfile({ ...profile, customDomain: e.target.value })}
              className="w-full bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <ThemePicker
            selected={profile.theme}
            onChange={theme => setProfile({ ...profile, theme })}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-white/50">Links ({profile.links.length})</label>
              <button
                onClick={() => setShowAddLink(true)}
                className="text-xs text-pink-400 hover:text-pink-300"
              >+ Add link</button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {profile.links.map((link, i) => (
                <div key={link.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 text-sm">
                  <span className="text-white/40">{i + 1}.</span>
                  <span className="flex-1 truncate">{link.title}</span>
                  <button
                    onClick={() => setProfile({
                      ...profile,
                      links: profile.links.filter(l => l.id !== link.id)
                    })}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onImport(profile)}
          className="w-full jj-gradient rounded-xl px-6 py-4 font-bold text-lg hover:opacity-90 transition-opacity"
        >
          🪼 Launch My LynnTree
        </button>

        {showAddLink && (
          <AddLinkModal
            onAdd={(title, url) => {
              setProfile({
                ...profile,
                links: [...profile.links, { id: Math.random().toString(36).slice(2), title, url }]
              })
              setShowAddLink(false)
            }}
            onClose={() => setShowAddLink(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="text-6xl mb-4">🪼</div>
        <h1 className="text-3xl font-bold">
          <span className="jj-gradient bg-clip-text text-transparent">LynnTree</span>
        </h1>
        <p className="text-white/50">Your bio link page, powered by JellyJelly</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-white/50 mb-1 block">Import from Linktree</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="linktr.ee/yourname"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleImport()}
              className="flex-1 bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-white/20"
            />
            <button
              onClick={handleImport}
              disabled={loading}
              className="jj-gradient rounded-lg px-5 py-3 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? '...' : 'Import'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>

        <div className="text-center text-white/30 text-sm">or</div>

        <button
          onClick={onDemo}
          className="w-full jj-card rounded-xl px-6 py-4 font-medium hover:bg-white/12 transition-colors"
        >
          ✨ See a demo page
        </button>

        <button
          onClick={() => {
            setProfile({
              username: '',
              displayName: '',
              bio: '',
              avatar: '',
              links: [],
              theme: 'jellyjelly',
              jellyjellyHandle: '',
            })
            setStep('customize')
          }}
          className="w-full jj-card rounded-xl px-6 py-4 font-medium hover:bg-white/12 transition-colors"
        >
          🆕 Start from scratch
        </button>
      </div>
    </div>
  )
}
