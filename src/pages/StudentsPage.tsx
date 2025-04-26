
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const StudentsPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "college";

  // Sample data for students
  const students = [
    {
      id: "1",
      name: "Morgan Lee",
      department: "Computer Science",
      year: "Senior",
      achievements: ["Hackathon Winner", "3.9 GPA"],
      skills: ["React", "Node.js", "Python"],
      avatar: "https://ui-avatars.com/api/?name=ML&background=random",
      participation: "Active",
    },
    {
      id: "2",
      name: "Jordan Taylor",
      department: "Data Science",
      year: "Junior",
      achievements: ["Research Assistant", "ML Specialist"],
      skills: ["TensorFlow", "PyTorch", "Data Visualization"],
      avatar: "https://ui-avatars.com/api/?name=JT&background=random",
      participation: "Active",
    },
    {
      id: "3",
      name: "Sachin SIngh",
      department: "Design",
      year: "Sophomore",
      achievements: ["UI/UX Master", "Adobe Scholar"],
      skills: ["Figma", "Adobe XD", "UI Design"],
      avatar: "https://ui-avatars.com/api/?name=RJ&background=random",
      participation: "Inactive",
    },
    {
      id: "4",
      name: "Vicky singh",
      department: "Engineering",
      year: "Senior",
      achievements: ["IEEE Member", "Robotics Team"],
      skills: ["Hardware Design", "C++", "Arduino"],
      avatar: "https://ui-avatars.com/api/?name=CS&background=random",
      participation: "Active",
    },
    {
      id: "5",
      name: "Abhinav Jha ",
      department: "Business",
      year: "Junior",
      achievements: ["Entrepreneur Society", "Case Competition Winner"],
      skills: ["Business Strategy", "Presentation", "Finance"],
      avatar: "https://ui-avatars.com/api/?name=AW&background=random",
      participation: "Inactive",
    },
  ];

  return (
    <DashboardLayout
      title="Students"
      subtitle="Manage and monitor student participation in hackathons"
      userRole={userRole}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-9 w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">All Students</Button>
            <Button variant="outline" size="sm">Active</Button>
            <Button variant="outline" size="sm">Inactive</Button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <Card
              key={student.id}
              className={`hover:shadow-lg transition-all duration-300 hover:scale-[1.01] animate-fade-in ${
                student.participation === "Active"
                  ? "border-l-4 border-l-green-500"
                  : "border-l-4 border-l-gray-300"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>{student.department}, {student.year}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={
                      student.participation === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }
                  >
                    {student.participation}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Achievements</p>
                  <div className="flex flex-wrap gap-1">
                    {student.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button variant="outline" size="sm">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentsPage;
