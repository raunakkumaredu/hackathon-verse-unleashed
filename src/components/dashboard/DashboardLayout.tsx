
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, Trophy, 
  BookOpen, BarChart3, Calendar, MessageSquare, 
  Settings, HelpCircle, Bell, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  href, 
  isActive = false, 
  onClick 
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-12 px-4 py-2 text-left",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-gray-600 dark:text-gray-300"
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={cn(
          "w-10 h-10 flex items-center justify-center rounded-md mr-3",
          isActive ? "bg-primary/10" : "bg-transparent"
        )}>
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </div>
    </Button>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  userRole: 'student' | 'company' | 'college' | 'mentor';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  userRole
}) => {
  const navigate = useNavigate();

  // Common navigation items
  const commonNavItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", href: `/${userRole}-dashboard` },
    { icon: <Trophy className="h-5 w-5" />, label: "Challenges", href: "/challenges" },
    { icon: <Calendar className="h-5 w-5" />, label: "Events", href: "/events" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Messages", href: "/messages" },
  ];

  // Role-specific navigation items
  const roleSpecificNavItems = {
    student: [
      { icon: <Users className="h-5 w-5" />, label: "Teams", href: "/teams" },
      { icon: <BookOpen className="h-5 w-5" />, label: "Resources", href: "/resources" },
      { icon: <BarChart3 className="h-5 w-5" />, label: "My Progress", href: "/progress" },
    ],
    company: [
      { icon: <BarChart3 className="h-5 w-5" />, label: "Analytics", href: "/analytics" },
      { icon: <Users className="h-5 w-5" />, label: "Talent Pool", href: "/talent" },
      { icon: <Trophy className="h-5 w-5" />, label: "Hosted Events", href: "/hosted-events" },
    ],
    college: [
      { icon: <Users className="h-5 w-5" />, label: "Students", href: "/students" },
      { icon: <Trophy className="h-5 w-5" />, label: "College Competitions", href: "/competitions" },
      { icon: <BarChart3 className="h-5 w-5" />, label: "Analytics", href: "/analytics" },
    ],
    mentor: [
      { icon: <Users className="h-5 w-5" />, label: "Mentees", href: "/mentees" },
      { icon: <BookOpen className="h-5 w-5" />, label: "Resources", href: "/resources" },
      { icon: <Calendar className="h-5 w-5" />, label: "Availability", href: "/availability" },
    ],
  };

  const navItems = [...commonNavItems, ...roleSpecificNavItems[userRole]];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-hackathon-dark/30">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-hackathon-dark border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
        {/* Logo */}
        <div 
          className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-gradient-to-r from-hackathon-purple to-hackathon-blue rounded-md"></div>
            <div className="absolute inset-0.5 bg-white dark:bg-hackathon-dark rounded-md flex items-center justify-center">
              <span className="text-hackathon-purple font-bold text-xs">HV</span>
            </div>
          </div>
          <span className="ml-3 font-bold text-lg gradient-text">
            HackathonVerse
          </span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {navItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={item.href === location.pathname}
                onClick={() => navigate(item.href || "/")}
              />
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 px-2">
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              onClick={() => navigate("/settings")}
            />
            <SidebarItem
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help & Support"
              onClick={() => navigate("/support")}
            />
          </div>
        </nav>
        
        {/* User */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
            </div>
            <ThemeToggle className="ml-auto h-8 w-8" />
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 bg-white dark:bg-hackathon-dark border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-md mx-4 md:mx-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..."
                className="pl-10 bg-gray-50 dark:bg-hackathon-dark/60 border-none"
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <ThemeToggle className="md:hidden" />
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-hackathon-dark/30 p-6">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">{title}</h1>
            {subtitle && <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};
