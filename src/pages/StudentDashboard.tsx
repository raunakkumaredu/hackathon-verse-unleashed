
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Trophy, Users, Clock, Bell, ChevronRight, Rocket, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";

export const StudentDashboard = () => {
  const navigate = useNavigate();

  // Sample data for the dashboard
  const upcomingEvents = [
    { 
      id: "1", 
      title: "AI Innovation Hackathon", 
      date: "May 15-17, 2025", 
      status: "Registered",
      company: "TechCorp",
      logo: "https://ui-avatars.com/api/?name=TC&background=random" 
    },
    { 
      id: "2", 
      title: "Sustainability Challenge", 
      date: "June 3-5, 2025", 
      status: "Interested",
      company: "GreenTech",
      logo: "https://ui-avatars.com/api/?name=GT&background=random" 
    },
  ];
  
  const teamMembers = [
    { id: "1", name: "Alex Johnson", role: "Full Stack Developer", avatar: "https://ui-avatars.com/api/?name=AJ&background=random" },
    { id: "2", name: "Sam Smith", role: "UX Designer", avatar: "https://ui-avatars.com/api/?name=SS&background=random" },
    { id: "3", name: "Taylor Reed", role: "Data Scientist", avatar: "https://ui-avatars.com/api/?name=TR&background=random" }
  ];
  
  const achievements = [
    { id: "1", title: "First Hackathon", icon: <Trophy className="h-5 w-5" />, date: "March 10, 2025" },
    { id: "2", title: "Team Formed", icon: <Users className="h-5 w-5" />, date: "April 2, 2025" },
    { id: "3", title: "Project Submission", icon: <Rocket className="h-5 w-5" />, date: "April 15, 2025" }
  ];

  return (
    <DashboardLayout 
      title="Student Dashboard" 
      subtitle="Welcome back! Here's what's happening with your hackathon journey."
      userRole="student"
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Hackathons</p>
                    <h3 className="text-2xl font-bold">3</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-purple/10 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-hackathon-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Team Members</p>
                    <h3 className="text-2xl font-bold">4</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-blue/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-hackathon-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Skill Score</p>
                    <h3 className="text-2xl font-bold">720</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-orange/10 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-hackathon-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Hackathons */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Hackathons
              </CardTitle>
              <CardDescription>Your registered and saved events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={event.logo} />
                      <AvatarFallback>{event.company.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge variant={event.status === "Registered" ? "default" : "outline"}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Hosted by {event.company}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/challenges")}>
                View All Hackathons
              </Button>
            </CardFooter>
          </Card>
          
          {/* Current Team */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Your Team
              </CardTitle>
              <CardDescription>Code Crusaders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="flex items-center"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/teams")}>
                Manage Team
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar - Right 1/3 */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">User Name</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Computer Science Student</p>
                <div className="flex space-x-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/profile")}>
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Progress */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Skills Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Frontend Development</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Backend Development</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Data Science</span>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/progress")}>
                View Detailed Progress
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recent Achievements */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Trophy className="h-4 w-4 mr-2" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center mr-3",
                      "bg-hackathon-purple/10 text-hackathon-purple"
                    )}>
                      {achievement.icon}
                    </div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm font-medium">Team invitation received</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Alex invited you to join "Tech Titans"
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <p className="text-sm font-medium">New challenge announced</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Check out the Climate Tech Challenge
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate("/notifications")}>
                View All Notifications
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
