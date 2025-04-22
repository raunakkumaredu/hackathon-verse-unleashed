
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { fetchUserHackathons, HackathonWithParticipation } from "@/services/hackathonService";
import { useAuth } from "@/contexts/AuthContext";

export const JoinedHackathons: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState<HackathonWithParticipation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadUserHackathons = async () => {
      if (!authState.user?.id) return;
      
      setIsLoading(true);
      try {
        const data = await fetchUserHackathons(authState.user.id);
        setHackathons(data);
      } catch (error) {
        console.error("Error loading user hackathons:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserHackathons();
  }, [authState.user?.id]);
  
  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Your Hackathons
          </CardTitle>
          <CardDescription>Loading your events...</CardDescription>
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
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Your Hackathons
          </CardTitle>
          <CardDescription>Your registered and saved events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-4">You haven't joined any hackathons yet</p>
            <Button onClick={() => navigate("/challenges")}>
              Browse Hackathons
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Your Hackathons
        </CardTitle>
        <CardDescription>Your registered and saved events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hackathons.map((event) => (
            <div 
              key={event.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => navigate(`/challenges/${event.id}`)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={event.logo} />
                <AvatarFallback>{event.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge variant={event.participationStatus === "Registered" ? "default" : "outline"}>
                    {event.participationStatus}
                  </Badge>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {event.startDate}
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
  );
};
