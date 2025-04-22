
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Plus, Star, Shield, Award, Zap, PlusCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Mock skills data
const skillCategories = [
  { 
    name: "Technical",
    skills: [
      { id: 1, name: "JavaScript", level: 85, endorsements: 12, projects: 8 },
      { id: 2, name: "Python", level: 70, endorsements: 7, projects: 5 },
      { id: 3, name: "React", level: 90, endorsements: 15, projects: 10 },
      { id: 4, name: "Node.js", level: 65, endorsements: 5, projects: 4 },
      { id: 5, name: "SQL", level: 75, endorsements: 8, projects: 6 },
    ]
  },
  {
    name: "Soft Skills",
    skills: [
      { id: 6, name: "Team Leadership", level: 80, endorsements: 10, projects: 7 },
      { id: 7, name: "Problem Solving", level: 85, endorsements: 14, projects: 12 },
      { id: 8, name: "Communication", level: 75, endorsements: 9, projects: 8 },
      { id: 9, name: "Time Management", level: 70, endorsements: 6, projects: 9 },
    ]
  },
  {
    name: "Design",
    skills: [
      { id: 10, name: "UI/UX Design", level: 65, endorsements: 5, projects: 3 },
      { id: 11, name: "Figma", level: 80, endorsements: 8, projects: 5 },
      { id: 12, name: "Adobe Photoshop", level: 60, endorsements: 4, projects: 2 },
    ]
  }
];

// Mock achievements data
const achievements = [
  {
    id: 1,
    name: "First Hackathon",
    description: "Participated in your first hackathon event",
    icon: <Star className="h-6 w-6" />,
    earned: true,
    date: "March 15, 2025",
  },
  {
    id: 2,
    name: "Team Leader",
    description: "Led a team to complete a hackathon project",
    icon: <Shield className="h-6 w-6" />,
    earned: true,
    date: "April 2, 2025",
  },
  {
    id: 3,
    name: "Top 10 Project",
    description: "Your project ranked in the top 10",
    icon: <Award className="h-6 w-6" />,
    earned: true,
    date: "April 10, 2025",
  },
  {
    id: 4,
    name: "Networking Pro",
    description: "Connected with 20+ participants",
    icon: <Zap className="h-6 w-6" />,
    earned: false,
    progress: 15,
    total: 20,
  },
];

// Motion variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const SkillShowcasePage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [animateSkills, setAnimateSkills] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Technical");
  
  useEffect(() => {
    // Trigger animation after component mount
    setAnimateSkills(true);
  }, []);
  
  const handleAddSkill = () => {
    toast.success("Add skill functionality coming soon!");
  };
  
  const handleEndorseSkill = (skillId: number) => {
    toast.success("Skill endorsed successfully!");
  };
  
  const filteredSkills = skillCategories.find(cat => cat.name === activeCategory)?.skills || [];

  return (
    <DashboardLayout
      title="Skill Showcase"
      subtitle="Highlight your abilities and track your growth"
      userRole={authState.user?.role || "student"}
    >
      <div className="grid gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <Sparkles className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Animated Skill Showcase</h2>
            <p className="text-muted-foreground">Visualize your skills and achievements</p>
          </div>
          <Button onClick={handleAddSkill}>
            <Plus className="h-4 w-4 mr-1" />
            Add Skill
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                <CardDescription>Track your skills and get endorsements</CardDescription>
                <div className="flex gap-2 mt-2">
                  {skillCategories.map(category => (
                    <Badge 
                      key={category.name}
                      variant={activeCategory === category.name ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => setActiveCategory(category.name)}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate={animateSkills ? "show" : "hidden"}
                >
                  {filteredSkills.map((skill) => (
                    <motion.div key={skill.id} variants={itemVariants}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{skill.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                            {skill.endorsements}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-xs"
                            onClick={() => handleEndorseSkill(skill.id)}
                          >
                            Endorse
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress 
                          value={skill.level} 
                          className="h-2 flex-1" 
                        />
                        <span className="text-sm font-medium w-9">{skill.level}%</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Used in {skill.projects} projects</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleAddSkill}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add New Skill
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Projects</CardTitle>
                <CardDescription>Projects where you've demonstrated your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate={animateSkills ? "show" : "hidden"}
                >
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item} 
                      variants={itemVariants}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">Project {item}</h3>
                        <Badge variant="outline">April 2025</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Project description goes here...
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Array(3).fill(0).map((_, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            Skill {idx + 1}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pt-2">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">User Name</h3>
                <p className="text-muted-foreground mb-4">Student at University</p>
                <div className="grid grid-cols-3 w-full text-center gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Skills</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
                <CardDescription>Badges and milestones you've reached</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate={animateSkills ? "show" : "hidden"}
                >
                  {achievements.map((achievement) => (
                    <motion.div 
                      key={achievement.id} 
                      variants={itemVariants}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${achievement.earned ? '' : 'opacity-60'}`}
                    >
                      <div className={`h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <p className="text-xs font-medium text-green-600 mt-1">
                            Earned on {achievement.date}
                          </p>
                        ) : (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.total}</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.total) * 100} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillShowcasePage;
