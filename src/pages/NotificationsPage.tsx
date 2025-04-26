
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CalendarCheck, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NotificationsPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";

  const notifications = [
    {
      id: "1",
      title: "Team invitation received",
      description: "Alex invited you to join 'Tech Titans'",
      time: "2 hours ago",
      type: "team",
      read: false,
    },
    {
      id: "2",
      title: "New challenge announced",
      description: "Check out the Climate Tech Challenge",
      time: "1 day ago",
      type: "event",
      read: false,
    },
    {
      id: "3",
      title: "Upcoming hackathon reminder",
      description: "AI Innovation Hackathon starts in 3 days",
      time: "2 days ago",
      type: "reminder",
      read: true,
    },
    {
      id: "4",
      title: "New mentor available",
      description: "Sachin Sachin is available for mentorship",
      time: "3 days ago",
      type: "mentor",
      read: true,
    },
    {
      id: "5",
      title: "Project feedback received",
      description: "Your team received feedback from TechCorp",
      time: "1 week ago",
      type: "feedback",
      read: true,
    }
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case "team":
        return <User className="h-5 w-5 text-blue-500" />;
      case "event":
      case "reminder":
        return <CalendarCheck className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <DashboardLayout
      title="Notifications"
      subtitle="Stay updated with all your hackathon activities"
      userRole={userRole}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">All Notifications</h2>
            <p className="text-muted-foreground">You have {notifications.filter(n => !n.read).length} unread notifications</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Mark all as read</Button>
            <Button variant="outline" size="sm">Clear all</Button>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-shadow ${!notification.read ? "border-l-4 border-primary" : ""}`}
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div className="bg-muted rounded-full p-2">
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    {!notification.read && (
                      <Badge>New</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
