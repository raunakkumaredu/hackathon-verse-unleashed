
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const ProjectSubmissionPage = () => {
  const { authState } = useAuth();
  
  return (
    <DashboardLayout
      title="Project Submission"
      subtitle="Submit and manage your hackathon projects"
      userRole={authState.user?.role}
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Upload className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Project Submission Portal</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Submit your hackathon projects, get feedback, and track judging progress.
        </p>
        <Button size="lg" onClick={() => toast.info("Project submission functionality coming soon!")}>
          Get Started
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default ProjectSubmissionPage;
