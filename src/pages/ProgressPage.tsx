
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ProgressPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";

  const modules = [
    { 
      id: 1, 
      name: "Getting Started", 
      progress: 100, 
      status: "completed",
      skills: ["Orientation", "Team Building", "Hackathon Basics"] 
    },
    { 
      id: 2, 
      name: "Project Planning", 
      progress: 75, 
      status: "in-progress",
      skills: ["Ideation", "Requirements", "Wireframing"] 
    },
    { 
      id: 3, 
      name: "Development", 
      progress: 40, 
      status: "in-progress",
      skills: ["Front-end", "Back-end", "API Integration"] 
    },
    { 
      id: 4, 
      name: "Testing", 
      progress: 10, 
      status: "just-started",
      skills: ["Quality Assurance", "User Testing", "Bug Fixing"] 
    },
    { 
      id: 5, 
      name: "Presentation", 
      progress: 0, 
      status: "not-started",
      skills: ["Pitch Deck", "Demo", "Q&A Preparation"] 
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "just-started":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "just-started":
        return "Just Started";
      case "not-started":
        return "Not Started";
      default:
        return status;
    }
  };

  const calculateOverallProgress = () => {
    const total = modules.reduce((sum, module) => sum + module.progress, 0);
    return Math.round(total / modules.length);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <DashboardLayout title="My Progress" subtitle="Track your learning journey and skill development" userRole={userRole}>
      <div className="space-y-6 animate-fade-in">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Hackathon Completion</span>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => (
            <Card 
              key={module.id} 
              className={`hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-fade-in ${
                module.status === "completed" ? "border-green-200 dark:border-green-900" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                  <Badge className={getStatusColor(module.status)}>
                    {getStatusText(module.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {module.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage;
