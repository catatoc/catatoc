"use client"

import React, { useEffect } from "react"

export default function MusicSection() {
  useEffect(() => {
    // Reproduce la canción al cargar la vista
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement
    audio.play()
  }, [])

  return (
    <div className="music-container">
      <audio
        id="background-music"
        src="/music/music.mp3"
        preload="auto"
      ></audio>
    </div>
  )
}
