'use client'

import { useState, useEffect } from 'react'

interface ClickData {
  [linkId: string]: { clicks: number; lastClicked: string }
}

export default function AnalyticsPanel({ linkIds, linkTitles }: { linkIds: string[]; linkTitles: string[] }) {
  const [clicks, setClicks] = useState<ClickData>({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('jellytree-analytics')
    if (stored) setClicks(JSON.parse(stored))
  }, [])

  const totalClicks = Object.values(clicks).reduce((sum, c) => sum + c.clicks, 0)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:bg-white/15 transition-colors z-40"
      >
        📊 <span className="text-white/60">{totalClicks} clicks</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 bg-[#141414] border border-white/10 rounded-2xl p-4 shadow-2xl z-40">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">📊 Analytics</h3>
        <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white text-xs">✕</button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-xl font-bold jj-text">{totalClicks}</div>
          <div className="text-[10px] text-white/40">Total Clicks</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-xl font-bold jj-text">{linkIds.length}</div>
          <div className="text-[10px] text-white/40">Active Links</div>
        </div>
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {linkIds.map((id, i) => {
          const data = clicks[id] || { clicks: 0 }
          const maxClicks = Math.max(1, ...Object.values(clicks).map(c => c.clicks))
          const barWidth = (data.clicks / maxClicks) * 100

          return (
            <div key={id} className="flex items-center gap-2 text-xs">
              <div className="flex-1 truncate text-white/60">{linkTitles[i]}</div>
              <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8AABE4] rounded-full transition-all"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span className="text-white/40 w-6 text-right">{data.clicks}</span>
            </div>
          )
        })}
      </div>

      <p className="text-[10px] text-white/20 mt-3 text-center">Prototype — data stored locally</p>
    </div>
  )
}
