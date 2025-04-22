
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Network, Users, Trophy, Award, GraduationCap, Rocket, Flag, Briefcase, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock data for networking profiles
const mockProfiles = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Student",
    college: "MIT",
    skills: ["Machine Learning", "Python", "Data Science"],
    about: "Passionate about AI and machine learning applications in healthcare.",
    avatar: "https://github.com/shadcn.png",
    connections: 156,
    events: 12,
  },
  {
    id: "2",
    name: "David Chen",
    role: "Student",
    college: "Stanford University",
    skills: ["Web Development", "React", "JavaScript"],
    about: "Front-end developer focused on creating accessible web applications.",
    avatar: "",
    connections: 89,
    events: 8,
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Mentor",
    company: "Google",
    skills: ["System Design", "Cloud Architecture", "DevOps"],
    about: "Engineering manager with 10+ years of experience in scalable systems.",
    avatar: "",
    connections: 243,
    events: 24,
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Company Representative",
    company: "Microsoft",
    skills: ["Recruitment", "Project Management", "AI"],
    about: "Looking for talented developers to join our cloud computing division.",
    avatar: "",
    connections: 312,
    events: 18,
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    role: "Student",
    college: "UC Berkeley",
    skills: ["UI/UX Design", "Figma", "User Research"],
    about: "Designer focused on creating intuitive and accessible interfaces.",
    avatar: "",
    connections: 127,
    events: 15,
  },
  {
    id: "6",
    name: "Michael Kim",
    role: "Mentor",
    company: "Amazon",
    skills: ["Backend Development", "Distributed Systems", "Java"],
    about: "Senior software engineer specializing in high-performance systems.",
    avatar: "",
    connections: 201,
    events: 19,
  },
];

// Mock data for upcoming networking events
const networkingEvents = [
  {
    id: "1",
    title: "Tech Career Mixer",
    date: "May 12, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Virtual",
    description: "Connect with industry professionals and explore career opportunities in tech.",
    participants: 45,
  },
  {
    id: "2",
    title: "Mentor Matching Session",
    date: "May 15, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Main Campus, Building C",
    description: "Speed networking event to connect students with industry mentors.",
    participants: 32,
  },
  {
    id: "3",
    title: "Founders Meetup",
    date: "May 20, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Innovation Hub",
    description: "Connect with other entrepreneurs and startup founders.",
    participants: 28,
  },
];

const NetworkingPage = () => {
  const { authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("people");
  
  const filteredProfiles = mockProfiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleConnect = (profileId: string) => {
    toast.success("Connection request sent!");
  };
  
  const handleEventRegister = (eventId: string) => {
    toast.success("Successfully registered for the event!");
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DashboardLayout
      title="Networking Hub"
      subtitle="Connect with other participants, mentors, and companies"
      userRole={authState.user?.role || "student"}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <Network className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Networking Opportunities</h2>
            <p className="text-muted-foreground">Find teammates, mentors, and industry connections</p>
          </div>
          <div className="flex gap-2 self-end md:self-auto w-full md:w-auto">
            <Input
              placeholder="Search by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 md:w-64"
            />
          </div>
        </div>

        <Tabs defaultValue="people" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
            <TabsTrigger value="people">
              <Users className="h-4 w-4 mr-2" />
              People
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="people" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <Card key={profile.id} className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={profile.avatar} />
                          <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
                        </Avatar>
                        <Badge variant="outline" className="capitalize">
                          {profile.role}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{profile.name}</CardTitle>
                      <CardDescription>
                        {profile.company ? `${profile.company}` : `${profile.college}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground mb-3">{profile.about}</p>
                      <div className="flex flex-wrap gap-1">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="mr-1 mb-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {profile.connections} connections
                      </div>
                      <Button size="sm" onClick={() => handleConnect(profile.id)}>
                        Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No matches found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {networkingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{event.description}</p>
                    <div className="flex items-center mt-3 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1.5" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span>Location: {event.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button onClick={() => handleEventRegister(event.id)}>
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NetworkingPage;
