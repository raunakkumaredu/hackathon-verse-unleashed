
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Calendar, Trophy, ArrowLeft, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createHackathon } from "@/services/hackathonService";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type Status = "Upcoming" | "Active" | "Completed";

const CreateChallengePage = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState(authState.user?.organization || "");
  const [prizePool, setPrizePool] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [difficulty, setDifficulty] = useState<Difficulty>("Intermediate");
  const [status, setStatus] = useState<Status>("Upcoming");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  
  const handleAddTag = () => {
    if (!tag.trim()) return;
    if (!tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
    }
    setTag("");
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      description.trim() !== "" &&
      companyName.trim() !== "" &&
      prizePool.trim() !== "" &&
      startDate !== undefined &&
      endDate !== undefined &&
      tags.length > 0
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid() || !authState.user) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const hackathonData = {
        title,
        description,
        company: companyName,
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName.substring(0, 2))}&background=random`,
        startDate: startDate?.toISOString().split('T')[0] || "",
        endDate: endDate?.toISOString().split('T')[0] || "",
        status,
        participants: 0,
        registrationOpen: true,
        prizePool,
        tags,
        difficulty,
        organizerId: authState.user.id
      };
      
      const hackathonId = await createHackathon(hackathonData, authState.user);
      
      if (hackathonId) {
        navigate(`/challenges/${hackathonId}`);
      }
    } catch (error) {
      console.error("Error creating hackathon:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const userRole = authState.user?.role;
  const canCreateChallenges = userRole === "company" || userRole === "college";
  
  if (!canCreateChallenges) {
    return (
      <DashboardLayout
        title="Unauthorized"
        subtitle="You do not have permission to create challenges"
        userRole={userRole}
      >
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-4 text-muted-foreground">
              Only companies and educational institutions can create hackathon challenges.
            </p>
            <Button variant="outline" onClick={() => navigate("/challenges")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Challenges
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout
      title="Create Challenge"
      subtitle="Set up a new hackathon or innovation challenge"
      userRole={userRole}
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
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Challenge Details
            </CardTitle>
            <CardDescription>Basic information about your hackathon</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Challenge Title</Label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title for your challenge"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Challenge Description</Label>
              <Textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this challenge is about and what participants will be working on"
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyName">Organization Name</Label>
              <Input 
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Name of the organizing company or institution"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prize">Prize Pool</Label>
                <Input 
                  id="prize"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  placeholder="e.g. $5,000, Internship opportunities..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select 
                  value={difficulty} 
                  onValueChange={(value) => setDifficulty(value as Difficulty)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker 
                  date={startDate} 
                  setDate={setStartDate}
                />
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <DatePicker 
                  date={endDate} 
                  setDate={setEndDate}
                  disabled={(date) => !startDate || date < startDate}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Event Status</Label>
              <Select 
                value={status} 
                onValueChange={(value) => setStatus(value as Status)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Challenge Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((t) => (
                  <Badge key={t} className="flex items-center gap-1">
                    {t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {t}</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Add technologies, topics, etc."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" size="sm" onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add tag</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Challenge Settings</CardTitle>
            <CardDescription>Additional configuration for your hackathon</CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground">
              Advanced challenge settings will be enabled in a future update. 
              For now, challenges will be created with default settings.
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate("/challenges")}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Challenge"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  );
};

export default CreateChallengePage;
