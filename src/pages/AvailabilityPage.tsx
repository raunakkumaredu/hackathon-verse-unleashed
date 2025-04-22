
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";

const AvailabilityPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "mentor";
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Sample time slots
  const morningSlots = [
    { id: "1", time: "9:00 AM - 10:00 AM", available: true },
    { id: "2", time: "10:00 AM - 11:00 AM", available: false },
    { id: "3", time: "11:00 AM - 12:00 PM", available: true },
  ];
  
  const afternoonSlots = [
    { id: "4", time: "1:00 PM - 2:00 PM", available: true },
    { id: "5", time: "2:00 PM - 3:00 PM", available: false },
    { id: "6", time: "3:00 PM - 4:00 PM", available: false },
    { id: "7", time: "4:00 PM - 5:00 PM", available: true },
  ];
  
  const eveningSlots = [
    { id: "8", time: "6:00 PM - 7:00 PM", available: false },
    { id: "9", time: "7:00 PM - 8:00 PM", available: true },
  ];

  return (
    <DashboardLayout
      title="Availability"
      subtitle="Set your mentoring schedule and manage your availability"
      userRole={userRole}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
                <span className="text-sm">Unavailable</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Session booked</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Morning Availability</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {morningSlots.map(slot => (
                <div 
                  key={slot.id}
                  className={`border rounded-md p-3 ${
                    slot.available ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <p className="font-medium">{slot.time}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={slot.available ? "default" : "outline"}>
                      {slot.available ? "Available" : "Unavailable"}
                    </Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Afternoon Availability</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {afternoonSlots.map(slot => (
                <div 
                  key={slot.id}
                  className={`border rounded-md p-3 ${
                    slot.available ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <p className="font-medium">{slot.time}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={slot.available ? "default" : "outline"}>
                      {slot.available ? "Available" : "Unavailable"}
                    </Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Evening Availability</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {eveningSlots.map(slot => (
                <div 
                  key={slot.id}
                  className={`border rounded-md p-3 ${
                    slot.available ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <p className="font-medium">{slot.time}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={slot.available ? "default" : "outline"}>
                      {slot.available ? "Available" : "Unavailable"}
                    </Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline">Cancel Changes</Button>
            <Button>Save Availability</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvailabilityPage;
