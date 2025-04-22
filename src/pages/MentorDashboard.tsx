import React from "react";
import { Award, ChevronRight, Users, Calendar, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CircleDot } from "lucide-react";

const MentorDashboard = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const user = authState.user;

  const mentoringSessions = [
    { 
      id: "1", 
      title: "Team Code Wizards", 
      date: "Today, 3:00 PM", 
      status: "Upcoming",
      project: "AI-Powered Learning Assistant",
      logo: "https://ui-avatars.com/api/?name=CW&background=random" 
    },
    { 
      id: "2", 
      title: "DevDynamos", 
      date: "Tomorrow, 10:00 AM", 
      status: "Scheduled",
      project: "Blockchain Supply Chain",
      logo: "https://ui-avatars.com/api/?name=DD&background=random" 
    },
  ];
  
  const assignedTeams = [
    { id: "1", name: "Code Wizards", members: 4, progress: 65, avatar: "https://ui-avatars.com/api/?name=CW&background=random" },
    { id: "2", name: "DevDynamos", members: 3, progress: 40, avatar: "https://ui-avatars.com/api/?name=DD&background=random" },
    { id: "3", name: "Byte Brigade", members: 5, progress: 25, avatar: "https://ui-avatars.com/api/?name=BB&background=random" }
  ];

  return (
    <DashboardLayout
      title={
        <span className="gradient-text animate-fade-in">
          Mentor Dashboard
        </span>
      }
      subtitle={
        <span className="animate-fade-in">
          {`Welcome back${user?.name ? ', ' + user.name : ''}! Track your mentee teams and upcoming sessions.`}
        </span>
      }
      userRole="mentor"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass-card animate-fade-in animate-delay-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Assigned Teams</p>
                    <h3 className="text-2xl font-bold gradient-text">3</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-float">
                    <Users className="h-6 w-6 text-hackathon-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card animate-fade-in animate-delay-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Mentoring Hours</p>
                    <h3 className="text-2xl font-bold gradient-text">12</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-float">
                    <Clock className="h-6 w-6 text-hackathon-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card animate-fade-in animate-delay-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Hackathons</p>
                    <h3 className="text-2xl font-bold gradient-text">2</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center animate-float">
                    <Award className="h-6 w-6 text-hackathon-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card animate-fade-in animate-delay-700 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-hackathon-purple">
                <Calendar className="h-5 w-5 mr-2 pulse" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription className="gradient-text">
                Your scheduled mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentoringSessions.map((session, idx) => (
                  <div
                    key={session.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-accent/10 group
                      animate-fade-in animate-delay-${200 + idx * 100}`}
                    onClick={() => navigate(`/mentorship/session/${session.id}`)}
                  >
                    <Avatar className="h-12 w-12 hover:scale-110 transition-transform ring-2 ring-primary/50">
                      <AvatarImage src={session.logo} />
                      <AvatarFallback>{session.title.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{session.title}</h4>
                        <Badge variant={session.status === "Upcoming" ? "default" : "outline"}>
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1 animate-pulse" />
                        {session.date}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Project: <span className="gradient-text">{session.project}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full hover-scale" onClick={() => navigate("/mentorship/schedule")}>
                Schedule New Session
              </Button>
            </CardFooter>
          </Card>

          <Card className="glass-card animate-fade-in animate-delay-900 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-hackathon-blue">
                <Users className="h-5 w-5 mr-2" />
                Team Progress
              </CardTitle>
              <CardDescription className="gradient-text">
                Track your teams' development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assignedTeams.map((team, idx) => (
                  <div
                    key={team.id}
                    className={`space-y-2 animate-fade-in animate-delay-${300 + idx * 100}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 mr-2 hover:scale-110 transition-transform ring-2 ring-accent/70">
                          <AvatarImage src={team.avatar} />
                          <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{team.name}</h4>
                          <p className="text-xs text-gray-500">{team.members} members</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium gradient-text">{team.progress}%</span>
                    </div>
                    <Progress value={team.progress} className="h-2 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full hover-scale" onClick={() => navigate("/teams")}>
                View All Teams
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card animate-fade-in animate-delay-900">
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4 hover:scale-110 transition-all ring-2 ring-primary/50 animate-float">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name?.charAt(0) || 'M'}&background=random`} />
                <AvatarFallback>{user?.name?.charAt(0) || 'M'}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold gradient-text">{user?.name || "Mentor Name"}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Senior Tech Advisor</p>
              <div className="flex space-x-2 mb-4">
                <Badge variant="secondary">AI/ML</Badge>
                <Badge variant="secondary">Web Dev</Badge>
                <Badge variant="secondary">IoT</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full hover-scale" onClick={() => navigate("/profile")}>
                Edit Mentor Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-in animate-delay-1100">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Team Messages
              </CardTitle>
              <CardDescription className="gradient-text">
                Recent team communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Code Wizards</p>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    "We're stuck on the API integration. Could you help us?"
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">DevDynamos</p>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    "Thanks for your feedback on our blockchain implementation!"
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full hover-scale" onClick={() => navigate("/collaboration")}>
                View All Messages
              </Button>
            </CardFooter>
          </Card>

          <Card className="glass-card animate-fade-in animate-delay-1300">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/mentorship/schedule")}>
                <Calendar className="mr-2 h-4 w-4" /> Schedule Session
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/collaboration")}>
                <MessageSquare className="mr-2 h-4 w-4" /> Message Teams
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/project-submission/review")}>
                <Award className="mr-2 h-4 w-4" /> Review Projects
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-in animate-delay-1500">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Mentor Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-sm font-medium">Effective Mentoring Guide</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Best practices for hackathon mentorship
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-sm font-medium">Technical Resources</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Common APIs and tools for hackathon projects
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full hover-scale" onClick={() => navigate("/resources")}>
                All Resources
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
