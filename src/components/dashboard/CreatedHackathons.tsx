
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Plus } from "lucide-react";
import { fetchCreatedHackathons, HackathonWithParticipation, deleteHackathon } from "@/services/hackathonService";
import { useAuth } from "@/contexts/AuthContext";
import { HackathonCard } from "../hackathon/HackathonCard";

export const CreatedHackathons: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState<HackathonWithParticipation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadCreatedHackathons = async () => {
      if (!authState.user?.id) return;
      
      setIsLoading(true);
      try {
        const data = await fetchCreatedHackathons(authState.user.id);
        setHackathons(data);
      } catch (error) {
        console.error("Error loading created hackathons:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCreatedHackathons();
  }, [authState.user?.id]);
  
  const handleDelete = async () => {
    if (!authState.user?.id) return;
    
    try {
      const data = await fetchCreatedHackathons(authState.user.id);
      setHackathons(data);
    } catch (error) {
      console.error("Error reloading hackathons after delete:", error);
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Your Created Challenges
          </CardTitle>
          <CardDescription>Loading your created hackathons...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (hackathons.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Your Created Challenges
          </CardTitle>
          <CardDescription>Challenges and hackathons you have created</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">You haven't created any hackathons yet</p>
          <Button onClick={() => navigate("/challenges/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Your Created Challenges
            </CardTitle>
            <CardDescription>Challenges and hackathons you have created</CardDescription>
          </div>
          <Button size="sm" onClick={() => navigate("/challenges/create")}>
            <Plus className="h-4 w-4 mr-1" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {hackathons.slice(0, 2).map((hackathon) => (
            <HackathonCard 
              key={hackathon.id} 
              hackathon={hackathon}
              onDelete={handleDelete}
              showDeleteButton={true}
            />
          ))}
        </div>
      </CardContent>
      {hackathons.length > 2 && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => navigate("/challenges")}>
            View All Created Challenges
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
