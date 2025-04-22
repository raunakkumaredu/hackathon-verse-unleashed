
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Trophy, School, Calendar, MapPin, Users, Medal, ChevronRight, ArrowRight, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample tournament data
const tournaments = [
  {
    id: "1",
    name: "National Collegiate Hackathon Championship",
    status: "upcoming",
    startDate: "June 15, 2025",
    endDate: "June 18, 2025",
    location: "Virtual",
    registrationDeadline: "May 30, 2025",
    participatingColleges: 32,
    prizePool: "$15,000",
    description: "The premier collegiate hackathon championship bringing together the best teams from universities across the nation to compete in a 72-hour challenge.",
    categories: ["AI/ML", "Web Development", "Mobile App", "IoT", "Blockchain"],
    sponsors: [
      { name: "TechCorp", logo: "https://github.com/shadcn.png" },
      { name: "InnovateTech", logo: "" },
      { name: "DevFusion", logo: "" },
    ]
  },
  {
    id: "2",
    name: "Regional Engineering Challenge",
    status: "active",
    startDate: "May 5, 2025",
    endDate: "May 25, 2025",
    location: "Hybrid",
    registrationDeadline: "April 25, 2025",
    participatingColleges: 16,
    prizePool: "$8,000",
    description: "A regional competition focused on practical engineering solutions to real-world problems. Teams compete in weekly challenges over a three-week period.",
    categories: ["Robotics", "Sustainable Engineering", "Healthcare Solutions", "Urban Planning"],
    sponsors: [
      { name: "EngineCo", logo: "" },
      { name: "BuildTech", logo: "" },
    ]
  },
  {
    id: "3",
    name: "Startup Innovation Challenge",
    status: "past",
    startDate: "March 10, 2025",
    endDate: "March 12, 2025",
    location: "Boston Convention Center",
    registrationDeadline: "February 25, 2025",
    participatingColleges: 24,
    prizePool: "$12,000",
    description: "A pitch competition where student teams present innovative startup ideas to industry judges and investors.",
    categories: ["FinTech", "EdTech", "HealthTech", "GreenTech", "SocialTech"],
    sponsors: [
      { name: "VentureFund", logo: "" },
      { name: "StartupAccelerator", logo: "" },
      { name: "InvestorGroup", logo: "" },
    ],
    results: [
      { position: 1, college: "MIT", teamName: "FinBuddy", project: "AI-Driven Financial Assistant" },
      { position: 2, college: "Stanford", teamName: "GreenGrow", project: "Sustainable Urban Farming" },
      { position: 3, college: "Berkeley", teamName: "MediConnect", project: "Healthcare Logistics Platform" },
    ]
  }
];

// Sample colleges participating in tournaments
const colleges = [
  { id: "1", name: "MIT", wins: 12, participations: 15, rank: 1, logoInitials: "MIT" },
  { id: "2", name: "Stanford University", wins: 10, participations: 14, rank: 2, logoInitials: "SU" },
  { id: "3", name: "UC Berkeley", wins: 9, participations: 15, rank: 3, logoInitials: "UCB" },
  { id: "4", name: "Carnegie Mellon", wins: 8, participations: 13, rank: 4, logoInitials: "CM" },
  { id: "5", name: "Georgia Tech", wins: 7, participations: 12, rank: 5, logoInitials: "GT" },
  { id: "6", name: "Caltech", wins: 6, participations: 10, rank: 6, logoInitials: "CT" },
  { id: "7", name: "Harvard University", wins: 5, participations: 11, rank: 7, logoInitials: "HU" },
  { id: "8", name: "University of Michigan", wins: 5, participations: 12, rank: 8, logoInitials: "UM" },
];

const TournamentPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tournaments");
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  
  const handleRegisterTeam = (tournamentId: string) => {
    toast.success("Registration form opened. You can now create or select a team.");
    setSelectedTournament(tournamentId);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "past":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const activeTournament = tournaments.find(t => t.status === "active");
  const upcomingTournaments = tournaments.filter(t => t.status === "upcoming");
  
  return (
    <DashboardLayout
      title="Inter-College Tournaments"
      subtitle="Compete against other colleges in hackathon tournaments"
      userRole={authState.user?.role || "student"}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <Trophy className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Tournament Central</h2>
            <p className="text-muted-foreground">Inter-collegiate competitions and challenges</p>
          </div>
        </div>

        <Tabs defaultValue="tournaments" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
            <TabsTrigger value="tournaments">
              <Trophy className="h-4 w-4 mr-2" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="colleges">
              <School className="h-4 w-4 mr-2" />
              College Rankings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tournaments" className="mt-4 space-y-6">
            {activeTournament && (
              <Card className="border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={getStatusColor("active")}>
                        Live Now
                      </Badge>
                      <CardTitle className="text-xl mt-2">{activeTournament.name}</CardTitle>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{activeTournament.startDate} - {activeTournament.endDate}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {activeTournament.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                      <p className="text-lg font-bold">{activeTournament.prizePool}</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Colleges</p>
                      <p className="text-lg font-bold">{activeTournament.participatingColleges}</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Categories</p>
                      <p className="text-lg font-bold">{activeTournament.categories.length}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {activeTournament.categories.map((category, idx) => (
                      <Badge key={idx} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{activeTournament.location}</span>
                  </div>
                  <Button 
                    variant={selectedTournament === activeTournament.id ? "outline" : "default"}
                    onClick={() => handleRegisterTeam(activeTournament.id)}
                  >
                    {selectedTournament === activeTournament.id ? "Registration Open" : "Register Team"}
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingTournaments.map(tournament => (
                <Card key={tournament.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getStatusColor(tournament.status)}>
                        Upcoming
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Registration closes: {tournament.registrationDeadline}
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{tournament.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{tournament.startDate} - {tournament.endDate}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {tournament.description.length > 120
                        ? `${tournament.description.slice(0, 120)}...`
                        : tournament.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tournament.categories.slice(0, 3).map((category, idx) => (
                        <Badge key={idx} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                      {tournament.categories.length > 3 && (
                        <Badge variant="outline">
                          +{tournament.categories.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{tournament.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{tournament.participatingColleges} colleges</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-sm font-medium">
                      Prize: {tournament.prizePool}
                    </div>
                    <Button 
                      variant={selectedTournament === tournament.id ? "outline" : "default"}
                      onClick={() => handleRegisterTeam(tournament.id)}
                      size="sm"
                    >
                      {selectedTournament === tournament.id ? "Registration Open" : "Register Team"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Past Tournaments</h3>
              {tournaments.filter(t => t.status === "past").map(tournament => (
                <Card key={tournament.id} className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className={getStatusColor(tournament.status)}>
                          Completed
                        </Badge>
                        <CardTitle className="text-lg mt-2">{tournament.name}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{tournament.startDate} - {tournament.endDate}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2">Results:</h4>
                    <div className="space-y-2">
                      {tournament.results && tournament.results.map(result => (
                        <div key={result.position} className="flex items-center justify-between p-2 rounded-md bg-muted/70">
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full ${
                              result.position === 1 ? 'bg-yellow-500' : 
                              result.position === 2 ? 'bg-gray-400' : 
                              'bg-amber-700'
                            } flex items-center justify-center text-white font-bold`}>
                              {result.position}
                            </div>
                            <div>
                              <p className="font-medium">{result.teamName}</p>
                              <p className="text-xs text-muted-foreground">{result.college}</p>
                            </div>
                          </div>
                          <p className="text-sm">{result.project}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="colleges" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">College Rankings</CardTitle>
                <CardDescription>Top performing colleges across all tournaments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {colleges.map((college, index) => (
                    <div key={college.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-amber-700' :
                          'bg-primary/10'
                        } flex items-center justify-center ${index < 3 ? 'text-white' : 'text-primary'} font-bold`}>
                          {index + 1}
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{college.logoInitials}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-medium">{college.name}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-bold">{college.wins}</p>
                          <p className="text-xs text-muted-foreground">Wins</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold">{college.participations}</p>
                          <p className="text-xs text-muted-foreground">Participated</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Trophy className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>
                            {((college.wins / college.participations) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">League Standings</CardTitle>
                <CardDescription>Current season rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Rank</th>
                        <th className="py-3 px-4 text-left font-medium">College</th>
                        <th className="py-3 px-4 text-center font-medium">Wins</th>
                        <th className="py-3 px-4 text-center font-medium">Losses</th>
                        <th className="py-3 px-4 text-center font-medium">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {colleges.slice(0, 5).map((college, index) => (
                        <tr key={college.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4">#{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback>{college.logoInitials}</AvatarFallback>
                              </Avatar>
                              {college.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">{college.wins}</td>
                          <td className="py-3 px-4 text-center">{college.participations - college.wins}</td>
                          <td className="py-3 px-4 text-center font-medium">{college.wins * 3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">
                  View Full League Table
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            
            {authState.user?.role === "college" && (
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Register Your College</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Register your college for upcoming tournaments and inter-collegiate competitions.
                  </p>
                  <Button>
                    Register College
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TournamentPage;
