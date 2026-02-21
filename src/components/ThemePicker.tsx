'use client'

const themes = [
  { id: 'jellyjelly' as const, name: 'JellyJelly', bg: 'linear-gradient(135deg, #8AABE4, #6B8FD4)', text: '#fff' },
  { id: 'dark' as const, name: 'Midnight', bg: '#0a0a0a', text: '#fff' },
  { id: 'light' as const, name: 'Clean', bg: '#f5f5f5', text: '#111' },
]

interface ThemePickerProps {
  selected: 'dark' | 'light' | 'jellyjelly'
  onChange: (theme: 'dark' | 'light' | 'jellyjelly') => void
}

export default function ThemePicker({ selected, onChange }: ThemePickerProps) {
  return (
    <div>
      <label className="text-sm text-white/50 mb-2 block">Theme</label>
      <div className="flex gap-2">
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex-1 rounded-xl p-3 text-xs font-medium border-2 transition-all ${
              selected === t.id ? 'border-[#8AABE4] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ background: t.bg, color: t.text }}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  )
}
