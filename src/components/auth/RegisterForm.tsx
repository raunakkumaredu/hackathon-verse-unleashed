
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckIcon, UserRound, Building, School, Award } from "lucide-react";
import { UserRole } from "@/types/auth";

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
import { Checkbox } from "@/components/ui/checkbox";

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("student");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // In a real application, this would be an API call
    try {
      console.log("Registering with:", values, "Role:", role);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect to role-specific onboarding
      switch (role) {
        case "student":
          navigate("/student-onboarding");
          break;
        case "company":
          navigate("/company-onboarding");
          break;
        case "college":
          navigate("/college-onboarding");
          break;
        case "mentor":
          navigate("/mentor-onboarding");
          break;
        default:
          navigate("/onboarding");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // In a real app we'd show an error toast
    } finally {
      setIsLoading(false);
    }
  };

  // Get role-specific label and icon
  const getRoleDetails = () => {
    switch (role) {
      case "student":
        return { 
          label: "Student Registration", 
          icon: <UserRound className="h-5 w-5 animate-pulse mr-2" /> 
        };
      case "company":
        return { 
          label: "Company Registration", 
          icon: <Building className="h-5 w-5 animate-pulse mr-2" /> 
        };
      case "college":
        return { 
          label: "College Registration", 
          icon: <School className="h-5 w-5 animate-pulse mr-2" /> 
        };
      case "mentor":
        return { 
          label: "Mentor Registration", 
          icon: <Award className="h-5 w-5 animate-pulse mr-2" /> 
        };
      default:
        return { 
          label: "Register", 
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
          Create your account to join our platform
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showConfirmPassword ? "text" : "password"}
                          className="pr-10 bg-white/50 dark:bg-black/20"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showConfirmPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I accept the{" "}
                        <a
                          href="/terms"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          terms of service
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          privacy policy
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full btn-primary mt-6" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Create Account <CheckIcon className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Log in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};
