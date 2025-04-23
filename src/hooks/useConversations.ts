
import { useState, useEffect, useCallback, useMemo } from "react";
import { getMockConversations } from "@/utils/mockConversations";
import { getRandomReplyMessage } from "@/utils/randomReply";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Message, Conversation } from "@/types/messages";

export function useConversations() {
  const { authState } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const mock = getMockConversations(authState);
    setConversations(mock);
    if (mock.length > 0) setActiveConversation(mock[0].id);
  }, [authState.user?.id]);

  const handleSendMessage = useCallback(() => {
    if (!currentMessage.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: authState.user?.id || "me",
      senderName: "You",
      content: currentMessage,
      timestamp: new Date(),
      read: true,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation
          ? {
              ...c,
              lastMessage: currentMessage,
              messages: [...c.messages, newMessage],
            }
          : c
      )
    );

    setCurrentMessage("");
    
    // Delay the system reply to improve perceived performance
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConversation) {
            const replyContent = getRandomReplyMessage();
            const systemReply: Message = {
              id: `msg-sys-${Date.now()}`,
              senderId: c.participantId,
              senderName: c.participantName,
              senderAvatar: c.participantAvatar,
              content: replyContent,
              timestamp: new Date(),
              read: false,
            };
            return {
              ...c,
              lastMessage: replyContent,
              messages: [...c.messages, systemReply],
              unreadCount: c.unreadCount + 1,
            };
          }
          return c;
        })
      );
    }, 800);

    toast.success("Message sent!");
  }, [currentMessage, activeConversation, authState.user?.id]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) =>
      c.participantName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const activeConvo = useMemo(() => {
    return conversations.find((c) => c.id === activeConversation);
  }, [conversations, activeConversation]);

  const setReadAllActive = useCallback(() => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation
          ? {
              ...c,
              unreadCount: 0,
              messages: c.messages.map((m) => ({ ...m, read: true })),
            }
          : c
      )
    );
  }, [activeConversation]);

  return {
    conversations,
    filteredConversations,
    activeConversation,
    setActiveConversation: useCallback((id: string) => {
      setActiveConversation(id);
      // Mark as read when selecting a conversation
      setConversations((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                unreadCount: 0,
                messages: c.messages.map((m) => ({ ...m, read: true })),
              }
            : c
        )
      );
    }, []),
    activeConvo,
    currentMessage,
    setCurrentMessage,
    handleSendMessage,
    searchQuery,
    setSearchQuery,
    setReadAllActive,
  };
}
