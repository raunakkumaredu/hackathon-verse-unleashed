
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award, Star, ArrowUp, ArrowDown, Minus, Filter } from "lucide-react";

const LeaderboardPage = () => {
  const { authState } = useAuth();
  const [selectedHackathon, setSelectedHackathon] = useState("all");
  
  // Mock leaderboard data
  const teamLeaderboard = [
    {
      id: "1",
      rank: 1,
      name: "Code Wizards",
      avatarUrl: "https://ui-avatars.com/api/?name=CW&background=random",
      score: 950,
      hackathon: "AI Innovation Challenge",
      members: 4,
      trend: "up",
      badges: ["1st Place", "Most Innovative"]
    },
    {
      id: "2",
      rank: 2,
      name: "Tech Titans",
      avatarUrl: "https://ui-avatars.com/api/?name=TT&background=random",
      score: 920,
      hackathon: "AI Innovation Challenge",
      members: 3,
      trend: "same",
      badges: ["2nd Place", "Best Technical Implementation"]
    },
    {
      id: "3",
      rank: 3,
      name: "Byte Brigade",
      avatarUrl: "https://ui-avatars.com/api/?name=BB&background=random",
      score: 880,
      hackathon: "AI Innovation Challenge",
      members: 5,
      trend: "up",
      badges: ["3rd Place", "People's Choice"]
    },
    {
      id: "4",
      rank: 4,
      name: "Data Dynamos",
      avatarUrl: "https://ui-avatars.com/api/?name=DD&background=random",
      score: 850,
      hackathon: "Blockchain Revolution",
      members: 4,
      trend: "down",
      badges: ["Best Use of Data"]
    },
    {
      id: "5",
      rank: 5,
      name: "Algorithm Aces",
      avatarUrl: "https://ui-avatars.com/api/?name=AA&background=random",
      score: 820,
      hackathon: "Blockchain Revolution",
      members: 3,
      trend: "up",
      badges: ["Most Scalable Solution"]
    }
  ];
  
  const individualLeaderboard = [
    {
      id: "1",
      rank: 1,
      name: "Alex Johnson",
      avatarUrl: "https://ui-avatars.com/api/?name=AJ&background=random",
      score: 780,
      organization: "MIT",
      role: "Full Stack Developer",
      badges: ["Top Contributor", "10+ Hackathons"],
      trend: "up"
    },
    {
      id: "2",
      rank: 2,
      name: "Sam Smith",
      avatarUrl: "https://ui-avatars.com/api/?name=SS&background=random",
      score: 765,
      organization: "Stanford",
      role: "UX Designer",
      badges: ["Design Expert", "5+ Hackathons"],
      trend: "same"
    },
    {
      id: "3",
      rank: 3,
      name: "Taylor Reed",
      avatarUrl: "https://ui-avatars.com/api/?name=TR&background=random",
      score: 730,
      organization: "Berkeley",
      role: "Data Scientist",
      badges: ["AI Specialist"],
      trend: "up"
    },
    {
      id: "4",
      rank: 4,
      name: "Jordan Lee",
      avatarUrl: "https://ui-avatars.com/api/?name=JL&background=random",
      score: 710,
      organization: "Harvard",
      role: "Backend Developer",
      badges: ["Cloud Expert"],
      trend: "down"
    },
    {
      id: "5",
      rank: 5,
      name: "Casey Taylor",
      avatarUrl: "https://ui-avatars.com/api/?name=CT&background=random",
      score: 695,
      organization: "UCLA",
      role: "Frontend Developer",
      badges: ["UI Master"],
      trend: "up"
    }
  ];
  
  // Mock hackathon options
  const hackathonOptions = [
    { value: "all", label: "All Hackathons" },
    { value: "ai", label: "AI Innovation Challenge" },
    { value: "blockchain", label: "Blockchain Revolution" }
  ];
  
  // Helper function for trend icon
  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <DashboardLayout
      title="Leaderboard"
      subtitle="Track the top performers across hackathons"
      userRole={authState.user?.role}
    >
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-semibold">Hackathon Champions</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Hackathon" />
            </SelectTrigger>
            <SelectContent>
              {hackathonOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="teams">
        <TabsList className="mb-6">
          <TabsTrigger value="teams">Team Rankings</TabsTrigger>
          <TabsTrigger value="individuals">Individual Rankings</TabsTrigger>
          <TabsTrigger value="colleges">College Rankings</TabsTrigger>
        </TabsList>
        
        {/* Team Rankings Tab */}
        <TabsContent value="teams" className="space-y-6">
          {/* Top 3 Teams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 2nd Place */}
            <Card className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Medal className="h-12 w-12 text-gray-400 mb-2" />
                <div className="text-2xl font-bold mb-1">2nd Place</div>
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarImage src={teamLeaderboard[1].avatarUrl} />
                  <AvatarFallback>{teamLeaderboard[1].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{teamLeaderboard[1].name}</h3>
                <p className="text-muted-foreground">{teamLeaderboard[1].score} points</p>
                <div className="flex mt-2">
                  {teamLeaderboard[1].badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="mx-1">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* 1st Place */}
            <Card className="bg-gradient-to-b from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 border-yellow-300 dark:border-yellow-700 transform scale-105">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Trophy className="h-14 w-14 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold mb-1">1st Place</div>
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={teamLeaderboard[0].avatarUrl} />
                  <AvatarFallback>{teamLeaderboard[0].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{teamLeaderboard[0].name}</h3>
                <p className="text-muted-foreground">{teamLeaderboard[0].score} points</p>
                <div className="flex flex-wrap justify-center mt-2">
                  {teamLeaderboard[0].badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="m-1 bg-yellow-200 dark:bg-yellow-900/50">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* 3rd Place */}
            <Card className="bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 border-orange-300 dark:border-orange-700">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Award className="h-12 w-12 text-orange-500 mb-2" />
                <div className="text-2xl font-bold mb-1">3rd Place</div>
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarImage src={teamLeaderboard[2].avatarUrl} />
                  <AvatarFallback>{teamLeaderboard[2].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{teamLeaderboard[2].name}</h3>
                <p className="text-muted-foreground">{teamLeaderboard[2].score} points</p>
                <div className="flex mt-2">
                  {teamLeaderboard[2].badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="mx-1 bg-orange-200 dark:bg-orange-900/50">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Full Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Team Rankings</CardTitle>
              <CardDescription>Based on cumulative hackathon performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teamLeaderboard.map((team) => (
                  <div key={team.id} className="flex items-center p-3 rounded-lg hover:bg-muted">
                    <div className="w-10 text-center font-bold">{team.rank}</div>
                    <Avatar className="mr-3">
                      <AvatarImage src={team.avatarUrl} />
                      <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">{team.name}</h4>
                        <span className="ml-2">
                          {renderTrendIcon(team.trend)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {team.hackathon} • {team.members} members
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm text-right font-medium">{team.score} pts</div>
                        <Progress value={(team.score / 1000) * 100} className="h-1 w-24" />
                      </div>
                      <div className="flex gap-1">
                        {team.badges.slice(0, 1).map((badge, idx) => (
                          <Badge key={idx} variant="outline" className="whitespace-nowrap">{badge}</Badge>
                        ))}
                        {team.badges.length > 1 && (
                          <Badge variant="outline">+{team.badges.length - 1}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Individual Rankings Tab */}
        <TabsContent value="individuals" className="space-y-6">
          {/* Top 3 Individuals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Similar structure to team rankings */}
            <Card className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Medal className="h-12 w-12 text-gray-400 mb-2" />
                <div className="text-2xl font-bold mb-1">2nd Place</div>
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarImage src={individualLeaderboard[1].avatarUrl} />
                  <AvatarFallback>{individualLeaderboard[1].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{individualLeaderboard[1].name}</h3>
                <p className="text-muted-foreground">{individualLeaderboard[1].score} points</p>
                <div className="flex mt-2">
                  {individualLeaderboard[1].badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="mx-1">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 border-yellow-300 dark:border-yellow-700 transform scale-105">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Trophy className="h-14 w-14 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold mb-1">1st Place</div>
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={individualLeaderboard[0].avatarUrl} />
                  <AvatarFallback>{individualLeaderboard[0].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{individualLeaderboard[0].name}</h3>
                <p className="text-muted-foreground">{individualLeaderboard[0].score} points</p>
                <div className="flex flex-wrap justify-center mt-2">
                  {individualLeaderboard[0].badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="m-1 bg-yellow-200 dark:bg-yellow-900/50">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 border-orange-300 dark:border-orange-700">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Award className="h-12 w-12 text-orange-500 mb-2" />
                <div className="text-2xl font-bold mb-1">3rd Place</div>
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarImage src={individualLeaderboard[2].avatarUrl} />
                  <AvatarFallback>{individualLeaderboard[2].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{individualLeaderboard[2].name}</h3>
                <p className="text-muted-foreground">{individualLeaderboard[2].score} points</p>
                <div className="flex mt-2">
                  {individualLeaderboard[2].badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="mx-1 bg-orange-200 dark:bg-orange-900/50">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Full Individual Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Rankings</CardTitle>
              <CardDescription>Based on personal contributions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {individualLeaderboard.map((person) => (
                  <div key={person.id} className="flex items-center p-3 rounded-lg hover:bg-muted">
                    <div className="w-10 text-center font-bold">{person.rank}</div>
                    <Avatar className="mr-3">
                      <AvatarImage src={person.avatarUrl} />
                      <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">{person.name}</h4>
                        <span className="ml-2">
                          {renderTrendIcon(person.trend)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {person.role} • {person.organization}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm text-right font-medium">{person.score} pts</div>
                        <Progress value={(person.score / 1000) * 100} className="h-1 w-24" />
                      </div>
                      <div className="flex gap-1">
                        {person.badges.slice(0, 1).map((badge, idx) => (
                          <Badge key={idx} variant="outline" className="whitespace-nowrap">{badge}</Badge>
                        ))}
                        {person.badges.length > 1 && (
                          <Badge variant="outline">+{person.badges.length - 1}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* College Rankings Tab */}
        <TabsContent value="colleges">
          <div className="flex items-center justify-center py-20 flex-col">
            <Star className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">College Rankings Coming Soon</h3>
            <p className="text-muted-foreground text-center mt-2 max-w-md">
              We're collecting data from multiple hackathons to create comprehensive college rankings.
            </p>
            <Button variant="outline" className="mt-4">Notify Me When Available</Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
