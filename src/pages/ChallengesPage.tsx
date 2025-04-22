
import React, { useState } from "react";
import { Search, Filter, Trophy, Clock, Users, Calendar, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock hackathon data
const hackathonData = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    description: "Build the next generation of AI tools that solve real-world problems",
    company: "TechCorp",
    logo: "https://ui-avatars.com/api/?name=TC&background=random",
    startDate: "May 15, 2025",
    endDate: "May 17, 2025",
    status: "Upcoming",
    participants: 45,
    registrationOpen: true,
    prizePool: "$5,000",
    tags: ["AI", "Machine Learning", "Innovation"],
    difficulty: "Intermediate",
  },
  {
    id: "2",
    title: "Blockchain Revolution Hackathon",
    description: "Create decentralized applications that leverage blockchain technology",
    company: "CryptoInc",
    logo: "https://ui-avatars.com/api/?name=CI&background=random",
    startDate: "Jun 20, 2025",
    endDate: "Jun 22, 2025",
    status: "Upcoming",
    participants: 32,
    registrationOpen: true,
    prizePool: "$3,500",
    tags: ["Blockchain", "Web3", "Crypto"],
    difficulty: "Advanced",
  },
  {
    id: "3",
    title: "IoT Smart City Challenge",
    description: "Design IoT solutions to make cities smarter and more efficient",
    company: "ConnectTech",
    logo: "https://ui-avatars.com/api/?name=CT&background=random",
    startDate: "Jul 5, 2025",
    endDate: "Jul 7, 2025",
    status: "Upcoming",
    participants: 28,
    registrationOpen: true,
    prizePool: "$4,000",
    tags: ["IoT", "Smart Cities", "Hardware"],
    difficulty: "Intermediate",
  },
  {
    id: "4",
    title: "Sustainability Hackathon",
    description: "Create innovative solutions to environmental challenges",
    company: "GreenTech",
    logo: "https://ui-avatars.com/api/?name=GT&background=random",
    startDate: "Aug 10, 2025",
    endDate: "Aug 12, 2025",
    status: "Upcoming",
    participants: 21,
    registrationOpen: true,
    prizePool: "$3,000",
    tags: ["Sustainability", "CleanTech", "Environment"],
    difficulty: "Beginner",
  },
  {
    id: "5",
    title: "Web3 Development Challenge",
    description: "Build the next generation of decentralized web applications",
    company: "DecentralCorp",
    logo: "https://ui-avatars.com/api/?name=DC&background=random",
    startDate: "Aug 25, 2025",
    endDate: "Aug 27, 2025",
    status: "Upcoming",
    participants: 15,
    registrationOpen: true,
    prizePool: "$4,500",
    tags: ["Web3", "dApps", "Ethereum"],
    difficulty: "Advanced",
  }
];

const ChallengesPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Filter hackathons based on search query and filters
  const filteredHackathons = hackathonData.filter(hackathon => {
    const matchesSearch = 
      hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesDifficulty = filterDifficulty === "all" || hackathon.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    const matchesStatus = filterStatus === "all" || hackathon.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <DashboardLayout
      title="Challenges & Hackathons"
      subtitle="Discover upcoming hackathons and challenges"
      userRole={authState.user?.role}
    >
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search challenges by title, description or tags" 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 md:w-auto">
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Difficulty" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHackathons.map(hackathon => (
          <Card key={hackathon.id} className="glass-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={hackathon.logo} />
                  <AvatarFallback>{hackathon.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <Badge 
                  variant={hackathon.status === "Active" ? "default" : 
                           hackathon.status === "Completed" ? "secondary" : "outline"}
                >
                  {hackathon.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{hackathon.title}</CardTitle>
              <CardDescription className="flex items-center">
                By {hackathon.company}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {hackathon.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{hackathon.startDate}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{hackathon.participants} participants</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{hackathon.prizePool}</span>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                    {hackathon.difficulty}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 pt-2">
                {hackathon.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate(`/challenges/${hackathon.id}`)}
              >
                {hackathon.registrationOpen ? "Register Now" : "View Details"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredHackathons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Try adjusting your search or filters to find more hackathons and challenges.
          </p>
        </div>
      )}
      
      {/* Featured Challenge */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-primary" />
          Featured Challenge
        </h2>
        
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="https://ui-avatars.com/api/?name=GP&background=random" />
                  <AvatarFallback>GP</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">Global Innovation Hackathon 2025</CardTitle>
                  <CardDescription>By Global Partners Alliance</CardDescription>
                </div>
              </div>
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p>
              Join the world's largest virtual hackathon with participants from over 50 countries. 
              Build solutions to address global challenges in healthcare, climate change, education, and more.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-medium">September 10-17, 2025</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Prize Pool</span>
                <span className="font-medium">$25,000 + Incubation</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Participants</span>
                <span className="font-medium">1000+ expected</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Global</Badge>
              <Badge variant="outline">Innovation</Badge>
              <Badge variant="outline">SDGs</Badge>
              <Badge variant="outline">Healthcare</Badge>
              <Badge variant="outline">Climate</Badge>
              <Badge variant="outline">Education</Badge>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button size="lg" className="w-full md:w-auto" onClick={() => navigate("/challenges/featured")}>
              Learn More & Pre-Register
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Create Challenge Button (for companies/colleges) */}
      {(authState.user?.role === "company" || authState.user?.role === "college") && (
        <div className="mt-8 flex justify-end">
          <Button 
            size="lg"
            className="animate-pulse"
            onClick={() => navigate("/challenges/create")}
          >
            Create New Challenge
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ChallengesPage;
