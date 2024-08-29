import React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LeaderboardProps {
  title: string
  values: string[]
}

const emojiList = ["🥇", "🥈", "🥉", "🎖️", "🏅"]

const Leaderboard = ({ title, values }: LeaderboardProps) => {
  return (
    <Card className="mx-auto my-8 max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-none p-0">
          {values.slice(0, 5).map((value, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center justify-between px-4 py-2 text-lg"
              )}
            >
              <span className="text-xl">{emojiList[index]}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default Leaderboard
