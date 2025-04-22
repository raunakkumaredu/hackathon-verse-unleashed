
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

const MentorDashboard = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const user = authState.user;

  // Sample data for the dashboard
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
      title={`Mentor Dashboard`}
      subtitle={`Welcome back${user?.name ? ', ' + user.name : ''}! Track your mentee teams and upcoming sessions.`}
      userRole="mentor"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content - Left 2/3 */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Assigned Teams</p>
                    <h3 className="text-2xl font-bold">3</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-purple/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-hackathon-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Mentoring Hours</p>
                    <h3 className="text-2xl font-bold">12</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-blue/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-hackathon-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Hackathons</p>
                    <h3 className="text-2xl font-bold">2</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-orange/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-hackathon-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Mentoring Sessions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>Your scheduled mentoring sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentoringSessions.map((session) => (
                  <div 
                    key={session.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/mentorship/session/${session.id}`)}
                  >
                    <Avatar className="h-12 w-12">
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
                        <Clock className="h-3 w-3 mr-1" />
                        {session.date}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Project: {session.project}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/mentorship/schedule")}>
                Schedule New Session
              </Button>
            </CardFooter>
          </Card>
          
          {/* Team Progress */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Team Progress
              </CardTitle>
              <CardDescription>Track your teams' development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assignedTeams.map((team) => (
                  <div key={team.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={team.avatar} />
                          <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{team.name}</h4>
                          <p className="text-xs text-gray-500">{team.members} members</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{team.progress}%</span>
                    </div>
                    <Progress value={team.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/teams")}>
                View All Teams
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar - Right 1/3 */}
        <div className="space-y-6">
          {/* Mentor Profile */}
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name?.charAt(0) || 'M'}&background=random`} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'M'}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{user?.name || "Mentor Name"}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Senior Tech Advisor</p>
                <div className="flex space-x-2 mb-4">
                  <Badge variant="secondary">AI/ML</Badge>
                  <Badge variant="secondary">Web Dev</Badge>
                  <Badge variant="secondary">IoT</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/profile")}>
                  Edit Mentor Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Unread Messages */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Team Messages
              </CardTitle>
              <CardDescription>Recent team communications</CardDescription>
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
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/collaboration")}>
                View All Messages
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick Actions */}
          <Card className="glass-card">
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
          
          {/* Mentor Resources */}
          <Card className="glass-card">
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
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/resources")}>
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
