
import { Conversation } from "@/types/messages";
import { AuthState } from "@/contexts/AuthContext";

export function getMockConversations(authState: AuthState): Conversation[] {
  return [
    {
      id: "1",
      participantId: "user-1",
      participantName: "Jane Smith",
      participantAvatar: "https://github.com/shadcn.png",
      participantRole: "mentor",
      lastMessage: "Looking forward to your project submission!",
      unreadCount: 2,
      messages: [
        {
          id: "msg-1",
          senderId: "user-1",
          senderName: "Jane Smith",
          senderAvatar: "https://github.com/shadcn.png",
          content: "Hi there! How's your hackathon project coming along?",
          timestamp: new Date(Date.now() - 86400000),
          read: true,
        },
        {
          id: "msg-2",
          senderId: authState.user?.id || "me",
          senderName: "You",
          content: "Making good progress! Just working on the final features.",
          timestamp: new Date(Date.now() - 75600000),
          read: true,
        },
        {
          id: "msg-3",
          senderId: "user-1",
          senderName: "Jane Smith",
          senderAvatar: "https://github.com/shadcn.png",
          content: "Looking forward to your project submission!",
          timestamp: new Date(Date.now() - 3600000),
          read: false,
        },
      ],
    },
    {
      id: "2",
      participantId: "user-2",
      participantName: "Sachin Singh",
      participantRole: "student",
      unreadCount: 0,
      messages: [
        {
          id: "msg-4",
          senderId: "user-2",
          senderName: "Ravi Kumar",
          content: "Would you be interested in joining our team for the AI challenge?",
          timestamp: new Date(Date.now() - 172800000),
          read: true,
        },
        {
          id: "msg-5",
          senderId: authState.user?.id || "me",
          senderName: "You",
          content: "I might be! What technologies are you planning to use?",
          timestamp: new Date(Date.now() - 172000000),
          read: true,
        },
      ],
    },
    {
      id: "3",
      participantId: "user-3",
      participantName: "TechCorp",
      participantRole: "company",
      unreadCount: 1,
      messages: [
        {
          id: "msg-6",
          senderId: "user-3",
          senderName: "TechCorp",
          content: "We're impressed with your profile and would like to discuss potential opportunities.",
          timestamp: new Date(Date.now() - 259200000),
          read: false,
        },
      ],
    },
  ];
}
