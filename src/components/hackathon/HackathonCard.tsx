import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Clock, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HackathonWithParticipation } from '@/services/hackathonService';
import { useAuth } from "@/contexts/AuthContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { deleteHackathon } from '@/services/hackathonService';

interface HackathonCardProps {
  hackathon: HackathonWithParticipation;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({ 
  hackathon, 
  onDelete,
  showDeleteButton = false
}) => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  
  const handleDelete = async () => {
    if (!authState.user) return;
    
    const success = await deleteHackathon(hackathon.id, authState.user.id);
    if (success && onDelete) {
      onDelete();
    }
  };
  
  const getButtonText = () => {
    if (hackathon.participationStatus === "Registered") {
      return "View Details";
    }
    
    if (hackathon.participationStatus === "Interested") {
      return "Register Now";
    }
    
    return hackathon.registrationOpen ? "Register Now" : "View Details";
  };

  return (
    <Card className="glass-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={hackathon.logo} />
            <AvatarFallback>{hackathon.company.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <Badge 
              variant={hackathon.status === "Active" ? "default" : 
                      hackathon.status === "Completed" ? "secondary" : "outline"}
            >
              {hackathon.status}
            </Badge>
            
            {hackathon.participationStatus && (
              <Badge variant="secondary" className="bg-primary/10">
                {hackathon.participationStatus}
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg">{hackathon.title}</CardTitle>
        <CardDescription className="flex items-center">
          By {hackathon.company}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {hackathon.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{hackathon.startDate}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{hackathon.participants} participants</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{hackathon.prizePool}</span>
          </div>
          <div className="flex items-center">
            <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">
              {hackathon.difficulty}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 pt-2">
          {hackathon.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          className="w-full" 
          onClick={() => navigate(`/challenges/${hackathon.id}`)}
        >
          {getButtonText()}
        </Button>
        
        {showDeleteButton && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Hackathon</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{hackathon.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};
