
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Search, Filter, Sparkles, Building, MapPin, CheckCircle, Star, Users, GraduationCap, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample job listings data
const jobListings = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "TechCorp",
    companyLogo: "https://github.com/shadcn.png",
    location: "San Francisco, CA",
    type: "Internship",
    duration: "Summer 2025",
    description: "Join our software engineering team to build innovative solutions for our cloud platform. You'll work on real projects with experienced mentors.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Experience with JavaScript, TypeScript, or Python",
      "Understanding of web development fundamentals",
      "Strong problem-solving abilities"
    ],
    skillsRequired: ["JavaScript", "React", "Node.js"],
    featured: true,
    applicants: 45,
    posted: "4 days ago",
    deadline: "June 30, 2025",
    salary: "$30-35/hour"
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataTech Analytics",
    companyLogo: "",
    location: "Remote",
    type: "Internship",
    duration: "Fall 2025",
    description: "Work with our data science team to analyze complex datasets and build predictive models for business insights.",
    requirements: [
      "Currently pursuing a degree in Statistics, Mathematics, Computer Science, or related field",
      "Experience with Python, R, or SQL",
      "Knowledge of machine learning concepts",
      "Strong analytical skills"
    ],
    skillsRequired: ["Python", "Machine Learning", "SQL"],
    featured: true,
    applicants: 32,
    posted: "1 week ago",
    deadline: "July 15, 2025",
    salary: "$28-33/hour"
  },
  {
    id: "3",
    title: "UX Design Graduate Role",
    company: "CreativeDesign",
    companyLogo: "",
    location: "New York, NY",
    type: "Full-time",
    duration: "Starting Sept 2025",
    description: "Join our design team to create user-centered experiences for our digital products.",
    requirements: [
      "Bachelor's or Master's degree in Design, HCI, or related field",
      "Portfolio demonstrating UX/UI design projects",
      "Experience with design tools like Figma or Sketch",
      "Understanding of user research methodologies"
    ],
    skillsRequired: ["UI/UX Design", "Figma", "User Research"],
    featured: false,
    applicants: 28,
    posted: "2 weeks ago",
    deadline: "July 31, 2025",
    salary: "$75,000-85,000/year"
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: "WebTech Solutions",
    companyLogo: "",
    location: "Boston, MA",
    type: "Full-time",
    duration: "Immediate Start",
    description: "Design and implement user-facing features for our web applications using modern JavaScript frameworks.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "1-2 years of experience with frontend development",
      "Proficiency in React, Vue, or Angular",
      "Strong HTML, CSS, and JavaScript skills"
    ],
    skillsRequired: ["React", "JavaScript", "HTML/CSS"],
    featured: false,
    applicants: 56,
    posted: "3 days ago",
    deadline: "June 25, 2025",
    salary: "$80,000-95,000/year"
  },
  {
    id: "5",
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    companyLogo: "",
    location: "Seattle, WA",
    type: "Full-time",
    duration: "Immediate Start",
    description: "Design and implement machine learning algorithms and systems for our AI products.",
    requirements: [
      "Master's or PhD in Computer Science, Machine Learning, or related field",
      "Experience with deep learning frameworks",
      "Strong programming skills in Python",
      "Knowledge of ML deployment strategies"
    ],
    skillsRequired: ["Python", "TensorFlow", "PyTorch"],
    featured: false,
    applicants: 37,
    posted: "1 week ago",
    deadline: "July 10, 2025",
    salary: "$120,000-140,000/year"
  },
];

