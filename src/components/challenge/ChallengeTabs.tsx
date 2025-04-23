
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ChallengeTabsProps {
  hackathon: {
    description: string;
    logo: string;
    company: string;
    startDate: string;
    endDate: string;
    prizePool: string;
    tags: string[];
  };
}

export const ChallengeTabs: React.FC<ChallengeTabsProps> = ({ hackathon }) => (
  <Tabs defaultValue="overview" className="w-full">
    <TabsList className="mb-4">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="schedule">Schedule</TabsTrigger>
      <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
      <TabsTrigger value="resources">Resources</TabsTrigger>
    </TabsList>

    <TabsContent value="overview">
      <Card>
        <CardHeader>
          <CardTitle>Challenge Overview</CardTitle>
          <CardDescription>Learn more about this hackathon challenge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{hackathon.description}</p>
          <h3 className="text-lg font-semibold mt-6">About the Organizer</h3>
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={hackathon.logo} />
              <AvatarFallback>{hackathon.company?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{hackathon.company}</h4>
              <p className="text-sm text-muted-foreground">
                {hackathon.company} is organizing this challenge to foster innovation and
                identify talented developers for potential collaboration.
              </p>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-6">Expected Outcomes</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>A working prototype demonstrating your solution</li>
            <li>Source code repository with documentation</li>
            <li>A 5-minute presentation explaining your approach</li>
            <li>A brief writeup of challenges faced and how you overcame them</li>
          </ul>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="schedule">
      <Card>
        <CardHeader>
          <CardTitle>Event Schedule</CardTitle>
          <CardDescription>Timeline and important dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start border-b pb-4">
              <div className="min-w-[120px] text-primary">
                <p className="font-bold">{hackathon.startDate}</p>
                <p className="text-sm">9:00 AM</p>
              </div>
              <div>
                <h3 className="font-semibold">Kickoff Event</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Welcome address and challenge announcement
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start border-b pb-4">
              <div className="min-w-[120px] text-primary">
                <p className="font-bold">{hackathon.startDate}</p>
                <p className="text-sm">1:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold">Team Formation</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Find teammates and start collaborating
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start border-b pb-4">
              <div className="min-w-[120px] text-primary">
                <p className="font-bold">{hackathon.endDate}</p>
                <p className="text-sm">2:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold">Final Submissions</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Deadline for project submissions
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="min-w-[120px] text-primary">
                <p className="font-bold">{hackathon.endDate}</p>
                <p className="text-sm">5:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold">Judging and Awards</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Project presentations and winner announcement
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="rules">
      <Card>
        <CardHeader>
          <CardTitle>Rules & Guidelines</CardTitle>
          <CardDescription>Participation requirements and judging criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">Eligibility</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Open to all registered participants</li>
            <li>Teams of 2-5 members are allowed</li>
            <li>Members can be from different organizations</li>
            <li>All team members must be registered on the platform</li>
          </ul>
          <h3 className="font-semibold mt-4">Submission Guidelines</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>All code must be original or properly attributed</li>
            <li>Projects must be submitted before the deadline</li>
            <li>Include documentation and setup instructions</li>
            <li>Submit through the platform's project submission form</li>
          </ul>
          <h3 className="font-semibold mt-4">Judging Criteria</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><span className="font-medium">Innovation (25%)</span>: Originality and creativity of the solution</li>
            <li><span className="font-medium">Functionality (25%)</span>: How well the solution works</li>
            <li><span className="font-medium">Technical Complexity (20%)</span>: Appropriate use of technology</li>
            <li><span className="font-medium">User Experience (15%)</span>: Design and usability</li>
            <li><span className="font-medium">Presentation (15%)</span>: Quality of demo and explanation</li>
          </ul>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="resources">
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>Helpful materials and support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">Documentation & APIs</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>API documentation is available in the Resources section</li>
            <li>Sample code and starter projects are provided</li>
            <li>Access to test environments will be granted upon registration</li>
          </ul>
          <h3 className="font-semibold mt-4">Support Channels</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Discord channel for real-time support</li>
            <li>Office hours with mentors (schedule in Calendar)</li>
            <li>FAQ section for common questions</li>
          </ul>
          <h3 className="font-semibold mt-4">Downloads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <Button variant="outline" className="justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Challenge Brief PDF
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              API Documentation
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Starter Templates
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Judging Rubric
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);
