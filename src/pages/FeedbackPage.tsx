
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

const FeedbackPage = () => {
  const { authState } = useAuth();
  
  return (
    <DashboardLayout
      title="Feedback & Polls"
      subtitle="Share your thoughts and participate in community polls"
      userRole={authState.user?.role}
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <MessageSquare className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Feedback Center</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Share your feedback on hackathons and participate in community polls.
        </p>
        <Button size="lg" onClick={() => toast.info("Feedback features coming soon!")}>
          Get Started
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;
