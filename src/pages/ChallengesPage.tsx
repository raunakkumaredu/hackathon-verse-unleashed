import React, { useState, useEffect } from "react";
import { Search, Filter, Trophy, Clock, Users, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { HackathonCard } from "@/components/hackathon/HackathonCard";
import { fetchAllHackathons, HackathonWithParticipation } from "@/services/hackathonService";
import MessageModal from "@/components/ui/MessageModal";
import { toast } from "sonner";

const ChallengesPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [hackathons, setHackathons] = useState<HackathonWithParticipation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const userRole = authState.user?.role || "student";
  const canCreateChallenges = userRole === "company" || userRole === "college";
  
  useEffect(() => {
    const loadHackathons = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllHackathons(authState.user?.id);
        setHackathons(data);
        setError(null);
      } catch (err) {
        console.error("Error loading hackathons:", err);
        setError("Failed to load hackathons. Please try again later.");
        toast.error("Failed to load hackathons");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHackathons();
  }, [authState.user?.id]);
  
  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = 
      hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesDifficulty = filterDifficulty === "all" || hackathon.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    const matchesStatus = filterStatus === "all" || hackathon.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const handleDeleteHackathon = () => {
    fetchAllHackathons(authState.user?.id).then(data => {
      setHackathons(data);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    });
  };

  return (
    <DashboardLayout
      title="Challenges & Hackathons"
      subtitle="Discover upcoming hackathons and challenges"
      userRole={userRole}
    >
      <MessageModal
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        title="Success"
      />
      
      {canCreateChallenges && (
        <div className="mb-6">
          <Button 
            onClick={() => navigate("/challenges/create")} 
            className="bg-gradient-to-r from-hackathon-purple to-hackathon-blue text-white hover:from-hackathon-purple/90 hover:to-hackathon-blue/90 animate-pulse-gentle hover:animate-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Challenge
          </Button>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search challenges by title, description or tags" 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 md:w-auto">
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Difficulty" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => fetchAllHackathons(authState.user?.id).then(setHackathons)}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map(hackathon => (
            <HackathonCard 
              key={hackathon.id} 
              hackathon={hackathon}
              onDelete={handleDeleteHackathon}
              showDeleteButton={canCreateChallenges && hackathon.organizerId === authState.user?.id}
            />
          ))}
        </div>
      )}
      
      {!isLoading && !error && filteredHackathons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Try adjusting your search or filters to find more hackathons and challenges.
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-primary" />
          Featured Challenge
        </h2>
        
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="https://ui-avatars.com/api/?name=GP&background=random" />
                  <AvatarFallback>GP</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">Global Innovation Hackathon 2025</CardTitle>
                  <CardDescription>By Global Partners Alliance</CardDescription>
                </div>
              </div>
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p>
              Join the world's largest virtual hackathon with participants from over 50 countries. 
              Build solutions to address global challenges in healthcare, climate change, education, and more.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-medium">September 10-17, 2025</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Prize Pool</span>
                <span className="font-medium">$25,000 + Incubation</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Participants</span>
                <span className="font-medium">1000+ expected</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Global</Badge>
              <Badge variant="outline">Innovation</Badge>
              <Badge variant="outline">SDGs</Badge>
              <Badge variant="outline">Healthcare</Badge>
              <Badge variant="outline">Climate</Badge>
              <Badge variant="outline">Education</Badge>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button size="lg" className="w-full md:w-auto" onClick={() => navigate("/challenges/featured")}>
              Learn More & Pre-Register
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {canCreateChallenges && (
        <div className="mt-8 flex justify-end">
          <Button 
            size="lg"
            className="animate-pulse-gentle"
            onClick={() => navigate("/challenges/create")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Challenge
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ChallengesPage;
