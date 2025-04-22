import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, MessageSquare } from "lucide-react";
import MessageModal from "@/components/ui/MessageModal";
import Modal from "@/components/ui/Modal";

const MenteesPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "mentor";
  const [modal, setModal] = useState<{ type?: "message" | "schedule", mentee?: any } | null>(null);

  const mentees = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "https://ui-avatars.com/api/?name=AJ&background=random",
      project: "AI Assistant App",
      nextSession: "May 5, 2025",
      progress: 65,
      skills: ["React", "Node.js", "UI Design"],
    },
    {
      id: "2",
      name: "Jordan Taylor",
      avatar: "https://ui-avatars.com/api/?name=JT&background=random",
      project: "Sustainability Tracker",
      nextSession: "May 8, 2025",
      progress: 40,
      skills: ["Python", "Data Science", "API Integration"],
    },
    {
      id: "3",
      name: "Morgan Lee",
      avatar: "https://ui-avatars.com/api/?name=ML&background=random",
      project: "Health Monitoring System",
      nextSession: "May 10, 2025",
      progress: 75,
      skills: ["Flutter", "Firebase", "UX Research"],
    },
    {
      id: "4",
      name: "Casey Smith",
      avatar: "https://ui-avatars.com/api/?name=CS&background=random",
      project: "Educational Platform",
      nextSession: "May 15, 2025",
      progress: 30,
      skills: ["Angular", "MongoDB", "AWS"],
    }
  ];

  return (
    <DashboardLayout
      title="Mentees"
      subtitle="Manage and track your mentees' progress"
      userRole={userRole}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Your Mentees</h2>
            <p className="text-muted-foreground">Currently mentoring {mentees.length} students</p>
          </div>
          <Button>Add New Mentee</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mentees.map((mentee) => (
            <Card key={mentee.id} className="hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={mentee.avatar} />
                      <AvatarFallback>{mentee.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{mentee.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Project: {mentee.project}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Project Progress</span>
                    <span className="text-sm font-medium">{mentee.progress}%</span>
                  </div>
                  <Progress value={mentee.progress} className="h-2" />
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {mentee.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Next session: {mentee.nextSession}</span>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={() => setModal({ type: "schedule", mentee })}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button size="sm" onClick={() => setModal({ type: "message", mentee })}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {modal?.type === "message" && (
          <MessageModal open onClose={() => setModal(null)} title={`Message ${modal.mentee?.name}`} />
        )}
        {modal?.type === "schedule" && (
          <Modal open onClose={() => setModal(null)} title={`Schedule with ${modal.mentee?.name}`}>
            <div className="text-center p-4">Scheduling functionality coming soon!</div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MenteesPage;
