
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SupportPage = () => {
  const { authState } = useAuth();
  const userRole = authState.user?.role || "student";

  const faqs = [
    {
      question: "How do I join or create a team?",
      answer: "You can create a team by going to the Teams page and clicking on 'Create Team'. To join an existing team, browse available teams and click 'Request to Join'. The team admin will need to approve your request."
    },
    {
      question: "When are project submissions due?",
      answer: "Project submissions are due on the final day of the hackathon by 5:00 PM EST. Late submissions will not be accepted, so please plan accordingly and submit early to avoid any technical difficulties."
    },
    {
      question: "What resources are available to participants?",
      answer: "Participants have access to workshops, mentorship sessions, documentation, code libraries, and API resources. Visit the Resources page to browse all available materials."
    },
    {
      question: "How is the judging process conducted?",
      answer: "Projects are judged based on innovation, technical complexity, design, presentation quality, and impact. Each team will have 5 minutes to present their project followed by a 2-minute Q&A with judges."
    },
    {
      question: "Can I update my project submission after submitting?",
      answer: "Yes, you can update your submission any time before the deadline. Simply go to the Project Submission page and click 'Edit Submission'."
    },
    {
      question: "How do I request mentor support?",
      answer: "You can request mentor support through the Mentorship page. Browse available mentors by expertise, and schedule a session based on their availability."
    }
  ];

  const handleSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Your question has been submitted. We'll respond shortly!");
  };

  return (
    <DashboardLayout title="Help & Support" subtitle="Find answers and get assistance" userRole={userRole}>
      <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
        <div className="md:col-span-2 space-y-6">
          <Card className="hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about the hackathon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="animate-fade-in">
                    <AccordionTrigger className="hover:text-primary transition-colors hover:scale-[1.01]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Helpful guides and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button variant="outline" className="justify-start hover:bg-primary/10 hover:scale-[1.01] transition-transform">
                  Getting Started Guide
                </Button>
                <Button variant="outline" className="justify-start hover:bg-primary/10 hover:scale-[1.01] transition-transform">
                  Hackathon Rules & Guidelines
                </Button>
                <Button variant="outline" className="justify-start hover:bg-primary/10 hover:scale-[1.01] transition-transform">
                  Project Submission Tutorial
                </Button>
                <Button variant="outline" className="justify-start hover:bg-primary/10 hover:scale-[1.01] transition-transform">
                  Team Formation Best Practices
                </Button>
                <Button variant="outline" className="justify-start hover:bg-primary/10 hover:scale-[1.01] transition-transform">
                  Judging Criteria & Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Ask us directly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="subject">Subject</label>
                  <Input id="subject" placeholder="What's your question about?" className="hover:border-primary focus-visible:ring-2 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="message">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your issue or question..." 
                    className="min-h-[120px] hover:border-primary focus-visible:ring-2 transition-all"
                  />
                </div>
                <Button type="submit" className="w-full hover:scale-105 transition-transform">
                  Submit Question
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>Email: support@hackathonverse.com</p>
                <p>Support Hours: 9 AM - 9 PM EST</p>
                <p>Response Time: Within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;
