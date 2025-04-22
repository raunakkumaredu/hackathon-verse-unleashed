
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileCode, Users, Send, Link, Image as ImageIcon, Settings, User, Video, Share, Plus } from "lucide-react";
import { toast } from "sonner";

// Mock data for team chats
const mockTeams = [
  {
    id: "1",
    name: "Code Wizards",
    avatar: "https://ui-avatars.com/api/?name=CW&background=random",
    lastMessage: "Let's review the latest changes to the API",
    timestamp: "10:32 AM",
    unread: 3
  },
  {
    id: "2",
    name: "Tech Titans",
    avatar: "https://ui-avatars.com/api/?name=TT&background=random",
    lastMessage: "The presentation is almost ready",
    timestamp: "Yesterday",
    unread: 0
  }
];

// Mock data for sample messages
const mockMessages = [
  {
    id: "1",
    senderId: "user1",
    senderName: "Alex Johnson",
    senderAvatar: "https://ui-avatars.com/api/?name=AJ&background=random",
    content: "Hey team, I pushed some changes to our repository. Could you review the PR?",
    timestamp: new Date(2025, 3, 22, 10, 0),
    isCurrentUser: false
  },
  {
    id: "2",
    senderId: "user2",
    senderName: "Sam Smith",
    senderAvatar: "https://ui-avatars.com/api/?name=SS&background=random",
    content: "I'll take a look at it in about an hour!",
    timestamp: new Date(2025, 3, 22, 10, 5),
    isCurrentUser: false
  },
  {
    id: "3",
    senderId: "currentUser",
    senderName: "You",
    senderAvatar: "https://github.com/shadcn.png",
    content: "Thanks Sam! I'm specifically looking for feedback on the API integration part.",
    timestamp: new Date(2025, 3, 22, 10, 10),
    isCurrentUser: true
  },
  {
    id: "4",
    senderId: "user3",
    senderName: "Taylor Reed",
    senderAvatar: "https://ui-avatars.com/api/?name=TR&background=random",
    content: "I just tried running the app locally and it works great! The data visualization looks awesome.",
    timestamp: new Date(2025, 3, 22, 10, 15),
    isCurrentUser: false
  }
];

// Mock shared resources
const mockResources = [
  {
    id: "1",
    name: "Project Architecture",
    type: "image",
    url: "https://placehold.co/600x400",
    uploadedBy: "Alex Johnson",
    timestamp: "Yesterday"
  },
  {
    id: "2",
    name: "API Documentation",
    type: "document",
    url: "#",
    uploadedBy: "You",
    timestamp: "2 days ago"
  },
  {
    id: "3",
    name: "Team Meeting",
    type: "recording",
    url: "#",
    uploadedBy: "Sam Smith",
    timestamp: "April 20, 2025"
  }
];

// Mock team members
const mockTeamMembers = [
  { id: "1", name: "Alex Johnson", role: "Team Lead", avatar: "https://ui-avatars.com/api/?name=AJ&background=random", isOnline: true },
  { id: "2", name: "Sam Smith", role: "UX Designer", avatar: "https://ui-avatars.com/api/?name=SS&background=random", isOnline: false },
  { id: "3", name: "Taylor Reed", role: "Data Scientist", avatar: "https://ui-avatars.com/api/?name=TR&background=random", isOnline: true },
  { id: "4", name: "You", role: "Developer", avatar: "https://github.com/shadcn.png", isOnline: true }
];

const CollaborationPage = () => {
  const { authState } = useAuth();
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0]);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, this would send the message through an API
    toast.success("Message sent!");
    setMessage("");
  };
  
  return (
    <DashboardLayout
      title="Collaboration Hub"
      subtitle="Communicate and collaborate with your teams in real-time"
      userRole={authState.user?.role}
    >
      <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] gap-4">
        {/* Team Sidebar */}
        <div className="md:w-72 bg-background border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" /> Your Teams
            </h3>
          </div>
          
          <div className="overflow-auto h-full pb-20">
            {mockTeams.map((team) => (
              <div
                key={team.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${selectedTeam.id === team.id ? 'bg-muted' : ''}`}
                onClick={() => setSelectedTeam(team)}
              >
                <Avatar>
                  <AvatarImage src={team.avatar} />
                  <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium truncate">{team.name}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{team.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{team.lastMessage}</p>
                </div>
                
                {team.unread > 0 && (
                  <Badge className="ml-auto rounded-full h-5 w-5 flex items-center justify-center p-0">
                    {team.unread}
                  </Badge>
                )}
              </div>
            ))}
            
            <div className="p-4">
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> New Conversation
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col border rounded-lg overflow-hidden bg-background">
          {/* Team Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedTeam.avatar} />
                <AvatarFallback>{selectedTeam.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedTeam.name}</h3>
                <p className="text-xs text-muted-foreground">{mockTeamMembers.length} members</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => toast.info("Video call feature coming soon!")}>
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => toast.info("Share feature coming soon!")}>
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => toast.info("Settings feature coming soon!")}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Team Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-3 w-full rounded-none px-4 border-b">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Chat
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                <FileCode className="h-4 w-4" /> Files
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Members
              </TabsTrigger>
            </TabsList>
            
            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0 data-[state=active]:flex-1">
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-auto">
                <div className="space-y-4">
                  {mockMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex ${msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} gap-3 max-w-[80%]`}>
                        <Avatar className="mt-1">
                          <AvatarImage src={msg.senderAvatar} />
                          <AvatarFallback>{msg.senderName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className={`flex items-center gap-2 ${msg.isCurrentUser ? 'justify-end' : ''} mb-1`}>
                            <span className="text-sm font-medium">{msg.senderName}</span>
                            <span className="text-xs text-muted-foreground">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className={`rounded-lg py-2 px-3 ${
                            msg.isCurrentUser 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" onClick={() => toast.info("File upload coming soon!")}>
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => toast.info("Image upload coming soon!")}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Files Tab */}
            <TabsContent value="files" className="flex-1 p-4 overflow-auto m-0 data-[state=active]:flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Shared Resources</h3>
                <Button size="sm" onClick={() => toast.info("Upload feature coming soon!")}>
                  <Plus className="h-4 w-4 mr-2" /> Upload
                </Button>
              </div>
              
              <div className="space-y-3">
                {mockResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded flex items-center justify-center ${
                          resource.type === 'image' ? 'bg-blue-100 text-blue-600' :
                          resource.type === 'document' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {resource.type === 'image' && <ImageIcon className="h-5 w-5" />}
                          {resource.type === 'document' && <FileCode className="h-5 w-5" />}
                          {resource.type === 'recording' && <Video className="h-5 w-5" />}
                        </div>
                        
                        <div>
                          <h4 className="font-medium">{resource.name}</h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>Uploaded by {resource.uploadedBy}</span>
                            <span className="mx-2">•</span>
                            <span>{resource.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">View</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Members Tab */}
            <TabsContent value="members" className="flex-1 p-4 overflow-auto m-0 data-[state=active]:flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Team Members</h3>
                <Button size="sm" onClick={() => toast.info("Invite feature coming soon!")}>
                  <Plus className="h-4 w-4 mr-2" /> Invite
                </Button>
              </div>
              
              <div className="space-y-2">
                {mockTeamMembers.map((member) => (
                  <Card key={member.id} className="bg-background">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {member.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => toast.info("Direct message feature coming soon!")}>
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CollaborationPage;
