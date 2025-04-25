
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight, UserRound, Building, School, Award } from "lucide-react";
import { UserRole } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schema with validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, authState, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("student");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      switch (authState.user?.role) {
        case "student":
          navigate("/student-dashboard");
          break;
        case "company":
          navigate("/company-dashboard");
          break;
        case "college":
          navigate("/college-dashboard");
          break;
        case "mentor":
          navigate("/mentor-dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    }
  }, [isAuthenticated, authState.user, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await login(values.email, values.password, role);
      
      if (success) {
        toast.success(`Welcome back! Logged in as ${role}`);
        
        // Navigation is handled by the useEffect above
      } else {
        if (authState.error) {
          toast.error(authState.error);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get role-specific label and icon
  const getRoleDetails = () => {
    switch (role) {
      case "student":
        return { 
          label: "Student Login", 
          icon: <UserRound className="h-5 w-5 animate-bounce mr-2" /> 
        };
      case "company":
        return { 
          label: "Company Login", 
          icon: <Building className="h-5 w-5 animate-bounce mr-2" /> 
        };
      case "college":
        return { 
          label: "College Login", 
          icon: <School className="h-5 w-5 animate-bounce mr-2" /> 
        };
      case "mentor":
        return { 
          label: "Mentor Login", 
          icon: <Award className="h-5 w-5 animate-bounce mr-2" /> 
        };
      default:
        return { 
          label: "Login", 
          icon: null 
        };
    }
  };

  const roleDetails = getRoleDetails();

  return (
    <Card className="max-w-md w-full mx-auto glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center gradient-text">
          {roleDetails.icon} {roleDetails.label}
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" className="mb-6" onValueChange={(value) => setRole(value as UserRole)}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="student" className="flex items-center justify-center gap-2">
              <UserRound className="h-4 w-4" />
              <span className="hidden sm:inline">Student</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center justify-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="college" className="flex items-center justify-center gap-2">
              <School className="h-4 w-4" />
              <span className="hidden sm:inline">College</span>
            </TabsTrigger>
            <TabsTrigger value="mentor" className="flex items-center justify-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Mentor</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Form is the same for all tabs */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="sachin@example.com"
                        type="email"
                        autoComplete="email"
                        className="bg-white/50 dark:bg-black/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          className="pr-10 bg-white/50 dark:bg-black/20"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full btn-primary" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Log in <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center">
          <a href="/forgot-password" className="text-accent hover:underline">
            Forgot your password?
          </a>
        </div>
        <div className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:underline font-medium">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};
