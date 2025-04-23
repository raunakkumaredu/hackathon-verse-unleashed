import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Trophy, Users, ArrowLeft } from "lucide-react";
import { HackathonWithParticipation, joinHackathon } from "@/services/hackathonService";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ChallengeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [hackathon, setHackathon] = useState<HackathonWithParticipation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  
  useEffect(() => {
    const fetchHackathonDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('hackathons')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        if (!data) {
          setError("Hackathon not found");
          return;
        }
        
        let participationStatus = null;
        if (authState.user?.id) {
          const { data: participation } = await supabase
            .from('hackathon_participants')
            .select('status')
            .eq('hackathon_id', id)
            .eq('user_id', authState.user.id)
            .single();
            
          if (participation) {
            participationStatus = participation.status;
          }
        }
        
        setHackathon({
          id: data.id,
          title: data.title,
          description: data.description,
          company: data.company,
          logo: data.logo,
          startDate: data.start_date,
          endDate: data.end_date,
          status: data.status,
          participants: data.participants,
          registrationOpen: data.registration_open,
          prizePool: data.prize_pool,
          tags: data.tags,
          difficulty: data.difficulty,
          organizerId: data.organizer_id,
          createdAt: data.created_at,
          participationStatus: participationStatus as "Registered" | "Interested" | undefined
        });
      } catch (err) {
        console.error("Error fetching hackathon:", err);
        setError("Failed to load hackathon details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHackathonDetails();
  }, [id, authState.user?.id]);

  const handleRegister = async () => {
    if (!authState.user) {
      toast.error("Please login to register for this hackathon");
      navigate("/login");
      return;
    }
    
    if (!hackathon) return;
    
    setRegistering(true);
    try {
      const success = await joinHackathon(hackathon.id, authState.user.id, "Registered");
      if (success) {
        setHackathon({
          ...hackathon,
          participationStatus: "Registered",
          participants: hackathon.participants + 1
        });
      }
    } finally {
      setRegistering(false);
    }
  };
  
  const handleMarkInterested = async () => {
    if (!authState.user) {
      toast.error("Please login to mark interest in this hackathon");
      navigate("/login");
      return;
    }
    
    if (!hackathon) return;
    
    setRegistering(true);
    try {
      const success = await joinHackathon(hackathon.id, authState.user.id, "Interested");
      if (success) {
        setHackathon({
          ...hackathon,
          participationStatus: "Interested"
        });
      }
    } finally {
      setRegistering(false);
    }
  };
  
  const renderRegistrationButtons = () => {
    const participationStatus = hackathon?.participationStatus;

    if (participationStatus === "Registered") {
      return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled>
            ✓ Registered
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate(`/teams?hackathon=${hackathon?.id}`)}>
            Join or Create Team
          </Button>
        </div>
      );
    }

    if (participationStatus === "Interested") {
      return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button 
            className="flex-1" 
            disabled={registering || !hackathon?.registrationOpen}
            onClick={handleRegister}
          >
            {registering ? "Processing..." : "Register Now"}
          </Button>
          <Button variant="outline" className="flex-1" disabled>
            Marked as Interested
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button 
          className="flex-1" 
          disabled={registering || !hackathon?.registrationOpen}
          onClick={handleRegister}
        >
          {registering ? "Processing..." : "Register Now"}
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          disabled={registering}
          onClick={handleMarkInterested}
        >
          {registering ? "Processing..." : "I'm Interested"}
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout 
        title="Loading Challenge" 
        subtitle="Please wait..." 
        userRole={authState.user?.role}
      >
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !hackathon) {
    return (
      <DashboardLayout 
        title="Challenge Not Found" 
        subtitle="The challenge you're looking for doesn't exist" 
        userRole={authState.user?.role}
      >
        <Alert variant="destructive" className="my-8">
          <AlertDescription>{error || "Hackathon not found"}</AlertDescription>
        </Alert>
        <Button 
          variant="outline" 
          onClick={() => navigate("/challenges")} 
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Button>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout 
      title={hackathon?.title || "Challenge Details"} 
      subtitle={`Organized by ${hackathon?.company || "Unknown"}`} 
      userRole={authState.user?.role}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/challenges")} 
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Button>
      </div>
      
      <Card className="glass-card bg-gradient-to-br from-primary/5 to-transparent mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={hackathon.logo} />
                <AvatarFallback>{hackathon.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant={hackathon.status === "Active" ? "default" : 
                      hackathon.status === "Completed" ? "secondary" : "outline"}>
                  {hackathon.status}
                </Badge>
                
                {hackathon.participationStatus && (
                  <Badge variant="secondary" className="bg-primary/10">
                    {hackathon.participationStatus}
                  </Badge>
                )}
                
                <Badge variant="outline" className="bg-primary/5">
                  {hackathon.difficulty}
                </Badge>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{hackathon.title}</h2>
              <p className="text-muted-foreground mb-4">{hackathon.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{hackathon.startDate}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{hackathon.endDate}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{hackathon.prizePool}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{hackathon.participants}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {hackathon.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          {renderRegistrationButtons()}
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Overview</CardTitle>
              <CardDescription>Learn more about this hackathon challenge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{hackathon.description}</p>
              
              <h3 className="text-lg font-semibold mt-6">About the Organizer</h3>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={hackathon.logo} />
                  <AvatarFallback>{hackathon.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{hackathon.company}</h4>
                  <p className="text-sm text-muted-foreground">
                    {hackathon.company} is organizing this challenge to foster innovation and 
                    identify talented developers for potential collaboration.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-6">Expected Outcomes</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>A working prototype demonstrating your solution</li>
                <li>Source code repository with documentation</li>
                <li>A 5-minute presentation explaining your approach</li>
                <li>A brief writeup of challenges faced and how you overcame them</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
              <CardDescription>Timeline and important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start border-b pb-4">
                  <div className="min-w-[120px] text-primary">
                    <p className="font-bold">{hackathon.startDate}</p>
                    <p className="text-sm">9:00 AM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Kickoff Event</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Welcome address and challenge announcement
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start border-b pb-4">
                  <div className="min-w-[120px] text-primary">
                    <p className="font-bold">{hackathon.startDate}</p>
                    <p className="text-sm">1:00 PM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Team Formation</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Find teammates and start collaborating
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start border-b pb-4">
                  <div className="min-w-[120px] text-primary">
                    <p className="font-bold">{hackathon.endDate}</p>
                    <p className="text-sm">2:00 PM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Final Submissions</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Deadline for project submissions
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="min-w-[120px] text-primary">
                    <p className="font-bold">{hackathon.endDate}</p>
                    <p className="text-sm">5:00 PM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Judging and Awards</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Project presentations and winner announcement
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Rules & Guidelines</CardTitle>
              <CardDescription>Participation requirements and judging criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Eligibility</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Open to all registered participants</li>
                <li>Teams of 2-5 members are allowed</li>
                <li>Members can be from different organizations</li>
                <li>All team members must be registered on the platform</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Submission Guidelines</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>All code must be original or properly attributed</li>
                <li>Projects must be submitted before the deadline</li>
                <li>Include documentation and setup instructions</li>
                <li>Submit through the platform's project submission form</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Judging Criteria</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><span className="font-medium">Innovation (25%)</span>: Originality and creativity of the solution</li>
                <li><span className="font-medium">Functionality (25%)</span>: How well the solution works</li>
                <li><span className="font-medium">Technical Complexity (20%)</span>: Appropriate use of technology</li>
                <li><span className="font-medium">User Experience (15%)</span>: Design and usability</li>
                <li><span className="font-medium">Presentation (15%)</span>: Quality of demo and explanation</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Helpful materials and support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Documentation & APIs</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>API documentation is available in the Resources section</li>
                <li>Sample code and starter projects are provided</li>
                <li>Access to test environments will be granted upon registration</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Support Channels</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Discord channel for real-time support</li>
                <li>Office hours with mentors (schedule in Calendar)</li>
                <li>FAQ section for common questions</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Downloads</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Challenge Brief PDF
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  API Documentation
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Starter Templates
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Judging Rubric
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate("/challenges")} 
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Button>

        {hackathon.participationStatus !== "Registered" && (
          <Button 
            onClick={handleRegister} 
            disabled={
              registering || 
              !hackathon.registrationOpen
            }
          >
            {registering ? "Processing..." : "Register Now"}
          </Button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ChallengeDetailPage;
