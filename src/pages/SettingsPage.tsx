
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SettingsPage = () => {
  const { authState, updateUserProfile } = useAuth();
  const userRole = authState.user?.role || "student";

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    
    updateUserProfile({
      name,
    });
    
    toast.success("Profile settings updated successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };

  const handleSavePrivacy = () => {
    toast.success("Privacy settings updated!");
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences" userRole={userRole}>
      <div className="animate-fade-in">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 animate-fade-in hover:scale-[1.01] transition-transform">
            <TabsTrigger value="profile" className="hover:scale-105 transition-transform">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="hover:scale-105 transition-transform">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="hover:scale-105 transition-transform">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your public profile information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={authState.user?.name || ""} 
                      className="hover:border-primary focus-visible:ring-2 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={authState.user?.email || ""} 
                      disabled 
                      className="bg-muted cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                  </div>

                  <Button type="submit" className="hover:scale-105 transition-transform">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose when and how you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notifications" className="flex-grow">Email notifications</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-notifications" className="flex-grow">Push notifications</Label>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="event-reminders" className="flex-grow">Event reminders</Label>
                    <Switch id="event-reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="marketing-emails" className="flex-grow">Marketing emails</Label>
                    <Switch id="marketing-emails" />
                  </div>
                  <Button onClick={handleSaveNotifications} className="hover:scale-105 transition-transform">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your visibility and data sharing preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="public-profile" className="flex-grow">Make profile public</Label>
                    <Switch id="public-profile" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-email" className="flex-grow">Show email to team members</Label>
                    <Switch id="show-email" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="share-activity" className="flex-grow">Share activity with other users</Label>
                    <Switch id="share-activity" />
                  </div>
                  <Button onClick={handleSavePrivacy} className="hover:scale-105 transition-transform">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
