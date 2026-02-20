'use client'

import { formatMessageTime } from '@/lib/date-utils'
import { ChatMessage } from '@/lib/types'

interface MessageItemProps {
  message: ChatMessage
  isOwn: boolean
}

const senderColors: Record<string, string> = {
  prof: 'bg-blue-500',
  admin: 'bg-purple-500',
  student: 'bg-green-500',
  parent: 'bg-orange-500',
}

export function MessageItem({ message, isOwn }: MessageItemProps) {
  const bgColor = senderColors[message.senderType] || 'bg-gray-500'

  return (
    <div
      className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white text-xs font-semibold`}
      >
        {message.senderInitials}
      </div>

      {/* Message Bubble */}
      <div className={`flex flex-col gap-1 max-w-xs ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">
            {message.sender}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>

        <div
          className={`px-4 py-2 rounded-lg break-words ${
            isOwn
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-muted text-foreground rounded-bl-none'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
