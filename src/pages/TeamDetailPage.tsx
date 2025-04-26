
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Code, MessageSquare, CalendarClock, ArrowLeft, Plus, Share2, Trophy, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Mock team data
const teamData = {
  "team1": {
    id: "team1",
    name: "Code Wizards",
    description: "A team focused on creating innovative solutions using AI and machine learning.",
    createdAt: "April 5, 2025",
    createdBy: "user123", // Added creator ID
    members: [
      { id: "1", name: "Sachin Kumar", role: "Team Lead", avatar: "https://ui-avatars.com/api/?name=AJ&background=random" },
      { id: "2", name: "Ravi Singh", role: "UX Designer", avatar: "https://ui-avatars.com/api/?name=SS&background=random" },
      { id: "3", name: "OM singh", role: "Data Scientist", avatar: "https://ui-avatars.com/api/?name=TR&background=random" }
    ],
    skills: ["React", "Python", "Machine Learning", "UI/UX"],
    currentChallenges: [
      { id: "1", name: "AI Innovation Challenge", status: "Registered", deadline: "May 17, 2025" }
    ],
    pastChallenges: [],
    discussions: [
      { id: "disc1", author: "Sachin Kumar", content: "Let's start brainstorming ideas for the AI challenge.", timestamp: "2 days ago", replies: 3 },
      { id: "disc2", author: "Bhaskar kumar", content: "I've found some interesting research papers that might help us.", timestamp: "1 day ago", replies: 1 }
    ],
    meetings: [
      { id: "meet1", title: "Kickoff Meeting", date: "April 25, 2025", time: "3:00 PM", location: "Virtual" },
      { id: "meet2", title: "Progress Check", date: "May 2, 2025", time: "4:00 PM", location: "Virtual" }
    ]
  },
  "team2": {
    id: "team2",
    name: "Tech Titans",
    description: "Solving cutting-edge problems with innovative tech solutions.",
    createdAt: "April 10, 2025",
    createdBy: "user456", // Added creator ID
    members: [
      { id: "4", name: "Jordan Lee", role: "Backend Developer", avatar: "https://ui-avatars.com/api/?name=JL&background=random" },
      { id: "5", name: "Casey Taylor", role: "Frontend Developer", avatar: "https://ui-avatars.com/api/?name=CT&background=random" }
    ],
    skills: ["Node.js", "React", "AWS", "Firebase"],
    currentChallenges: [
      { id: "2", name: "Web3 Development Challenge", status: "Registered", deadline: "June 22, 2025" }
    ],
    pastChallenges: [],
    discussions: [
      { id: "disc3", author: "Jordan Lee", content: "Here's the architecture I'm thinking for our blockchain project.", timestamp: "3 days ago", replies: 2 }
    ],
    meetings: [
      { id: "meet3", title: "Planning Session", date: "April 28, 2025", time: "5:00 PM", location: "Virtual" }
    ]
  },
  "team3": {
    id: "team3",
    name: "Digital Innovators",
    description: "Your team focused on digital transformation and innovation.",
    createdAt: "April 15, 2025",
    createdBy: "currentUser", // This is your team - using the mock ID that matches current user
    members: [
      { id: "currentUser", name: "You", role: "Team Lead", avatar: "https://github.com/shadcn.png" },
      { id: "6", name: "Robin Chen", role: "Frontend Developer", avatar: "https://ui-avatars.com/api/?name=RC&background=random" },
      { id: "7", name: "Jamie Garcia", role: "UX Researcher", avatar: "https://ui-avatars.com/api/?name=JG&background=random" }
    ],
    skills: ["UI/UX", "React", "TypeScript", "Design Systems"],
    currentChallenges: [
      { id: "3", name: "UX Challenge 2025", status: "In Progress", deadline: "May 30, 2025" }
    ],
    pastChallenges: [],
    discussions: [
      { id: "disc4", author: "You", content: "I've started working on the wireframes for our app.", timestamp: "1 day ago", replies: 2 },
      { id: "disc5", author: "Robin Chen", content: "I can help with implementing the frontend components.", timestamp: "12 hours ago", replies: 1 }
    ],
    meetings: [
      { id: "meet4", title: "Weekly Sync", date: "April 24, 2025", time: "2:00 PM", location: "Virtual" }
    ]
  }
};

const TeamDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";
  const currentUserId = "currentUser"; // In a real app, this would be authState.user?.id
  
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<any>(null);
  const [userTeams, setUserTeams] = useState<string[]>([]);

  // Simulate fetching team data and user's teams
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would fetch from Supabase
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Set the team data based on ID
        if (id) {
          setTeam(teamData[id as keyof typeof teamData] || null);
        }
        
        // Get all teams where the user is a member or creator
        const userTeamIds = Object.keys(teamData).filter(teamId => {
          const team = teamData[teamId as keyof typeof teamData];
          return team.createdBy === currentUserId || 
                 team.members.some(member => member.id === currentUserId);
        });
        
        setUserTeams(userTeamIds);
      } catch (error) {
        console.error("Error fetching team data:", error);
        toast.error("Failed to load team data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, currentUserId]);

  // Show loading state
  if (loading) {
    return (
      <DashboardLayout
        title="Team Details"
        subtitle="View team information"
        userRole={userRole}
      >
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-semibold">Loading team details...</h2>
        </div>
      </DashboardLayout>
    );
  }
  
  // Show not found state
  if (!team) {
    return (
      <DashboardLayout
        title="Team Details"
        subtitle="View team information"
        userRole={userRole}
      >
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-4">Team not found</h2>
          <p className="text-muted-foreground mb-6">
            The team you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/my-teams")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Teams
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Show your teams if no specific team is selected
  if (!id && userTeams.length > 0) {
    navigate(`/team/${userTeams[0]}`);
    return null;
  }
  
  const handlePostDiscussion = () => {
    toast.success("Discussion post created!");
  };
  
  const handleScheduleMeeting = () => {
    toast.success("Meeting scheduled!");
  };

  // Check if this is the user's own team
  const isOwnTeam = team.createdBy === currentUserId;

  return (
    <DashboardLayout
      title="Team Details"
      subtitle="View and manage your team"
      userRole={userRole}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/my-teams")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Teams
        </Button>
      </div>
      
      {/* Team Header */}
      <div className="bg-gradient-to-r from-hackathon-purple/10 to-hackathon-blue/10 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-10 w-10 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{team.name}</h1>
              {isOwnTeam && (
                <Badge variant="outline" className="bg-primary/10">Your Team</Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-4">Team created on {team.createdAt}</p>
            <p className="mb-4">{team.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {team.skills.map(skill => (
                <Badge key={skill} variant="outline" className="bg-primary/5">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" className="hover:bg-primary/5">
                <Share2 className="mr-2 h-4 w-4" />
                Invite Members
              </Button>
              
              <Button variant="outline" className="hover:bg-primary/5" onClick={() => navigate(`/challenges`)}>
                <Trophy className="mr-2 h-4 w-4" />
                Find Challenges
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Details Tabs */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex md:gap-4 h-auto">
          <TabsTrigger value="members" className="py-2 text-sm md:text-base">Members</TabsTrigger>
          <TabsTrigger value="challenges" className="py-2 text-sm md:text-base">Challenges</TabsTrigger>
          <TabsTrigger value="discussions" className="py-2 text-sm md:text-base">Discussions</TabsTrigger>
          <TabsTrigger value="meetings" className="py-2 text-sm md:text-base">Meetings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Current team roster ({team.members.length} members)</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {team.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name} {member.id === currentUserId && "(You)"}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    {member.id !== currentUserId && (
                      <Button variant="ghost" size="sm">
                        Message
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Challenges</CardTitle>
              <CardDescription>Hackathons this team is participating in</CardDescription>
            </CardHeader>
            <CardContent>
              {team.currentChallenges.length > 0 ? (
                <div className="grid gap-4">
                  {team.currentChallenges.map(challenge => (
                    <div key={challenge.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{challenge.name}</p>
                          <p className="text-sm text-muted-foreground">Status: {challenge.status} • Due: {challenge.deadline}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/challenges/${challenge.id}`)}>
                        View Challenge
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">This team is not currently participating in any challenges</p>
                  <Button onClick={() => navigate('/challenges')}>
                    <Plus className="mr-2 h-4 w-4" /> Join a Challenge
                  </Button>
                </div>
              )}
            </CardContent>
            
            <CardHeader className="border-t pt-6">
              <CardTitle>Past Challenges</CardTitle>
              <CardDescription>Previous hackathons this team participated in</CardDescription>
            </CardHeader>
            <CardContent>
              {team.pastChallenges.length > 0 ? (
                <div className="grid gap-4">
                  {team.pastChallenges.map(challenge => (
                    <div key={challenge.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{challenge.name}</p>
                        <p className="text-sm text-muted-foreground">Result: {challenge.result}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No past challenges</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discussions" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Discussions</CardTitle>
                <CardDescription>Chat with your team members</CardDescription>
              </div>
              <Button size="sm" onClick={handlePostDiscussion}>
                <Plus className="h-4 w-4 mr-2" /> New Discussion
              </Button>
            </CardHeader>
            <CardContent>
              {team.discussions.length > 0 ? (
                <div className="grid gap-4">
                  {team.discussions.map(discussion => (
                    <div key={discussion.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{discussion.author}</span>
                        <span className="text-sm text-muted-foreground">{discussion.timestamp}</span>
                      </div>
                      <p className="mb-3">{discussion.content}</p>
                      <div className="flex justify-between items-center">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {discussion.replies} {discussion.replies === 1 ? 'Reply' : 'Replies'}
                        </Button>
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No discussions yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meetings" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Meetings</CardTitle>
                <CardDescription>Schedule and manage team meetings</CardDescription>
              </div>
              <Button size="sm" onClick={handleScheduleMeeting}>
                <Plus className="h-4 w-4 mr-2" /> Schedule Meeting
              </Button>
            </CardHeader>
            <CardContent>
              {team.meetings.length > 0 ? (
                <div className="grid gap-4">
                  {team.meetings.map(meeting => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CalendarClock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{meeting.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {meeting.date} at {meeting.time} • {meeting.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No upcoming meetings</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TeamDetailPage;
