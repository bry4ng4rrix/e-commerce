// Communication Types
export type ParticipantType = 'prof' | 'admin' | 'student' | 'parent'

export interface ChatMessage {
  id: number
  sender: string
  senderInitials: string
  senderType: ParticipantType
  content: string
  timestamp: string
  read: boolean
  senderAvatar?: string
}

export interface Conversation {
  id: number
  participants: {
    name: string
    type: ParticipantType
    initials: string
  }[]
  lastMessage: string
  lastMessageTime: string
  lastMessageSender: string
  unreadCount: number
  participantType: ParticipantType
  messages: ChatMessage[]
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalParents: number
  totalAdmins: number
  messagesThisMonth: number
  activeConversations: number
}

export interface StudentData {
  id: number
  name: string
  email: string
  class: string
  absences: number
  paymentStatus: 'paid' | 'pending' | 'overdue'
  enrollment_date: string
  phone: string
  address: string
}

export interface TeacherData {
  id: number
  name: string
  email: string
  subject: string
  classes: string[]
  phone: string
  office: string
  experience: number
}

export interface Parent {
  id: number
  name: string
  email: string
  phone: string
  child_name: string
  relationship: string
}
