'use client'

import { JellyTreeProfile } from '@/lib/linktree-import'
import ProfilePage from './ProfilePage'

export default function PhonePreview({ profile }: { profile: JellyTreeProfile }) {
  return (
    <div className="flex flex-col items-center">
      {/* Phone frame */}
      <div className="relative w-[320px] h-[640px] rounded-[3rem] border-4 border-white/20 bg-black overflow-hidden shadow-2xl shadow-[#8AABE4]/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
        
        {/* Screen content */}
        <div className="w-full h-full overflow-y-auto pt-6">
          <div className="scale-[0.85] origin-top">
            <ProfilePage profile={profile} />
          </div>
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
      </div>
      
      <p className="text-xs text-white/30 mt-3">Mobile preview</p>
    </div>
  )
}
