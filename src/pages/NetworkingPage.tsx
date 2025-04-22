
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { toast } from "sonner";

const NetworkingPage = () => {
  const { authState } = useAuth();
  
  return (
    <DashboardLayout
      title="Networking"
      subtitle="Connect with other participants, mentors, and companies"
      userRole={authState.user?.role}
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Users className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Networking Hub</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Find teammates, mentors, and industry connections to enhance your hackathon experience.
        </p>
        <Button size="lg" onClick={() => toast.info("Networking features coming soon!")}>
          Explore Connections
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NetworkingPage;
