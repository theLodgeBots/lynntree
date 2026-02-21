'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableLinkProps {
  id: string
  index: number
  title: string
  onRemove: () => void
}

export default function SortableLink({ id, index, title, onRemove }: SortableLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 text-sm group"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-white/20 hover:text-white/50 cursor-grab active:cursor-grabbing touch-none"
      >
        ⠿
      </button>
      <span className="text-white/40 text-xs w-5">{index + 1}.</span>
      <span className="flex-1 truncate">{title}</span>
      <button
        onClick={onRemove}
        className="text-red-400/0 group-hover:text-red-400 hover:text-red-300 text-xs transition-colors"
      >✕</button>
    </div>
  )
}
