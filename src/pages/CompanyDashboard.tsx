
import React from "react";
import { Building, ChevronRight, Users, Calendar, Trophy, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const user = authState.user;

  // Sample data for the dashboard
  const hostedHackathons = [
    { 
      id: "1", 
      title: "AI Innovation Challenge", 
      date: "May 15-17, 2025", 
      status: "Active",
      participants: 145,
      logo: "https://ui-avatars.com/api/?name=AI&background=random" 
    },
    { 
      id: "2", 
      title: "Blockchain Revolution", 
      date: "June 20-22, 2025", 
      status: "Planning",
      participants: 0,
      logo: "https://ui-avatars.com/api/?name=BR&background=random" 
    },
  ];
  
  const topTalent = [
    { id: "1", name: "Alex Johnson", skills: ["AI", "Machine Learning", "Python"], university: "MIT", avatar: "https://ui-avatars.com/api/?name=AJ&background=random" },
    { id: "2", name: "Sam Smith", skills: ["UX Design", "Frontend", "React"], university: "Stanford", avatar: "https://ui-avatars.com/api/?name=SS&background=random" },
    { id: "3", name: "Taylor Reed", skills: ["Data Science", "Python", "ML"], university: "Berkeley", avatar: "https://ui-avatars.com/api/?name=TR&background=random" }
  ];

  return (
    <DashboardLayout 
      title={`Company Dashboard`}
      subtitle={`Welcome back${user?.name ? ', ' + user.name : ''}! Manage your hackathons and discover top talent.`}
      userRole="company"
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Active Hackathons</p>
                    <h3 className="text-2xl font-bold">2</h3>
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Participants</p>
                    <h3 className="text-2xl font-bold">145</h3>
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Talent Recruited</p>
                    <h3 className="text-2xl font-bold">12</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-orange/10 flex items-center justify-center">
                    <Building className="h-6 w-6 text-hackathon-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Hosted Hackathons */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Your Hackathons
              </CardTitle>
              <CardDescription>Manage your hosted events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hostedHackathons.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/hackathon/${event.id}`)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={event.logo} />
                      <AvatarFallback>{event.title.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge variant={event.status === "Active" ? "default" : "outline"}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {event.participants} participants
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/challenges/create")}>
                Create New Hackathon
              </Button>
            </CardFooter>
          </Card>
          
          {/* Analytics Summary */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Engagement Analytics
              </CardTitle>
              <CardDescription>Hackathon performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Participant Engagement</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Project Completion Rate</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Average Team Size</span>
                    <span className="text-sm font-medium">4.2 members</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/analytics")}>
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar - Right 1/3 */}
        <div className="space-y-6">
          {/* Company Profile Summary */}
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name?.charAt(0) || 'C'}&background=random`} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'C'}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{user?.name || "Company Name"}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tech Innovation Partner</p>
                <div className="flex space-x-2 mb-4">
                  <Badge variant="secondary">AI</Badge>
                  <Badge variant="secondary">Blockchain</Badge>
                  <Badge variant="secondary">Cloud</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/profile")}>
                  Edit Company Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Talent */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Top Talent</CardTitle>
              <CardDescription>Standout participants from your hackathons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topTalent.map((talent) => (
                <div key={talent.id} className="flex items-start">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={talent.avatar} />
                    <AvatarFallback>{talent.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">{talent.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{talent.university}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {talent.skills.map((skill, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/talent")}>
                View All Talent
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/challenges/create")}>
                <Calendar className="mr-2 h-4 w-4" /> Create Hackathon
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/mentorship")}>
                <Users className="mr-2 h-4 w-4" /> Assign Mentors
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/project-submission")}>
                <Trophy className="mr-2 h-4 w-4" /> Review Submissions
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/networking")}>
                <Building className="mr-2 h-4 w-4" /> Talent Recruitment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