// Sample company profiles data
const companyProfiles = [
  {
    id: "1",
    name: "TechCorp",
    logo: "https://github.com/shadcn.png",
    industry: "Technology",
    description: "A leading technology company specializing in cloud infrastructure and AI solutions.",
    location: "San Francisco, CA",
    size: "5,000+ employees",
    openPositions: 8,
    benefits: ["Remote Work Options", "Professional Development", "Health Benefits", "Stock Options"],
    rating: 4.7
  },
  {
    id: "2",
    name: "DataTech Analytics",
    logo: "",
    industry: "Data Science",
    description: "Specializing in big data analytics and machine learning solutions for enterprise clients.",
    location: "Remote",
    size: "500-1,000 employees",
    openPositions: 5,
    benefits: ["Flexible Schedule", "Learning Stipend", "Health Benefits", "Annual Retreats"],
    rating: 4.5
  },
  {
    id: "3",
    name: "CreativeDesign",
    logo: "",
    industry: "Design",
    description: "A design agency focused on creating exceptional digital experiences for global brands.",
    location: "New York, NY",
    size: "100-500 employees",
    openPositions: 3,
    benefits: ["Creative Environment", "Portfolio Development", "Health Benefits", "Design Conferences"],
    rating: 4.3
  },
  {
    id: "4",
    name: "WebTech Solutions",
    logo: "",
    industry: "Web Development",
    description: "Building innovative web applications and digital solutions for businesses of all sizes.",
    location: "Boston, MA",
    size: "100-500 employees",
    openPositions: 6,
    benefits: ["Hybrid Work Model", "Professional Development", "Health Benefits", "Team Events"],
    rating: 4.2
  },
  {
    id: "5",
    name: "AI Innovations",
    logo: "",
    industry: "Artificial Intelligence",
    description: "Pioneering AI research and applications to solve complex business problems.",
    location: "Seattle, WA",
    size: "500-1,000 employees",
    openPositions: 10,
    benefits: ["Research Opportunities", "Conference Attendance", "Health Benefits", "Innovation Time"],
    rating: 4.6
  },
];

// Sample skill categories for filtering
const skillCategories = [
  "Programming",
  "Design",
  "Data Science",
  "Product Management",
  "Marketing",
  "Business Development"
];

// Sample job types for filtering
const jobTypes = ["Internship", "Full-time", "Part-time", "Contract"];

const TalentRecruitmentPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("jobs");
  
  const isCompany = authState.user?.role === "company";
  
  const handleApplyToJob = (jobId: string) => {
    toast.success("Application submitted successfully!");
  };
  
  const handleSaveJob = (jobId: string) => {
    toast.success("Job saved to your favorites!");
  };
  
  const handleFollowCompany = (companyId: string) => {
    toast.success("Now following this company!");
  };
  
  const filteredJobs = jobListings.filter((job) => {
    // Apply search filter
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply job type filter
    const matchesJobType = selectedJobType ? job.type === selectedJobType : true;
    
    // Apply skill category filter (simplified - in real app would match against detailed skills)
    const matchesSkillCategory = selectedSkillCategory ? 
      (selectedSkillCategory === "Programming" && 
        job.skillsRequired.some(skill => ["JavaScript", "Python", "React", "Node.js"].includes(skill))) ||
      (selectedSkillCategory === "Design" && 
        job.skillsRequired.some(skill => ["UI/UX Design", "Figma", "User Research"].includes(skill))) ||
      (selectedSkillCategory === "Data Science" && 
        job.skillsRequired.some(skill => ["Python", "Machine Learning", "SQL", "TensorFlow", "PyTorch"].includes(skill)))
      : true;
    
    return matchesSearch && matchesJobType && matchesSkillCategory;
  });
  
  const featuredJobs = filteredJobs.filter(job => job.featured);
  const regularJobs = filteredJobs.filter(job => !job.featured);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DashboardLayout
      title="Talent Recruitment"
      subtitle="Connect with companies and find career opportunities"
      userRole={authState.user?.role || "student"}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <Briefcase className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Career Opportunities</h2>
            <p className="text-muted-foreground">Explore jobs, internships, and companies recruiting hackathon talent</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-64 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <p className="mb-2 text-sm font-medium">Job Type</p>
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map((type) => (
                      <Badge 
                        key={type} 
                        className="cursor-pointer" 
                        variant={selectedJobType === type ? "default" : "outline"}
                        onClick={() => setSelectedJobType(selectedJobType === type ? null : type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="mb-2 text-sm font-medium">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skillCategories.slice(0, 3).map((category) => (
                      <Badge 
                        key={category}
                        className="cursor-pointer"
                        variant={selectedSkillCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedSkillCategory(selectedSkillCategory === category ? null : category)}
                      >
                        {category}
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
                      setSelectedJobType(null);
                      setSelectedSkillCategory(null);
                      setSearchQuery("");
                    }}
                  >
                    <Filter className="h-4 w-4 mr-1" /> Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {!isCompany && (
              <Card className="bg-gradient-to-r from-primary/10 to-transparent">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Sparkles className="h-12 w-12 text-primary" />
                    <h3 className="font-semibold">Showcase Your Skills</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete your profile to highlight your projects and skills to potential employers.
                    </p>
                    <Button 
                      variant="default" 
                      className="w-full mt-2"
                      onClick={() => navigate("/profile")}
                    >
                      Update Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {isCompany && (
              <Card className="bg-gradient-to-r from-primary/10 to-transparent">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Users className="h-12 w-12 text-primary" />
                    <h3 className="font-semibold">Post a Job</h3>
                    <p className="text-sm text-muted-foreground">
                      Reach talented hackathon participants by posting your openings.
                    </p>
                    <Button 
                      variant="default" 
                      className="w-full mt-2"
                      onClick={() => toast.success("Job posting form opened!")}
                    >
                      Post New Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="flex-1">
            <Tabs defaultValue="jobs" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-4">
                <TabsTrigger value="jobs">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Jobs & Internships
                </TabsTrigger>
                <TabsTrigger value="companies">
                  <Building className="h-4 w-4 mr-2" />
                  Companies
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="jobs" className="space-y-6">
                {featuredJobs.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Featured Opportunities</h3>
                    {featuredJobs.map((job) => (
                      <Card key={job.id} className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge variant="default" className="mb-2">
                                Featured
                              </Badge>
                              <CardTitle>{job.title}</CardTitle>
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={job.companyLogo} />
                              <AvatarFallback>{getInitials(job.company)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <CardDescription className="flex flex-col gap-1">
                            <span>at {job.company}</span>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <span className="text-muted-foreground">•</span>
                              <span>{job.type}</span>
                              {job.duration && (
                                <>
                                  <span className="text-muted-foreground">•</span>
                                  <span>{job.duration}</span>
                                </>
                              )}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {job.description}
                          </p>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Requirements</h4>
                            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                              {job.requirements.map((requirement, idx) => (
                                <li key={idx}>{requirement}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {job.skillsRequired.map((skill, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-muted/50 p-2 rounded-md text-center">
                              <p className="text-xs text-muted-foreground">Salary</p>
                              <p className="font-semibold">{job.salary}</p>
                            </div>
                            <div className="bg-muted/50 p-2 rounded-md text-center">
                              <p className="text-xs text-muted-foreground">Deadline</p>
                              <p className="font-semibold">{job.deadline}</p>
                            </div>
                            <div className="bg-muted/50 p-2 rounded-md text-center">
                              <p className="text-xs text-muted-foreground">Applicants</p>
                              <p className="font-semibold">{job.applicants}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <Button variant="outline" onClick={() => handleSaveJob(job.id)}>
                            Save
                          </Button>
                          <Button onClick={() => handleApplyToJob(job.id)}>
                            Apply Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">All Opportunities</h3>
                  <div className="space-y-4">
                    {regularJobs.length > 0 ? (
                      regularJobs.map((job) => (
                        <Card key={job.id} className="hover:shadow-lg transition-all duration-300 hover:bg-muted/10">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                              <div className="flex gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={job.companyLogo} />
                                  <AvatarFallback>{getInitials(job.company)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{job.title}</CardTitle>
                                  <CardDescription className="flex flex-col gap-1">
                                    <span>{job.company}</span>
                                    <div className="flex items-center gap-2 text-sm">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>{job.location}</span>
                                      </div>
                                      <span className="text-muted-foreground">•</span>
                                      <span>{job.type}</span>
                                    </div>
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge variant="outline" className="whitespace-nowrap">
                                {job.posted}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <p className="text-sm text-muted-foreground mb-3">
                              {job.description.length > 150
                                ? `${job.description.slice(0, 150)}...`
                                : job.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {job.skillsRequired.map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center">
                                <Badge variant="outline" className="font-normal">
                                  {job.salary}
                                </Badge>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span>Deadline: {job.deadline}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-3">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{job.applicants} applicants</span>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSaveJob(job.id)}
                              >
                                Save
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleApplyToJob(job.id)}
                              >
                                Apply
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Briefcase className="h-12 w-12 text-muted-foreground mb-3" />
                        <h3 className="text-lg font-medium">No jobs match your filters</h3>
                        <p className="text-muted-foreground mb-3">
                          Try adjusting your search or filters
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSelectedJobType(null);
                            setSelectedSkillCategory(null);
                            setSearchQuery("");
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="companies" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyProfiles.map((company) => (
                    <Card key={company.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={company.logo} />
                              <AvatarFallback>{getInitials(company.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {company.name}
                                <Badge variant="outline" className="ml-2">
                                  {company.industry}
                                </Badge>
                              </CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{company.location}</span>
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">{company.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {company.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{company.size}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{company.openPositions} open positions</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Benefits</h4>
                          <div className="flex flex-wrap gap-1">
                            {company.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFollowCompany(company.id)}
                        >
                          Follow
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => toast.success("Viewing company profile...")}
                          className="flex items-center gap-1"
                        >
                          View Jobs
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TalentRecruitmentPage;
