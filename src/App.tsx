
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext"; 
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Landing from "./pages/Landing";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

// Dashboard placeholders until we create proper components
import CompanyDashboard from "./pages/CompanyDashboard";
import CollegeDashboard from "./pages/CollegeDashboard";
import MentorDashboard from "./pages/MentorDashboard";

// Feature Pages
import ProfilePage from "./pages/ProfilePage";
import ChallengesPage from "./pages/ChallengesPage";
import TeamsPage from "./pages/TeamsPage";
import ResourcesPage from "./pages/ResourcesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import CollaborationPage from "./pages/CollaborationPage";
import ProjectSubmissionPage from "./pages/ProjectSubmissionPage";
import NetworkingPage from "./pages/NetworkingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import EventTimelinePage from "./pages/EventTimelinePage";
import FeedbackPage from "./pages/FeedbackPage";
import MentorshipPage from "./pages/MentorshipPage";

// New Pages
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";
import ProgressPage from "./pages/ProgressPage";
import MessagesPage from "./pages/MessagesPage";
import SupportPage from "./pages/SupportPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Landing />} />
                
                {/* Auth Routes */}
                <Route path="login" element={
                  <div className="container mx-auto py-20 px-4">
                    <LoginForm />
                  </div>
                } />
                <Route path="register" element={
                  <div className="container mx-auto py-20 px-4">
                    <RegisterForm />
                  </div>
                } />
                
                {/* Protected Dashboard Routes */}
                <Route path="student-dashboard" element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="company-dashboard" element={
                  <ProtectedRoute allowedRoles={["company"]}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="college-dashboard" element={
                  <ProtectedRoute allowedRoles={["college"]}>
                    <CollegeDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="mentor-dashboard" element={
                  <ProtectedRoute allowedRoles={["mentor"]}>
                    <MentorDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Feature Routes */}
                <Route path="profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                
                <Route path="challenges" element={
                  <ProtectedRoute>
                    <ChallengesPage />
                  </ProtectedRoute>
                } />
                
                <Route path="teams" element={
                  <ProtectedRoute>
                    <TeamsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="resources" element={
                  <ProtectedRoute>
                    <ResourcesPage />
                  </ProtectedRoute>
                } />
                
                <Route path="leaderboard" element={
                  <ProtectedRoute>
                    <LeaderboardPage />
                  </ProtectedRoute>
                } />
                
                <Route path="collaboration" element={
                  <ProtectedRoute>
                    <CollaborationPage />
                  </ProtectedRoute>
                } />
                
                <Route path="project-submission" element={
                  <ProtectedRoute>
                    <ProjectSubmissionPage />
                  </ProtectedRoute>
                } />
                
                <Route path="networking" element={
                  <ProtectedRoute>
                    <NetworkingPage />
                  </ProtectedRoute>
                } />
                
                <Route path="analytics" element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="timeline" element={
                  <ProtectedRoute>
                    <EventTimelinePage />
                  </ProtectedRoute>
                } />
                
                <Route path="feedback" element={
                  <ProtectedRoute>
                    <FeedbackPage />
                  </ProtectedRoute>
                } />
                
                <Route path="mentorship" element={
                  <ProtectedRoute>
                    <MentorshipPage />
                  </ProtectedRoute>
                } />
                
                {/* New Routes */}
                <Route path="events" element={
                  <ProtectedRoute>
                    <EventsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="settings" element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="progress" element={
                  <ProtectedRoute>
                    <ProgressPage />
                  </ProtectedRoute>
                } />
                
                <Route path="messages" element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                } />
                
                <Route path="support" element={
                  <ProtectedRoute>
                    <SupportPage />
                  </ProtectedRoute>
                } />
                
                {/* Redirections */}
                <Route path="dashboard" element={<Navigate to="/student-dashboard" replace />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
