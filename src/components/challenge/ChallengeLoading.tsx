
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UserRole } from "@/types/auth";

interface ChallengeLoadingProps {
  userRole: UserRole | undefined;
}

const ChallengeLoading: React.FC<ChallengeLoadingProps> = ({ userRole }) => (
  <DashboardLayout
    title="Loading Challenge"
    subtitle="Please wait..."
    userRole={userRole}
  >
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  </DashboardLayout>
);

export default ChallengeLoading;
