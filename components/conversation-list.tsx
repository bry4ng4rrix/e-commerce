'use client'

import { formatMessageTime } from '@/lib/date-utils'
import { Conversation } from '@/lib/types'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState, useMemo } from 'react'

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: number | null
  onSelectConversation: (id: number) => void
}

const typeLabels: Record<string, string> = {
  prof: 'Professeur',
  admin: 'Administrateur',
  student: 'Élève',
  parent: 'Parent',
}

const typeColors: Record<string, string> = {
  prof: 'border-l-blue-500',
  admin: 'border-l-purple-500',
  student: 'border-l-green-500',
  parent: 'border-l-orange-500',
}

export function ConversationList({
  conversations,
  selectedId,
  onSelectConversation,
}: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) =>
      conv.participants.some(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [conversations, searchTerm])

  return (
    <div className="flex flex-col h-full bg-background border-r">
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full text-left px-4 py-3 border-l-4 transition-colors hover:bg-accent ${
                selectedId === conversation.id
                  ? 'bg-accent border-l-primary'
                  : `${typeColors[conversation.participantType]} hover:bg-muted/50`
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="font-semibold text-sm truncate">
                    {conversation.participants
                      .map((p) => p.name)
                      .join(', ')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {typeLabels[conversation.participantType]}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-primary flex-shrink-0">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate mb-1">
                {conversation.lastMessageSender}: {conversation.lastMessage}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatMessageTime(conversation.lastMessageTime)}
              </p>
            </button>
          ))
        ) : (
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <p className="text-sm">Aucune conversation trouvée</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t text-xs text-muted-foreground">
        <p>{filteredConversations.length} conversation(s)</p>
      </div>
    </div>
  )
}
