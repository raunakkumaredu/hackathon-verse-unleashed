
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, X, LayoutDashboard, Code, Users, Trophy, 
  BookOpen, BarChart4, Calendar, User, Bell, Search 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get auth state from AuthContext
  const { authState, logout, isAuthenticated } = useAuth();
  
  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Navigation items
  const navigationItems = [
    { name: "Home", path: "/", icon: null },
    { name: "Challenges", path: "/challenges", icon: null },
    { name: "Teams", path: "/teams", icon: null },
    { name: "Resources", path: "/resources", icon: null },
    { name: "Leaderboard", path: "/leaderboard", icon: null },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 dark:bg-hackathon-dark/80 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer hover:scale-105 transition-transform" 
          onClick={() => navigate("/")}
        >
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 bg-gradient-to-r from-hackathon-purple to-hackathon-blue rounded-lg animate-pulse"></div>
            <div className="absolute inset-0.5 bg-white dark:bg-hackathon-dark rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-hackathon-purple" />
            </div>
          </div>
          <div className="ml-2 font-bold text-xl">
            <span className="gradient-text">Hackathon</span>
            <span className="ml-1 opacity-80">Verse</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={cn(
                "px-3 py-2 rounded-lg transition-all hover:scale-105",
                location.pathname === item.path 
                  ? "bg-primary/90 text-white shadow-sm" 
                  : "hover:bg-primary/10"
              )}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Button>
          ))}
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle className="h-9 w-9" />
          
          {isAuthenticated && authState.user ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:scale-110 transition-transform"
                onClick={() => navigate("/notifications")}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-hackathon-orange rounded-full animate-ping"></span>
                <span className="absolute top-1 right-1 h-2 w-2 bg-hackathon-orange rounded-full"></span>
              </Button>
              
              <Avatar
                className="h-9 w-9 cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:scale-110"
                onClick={() => navigate("/profile")}
              >
                <AvatarImage src={authState.user.avatar} alt={authState.user.name} />
                <AvatarFallback className="bg-hackathon-blue text-white">
                  {authState.user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {/* Logout button */}
              <Button
                variant="ghost"
                className="hover:bg-red-500/10 hover:text-red-500 transition-colors hover:scale-105"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden sm:flex hover:scale-105 transition-transform"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button
                className="btn-primary hover:scale-105 transition-transform"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </>
          )}
          
          {/* Mobile menu toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:scale-110 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-hackathon-dark shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "justify-start px-3 py-6 h-auto hover:scale-105 transition-transform",
                    location.pathname === item.path && "bg-primary/10"
                  )}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.name}
                </Button>
              ))}
              
              {!isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="justify-start hover:scale-105 transition-transform"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-5 w-5" />
                  Log in
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="justify-start text-red-500 hover:bg-red-500/10 hover:scale-105 transition-transform"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-5 w-5" />
                  Log out
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
