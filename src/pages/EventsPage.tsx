
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Calendar, Bell, Plus, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const EventsPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";
  const canCreateEvents = userRole === "company" || userRole === "college";
  const navigate = useNavigate();
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);

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
  
  const handleSubscribeToCalendar = () => {
    // In a real app, this would generate and download an .ics file with all events
    // Generate an ICS for all events
    const icsData = generateCalendarICS(upcomingEvents);
    downloadICSFile(icsData, "hackathon-events.ics");
    
    toast.success("Events calendar downloaded successfully!");
    setCalendarDialogOpen(false);
  };
  
  // Function to download events calendar
  const handleAddToCalendar = (event) => {
    const icsData = generateEventICS(event);
    downloadICSFile(icsData, `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`);
    toast.success(`"${event.title}" added to your calendar`);
  };
  
  // Function to generate ICS for a single event
  const generateEventICS = (event) => {
    // Convert date and time to proper format
    const [month, day, year] = event.date.split(", ")[0].split(" ");
    const monthNum = getMonthNumber(month);
    const [hour, minute] = event.time.split(":");
    const ampm = minute.slice(-2);
    const hour24 = convertTo24Hour(parseInt(hour), ampm);
    const minuteNum = parseInt(minute);
    
    const startDate = new Date(parseInt(year), monthNum - 1, parseInt(day), hour24, minuteNum);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour for duration
    
    return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
  };
  
  // Function to generate ICS for multiple events
  const generateCalendarICS = (events) => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
`;

    events.forEach(event => {
      // Convert date and time to proper format
      const [month, day, year] = event.date.split(", ")[0].split(" ");
      const monthNum = getMonthNumber(month);
      const [hour, minute] = event.time.split(":");
      const ampm = minute.slice(-2);
      const hour24 = convertTo24Hour(parseInt(hour), ampm);
      const minuteNum = parseInt(minute);
      
      const startDate = new Date(parseInt(year), monthNum - 1, parseInt(day), hour24, minuteNum);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour for duration
      
      icsContent += `BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
`;
    });
    
    icsContent += "END:VCALENDAR";
    return icsContent;
  };
  
  // Helper function to convert month name to number
  const getMonthNumber = (month) => {
    const months = {
      "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
      "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
    };
    return months[month];
  };
  
  // Helper function to convert 12-hour to 24-hour format
  const convertTo24Hour = (hour, ampm) => {
    if (ampm.includes("PM") && hour !== 12) {
      return hour + 12;
    }
    if (ampm.includes("AM") && hour === 12) {
      return 0;
    }
    return hour;
  };

  // Format date for ICS file
  const formatDateForICS = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00Z`;
  };
  
  // Download ICS file
  const downloadICSFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="flex gap-2">
            {canCreateEvents && (
              <Button 
                className="hover:scale-105 transition-transform animate-fade-in"
                onClick={() => navigate("/challenges/create")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Event
              </Button>
            )}
            <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
              <Button 
                variant="outline" 
                className="hover:scale-105 transition-transform animate-fade-in"
                onClick={() => setCalendarDialogOpen(true)}
              >
                <Bell className="mr-2 h-4 w-4" />
                Subscribe to Calendar
              </Button>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Subscribe to Events Calendar</DialogTitle>
                  <DialogDescription>
                    Download the calendar file (.ics) to add all events to your preferred calendar app.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/40">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">How to use the calendar file</h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Download the .ics file</li>
                        <li>Open your calendar application (Google Calendar, Apple Calendar, Outlook, etc.)</li>
                        <li>Import or open the downloaded file</li>
                        <li>All events will be added to your calendar</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCalendarDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubscribeToCalendar}>
                    Download Calendar (.ics)
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-primary/10 hover:scale-105 transition-transform"
                    onClick={() => handleAddToCalendar(event)}
                  >
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
        
        {/* Call to action for companies and colleges */}
        {canCreateEvents && (
          <div className="mt-8 flex justify-center">
            <Card className="w-full max-w-2xl bg-gradient-to-r from-hackathon-purple/20 to-hackathon-blue/20 border-hackathon-purple/30">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">Host Your Own Event</h3>
                <p className="text-muted-foreground mb-4">
                  Create and manage hackathons, workshops, networking sessions and more.
                </p>
                <Button 
                  onClick={() => navigate("/challenges/create")}
                  className="bg-gradient-to-r from-hackathon-purple to-hackathon-blue text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Event
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;
