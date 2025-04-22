
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { toast } from "sonner";

const MentorshipPage = () => {
  const { authState } = useAuth();
  
  return (
    <DashboardLayout
      title="Mentorship Hub"
      subtitle="Connect with mentors or provide guidance as a mentor"
      userRole={authState.user?.role}
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Award className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Mentorship Program</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Connect with industry mentors or share your knowledge by becoming a mentor.
        </p>
        <Button size="lg" onClick={() => toast.info("Mentorship features coming soon!")}>
          Explore Opportunities
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default MentorshipPage;
