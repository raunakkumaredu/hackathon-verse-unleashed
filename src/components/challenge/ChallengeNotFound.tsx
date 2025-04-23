
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UserRole } from "@/types/auth";

interface ChallengeNotFoundProps {
  userRole: UserRole | undefined;
  error?: string | null;
  onBack: () => void;
}

const ChallengeNotFound: React.FC<ChallengeNotFoundProps> = ({ userRole, error, onBack }) => (
  <DashboardLayout
    title="Challenge Not Found"
    subtitle="The challenge you're looking for doesn't exist"
    userRole={userRole}
  >
    <Alert variant="destructive" className="my-8">
      <AlertDescription>{error || "Hackathon not found"}</AlertDescription>
    </Alert>
    <Button variant="outline" onClick={onBack} className="flex items-center">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Challenges
    </Button>
  </DashboardLayout>
);

export default ChallengeNotFound;
