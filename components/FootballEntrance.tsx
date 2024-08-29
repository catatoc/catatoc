"use client"

import React from "react"

export default function FootballEntrance() {
  return (
    <div className="football-container">
      <div className="football">⚽</div>
      <style jsx>{`
        .football-container {
          position: relative;
          width: 100%;
          height: 100vh; /* Full screen height */
          overflow: hidden;
        }

        .football {
          position: absolute;
          top: 50%;
          left: -100px; /* Start off-screen */
          font-size: 48px; /* Size of the football */
          animation: football-animation 4s cubic-bezier(0.22, 0.61, 0.36, 1)
            forwards;
        }

        @keyframes football-animation {
          0% {
            transform: translateX(-100%) translateY(-50%) rotate(0deg);
          }
          40% {
            transform: translateX(50vw) translateY(-50%) rotate(720deg); /* Move to the middle with spin */
          }
          60% {
            transform: translateX(70vw) translateY(-30vh) rotate(1440deg); /* Continue spinning with slight upward curve */
          }
          100% {
            transform: translateX(120vw) translateY(-30vh) rotate(2160deg); /* Ensure exit off-screen */
          }
        }
      `}</style>
    </div>
  )
}
