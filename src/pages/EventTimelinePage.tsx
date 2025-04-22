
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { toast } from "sonner";

const EventTimelinePage = () => {
  const { authState } = useAuth();
  
  return (
    <DashboardLayout
      title="Event Timeline"
      subtitle="Track hackathon schedules and important deadlines"
      userRole={authState.user?.role}
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Clock className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Interactive Timeline</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Never miss important deadlines with our interactive event timeline.
        </p>
        <Button size="lg" onClick={() => toast.info("Timeline features coming soon!")}>
          View Timeline
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default EventTimelinePage;
