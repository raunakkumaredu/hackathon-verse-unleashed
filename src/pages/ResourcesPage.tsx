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
  const [accessingResource, setAccessingResource] = useState<string | null>(null);

  const resources = [
    {
      id: "1",
      title: "Getting Started with React",
      type: "tutorial",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=320&h=160&fit=crop",
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
      thumbnail: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=320&h=160&fit=crop",
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
      thumbnail: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=320&h=160&fit=crop",
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
      thumbnail: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=320&h=160&fit=crop",
      description: "Understanding blockchain fundamentals and applications",
      author: "Blockchain Education Network",
      tags: ["Blockchain", "Web3", "Crypto"],
      difficulty: "Beginner",
      duration: "2 hours",
      link: "#"
    }
  ];

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

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Book className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">My Teams</h3>
        </div>
        <div className="text-muted-foreground text-sm mb-3">
          Team management will appear here! (You can ask to implement full team management and matchmaking.)
        </div>
        <Button variant="outline" size="sm" onClick={() => toast.info("Team match-making coming soon!")}>
          Find Teammates
        </Button>
      </div>

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
                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow glass-card">
                  <div className="aspect-video relative bg-muted animate-float">
                    <img src={resource.thumbnail} alt={resource.title} className="object-cover w-full h-full rounded-t-md" />
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
                        disabled={accessingResource === resource.id}
                        className={`relative transition-all duration-150 ${
                          accessingResource === resource.id ? "opacity-70 cursor-wait" : ""
                        }`}
                        onClick={() => {
                          setAccessingResource(resource.id);
                          setTimeout(() => {
                            setAccessingResource(null);
                            toast.success("Resource accessed! 🎉");
                          }, 1100);
                        }}
                      >
                        {accessingResource === resource.id ? (
                          <span className="flex items-center">
                            <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full mr-2"></span>
                            Loading...
                          </span>
                        ) : (
                          <>
                            Access <Download className="ml-2 h-3 w-3" />
                          </>
                        )}
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
