
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy, Users, Calendar as CalendarIcon, Clock, Download, Share2, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for challenge details
const challengeData = {
  "1": {
    id: "1",
    title: "AI Innovation Challenge",
    description: "Build the next generation of AI tools that solve real-world problems. In this exciting hackathon, participants will work to create innovative solutions leveraging artificial intelligence and machine learning technologies to address real-world challenges across industries such as healthcare, education, environment, and more.",
    longDescription: "This challenge is designed to foster innovation in the field of artificial intelligence. Participants will have the opportunity to demonstrate their skills and creativity by building applications that harness the power of AI to solve pressing problems. We encourage solutions that are not only technically sound but also practically applicable and scalable. Successful projects will show a deep understanding of both the technical aspects of AI and the real-world context of the problem being solved.",
    company: "TechCorp",
    logo: "https://ui-avatars.com/api/?name=TC&background=random",
    startDate: "May 15, 2025",
    endDate: "May 17, 2025",
    location: "Online + San Francisco, CA",
    registrationDeadline: "May 10, 2025",
    status: "Upcoming",
    participants: 45,
    maxTeamSize: 4,
    registrationOpen: true,
    prizePool: "$5,000",
    tags: ["AI", "Machine Learning", "Innovation"],
    difficulty: "Intermediate",
    timeline: [
      { date: "May 1, 2025", event: "Registration Opens" },
      { date: "May 10, 2025", event: "Registration Closes" },
      { date: "May 12, 2025", event: "Teams Announcement" },
      { date: "May 15, 2025", event: "Kickoff Event" },
      { date: "May 17, 2025", event: "Submission Deadline" },
      { date: "May 20, 2025", event: "Winners Announcement" }
    ],
    prizes: [
      { position: "1st Place", prize: "$3,000 + Mentorship Opportunity" },
      { position: "2nd Place", prize: "$1,500 + Cloud Credits" },
      { position: "3rd Place", prize: "$500 + Software Licenses" }
    ],
    judges: [
      { name: "Dr. Sarah Chen", role: "AI Research Lead", company: "TechCorp" },
      { name: "Mike Johnson", role: "CTO", company: "AI Ventures" },
      { name: "Priya Patel", role: "Product Director", company: "InnovateTech" }
    ],
    rules: [
      "All code must be original or properly attributed",
      "Teams must consist of 1-4 members",
      "Submissions must include source code and documentation",
      "Projects must address one of the provided challenge areas",
      "Final presentations should be no longer than 5 minutes"
    ],
    resources: [
      { name: "Starter Kit", url: "#", type: "GitHub Repository" },
      { name: "API Documentation", url: "#", type: "Documentation" },
      { name: "Workshop Recordings", url: "#", type: "Video" }
    ]
  },
  "2": {
    id: "2",
    title: "Blockchain Revolution Hackathon",
    description: "Create decentralized applications that leverage blockchain technology",
    longDescription: "Dive into the world of blockchain and create innovative solutions that could revolutionize industries. This hackathon focuses on developing decentralized applications that utilize blockchain technology to solve problems related to transparency, security, and trust.",
    company: "CryptoInc",
    logo: "https://ui-avatars.com/api/?name=CI&background=random",
    startDate: "Jun 20, 2025",
    endDate: "Jun 22, 2025",
    location: "Hybrid - New York & Virtual",
    registrationDeadline: "Jun 15, 2025",
    status: "Upcoming",
    participants: 32,
    maxTeamSize: 3,
    registrationOpen: true,
    prizePool: "$3,500",
    tags: ["Blockchain", "Web3", "Crypto"],
    difficulty: "Advanced",
    timeline: [
      { date: "Jun 1, 2025", event: "Registration Opens" },
      { date: "Jun 15, 2025", event: "Registration Closes" },
      { date: "Jun 20, 2025", event: "Hackathon Begins" },
      { date: "Jun 22, 2025", event: "Submissions Due" },
      { date: "Jun 25, 2025", event: "Winners Announced" }
    ],
    prizes: [
      { position: "1st Place", prize: "$2,000 + Incubation Opportunity" },
      { position: "2nd Place", prize: "$1,000 + Crypto Tokens" },
      { position: "3rd Place", prize: "$500 + Development Resources" }
    ],
    judges: [
      { name: "Alex Wu", role: "Blockchain Developer", company: "CryptoInc" },
      { name: "Lisa Thompson", role: "Investment Director", company: "Web3 Capital" }
    ],
    rules: [
      "All projects must utilize blockchain technology",
      "Teams must consist of 1-3 members",
      "All code must be open source",
      "Solutions must address real-world problems"
    ],
    resources: [
      { name: "Blockchain Framework", url: "#", type: "Development Kit" },
      { name: "Smart Contract Templates", url: "#", type: "Code Samples" }
    ]
  },
  // Add more challenges as needed with the same structure
};

const ChallengeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  // Mock teams for current user
  const userTeams = [
    { id: "team1", name: "Code Wizards" },
    { id: "team2", name: "Tech Titans" },
    { id: "team3", name: "New Team" },
  ];

  const challenge = id ? challengeData[id] : null;

  if (!challenge) {
    return (
      <DashboardLayout
        title="Challenge Details"
        subtitle="View hackathon details"
        userRole={userRole}
      >
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-4">Challenge not found</h2>
          <p className="text-muted-foreground mb-6">
            The challenge you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/challenges")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenges
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleRegister = () => {
    if (!selectedTeam) {
      toast.error("Please select a team to register");
      return;
    }
    
    toast.success(`Successfully registered ${selectedTeam} for ${challenge.title}`);
    setRegistrationDialogOpen(false);
  };

  const handleAddToCalendar = () => {
    // In a real app, this would generate and download an .ics file
    const icsData = generateICSFile(challenge);
    downloadICSFile(icsData, `${challenge.title.replace(/\s+/g, '-').toLowerCase()}.ics`);
    
    toast.success("Event added to your calendar");
  };

  // Function to generate ICS file content
  const generateICSFile = (challenge) => {
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);
    
    return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${challenge.title}
DESCRIPTION:${challenge.description}
LOCATION:${challenge.location}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
  };

  // Format date for ICS file
  const formatDateForICS = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}T000000Z`;
  };

  // Download ICS file
  const downloadICSFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout
      title="Challenge Details"
      subtitle="View hackathon information and register"
      userRole={userRole}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/challenges")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenges
        </Button>
      </div>

      {/* Challenge Header */}
      <div className="bg-gradient-to-r from-hackathon-purple/10 to-hackathon-blue/10 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-16 w-16 md:h-24 md:w-24">
            <AvatarImage src={challenge.logo} />
            <AvatarFallback>{challenge.company.substring(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{challenge.title}</h1>
              <Badge 
                variant={challenge.status === "Active" ? "default" : 
                       challenge.status === "Completed" ? "secondary" : "outline"}
                className="ml-2"
              >
                {challenge.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">Hosted by {challenge.company}</p>
            <p className="mb-4">{challenge.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Dates</p>
                  <p>{challenge.startDate} - {challenge.endDate}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p>{challenge.participants} registered</p>
                </div>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <p>{challenge.prizePool}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Registration Deadline</p>
                  <p>{challenge.registrationDeadline}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {challenge.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-primary/5">
                  {tag}
                </Badge>
              ))}
              <Badge variant="outline" className="bg-primary/5">
                {challenge.difficulty}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Dialog open={registrationDialogOpen} onOpenChange={setRegistrationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-hackathon-purple to-hackathon-blue text-white hover:opacity-90">
                    Register Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Register for {challenge.title}</DialogTitle>
                    <DialogDescription>
                      Choose a team to participate in this challenge with.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <div className="space-y-4">
                      <p className="text-sm">Team Size: 1-{challenge.maxTeamSize} members</p>
                      
                      <div className="space-y-2">
                        <label htmlFor="team-select" className="text-sm font-medium">
                          Select Team
                        </label>
                        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a team" />
                          </SelectTrigger>
                          <SelectContent>
                            {userTeams.map(team => (
                              <SelectItem key={team.id} value={team.id}>
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          Don't have a team yet? <a href="/my-teams" className="text-primary hover:underline">Create or join a team</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setRegistrationDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleRegister}>
                      Register Team
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="hover:bg-primary/5" onClick={handleAddToCalendar}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              
              <Button variant="outline" className="hover:bg-primary/5">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Challenge Details Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex md:gap-4 h-auto">
          <TabsTrigger value="details" className="py-2 text-sm md:text-base">Details</TabsTrigger>
          <TabsTrigger value="timeline" className="py-2 text-sm md:text-base">Timeline</TabsTrigger>
          <TabsTrigger value="prizes" className="py-2 text-sm md:text-base">Prizes</TabsTrigger>
          <TabsTrigger value="resources" className="py-2 text-sm md:text-base">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">About this Challenge</h3>
                <p>{challenge.longDescription}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Rules & Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {challenge.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Judges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {challenge.judges.map((judge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-md border">
                      <Avatar>
                        <AvatarFallback>{judge.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{judge.name}</p>
                        <p className="text-sm text-muted-foreground">{judge.role} at {judge.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
              <CardDescription>Important dates for this challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-primary/20 ml-3 space-y-6">
                {challenge.timeline.map((item, index) => (
                  <li key={index} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-background bg-primary/10">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    <h3 className="font-medium">{item.event}</h3>
                    <time className="block text-sm text-muted-foreground">{item.date}</time>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prizes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Prizes & Rewards</CardTitle>
              <CardDescription>What you can win in this challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {challenge.prizes.map((prize, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${index === 0 ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900' : ''}`}>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full 
                      ${index === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                        index === 1 ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' : 
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{prize.position}</h3>
                      <p className="text-muted-foreground">{prize.prize}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resources & Tools</CardTitle>
              <CardDescription>Helpful resources for participants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {challenge.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Download className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-muted-foreground">{resource.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Access
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ChallengeDetailPage;
