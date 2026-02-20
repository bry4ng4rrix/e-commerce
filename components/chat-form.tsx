'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Conversation, ChatMessage } from '@/lib/types'
import { MessageItem } from './message-item'
import { ConversationList } from './conversation-list'
import { formatMessageTime } from '@/lib/date-utils'

// Mock data for conversations
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    participants: [
      { name: 'M. Dupont', type: 'prof', initials: 'MD' },
      { name: 'Jean Durand', type: 'student', initials: 'JD' },
    ],
    lastMessage: 'Merci pour ton devoir, très bien!',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    lastMessageSender: 'M. Dupont',
    unreadCount: 2,
    participantType: 'prof',
    messages: [
      {
        id: 1,
        sender: 'Jean Durand',
        senderInitials: 'JD',
        senderType: 'student',
        content: 'Bonjour monsieur Dupont, vous avez reçu mon devoir?',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: true,
      },
      {
        id: 2,
        sender: 'M. Dupont',
        senderInitials: 'MD',
        senderType: 'prof',
        content: 'Oui Jean, je viens de le corriger',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        read: true,
      },
      {
        id: 3,
        sender: 'M. Dupont',
        senderInitials: 'MD',
        senderType: 'prof',
        content: 'Merci pour ton devoir, très bien!',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
    ],
  },
  {
    id: 2,
    participants: [
      { name: 'Directeur Martin', type: 'admin', initials: 'DM' },
      { name: 'Sarah Moreau', type: 'parent', initials: 'SM' },
    ],
    lastMessage: 'Nous avons besoin de confirmer l\'inscription',
    lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
    lastMessageSender: 'Directeur Martin',
    unreadCount: 0,
    participantType: 'admin',
    messages: [
      {
        id: 1,
        sender: 'Sarah Moreau',
        senderInitials: 'SM',
        senderType: 'parent',
        content: 'Bonjour, j\'aimerais savoir l\'état de l\'inscription',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
      },
      {
        id: 2,
        sender: 'Directeur Martin',
        senderInitials: 'DM',
        senderType: 'admin',
        content: 'Bonjour, merci de votre demande.',
        timestamp: new Date(Date.now() - 129600000).toISOString(),
        read: true,
      },
      {
        id: 3,
        sender: 'Directeur Martin',
        senderInitials: 'DM',
        senderType: 'admin',
        content: 'Nous avons besoin de confirmer l\'inscription',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
      },
    ],
  },
  {
    id: 3,
    participants: [
      { name: 'Mme Leclerc', type: 'prof', initials: 'ML' },
      { name: 'Marc Henri', type: 'student', initials: 'MH' },
      { name: 'Anne Henry', type: 'parent', initials: 'AH' },
    ],
    lastMessage: 'Les progrès sont visibles, continuez ainsi',
    lastMessageTime: new Date(Date.now() - 43200000).toISOString(),
    lastMessageSender: 'Mme Leclerc',
    unreadCount: 1,
    participantType: 'prof',
    messages: [
      {
        id: 1,
        sender: 'Anne Henry',
        senderInitials: 'AH',
        senderType: 'parent',
        content: 'Comment va Marc à l\'école?',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
      },
      {
        id: 2,
        sender: 'Mme Leclerc',
        senderInitials: 'ML',
        senderType: 'prof',
        content: 'Bonjour Madame, Marc est très attentif en classe',
        timestamp: new Date(Date.now() - 129600000).toISOString(),
        read: true,
      },
      {
        id: 3,
        sender: 'Mme Leclerc',
        senderInitials: 'ML',
        senderType: 'prof',
        content: 'Les progrès sont visibles, continuez ainsi',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        read: false,
      },
    ],
  },
]

export function ChatForm() {
  const [conversations, setConversations] = useState<Conversation[]>(
    MOCK_CONVERSATIONS
  )
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(1)
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  )

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedConversation?.messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !selectedConversation) return

    const newMessage: ChatMessage = {
      id: Math.max(...selectedConversation.messages.map((m) => m.id), 0) + 1,
      sender: 'Vous',
      senderInitials: 'V',
      senderType: selectedConversation.participantType,
      content: messageText,
      timestamp: new Date().toISOString(),
      read: false,
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageText,
            lastMessageTime: new Date().toISOString(),
            lastMessageSender: 'Vous',
          }
        }
        return conv
      })
    )

    setMessageText('')
  }

  const [showConversationList, setShowConversationList] = useState(false)

  return (
    <div className="flex h-full bg-background">
      {/* Conversation List - Desktop and Mobile */}
      <div className={`${
        showConversationList ? 'absolute inset-y-0 left-0 z-50 w-80 sm:w-96' : 'hidden'
      } md:relative md:block md:w-80 lg:w-96`}>
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelectConversation={(id) => {
            setSelectedConversationId(id)
            setShowConversationList(false)
          }}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {selectedConversation && (
          <div className="border-b bg-background p-3 md:p-6 flex items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-base md:text-xl font-semibold mb-1 truncate">
                {selectedConversation.participants
                  .map((p) => p.name)
                  .join(', ')}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {selectedConversation.participants
                  .map((p) => `${p.type}`)
                  .join(' • ')}
              </p>
            </div>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowConversationList(!showConversationList)}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
            >
              📋
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
          {selectedConversation ? (
            <>
              {selectedConversation.messages.length > 0 ? (
                selectedConversation.messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    isOwn={message.sender === 'Vous'}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p className="text-xs md:text-sm">
                    Aucun message pour l'instant. Commencez la conversation!
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p className="text-xs md:text-sm">Sélectionnez une conversation</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        {selectedConversation && (
          <div className="border-t bg-background p-3 md:p-6">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Votre message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 text-sm md:text-base"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!messageText.trim()}
                className="rounded-lg h-9 w-9 md:h-10 md:w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Background Overlay */}
      {showConversationList && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setShowConversationList(false)}
        />
      )}
    </div>
  )
}
