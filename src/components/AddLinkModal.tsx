'use client'

import { useState } from 'react'

interface AddLinkModalProps {
  onAdd: (title: string, url: string) => void
  onClose: () => void
}

export default function AddLinkModal({ onAdd, onClose }: AddLinkModalProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (title.trim() && url.trim()) {
      onAdd(title.trim(), url.startsWith('http') ? url.trim() : `https://${url.trim()}`)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm space-y-4"
      >
        <h3 className="text-lg font-bold">Add Link</h3>
        <div>
          <label className="text-sm text-white/50 mb-1 block">Title</label>
          <input
            type="text"
            placeholder="My Website"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            autoFocus
          />
        </div>
        <div>
          <label className="text-sm text-white/50 mb-1 block">URL</label>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="w-full bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 bg-white/10 rounded-lg py-3 hover:bg-white/20">
            Cancel
          </button>
          <button type="submit" className="flex-1 jj-gradient rounded-lg py-3 font-semibold hover:opacity-90">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
