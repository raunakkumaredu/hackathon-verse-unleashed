import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, FileCode, Book, Video, Link, Download } from "lucide-react";
import { toast } from "sonner";

const ResourcesPage = () => {
  const { authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock resource data
  const resources = [
    {
      id: "1",
      title: "Getting Started with React",
      type: "tutorial",
      thumbnail: "https://placehold.co/400x200",
      description: "Learn the basics of React and build your first component",
      author: "TechCorp Academy",
      tags: ["React", "Frontend", "JavaScript"],
      difficulty: "Beginner",
      duration: "45 mins",
      link: "#"
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      type: "course",
      thumbnail: "https://placehold.co/400x200",
      description: "An introduction to machine learning concepts and algorithms",
      author: "AI Research Institute",
      tags: ["AI", "Machine Learning", "Python"],
      difficulty: "Intermediate",
      duration: "5 hours",
      link: "#"
    },
    {
      id: "3",
      title: "Building RESTful APIs",
      type: "documentation",
      thumbnail: "https://placehold.co/400x200",
      description: "Best practices for designing and building RESTful APIs",
      author: "API Standards Group",
      tags: ["API", "Backend", "REST"],
      difficulty: "Intermediate",
      link: "#"
    },
    {
      id: "4",
      title: "Introduction to Blockchain Technology",
      type: "video",
      thumbnail: "https://placehold.co/400x200",
      description: "Understanding blockchain fundamentals and applications",
      author: "Blockchain Education Network",
      tags: ["Blockchain", "Web3", "Crypto"],
      difficulty: "Beginner",
      duration: "2 hours",
      link: "#"
    }
  ];
  
  // Filter resources based on search query
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "tutorial":
        return <Book className="h-5 w-5" />;
      case "course":
        return <FileCode className="h-5 w-5" />;
      case "documentation":
        return <Link className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default:
        return <FileCode className="h-5 w-5" />;
    }
  };
  
  return (
    <DashboardLayout
      title="Resources"
      subtitle="Learning materials and resources to help you succeed"
      userRole={authState.user?.role}
    >
      {/* Search and filter */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search resources" 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Resource Categories */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-muted">
                    <img src={resource.thumbnail} alt={resource.title} className="object-cover w-full h-full" />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-primary">
                        {getResourceIcon(resource.type)}
                      </span>
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.author}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-primary/5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-muted">
                          {resource.difficulty}
                        </Badge>
                        {resource.duration && (
                          <span className="text-xs text-muted-foreground">{resource.duration}</span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toast.info("Resource access coming soon!")}
                      >
                        Access <Download className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We couldn't find any resources matching your search. Try adjusting your search terms.
              </p>
            </div>
          )}
        </TabsContent>
        
        {/* Other tabs would have similar content, filtered by type */}
        <TabsContent value="tutorials">
          <div className="py-8 text-center">
            <p>Filtered tutorials will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="py-8 text-center">
            <p>Filtered courses will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="documentation">
          <div className="py-8 text-center">
            <p>Filtered documentation will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="py-8 text-center">
            <p>Filtered videos will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Recommended Resources */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Hackathon Success Strategies
              </CardTitle>
              <CardDescription>Learn how to excel in your next hackathon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                In this masterclass, experienced hackers share their strategies for building winning projects.
              </p>
              <Button onClick={() => toast.info("Resource access coming soon!")}>
                Watch Masterclass
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Project Planning Guide
              </CardTitle>
              <CardDescription>Step-by-step project planning for hackathons</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                This comprehensive guide will help you plan your hackathon project from concept to submission.
              </p>
              <Button onClick={() => toast.info("Resource access coming soon!")}>
                Read Guide
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                Tech Stack Selection
              </CardTitle>
              <CardDescription>How to choose the right technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Learn how to select the optimal tech stack based on your project requirements and timeline.
              </p>
              <Button onClick={() => toast.info("Resource access coming soon!")}>
                Access Resource
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResourcesPage;
