
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Users, Plus, Code, Info, ChevronRight, X, Trash2, UserPlus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock teams data
const mockTeams = [
  {
    id: "team1",
    name: "Code Wizards",
    description: "A team focused on creating innovative solutions using AI and machine learning.",
    members: [
      { id: "1", name: "Alex Johnson", role: "Team Lead", avatar: "https://ui-avatars.com/api/?name=AJ&background=random" },
      { id: "2", name: "Sam Smith", role: "UX Designer", avatar: "https://ui-avatars.com/api/?name=SS&background=random" },
      { id: "3", name: "Taylor Reed", role: "Data Scientist", avatar: "https://ui-avatars.com/api/?name=TR&background=random" }
    ],
    skills: ["React", "Python", "Machine Learning", "UI/UX"],
    hackathonId: "1",
    hackathonName: "AI Innovation Challenge",
    projectName: "AI-Powered Learning Assistant",
    createdAt: new Date("2025-04-05")
  },
  {
    id: "team2",
    name: "Tech Titans",
    description: "Solving cutting-edge problems with innovative tech solutions.",
    members: [
      { id: "4", name: "Jordan Lee", role: "Backend Developer", avatar: "https://ui-avatars.com/api/?name=JL&background=random" },
      { id: "5", name: "Casey Taylor", role: "Frontend Developer", avatar: "https://ui-avatars.com/api/?name=CT&background=random" }
    ],
    skills: ["Node.js", "React", "AWS", "Firebase"],
    hackathonId: "2",
    hackathonName: "Web3 Development Challenge",
    projectName: "Decentralized Health Records",
    createdAt: new Date("2025-04-10")
  }
];

// Mock team invitations
const mockInvitations = [
  {
    id: "inv1",
    teamName: "Data Explorers",
    inviter: "Riley Morgan",
    role: "Data Analyst",
    hackathonName: "Big Data Challenge",
    sentAt: new Date("2025-04-18")
  },
  {
    id: "inv2",
    teamName: "Cloud Native",
    inviter: "Jamie Wilson",
    role: "DevOps Engineer",
    hackathonName: "Cloud Innovation Hackathon",
    sentAt: new Date("2025-04-20")
  }
];

const MyTeamsPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [teamSkills, setTeamSkills] = useState<string[]>([]);
  
  const handleCreateTeam = () => {
    if (!newTeamName.trim()) {
      toast.error("Team name is required");
      return;
    }
    
    // In a real app, this would call an API to create a team
    toast.success(`Team "${newTeamName}" created successfully!`);
    setShowDialog(false);
    
    // Reset form
    setNewTeamName("");
    setNewTeamDescription("");
    setTeamSkills([]);
  };
  
  const handleAddSkill = () => {
    if (!skillsInput.trim()) return;
    
    if (!teamSkills.includes(skillsInput.trim())) {
      setTeamSkills([...teamSkills, skillsInput.trim()]);
    }
    
    setSkillsInput("");
  };
  
  const handleRemoveSkill = (skill: string) => {
    setTeamSkills(teamSkills.filter(s => s !== skill));
  };
  
  const handleAcceptInvitation = (invId: string) => {
    // In a real app, this would call an API to accept the invitation
    toast.success("Team invitation accepted!");
  };
  
  const handleRejectInvitation = (invId: string) => {
    // In a real app, this would call an API to reject the invitation
    toast.success("Team invitation declined.");
  };
  
  const handleLeaveTeam = (teamId: string) => {
    // In a real app, this would call an API to leave the team
    toast.success("You have left the team.");
  };
  
  // Filter teams based on search query
  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <DashboardLayout
      title="My Teams"
      subtitle="Manage your teams and invitations"
      userRole={authState.user?.role}
    >
      <Tabs defaultValue="myteams">
        <TabsList className="mb-6">
          <TabsTrigger value="myteams" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> My Teams
          </TabsTrigger>
          <TabsTrigger value="invitations" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Invitations
            {mockInvitations.length > 0 && (
              <span className="ml-1 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                {mockInvitations.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="myteams">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search your teams" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Create Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create a New Team</DialogTitle>
                  <DialogDescription>
                    Form a team to participate in hackathons together
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input 
                      id="team-name" 
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Enter your team name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team-description">Team Description</Label>
                    <Textarea 
                      id="team-description" 
                      value={newTeamDescription}
                      onChange={(e) => setNewTeamDescription(e.target.value)}
                      placeholder="Describe your team and what you hope to accomplish" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Skills & Technologies</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {teamSkills.map((skill) => (
                        <Badge key={skill} className="flex items-center gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {skill}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        placeholder="Add skills (e.g., React)"
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                      />
                      <Button type="button" size="sm" onClick={handleAddSkill}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                  <Button onClick={handleCreateTeam}>Create Team</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Team List Section */}
          {filteredTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTeams.map((team) => (
                <Card key={team.id} className="glass-card overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between">
                      {team.name}
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/teams/${team.id}/settings`)}>
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Team Settings</span>
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {team.members.length} team member{team.members.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {team.description}
                    </p>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Team Members</h4>
                      <div className="flex -space-x-2 overflow-hidden">
                        {team.members.map((member) => (
                          <Avatar key={member.id} className="border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                    
                    {team.projectName && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Current Project</h4>
                        <div className="flex items-center">
                          <Code className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{team.projectName}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {team.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-primary/5">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-muted/50 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleLeaveTeam(team.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Leave
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => navigate(`/teams/${team.id}`)}
                    >
                      View Team <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Info className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No teams found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  You haven't created or joined any teams yet, or no teams matched your search.
                </p>
                <Button onClick={() => setShowDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Team
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Team Building Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Find Team Members</h2>
            
            <Card className="bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle>Team Matching</CardTitle>
                <CardDescription>
                  Find the perfect teammates for your next hackathon
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-background/60 hover:bg-background/80 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Search className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Skill-Based Matching</h3>
                      <p className="text-sm text-muted-foreground">
                        Find members with complementary skills
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/60 hover:bg-background/80 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Browse Participants</h3>
                      <p className="text-sm text-muted-foreground">
                        View profiles of available participants
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/60 hover:bg-background/80 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Project Interests</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect based on shared interests
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Button className="w-full md:w-auto" onClick={() => navigate("/networking")}>
                  Start Team Matching
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="invitations">
          <h2 className="text-xl font-semibold mb-4">Team Invitations</h2>
          
          {mockInvitations.length > 0 ? (
            <div className="grid gap-4">
              {mockInvitations.map(invitation => (
                <Card key={invitation.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{invitation.teamName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {invitation.inviter} invited you to join as {invitation.role}
                        </p>
                        <p className="text-sm">
                          For <span className="font-medium">{invitation.hackathonName}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Sent {invitation.sentAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleRejectInvitation(invitation.id)}>
                          Decline
                        </Button>
                        <Button onClick={() => handleAcceptInvitation(invitation.id)}>
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col items-center py-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">You have no pending invitations</h3>
                    <p className="text-muted-foreground mt-1">
                      When someone invites you to join their team, it will appear here
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => navigate("/networking")}>
                    Expand Your Network
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MyTeamsPage;
