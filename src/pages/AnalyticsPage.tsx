import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart as BarChartIcon, LineChart, PieChart, CircleDot, BarChartHorizontal } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const AnalyticsPage = () => {
  const { authState } = useAuth();
  
  // Mock chart data
  const hackathonParticipationData = [
    { name: 'Jan', participants: 150 },
    { name: 'Feb', participants: 180 },
    { name: 'Mar', participants: 220 },
    { name: 'Apr', participants: 280 },
    { name: 'May', participants: 320 },
    { name: 'Jun', participants: 400 },
  ];
  
  const userRoleDistribution = [
    { name: 'Students', value: 65 },
    { name: 'Mentors', value: 15 },
    { name: 'Companies', value: 12 },
    { name: 'Colleges', value: 8 },
  ];
  
  const pieColors = ['#8A2BE2', '#9370DB', '#BA55D3', '#DA70D6'];
  
  const skillsDistributionData = [
    { skill: 'Web Dev', count: 420 },
    { skill: 'ML/AI', count: 380 },
    { skill: 'Mobile', count: 340 },
    { skill: 'UI/UX', count: 300 },
    { skill: 'Blockchain', count: 250 },
    { skill: 'IoT', count: 190 },
    { skill: 'Cloud', count: 280 },
    { skill: 'DevOps', count: 220 },
  ];
  
  const projectCompletionData = [
    { name: 'AI Challenge', completed: 85, registered: 100 },
    { name: 'Web3 Hack', completed: 70, registered: 100 },
    { name: 'IoT Event', completed: 90, registered: 100 },
    { name: 'Mobile App', completed: 75, registered: 100 },
    { name: 'Cloud Hack', completed: 80, registered: 100 },
  ];
  
  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Insights and statistics about your hackathon journey"
      userRole={authState.user?.role}
    >
      <div className="mb-6 flex justify-end">
        <Select defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
            <SelectItem value="quarter">Past Quarter</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Hackathons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">+3 from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">75% completion rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Teams Joined</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Collaborated with 18 people</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">3 competitions won</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="participation">
        <TabsList className="mb-6">
          <TabsTrigger value="participation" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" /> Participation
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" /> Skills
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Demographics
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChartHorizontal className="h-4 w-4" /> Performance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="participation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Participation</CardTitle>
                <CardDescription>Monthly trend of participant numbers</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={hackathonParticipationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="participants" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Role Distribution</CardTitle>
                <CardDescription>Breakdown of participant types</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <Pie
                        data={userRoleDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userRoleDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills Distribution</CardTitle>
              <CardDescription>Most popular skills among participants</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics">
          <div className="text-center py-12">
            <CircleDot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Demographics Analysis Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto mt-2">
              We're collecting more data to provide detailed demographics insights for our hackathon community.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Project Completion Rates</CardTitle>
              <CardDescription>Percentage of completed projects per hackathon</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Your Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Growth</CardTitle>
              <CardDescription>Your skill development over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <LineChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Skills Growth Chart Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                  Complete more hackathons to see your skills growth chart.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Achievement Timeline</CardTitle>
              <CardDescription>Your key milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CircleDot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Achievement Timeline Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                  Your hackathon milestones will appear here as you participate in more events.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
