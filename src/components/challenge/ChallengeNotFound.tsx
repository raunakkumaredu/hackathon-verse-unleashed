
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import { UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";

interface ChallengeNotFoundProps {
  userRole: UserRole | undefined;
  error?: string | null;
  onBack: () => void;
}

const ChallengeNotFound: React.FC<ChallengeNotFoundProps> = ({ userRole, error, onBack }) => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout
      title="Challenge Not Found"
      subtitle="The challenge you're looking for doesn't exist"
      userRole={userRole}
    >
      <Alert variant="destructive" className="my-8">
        <AlertDescription>{error || "Hackathon not found"}</AlertDescription>
      </Alert>
      
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Challenges
        </Button>
        
        <Button variant="default" onClick={() => navigate("/")} className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Go to Dashboard
        </Button>
        
        <Button variant="secondary" onClick={() => navigate("/challenges")} className="flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Browse All Challenges
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default ChallengeNotFound;
