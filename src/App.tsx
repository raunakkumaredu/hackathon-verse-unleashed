
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext"; 
import Landing from "./pages/Landing";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

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
                {/* Dashboard routes - these would be protected in a real app */}
                <Route path="student-dashboard" element={<StudentDashboard />} />
                <Route path="company-dashboard" element={<div className="container mx-auto py-20 px-4"><h1 className="text-3xl font-bold gradient-text">Company Dashboard</h1></div>} />
                <Route path="college-dashboard" element={<div className="container mx-auto py-20 px-4"><h1 className="text-3xl font-bold gradient-text">College Dashboard</h1></div>} />
                <Route path="mentor-dashboard" element={<div className="container mx-auto py-20 px-4"><h1 className="text-3xl font-bold gradient-text">Mentor Dashboard</h1></div>} />
                
                {/* Additional routes */}
                <Route path="challenges" element={<div className="container mx-auto py-20 px-4"><h1 className="text-3xl font-bold gradient-text">Challenges</h1></div>} />
                <Route path="teams" element={<div className="container mx-auto py-20 px-4"><h1 className="text-3xl font-bold gradient-text">Teams</h1></div>} />
                <Route path="resources" element={<div className="container mx-auto py-20 px-4"><h1 className="text-3xl font-bold gradient-text">Resources</h1></div>} />
                <Route path="leaderboard" element={<div className="container mx-auto py-20 px-4"><h1 className="text-3xl font-bold gradient-text">Leaderboard</h1></div>} />
                
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
