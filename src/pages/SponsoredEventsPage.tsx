
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flag, Calendar, MapPin, Users, Clock, ChevronRight, ArrowRight, Heart, BarChart, Clock3, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample sponsored events data
const sponsoredEvents = [
  {
    id: "1",
    name: "TechCorp Innovation Summit",
    sponsor: "TechCorp",
    sponsorLogo: "https://github.com/shadcn.png",
    date: "July 10, 2025",
    time: "09:00 AM - 05:00 PM",
    location: "TechCorp HQ, Farukhnagar",
    description: "A full-day summit bringing together industry leaders, innovators, and students to explore cutting-edge technologies and future trends.",
    category: "Summit",
    attendees: 250,
    featured: true,
    speakers: [
      { name: "Monika chorurasi", title: "CTO, TechCorp", avatar: "" },
      { name: "Sourabh ppatel", title: "AI Research Lead, TechCorp", avatar: "" },
      { name: "Amrita Kumari", title: "VP of Innovation, TechCorp", avatar: "" },
    ],
    agenda: [
      { time: "09:00 AM", title: "Registration & Welcome" },
      { time: "10:00 AM", title: "Keynote: The Future of Tech" },
      { time: "11:30 AM", title: "Panel: Industry Trends" },
      { time: "01:00 PM", title: "Networking Lunch" },
      { time: "02:30 PM", title: "Workshops" },
      { time: "04:30 PM", title: "Closing Remarks & Networking" },
    ],
  },
  {
    id: "2",
    name: "HealthInnovate Workshop Series",
    sponsor: "MedTech Global",
    sponsorLogo: "",
    date: "June 20, 2025",
    time: "02:00 PM - 06:00 PM",
    location: "Virtual Event",
    description: "An interactive workshop series focused on healthcare innovation and the application of technology in medicine.",
    category: "Workshop",
    attendees: 120,
    featured: true,
    agenda: [
      { time: "02:00 PM", title: "Introduction to Healthcare Innovation" },
      { time: "03:00 PM", title: "Case Studies: Successful MedTech Solutions" },
      { time: "04:00 PM", title: "Hands-on Workshop: Design Thinking" },
      { time: "05:30 PM", title: "Q&A and Closing" },
    ],
  },
  {
    id: "3",
    name: "Financial Tech Career Fair",
    sponsor: "Global Finance Group",
    sponsorLogo: "",
    date: "July 5, 2025",
    time: "10:00 AM - 03:00 PM",
    location: "City Convention Center",
    description: "Connect with leading financial technology companies for internship and job opportunities in the fintech sector.",
    category: "Career Fair",
    attendees: 350,
    featured: false,
  },
  {
    id: "4",
    name: "Sustainable Engineering Hackathon",
    sponsor: "GreenTech Solutions",
    sponsorLogo: "",
    date: "June 25-27, 2025",
    time: "09:00 AM - 09:00 PM",
    location: "Engineering Campus, Building B",
    description: "A 48-hour hackathon focused on developing sustainable solutions for environmental challenges.",
    category: "Hackathon",
    attendees: 200,
    featured: false,
  },
  {
    id: "5",
    name: "Women in Tech Mentorship Day",
    sponsor: "TechDiversity Association",
    sponsorLogo: "",
    date: "July 12, 2025",
    time: "11:00 AM - 04:00 PM",
    location: "Tech Incubator Center",
    description: "A networking and mentorship event connecting women students with industry leaders and mentors in technology fields.",
    category: "Networking",
    attendees: 150,
    featured: false,
  },
  {
    id: "6",
    name: "AI for Good Symposium",
    sponsor: "AI Research Institute",
    sponsorLogo: "",
    date: "July 18, 2025",
    time: "09:00 AM - 06:00 PM",
    location: "Science Center Auditorium",
    description: "Explore how artificial intelligence can be leveraged to address critical social and environmental challenges.",
    category: "Symposium",
    attendees: 180,
    featured: false,
  },
];

// Sample sponsors data
const sponsors = [
  { id: "1", name: "TechCorp", logo: "https://github.com/shadcn.png", tier: "Platinum", events: 5 },
  { id: "2", name: "MedTech Global", logo: "", tier: "Gold", events: 3 },
  { id: "3", name: "Global Finance Group", logo: "", tier: "Gold", events: 2 },
  { id: "4", name: "GreenTech Solutions", logo: "", tier: "Silver", events: 4 },
  { id: "5", name: "TechDiversity Association", logo: "", tier: "Silver", events: 1 },
  { id: "6", name: "AI Research Institute", logo: "", tier: "Bronze", events: 2 },
];

const SponsoredEventsPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleRegisterForEvent = (eventId: string) => {
    toast.success("Successfully registered for the event!");
  };
  
  const handleSaveEvent = (eventId: string) => {
    toast.success("Event saved to your calendar!");
  };
  
  // Extract all unique event categories
  const allCategories = Array.from(
    new Set(sponsoredEvents.map((event) => event.category))
  );
  
  const filteredEvents = sponsoredEvents.filter((event) => {
    // Apply search filter
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.sponsor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const featuredEvents = filteredEvents.filter(event => event.featured);
  const upcomingEvents = filteredEvents.filter(event => !event.featured);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <DashboardLayout
      title="Sponsored Events"
      subtitle="Special events hosted by our industry and academic sponsors"
      userRole={authState.user?.role || "student"}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <Flag className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Sponsored Events</h2>
            <p className="text-muted-foreground">Industry-sponsored workshops, seminars, and networking opportunities</p>
          </div>
          <div className="flex gap-2 self-end md:self-auto w-full md:w-auto">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 md:w-64"
            />
          </div>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="sponsors">
              <Flag className="h-4 w-4 mr-2" />
              Sponsors
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="mt-4 space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge 
                className="cursor-pointer" 
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Badge>
              {allCategories.map((category) => (
                <Badge 
                  key={category}
                  className="cursor-pointer"
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            {featuredEvents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Featured Events</h3>
                <div className="grid grid-cols-1 gap-4">
                  {featuredEvents.map((event) => (
                    <Card key={event.id} className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="default" className="mb-2">
                              Featured
                            </Badge>
                            <CardTitle>{event.name}</CardTitle>
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={event.sponsorLogo} />
                            <AvatarFallback>{getInitials(event.sponsor)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <CardDescription className="flex flex-col gap-1">
                          <span>Sponsored by {event.sponsor}</span>
                          <div className="flex items-center gap-1 mt-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        
                        {event.speakers && event.speakers.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Featured Speakers</h4>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                              {event.speakers.map((speaker, idx) => (
                                <div key={idx} className="flex flex-col items-center min-w-[80px] text-center">
                                  <Avatar className="h-12 w-12 mb-1">
                                    <AvatarImage src={speaker.avatar} />
                                    <AvatarFallback>{getInitials(speaker.name)}</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm font-medium">{speaker.name}</p>
                                  <p className="text-xs text-muted-foreground">{speaker.title}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {event.agenda && event.agenda.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Event Agenda</h4>
                            <div className="space-y-2">
                              {event.agenda.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                  <div>
                                    <span className="font-medium">{item.time}</span>
                                    <span className="mx-2">-</span>
                                    <span>{item.title}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="mr-2">
                              {event.category}
                            </Badge>
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.attendees} attendees</span>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleSaveEvent(event.id)}>
                            <Heart className="h-4 w-4 mr-1" /> Save
                          </Button>
                        </div>
                        <Button onClick={() => handleRegisterForEvent(event.id)}>
                          Register
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{event.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <span>by {event.sponsor}</span>
                            </CardDescription>
                          </div>
                          <Badge variant="outline">
                            {event.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-muted-foreground mb-4">
                          {event.description.length > 100
                            ? `${event.description.slice(0, 100)}...`
                            : event.description}
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock3 className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.attendees} attendees</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleRegisterForEvent(event.id)}
                        >
                          Register
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No events match your filters</h3>
                    <p className="text-muted-foreground mb-3">
                      Try adjusting your search or category filter
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery("");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                View All Events
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sponsors" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Our Sponsors</CardTitle>
                <CardDescription>Organizations supporting our hackathon events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sponsors.map((sponsor) => (
                    <Card key={sponsor.id} className="border hover:shadow transition-all duration-300 hover:bg-muted/50">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <Avatar className="h-16 w-16 mb-3 mt-3">
                          <AvatarImage src={sponsor.logo} />
                          <AvatarFallback className={`
                            ${sponsor.tier === "Platinum" ? "bg-slate-300 text-slate-800" : 
                              sponsor.tier === "Gold" ? "bg-amber-300 text-amber-800" : 
                              sponsor.tier === "Silver" ? "bg-gray-300 text-gray-800" : 
                              "bg-amber-700 text-amber-100"}
                          `}>
                            {getInitials(sponsor.name)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{sponsor.name}</h3>
                        <Badge variant="outline" className="mt-2">
                          {sponsor.tier} Sponsor
                        </Badge>
                        <div className="mt-3 text-sm text-muted-foreground">
                          Hosting {sponsor.events} events
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sponsorship Benefits</CardTitle>
                <CardDescription>Why companies sponsor our events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Talent Acquisition</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with top student talent for recruitment opportunities
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <Flag className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Brand Visibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Increase brand awareness among tech-savvy students and professionals
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <Rocket className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">Innovation</h3>
                    <p className="text-sm text-muted-foreground">
                      Gain fresh perspectives and innovative solutions to industry challenges
                    </p>
                  </div>
                </div>
                
                {authState.user?.role === "company" && (
                  <div className="mt-6 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Become a Sponsor</h3>
                    <p className="text-muted-foreground mb-4">
                      Interested in sponsoring our events? Learn about our sponsorship packages and benefits.
                    </p>
                    <Button>
                      Sponsorship Opportunities
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sponsorship Stats</CardTitle>
                <CardDescription>Impact of our sponsored events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">20+</div>
                    <div className="text-sm text-muted-foreground">Sponsors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">35+</div>
                    <div className="text-sm text-muted-foreground">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">5,000+</div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">150+</div>
                    <div className="text-sm text-muted-foreground">Hires</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SponsoredEventsPage;
