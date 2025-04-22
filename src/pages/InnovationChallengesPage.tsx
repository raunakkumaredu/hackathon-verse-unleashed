
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Search, Calendar, ArrowRight, Users, Sparkles, Check, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample open innovation challenges data
const innovationChallenges = [
  {
    id: "1",
    title: "Sustainable Urban Mobility Solutions",
    company: "GreenTech Mobility",
    companyLogo: "https://github.com/shadcn.png",
    description: "Develop innovative solutions to address urban transportation challenges with a focus on sustainability and accessibility.",
    deadline: "June 30, 2025",
    prize: "$10,000",
    categories: ["Sustainability", "Transportation", "Urban Planning"],
    skillsRequired: ["Mobile Development", "IoT", "UX Design"],
    participants: 87,
    status: "open",
    difficulty: "Advanced",
    featuredChallenge: true
  },
  {
    id: "2",
    title: "AI for Healthcare Diagnostics",
    company: "MediTech Solutions",
    companyLogo: "",
    description: "Create AI-powered tools to assist healthcare professionals in early disease detection and diagnosis.",
    deadline: "July 15, 2025",
    prize: "$12,000",
    categories: ["Healthcare", "AI/ML", "Data Science"],
    skillsRequired: ["Machine Learning", "Data Analysis", "Medical Knowledge"],
    participants: 64,
    status: "open",
    difficulty: "Expert",
    featuredChallenge: true
  },
  {
    id: "3",
    title: "Financial Inclusion Platform",
    company: "Global Finance Group",
    companyLogo: "",
    description: "Build innovative fintech solutions that promote financial inclusion for underserved communities.",
    deadline: "June 20, 2025",
    prize: "$8,000",
    categories: ["FinTech", "Social Impact", "Financial Services"],
    skillsRequired: ["Backend Development", "Security", "UX Design"],
    participants: 42,
    status: "open",
    difficulty: "Intermediate",
    featuredChallenge: false
  },
  {
    id: "4",
    title: "Smart Retail Experience",
    company: "RetailX",
    companyLogo: "",
    description: "Transform the in-store retail experience using technologies such as AR/VR, IoT, and AI.",
    deadline: "July 5, 2025",
    prize: "$9,500",
    categories: ["Retail", "AR/VR", "IoT"],
    skillsRequired: ["Frontend Development", "AR/VR Development", "UX Design"],
    participants: 56,
    status: "open",
    difficulty: "Intermediate",
    featuredChallenge: false
  },
  {
    id: "5",
    title: "Cybersecurity Challenge",
    company: "SecureTech",
    companyLogo: "",
    description: "Develop innovative solutions to protect against emerging cybersecurity threats and vulnerabilities.",
    deadline: "June 25, 2025",
    prize: "$11,000",
    categories: ["Cybersecurity", "Privacy", "Enterprise Software"],
    skillsRequired: ["Security", "Ethical Hacking", "System Architecture"],
    participants: 73,
    status: "open",
    difficulty: "Expert",
    featuredChallenge: false
  },
];

// Industry partner companies
const industryPartners = [
  { id: "1", name: "TechCorp", logo: "https://github.com/shadcn.png", challenges: 5 },
  { id: "2", name: "HealthInnovate", logo: "", challenges: 3 },
  { id: "3", name: "FinTech Solutions", logo: "", challenges: 2 },
  { id: "4", name: "GreenEarth", logo: "", challenges: 4 },
  { id: "5", name: "RetailX", logo: "", challenges: 2 },
  { id: "6", name: "MobileTech", logo: "", challenges: 3 },
];

const InnovationChallengesPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  const handleApplyToChallenge = (challengeId: string) => {
    toast.success("Successfully applied to the challenge!");
  };
  
  // Combine all categories from all challenges
  const allCategories = Array.from(
    new Set(
      innovationChallenges.flatMap((challenge) => challenge.categories)
    )
  );
  
  // Combine all difficulty levels
  const allDifficulties = Array.from(
    new Set(
      innovationChallenges.map((challenge) => challenge.difficulty)
    )
  );
  
  const filteredChallenges = innovationChallenges.filter((challenge) => {
    // Apply search filter
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = selectedCategory ? challenge.categories.includes(selectedCategory) : true;
    
    // Apply difficulty filter
    const matchesDifficulty = selectedDifficulty ? challenge.difficulty === selectedDifficulty : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  const featuredChallenges = filteredChallenges.filter(challenge => challenge.featuredChallenge);
  const regularChallenges = filteredChallenges.filter(challenge => !challenge.featuredChallenge);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <DashboardLayout
      title="Open Innovation Challenges"
      subtitle="Solve real-world problems with industry partners"
      userRole={authState.user?.role || "student"}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <Rocket className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Industry Innovation Challenges</h2>
            <p className="text-muted-foreground">Collaborate with leading companies on real-world problems</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-64 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((category) => (
                      <Badge 
                        key={category} 
                        className="cursor-pointer" 
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="mb-2 text-sm font-medium">Difficulty</p>
                  <div className="flex flex-wrap gap-2">
                    {allDifficulties.map((difficulty) => (
                      <Badge 
                        key={difficulty}
                        className="cursor-pointer"
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                      >
                        {difficulty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedDifficulty(null);
                      setSearchQuery("");
                    }}
                  >
                    <Filter className="h-4 w-4 mr-1" /> Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Industry Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industryPartners.map((partner) => (
                    <div key={partner.id} className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={partner.logo} />
                          <AvatarFallback>{getInitials(partner.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{partner.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {partner.challenges} challenges
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search challenges..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {featuredChallenges.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Featured Challenges</h3>
                <div className="grid grid-cols-1 gap-4">
                  {featuredChallenges.map((challenge) => (
                    <Card key={challenge.id} className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="default" className="mb-2">
                              Featured
                            </Badge>
                            <CardTitle>{challenge.title}</CardTitle>
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={challenge.companyLogo} />
                            <AvatarFallback>{getInitials(challenge.company)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <span>by {challenge.company}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {challenge.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                          <div className="bg-muted/50 p-2 rounded-md text-center">
                            <p className="text-xs text-muted-foreground">Prize</p>
                            <p className="font-semibold">{challenge.prize}</p>
                          </div>
                          <div className="bg-muted/50 p-2 rounded-md text-center">
                            <p className="text-xs text-muted-foreground">Deadline</p>
                            <p className="font-semibold">{challenge.deadline}</p>
                          </div>
                          <div className="bg-muted/50 p-2 rounded-md text-center">
                            <p className="text-xs text-muted-foreground">Participants</p>
                            <p className="font-semibold">{challenge.participants}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Categories</p>
                            <div className="flex flex-wrap gap-1">
                              {challenge.categories.map((category, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Required Skills</p>
                            <div className="flex flex-wrap gap-1">
                              {challenge.skillsRequired.map((skill, idx) => (
                                <Badge key={idx} variant="outline">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="text-sm">
                          <Badge variant="outline" className="font-normal">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <Button onClick={() => handleApplyToChallenge(challenge.id)}>
                          Apply Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">All Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regularChallenges.length > 0 ? (
                  regularChallenges.map((challenge) => (
                    <Card key={challenge.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <span>by {challenge.company}</span>
                            </CardDescription>
                          </div>
                          <Badge variant="outline">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-muted-foreground mb-4">
                          {challenge.description.length > 100
                            ? `${challenge.description.slice(0, 100)}...`
                            : challenge.description}
                        </p>
                        <div className="flex justify-between mb-3 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Deadline: {challenge.deadline}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">{challenge.prize}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {challenge.categories.map((category, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleApplyToChallenge(challenge.id)}
                        >
                          Apply
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <Rocket className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No challenges match your filters</h3>
                    <p className="text-muted-foreground mb-3">
                      Try adjusting your search or filters
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedDifficulty(null);
                        setSearchQuery("");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                Load More Challenges
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InnovationChallengesPage;
