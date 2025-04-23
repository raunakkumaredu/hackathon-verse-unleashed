
import React from "react";
import { Button } from "@/components/ui/button";

interface ChallengeActionButtonsProps {
  participationStatus: "Registered" | "Interested" | undefined;
  registering: boolean;
  registrationOpen: boolean;
  onRegister: () => void;
  onMarkInterested: () => void;
  onJoinTeam: () => void;
  hackathonId: string;
}

export const ChallengeActionButtons: React.FC<ChallengeActionButtonsProps> = ({
  participationStatus,
  registering,
  registrationOpen,
  onRegister,
  onMarkInterested,
  onJoinTeam,
  hackathonId,
}) => {
  if (participationStatus === "Registered") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled>
          ✓ Registered
        </Button>
        <Button variant="outline" className="flex-1" onClick={onJoinTeam}>
          Join or Create Team
        </Button>
      </div>
    );
  }
  if (participationStatus === "Interested") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button
          className="flex-1"
          disabled={registering || !registrationOpen}
          onClick={onRegister}
        >
          {registering ? "Processing..." : "Register Now"}
        </Button>
        <Button variant="outline" className="flex-1" disabled>
          Marked as Interested
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <Button
        className="flex-1"
        disabled={registering || !registrationOpen}
        onClick={onRegister}
      >
        {registering ? "Processing..." : "Register Now"}
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        disabled={registering}
        onClick={onMarkInterested}
      >
        {registering ? "Processing..." : "I'm Interested"}
      </Button>
    </div>
  );
};
