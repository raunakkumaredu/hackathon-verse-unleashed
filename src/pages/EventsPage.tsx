
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Calendar, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EventsPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";

  const upcomingEvents = [
    {
      id: 1,
      title: "Kickoff Ceremony",
      date: "May 1, 2025",
      time: "10:00 AM",
      description: "Official start of the hackathon season with special guest speakers.",
      category: "ceremony",
    },
    {
      id: 2,
      title: "Workshop: AI Integration",
      date: "May 5, 2025",
      time: "2:00 PM",
      description: "Learn how to integrate AI models into your hackathon projects.",
      category: "workshop",
    },
    {
      id: 3,
      title: "Team Formation Mixer",
      date: "May 8, 2025",
      time: "6:00 PM",
      description: "Network with other participants and form your dream team.",
      category: "networking",
    },
    {
      id: 4,
      title: "Technical Review Session",
      date: "May 15, 2025",
      time: "3:00 PM",
      description: "Get feedback on your technical approach from industry experts.",
      category: "review",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ceremony":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "workshop":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "networking":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "review":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <DashboardLayout
      title="Events Calendar"
      subtitle="Stay up-to-date with all hackathon events and activities"
      userRole={userRole}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 animate-pulse text-primary" />
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
          </div>
          <Button className="hover:scale-105 transition-transform animate-fade-in">
            <Bell className="mr-2 h-4 w-4" />
            Subscribe to Calendar
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge className={`${getCategoryColor(event.category)}`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {event.date} at {event.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:scale-105 transition-transform">
                    Add to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Monthly Calendar</h2>
          <Card className="p-6">
            <p className="text-center text-muted-foreground">Full calendar view coming soon...</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;
