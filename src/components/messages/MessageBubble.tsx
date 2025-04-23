
import React, { memo } from "react";
import { Message } from "@/types/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTime } from "@/utils/formatTime";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble = memo(({ message, isOwnMessage }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start gap-2 max-w-[80%]">
        {!isOwnMessage && (
          <Avatar className="h-8 w-8 mt-1">
            <AvatarImage src={message.senderAvatar} />
            <AvatarFallback>
              {message.senderName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`rounded-lg p-3 ${
            isOwnMessage
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <p
            className={`text-xs mt-1 ${
              isOwnMessage
                ? "text-primary-foreground/70"
                : "text-muted-foreground"
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;
