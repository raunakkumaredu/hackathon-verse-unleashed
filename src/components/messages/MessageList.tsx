
import React, { memo, useRef, useEffect } from "react";
import { Message } from "@/types/messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  currentUserId: string | undefined;
}

const MessageList = memo(({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4 h-[calc(100vh-340px)]" data-testid="message-list">
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === "me" || message.senderId === currentUserId || message.senderName === "You";
          return (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isOwnMessage={isOwnMessage} 
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
});

MessageList.displayName = "MessageList";

export default MessageList;
