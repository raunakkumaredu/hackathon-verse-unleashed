
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Check, Trophy, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample judging criteria
const judgingCriteria = [
  { id: 1, name: "Innovation", weight: 25, description: "Uniqueness and creativity of the solution" },
  { id: 2, name: "Technical Complexity", weight: 25, description: "Complexity and technical implementation" },
  { id: 3, name: "User Experience", weight: 20, description: "Usability and design of the solution" },
  { id: 4, name: "Impact", weight: 20, description: "Potential to solve real-world problems" },
  { id: 5, name: "Presentation", weight: 10, description: "Quality of presentation and demo" },
];

// Sample submissions for evaluation
const submissions = [
  {
    id: "1",
    projectName: "EcoTrack",
    teamName: "GreenTech",
    teamMembers: [
      { id: "1", name: "Amrita kumari", avatar: "https://github.com/shadcn.png" },
      { id: "2", name: "Samantha Singh", avatar: "" },
      { id: "3", name: "Singh sher", avatar: "" },
    ],
    category: "Sustainability",
    description: "A mobile app that helps users track and reduce their carbon footprint through gamification.",
    submissionDate: "April 28, 2025",
    scores: [
      { criteriaId: 1, score: 8.5 },
      { criteriaId: 2, score: 7.0 },
      { criteriaId: 3, score: 9.0 },
      { criteriaId: 4, score: 8.0 },
      { criteriaId: 5, score: 7.5 },
    ],
    status: "Evaluated",
    overallScore: 8.0,
    feedback: "Excellent concept with strong execution. Consider improving the data visualization to make insights more actionable."
  },
  {
    id: "2",
    projectName: "MedConnect",
    teamName: "HealthTech Heroes",
    teamMembers: [
      { id: "4", name: "Jessica Williams", avatar: "" },
      { id: "5", name: "David Park", avatar: "" },
    ],
    category: "Healthcare",
    description: "A platform connecting patients with medical specialists for remote consultations in underserved areas.",
    submissionDate: "April 29, 2025",
    scores: [
      { criteriaId: 1, score: 9.0 },
      { criteriaId: 2, score: 7.5 },
      { criteriaId: 3, score: 8.0 },
      { criteriaId: 4, score: 9.5 },
      { criteriaId: 5, score: 8.5 },
    ],
    status: "Evaluated",
    overallScore: 8.5,
    feedback: "Strong social impact with good technical implementation. Consider expanding language options for more accessibility."
  },
  {
    id: "3",
    projectName: "CyberShield",
    teamName: "Defenders",
    teamMembers: [
      { id: "6", name: "Ryan Garcia", avatar: "" },
      { id: "7", name: "Emma Wilson", avatar: "" },
      { id: "8", name: "Thomas Brown", avatar: "" },
    ],
    category: "Cybersecurity",
    description: "An AI-powered security tool that detects and prevents phishing attacks in real-time.",
    submissionDate: "April 30, 2025",
    scores: [],
    status: "Pending Review",
    overallScore: null,
    feedback: ""
  },
];

const JudgingSystemPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>("1");
  const isJudge = authState.user?.role === "mentor" || authState.user?.role === "company";
  
  const handleViewSubmission = (submissionId: string) => {
    setSelectedSubmission(submissionId);
  };
  
  const handleSubmitEvaluation = () => {
    toast.success("Evaluation submitted successfully");
  };
  
  const currentSubmission = submissions.find(s => s.id === selectedSubmission);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const calculateWeightedScore = (submission) => {
    if (!submission.scores || submission.scores.length === 0) return null;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    submission.scores.forEach(score => {
      const criteria = judgingCriteria.find(c => c.id === score.criteriaId);
      if (criteria) {
        totalWeightedScore += score.score * criteria.weight;
        totalWeight += criteria.weight;
      }
    });
    
    return totalWeight > 0 ? (totalWeightedScore / totalWeight).toFixed(1) : null;
  };

  return (
    <DashboardLayout
      title="Judging System"
      subtitle="Evaluate submissions and manage the judging process"
      userRole={authState.user?.role || "student"}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <Award className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Judging Dashboard</h2>
            <p className="text-muted-foreground">Review and evaluate hackathon project submissions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Submissions</CardTitle>
                <CardDescription>Select a submission to review</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {submissions.map((submission) => (
                    <React.Fragment key={submission.id}>
                      <div 
                        className={`p-3 cursor-pointer hover:bg-muted transition-colors ${selectedSubmission === submission.id ? 'bg-muted' : ''}`} 
                        onClick={() => handleViewSubmission(submission.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{submission.projectName}</h4>
                            <p className="text-sm text-muted-foreground">by {submission.teamName}</p>
                          </div>
                          <Badge variant={submission.status === "Evaluated" ? "outline" : "secondary"}>
                            {submission.status}
                          </Badge>
                        </div>
                        {submission.status === "Evaluated" && (
                          <div className="mt-2 flex items-center">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                              <span className="font-medium">{submission.overallScore}</span>
                              <span className="text-muted-foreground text-sm">/10</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <Separator />
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2">
                <Button variant="outline" size="sm">
                  View All Submissions
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {currentSubmission && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{currentSubmission.projectName}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span>by {currentSubmission.teamName}</span>
                        <span className="text-muted-foreground">• {currentSubmission.category}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {currentSubmission.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="w-full">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                      <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-4 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-1">Project Description</h3>
                        <p className="text-muted-foreground">{currentSubmission.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Submission Date</h3>
                        <p className="text-muted-foreground">{currentSubmission.submissionDate}</p>
                      </div>
                      
                      {currentSubmission.status === "Evaluated" && (
                        <div>
                          <h3 className="font-semibold mb-2">Overall Rating</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-5 w-5 ${star <= Math.round(currentSubmission.overallScore / 2) 
                                    ? 'text-yellow-500 fill-yellow-500' 
                                    : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="font-medium text-lg">{currentSubmission.overallScore}</span>
                            <span className="text-muted-foreground">/10</span>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="evaluation" className="mt-4 space-y-4">
                      {currentSubmission.status === "Evaluated" ? (
                        <>
                          <h3 className="font-semibold">Evaluation Criteria</h3>
                          <div className="space-y-3">
                            {judgingCriteria.map((criteria) => {
                              const scoreEntry = currentSubmission.scores.find(
                                (s) => s.criteriaId === criteria.id
                              );
                              const score = scoreEntry ? scoreEntry.score : null;
                              
                              return (
                                <div key={criteria.id}>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">{criteria.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {criteria.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">{criteria.weight}%</Badge>
                                      {score !== null && (
                                        <span className="font-medium">{score}/10</span>
                                      )}
                                    </div>
                                  </div>
                                  <Progress 
                                    value={score * 10} 
                                    className="h-2 mt-1" 
                                  />
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="pt-2">
                            <h3 className="font-semibold mb-1">Feedback</h3>
                            <p className="text-muted-foreground">
                              {currentSubmission.feedback}
                            </p>
                          </div>
                        </>
                      ) : (
                        isJudge ? (
                          <div className="space-y-4">
                            <h3 className="font-semibold">Evaluation Criteria</h3>
                            <div className="space-y-3">
                              {judgingCriteria.map((criteria) => (
                                <div key={criteria.id}>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">{criteria.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {criteria.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">{criteria.weight}%</Badge>
                                    </div>
                                  </div>
                                  <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                                      <Button 
                                        key={score} 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-8 h-8 p-0"
                                      >
                                        {score}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-2">Feedback</h3>
                              <textarea 
                                className="w-full min-h-[100px] p-2 border rounded-md"
                                placeholder="Provide constructive feedback for the team..."
                              />
                            </div>
                            
                            <div className="flex justify-end">
                              <Button onClick={handleSubmitEvaluation}>
                                Submit Evaluation
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <Award className="h-12 w-12 text-muted-foreground mb-3" />
                            <h3 className="text-lg font-medium">Evaluation Pending</h3>
                            <p className="text-muted-foreground max-w-md">
                              This submission is still under review by our judges. Check back soon for results and feedback.
                            </p>
                          </div>
                        )
                      )}
                    </TabsContent>
                    
                    <TabsContent value="team" className="mt-4">
                      <h3 className="font-semibold mb-3">Team Members</h3>
                      <div className="space-y-2">
                        {currentSubmission.teamMembers.map((member) => (
                          <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                            <Avatar>
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JudgingSystemPage;
