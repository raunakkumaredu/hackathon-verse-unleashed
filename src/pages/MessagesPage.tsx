
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

const MessagesPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";

  const conversations = [
    {
      id: 1,
      name: "Team Alpha",
      avatar: "",
      lastMessage: "Let's meet tomorrow at 3 PM to discuss the project.",
      time: "10:24 AM",
      unread: true,
      isGroup: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://github.com/shadcn.png",
      lastMessage: "I've pushed the latest changes to the repo.",
      time: "Yesterday",
      unread: false,
      isGroup: false,
    },
    {
      id: 3,
      name: "Mentor Group",
      avatar: "",
      lastMessage: "Don't forget to submit your weekly progress report!",
      time: "Yesterday",
      unread: true,
      isGroup: true,
    },
    {
      id: 4,
      name: "David Lee",
      avatar: "https://github.com/shadcn.png",
      lastMessage: "Can you help me with the backend integration?",
      time: "Monday",
      unread: false,
      isGroup: false,
    },
    {
      id: 5,
      name: "Hackathon Organizers",
      avatar: "",
      lastMessage: "Important update regarding the submission deadline.",
      time: "Last Week",
      unread: false,
      isGroup: true,
    },
  ];

  const currentConversation = {
    id: 1,
    name: "Team Alpha",
    participants: ["You", "Alex", "Maria", "John"],
    messages: [
      {
        id: 1,
        sender: "Alex",
        content: "Hey team! How's everyone doing with their tasks?",
        time: "9:30 AM",
        avatar: "https://github.com/shadcn.png",
      },
      {
        id: 2,
        sender: "Maria",
        content: "I'm almost done with the UI design. Will share the Figma link today.",
        time: "9:45 AM",
        avatar: "https://github.com/shadcn.png",
      },
      {
        id: 3,
        sender: "John",
        content: "Backend is coming along nicely. Need to fix a few bugs though.",
        time: "10:00 AM",
        avatar: "https://github.com/shadcn.png",
      },
      {
        id: 4,
        sender: "You",
        content: "Great progress everyone! I've been working on the API integration.",
        time: "10:15 AM",
        avatar: authState.user?.avatar || "",
        isCurrentUser: true,
      },
      {
        id: 5,
        sender: "Alex",
        content: "Let's meet tomorrow at 3 PM to discuss the project.",
        time: "10:24 AM",
        avatar: "https://github.com/shadcn.png",
      },
    ],
  };

  return (
    <DashboardLayout title="Messages" subtitle="Chat with your team and mentors" userRole={userRole}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[500px] animate-fade-in">
        {/* Conversations List */}
        <Card className="md:col-span-1 flex flex-col">
          <div className="p-4 border-b flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input placeholder="Search messages..." className="h-9" />
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className={`p-3 flex items-center space-x-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                    conversation.id === currentConversation.id ? "bg-muted" : ""
                  } ${conversation.unread ? "font-medium" : ""}`}
                >
                  <Avatar className="h-10 w-10 animate-fade-in hover:scale-110 transition-transform">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className={conversation.isGroup ? "bg-primary/20" : ""}>
                      {conversation.isGroup ? conversation.name.substring(0, 2) : conversation.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium truncate">{conversation.name}</p>
                      <p className="text-xs text-muted-foreground">{conversation.time}</p>
                    </div>
                    <p className="text-xs truncate text-muted-foreground">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20">
                  {currentConversation.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{currentConversation.name}</p>
                <p className="text-xs text-muted-foreground">
                  {currentConversation.participants.join(", ")}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
              Info
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentConversation.messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.isCurrentUser ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0 hover:scale-110 transition-transform">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>
                        {message.sender.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={`flex items-center gap-2 mb-1 ${message.isCurrentUser ? "justify-end" : ""}`}>
                        <span className="text-sm font-medium">
                          {message.sender}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {message.time}
                        </span>
                      </div>
                      <div 
                        className={`rounded-lg p-3 ${
                          message.isCurrentUser 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto">
            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button type="submit" className="hover:scale-105 transition-transform animate-fade-in">Send</Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
