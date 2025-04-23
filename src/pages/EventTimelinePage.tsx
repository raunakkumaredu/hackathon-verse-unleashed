
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, MapPin, ExternalLink, CheckCircle2, Calendar as CalendarIcon, Trophy } from "lucide-react";
import { toast } from "sonner";

// Mock timeline data
const timelineEvents = [
  {
    id: "event1",
    title: "Spring Hackathon Registration Opens",
    date: "April 28, 2025",
    time: "9:00 AM",
    description: "Register for the upcoming Spring Innovation Hackathon",
    location: "Online",
    category: "registration",
    url: "/challenges",
    status: "upcoming"
  },
  {
    id: "event2",
    title: "Team Formation Deadline",
    date: "May 5, 2025",
    time: "11:59 PM",
    description: "Last day to form or join teams for the Spring Hackathon",
    location: "Online",
    category: "deadline",
    url: "/teams",
    status: "upcoming"
  },
  {
    id: "event3",
    title: "AI Workshop Series",
    date: "May 10, 2025",
    time: "2:00 PM - 4:00 PM",
    description: "Learn AI fundamentals to prepare for the hackathon",
    location: "Virtual",
    category: "workshop",
    url: "/resources",
    status: "upcoming"
  },
  {
    id: "event4",
    title: "Spring Hackathon Kickoff",
    date: "May 15, 2025",
    time: "10:00 AM",
    description: "Official start of the hackathon with keynote speakers",
    location: "Main Campus Auditorium",
    category: "event",
    url: "/challenges",
    status: "upcoming",
    attendees: 250
  },
  {
    id: "event5",
    title: "Mid-Hackathon Check-in",
    date: "May 17, 2025",
    time: "3:00 PM",
    description: "Progress updates and mentorship sessions",
    location: "Virtual",
    category: "checkpoint",
    url: "/feedback",
    status: "upcoming"
  },
  {
    id: "event6",
    title: "Project Submission Deadline",
    date: "May 20, 2025",
    time: "11:59 PM",
    description: "Final deadline to submit your hackathon projects",
    location: "Online Portal",
    category: "deadline",
    url: "/project-submission",
    status: "upcoming",
    important: true
  },
  {
    id: "event7",
    title: "Judging and Evaluation",
    date: "May 22-23, 2025",
    time: "All Day",
    description: "Projects will be evaluated by our panel of judges",
    location: "Online",
    category: "judging",
    url: "/judging-system",
    status: "upcoming"
  },
  {
    id: "event8",
    title: "Awards Ceremony",
    date: "May 25, 2025",
    time: "7:00 PM",
    description: "Announcement of winners and prize distribution",
    location: "Grand Hall",
    category: "ceremony",
    url: "/leaderboard",
    status: "upcoming",
    attendees: 300
  }
];

// Past events
const pastEvents = [
  {
    id: "past1",
    title: "Winter Hackathon",
    date: "February 15, 2025",
    time: "All Day",
    description: "48-hour hackathon focused on climate tech solutions",
    location: "University Campus",
    category: "event",
    url: "/past-events",
    status: "completed"
  },
  {
    id: "past2",
    title: "Industry Networking Event",
    date: "March 5, 2025",
    time: "5:00 PM - 8:00 PM",
    description: "Connect with industry professionals and potential employers",
    location: "Innovation Hub",
    category: "networking",
    url: "/networking",
    status: "completed"
  }
];

// User's registered events
const myEvents = [
  {
    id: "event4",
    title: "Spring Hackathon Kickoff",
    date: "May 15, 2025",
    time: "10:00 AM",
    description: "Official start of the hackathon with keynote speakers",
    location: "Main Campus Auditorium",
    category: "event",
    url: "/challenges",
    status: "upcoming",
    attendees: 250
  },
  {
    id: "event3",
    title: "AI Workshop Series",
    date: "May 10, 2025",
    time: "2:00 PM - 4:00 PM",
    description: "Learn AI fundamentals to prepare for the hackathon",
    location: "Virtual",
    category: "workshop",
    url: "/resources",
    status: "upcoming"
  }
];

const EventTimelinePage = () => {
  const { authState } = useAuth();
  const [filter, setFilter] = useState("all");
  
  const handleRegister = (eventId: string) => {
    toast.success("You've registered for the event!");
  };
  
  const handleAddToCalendar = (eventId: string) => {
    toast.success("Event added to your calendar");
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "registration":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "deadline":
        return <Clock className="h-5 w-5 text-red-500" />;
      case "workshop":
        return <Users className="h-5 w-5 text-purple-500" />;
      case "event":
        return <Calendar className="h-5 w-5 text-green-500" />;
      case "checkpoint":
        return <CheckCircle2 className="h-5 w-5 text-yellow-500" />;
      case "judging":
        return <Users className="h-5 w-5 text-indigo-500" />;
      case "ceremony":
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case "networking":
        return <Users className="h-5 w-5 text-teal-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "registration":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "workshop":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "checkpoint":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "judging":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "ceremony":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "networking":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <DashboardLayout
      title="Event Timeline"
      subtitle="Track hackathon schedules and important deadlines"
      userRole={authState.user?.role}
    >
      <div className="mb-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming" onClick={() => setFilter("all")}>Upcoming Events</TabsTrigger>
            <TabsTrigger value="my-events" onClick={() => setFilter("my")}>My Events</TabsTrigger>
            <TabsTrigger value="past" onClick={() => setFilter("past")}>Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8">
            <div className="relative">
              {/* Timeline track */}
              <div className="absolute left-9 top-5 bottom-5 w-0.5 bg-border"></div>
              
              {/* Events */}
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="flex gap-4 mb-8 relative">
                  {/* Left date column */}
                  <div className="min-w-24 pt-5 text-right">
                    <p className="font-medium">{event.date.split(",")[0]}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="z-10 flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-primary mt-5">
                    {event.important && (
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                  
                  {/* Event card */}
                  <div className="flex-1">
                    <Card className={event.important ? "border-red-300 dark:border-red-700" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>{event.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          
                          {'attendees' in event && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{event.attendees} attendees</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleAddToCalendar(event.id)}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                        <Button size="sm" onClick={() => handleRegister(event.id)}>
                          Register
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-events" className="space-y-8">
            {myEvents.length > 0 ? (
              <div className="relative">
                <div className="absolute left-9 top-5 bottom-5 w-0.5 bg-border"></div>
                
                {myEvents.map((event) => (
                  <div key={event.id} className="flex gap-4 mb-8">
                    <div className="min-w-24 pt-5 text-right">
                      <p className="font-medium">{event.date.split(",")[0]}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                    
                    <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 border-2 border-green-500 mt-5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    
                    <div className="flex-1">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription>{event.description}</CardDescription>
                            </div>
                            <Badge variant="outline" className={getCategoryColor(event.category)}>
                              {event.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={event.url}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold">No Registered Events</h3>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                  You haven't registered for any upcoming events yet.
                </p>
                <Button className="mt-6" onClick={() => setFilter("all")}>
                  Browse Events
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-8">
            <div className="relative">
              <div className="absolute left-9 top-5 bottom-5 w-0.5 bg-border"></div>
              
              {pastEvents.map((event) => (
                <div key={event.id} className="flex gap-4 mb-8">
                  <div className="min-w-24 pt-5 text-right opacity-70">
                    <p className="font-medium">{event.date.split(",")[0]}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  
                  <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-muted border-2 border-muted-foreground mt-5">
                  </div>
                  
                  <div className="flex-1 opacity-80">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>{event.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <a href={event.url}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Summary
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EventTimelinePage;
