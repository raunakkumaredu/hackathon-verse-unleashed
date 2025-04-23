
import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, Plus } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/contexts/AuthContext";
import ConversationList from "@/components/messages/ConversationList";
import MessageList from "@/components/messages/MessageList";
import MessageInput from "@/components/messages/MessageInput";

const MessagesPage = () => {
  const { authState } = useAuth();
  const {
    filteredConversations,
    activeConversation,
    setActiveConversation,
    activeConvo,
    currentMessage,
    setCurrentMessage,
    handleSendMessage,
    searchQuery,
    setSearchQuery,
    setReadAllActive
  } = useConversations();

  // Mark messages as read when conversation is active
  useEffect(() => {
    if (activeConvo) {
      setReadAllActive();
    }
  }, [activeConvo?.id, setReadAllActive]);

  return (
    <DashboardLayout
      title="Messages"
      subtitle="Connect with participants, mentors, and companies"
      userRole="student"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
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
          
          <ConversationList 
            conversations={filteredConversations}
            activeConversationId={activeConversation}
            onSelectConversation={setActiveConversation}
          />
          
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

              <MessageList 
                messages={activeConvo.messages} 
                currentUserId={authState.user?.id}
              />

              <MessageInput 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onSend={handleSendMessage}
              />
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
