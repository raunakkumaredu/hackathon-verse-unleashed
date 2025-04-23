
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ChallengeNotFound from "@/components/challenge/ChallengeNotFound";
import ChallengeLoading from "@/components/challenge/ChallengeLoading";
import { ChallengeHeader } from "@/components/challenge/ChallengeHeader";
import { ChallengeActionButtons } from "@/components/challenge/ChallengeActionButtons";
import { ChallengeTabs } from "@/components/challenge/ChallengeTabs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ChallengeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [hackathon, setHackathon] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('hackathons')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        if (!data) {
          setError("Hackathon not found");
          return;
        }
        let participationStatus: "Registered" | "Interested" | undefined = undefined;
        if (authState.user?.id) {
          const { data: participation } = await supabase
            .from('hackathon_participants')
            .select('status')
            .eq('hackathon_id', id)
            .eq('user_id', authState.user.id)
            .single();
          if (participation) {
            // Accept both "Registered" and "Interested" as valid
            if (participation.status === "Registered" || participation.status === "Interested") {
              participationStatus = participation.status;
            }
          }
        }
        setHackathon({
          id: data.id,
          title: data.title,
          description: data.description,
          company: data.company,
          logo: data.logo,
          startDate: data.start_date,
          endDate: data.end_date,
          status: data.status,
          participants: data.participants,
          registrationOpen: data.registration_open,
          prizePool: data.prize_pool,
          tags: data.tags,
          difficulty: data.difficulty,
          organizerId: data.organizer_id,
          createdAt: data.created_at,
          participationStatus,
        });
      } catch (err) {
        console.error("Error fetching hackathon:", err);
        setError("Failed to load hackathon details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHackathonDetails();
  }, [id, authState.user?.id]);

  const handleRegister = async () => {
    if (!authState.user) {
      toast.error("Please login to register for this hackathon");
      navigate("/login");
      return;
    }
    if (!hackathon) return;
    setRegistering(true);
    try {
      const { error } = await supabase
        .from("hackathon_participants")
        .upsert([
          {
            hackathon_id: hackathon.id,
            user_id: authState.user.id,
            status: "Registered",
          },
        ]);
      if (error) {
        toast.error("Failed to register for this hackathon");
      } else {
        setHackathon((prev: any) => prev && ({
          ...prev,
          participationStatus: "Registered",
          participants: prev.participants + 1
        }));
        toast.success("Registered successfully!");
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleMarkInterested = async () => {
    if (!authState.user) {
      toast.error("Please login to mark interest in this hackathon");
      navigate("/login");
      return;
    }
    if (!hackathon) return;
    setRegistering(true);
    try {
      const { error } = await supabase
        .from("hackathon_participants")
        .upsert([
          {
            hackathon_id: hackathon.id,
            user_id: authState.user.id,
            status: "Interested",
          },
        ]);
      if (error) {
        toast.error("Failed to mark interest");
      } else {
        setHackathon((prev: any) => prev && ({
          ...prev,
          participationStatus: "Interested",
        }));
        toast.success("Interest marked!");
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleJoinTeam = () => {
    if (!hackathon) return;
    navigate(`/teams?hackathon=${hackathon.id}`);
  };

  if (isLoading) {
    return <ChallengeLoading userRole={authState.user?.role} />;
  }

  if (error || !hackathon) {
    return (
      <ChallengeNotFound
        userRole={authState.user?.role}
        error={error}
        onBack={() => navigate("/challenges")}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          className="flex items-center text-sm px-3 py-2 border rounded hover:bg-muted transition mb-4"
          onClick={() => navigate("/challenges")}
        >
          ← Back to Challenges
        </button>
      </div>
      <Card className="glass-card bg-gradient-to-br from-primary/5 to-transparent mb-8">
        <CardContent className="pt-6">
          <ChallengeHeader
            logo={hackathon.logo}
            company={hackathon.company}
            status={hackathon.status}
            participationStatus={hackathon.participationStatus}
            difficulty={hackathon.difficulty}
            title={hackathon.title}
            description={hackathon.description}
            participants={hackathon.participants}
            startDate={hackathon.startDate}
            endDate={hackathon.endDate}
            prizePool={hackathon.prizePool}
            tags={hackathon.tags}
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <ChallengeActionButtons
            participationStatus={hackathon.participationStatus}
            registering={registering}
            registrationOpen={hackathon.registrationOpen}
            onRegister={handleRegister}
            onMarkInterested={handleMarkInterested}
            onJoinTeam={handleJoinTeam}
            hackathonId={hackathon.id}
          />
        </CardFooter>
      </Card>
      <ChallengeTabs hackathon={hackathon} />
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          className="flex items-center text-sm px-3 py-2 border rounded hover:bg-muted transition"
          onClick={() => navigate("/challenges")}
        >
          ← Back to Challenges
        </button>
        {hackathon.participationStatus !== "Registered" && (
          <button
            type="button"
            className="ml-4 px-4 py-2 bg-primary text-white rounded disabled:opacity-70"
            onClick={handleRegister}
            disabled={registering || !hackathon.registrationOpen}
          >
            {registering ? "Processing..." : "Register Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
