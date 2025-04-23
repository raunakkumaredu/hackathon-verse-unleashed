
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, Plus } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";

const MessagesPage = () => {
  const {
    conversations,
    filteredConversations,
    activeConversation,
    setActiveConversation,
    activeConvo,
    currentMessage,
    setCurrentMessage,
    handleSendMessage,
    searchQuery,
    setSearchQuery,
  } = useConversations();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <DashboardLayout
      title="Messages"
      subtitle="Connect with participants, mentors, and companies"
      userRole="student"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)] animate-fade-in">
        <Card className="md:col-span-1 overflow-hidden">
          <CardHeader className="px-4 py-3 space-y-2">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-280px)]">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div key={conversation.id} className="cursor-pointer">
                  <div
                    className={`flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors ${
                      activeConversation === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation.id)}
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
          <div className="p-3 border-t">
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" /> New Message
            </Button>
          </div>
        </Card>

        <Card className="md:col-span-2 flex flex-col">
          {activeConvo ? (
            <>
              <CardHeader className="px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeConvo.participantAvatar} />
                    <AvatarFallback>{activeConvo.participantName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{activeConvo.participantName}</CardTitle>
                    <p className="text-xs text-muted-foreground capitalize">
                      {activeConvo.participantRole}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4 h-[calc(100vh-340px)]">
                <div className="space-y-4">
                  {activeConvo.messages.map((message) => {
                    const isOwnMessage = message.senderId === "me" || message.senderName === "You";
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                      >
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
                  })}
                </div>
              </ScrollArea>

              <div className="p-4 border-t mt-auto flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <div className="p-6 rounded-full bg-muted mb-4">
                <Send className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
              <p className="text-muted-foreground mb-4">
                Choose a conversation from the list or start a new one
              </p>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> New Message
              </Button>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;

