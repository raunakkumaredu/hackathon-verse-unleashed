
import React, { memo } from "react";
import { Conversation } from "@/types/messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatTime } from "@/utils/formatTime";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList = memo(({ 
  conversations, 
  activeConversationId, 
  onSelectConversation 
}: ConversationListProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <div key={conversation.id} className="cursor-pointer">
            <div
              className={`flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors ${
                activeConversationId === conversation.id ? "bg-muted" : ""
              }`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.participantAvatar} />
                <AvatarFallback>
                  {conversation.participantName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">
                    {conversation.participantName}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {conversation.messages.length > 0
                      ? formatTime(conversation.messages[conversation.messages.length - 1].timestamp)
                      : ""}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.lastMessage || "Start a conversation"}
                </p>
              </div>
              {conversation.unreadCount > 0 && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
            <Separator />
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          No conversations found
        </div>
      )}
    </ScrollArea>
  );
});

ConversationList.displayName = "ConversationList";

export default ConversationList;
