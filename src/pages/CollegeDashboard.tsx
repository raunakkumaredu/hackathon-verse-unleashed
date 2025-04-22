
import React from "react";
import { School, ChevronRight, Users, Calendar, Trophy, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CollegeDashboard = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const user = authState.user;

  // Sample data for the dashboard
  const collegeEvents = [
    { 
      id: "1", 
      title: "Inter-College AI Challenge", 
      date: "May 15-17, 2025", 
      status: "Active",
      participants: 78,
      logo: "https://ui-avatars.com/api/?name=IC&background=random" 
    },
    { 
      id: "2", 
      title: "Freshman Coding Bootcamp", 
      date: "June 5-7, 2025", 
      status: "Planning",
      participants: 0,
      logo: "https://ui-avatars.com/api/?name=FB&background=random" 
    },
  ];
  
  const topStudents = [
    { id: "1", name: "Morgan Lee", department: "Computer Science", achievements: ["Hackathon Winner", "3.9 GPA"], avatar: "https://ui-avatars.com/api/?name=ML&background=random" },
    { id: "2", name: "Jordan Taylor", department: "Data Science", achievements: ["Research Assistant", "ML Specialist"], avatar: "https://ui-avatars.com/api/?name=JT&background=random" },
    { id: "3", name: "Riley Johnson", department: "Design", achievements: ["UI/UX Master", "Adobe Scholar"], avatar: "https://ui-avatars.com/api/?name=RJ&background=random" }
  ];
  
  const partnerCompanies = [
    { id: "1", name: "TechCorp", logo: "https://ui-avatars.com/api/?name=TC&background=random" },
    { id: "2", name: "InnovateLabs", logo: "https://ui-avatars.com/api/?name=IL&background=random" },
    { id: "3", name: "NextGen Systems", logo: "https://ui-avatars.com/api/?name=NS&background=random" },
  ];

  return (
    <DashboardLayout 
      title={`College Dashboard`}
      subtitle={`Welcome back${user?.name ? ', ' + user.name : ''}! Manage your institution's hackathon programs and track student performance.`}
      userRole="college"
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Active Programs</p>
                    <h3 className="text-2xl font-bold">3</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-purple/10 flex items-center justify-center">
                    <School className="h-6 w-6 text-hackathon-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Student Participants</p>
                    <h3 className="text-2xl font-bold">124</h3>
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Industry Partners</p>
                    <h3 className="text-2xl font-bold">8</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-hackathon-orange/10 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-hackathon-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* College Events */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                College Events
              </CardTitle>
              <CardDescription>Manage your institution's hackathons and bootcamps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collegeEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/event/${event.id}`)}
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
                        {event.participants > 0 ? `${event.participants} participants` : "Registration opening soon"}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/challenges/create")}>
                Create New College Event
              </Button>
            </CardFooter>
          </Card>
          
          {/* Student Analytics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Student Performance
              </CardTitle>
              <CardDescription>Metrics from hackathon participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Participation Rate</span>
                    <span className="text-sm font-medium">64%</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Project Completion</span>
                    <span className="text-sm font-medium">83%</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Prize Winners</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
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
          {/* College Profile */}
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name?.charAt(0) || 'C'}&background=random`} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'C'}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{user?.name || "College Name"}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Educational Institution</p>
                <div className="flex space-x-2 mb-4">
                  <Badge variant="secondary">Computer Science</Badge>
                  <Badge variant="secondary">Engineering</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/profile")}>
                  Edit College Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Students */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Top Students</CardTitle>
              <CardDescription>Standout performers in hackathons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topStudents.map((student) => (
                <div key={student.id} className="flex items-start">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{student.department}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.achievements.map((achievement, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/students")}>
                View All Students
              </Button>
            </CardFooter>
          </Card>
          
          {/* Industry Partners */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Industry Partners</CardTitle>
              <CardDescription>Companies collaborating with your institution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {partnerCompanies.map((company) => (
                  <div key={company.id} className="flex items-center p-2 rounded-lg border border-border">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 text-sm font-medium">{company.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/partners")}>
                Manage Partners
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
                <Calendar className="mr-2 h-4 w-4" /> Host Hackathon
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/mentorship")}>
                <Users className="mr-2 h-4 w-4" /> Assign Faculty Mentors
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/teams")}>
                <Trophy className="mr-2 h-4 w-4" /> Manage Teams
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CollegeDashboard;
