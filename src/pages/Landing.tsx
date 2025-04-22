
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Globe, Trophy, Users, Code, Star, BarChart, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Landing = () => {
  const navigate = useNavigate();

  // Animation handlers for sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.add('opacity-100');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Features
  const features = [
    {
      icon: <Globe className="h-10 w-10 text-hackathon-blue" />,
      title: "Global Reach",
      description: "Connect with participants, colleges, and companies worldwide in a vibrant virtual environment."
    },
    {
      icon: <Calendar className="h-10 w-10 text-hackathon-purple" />,
      title: "Dynamic Events",
      description: "Organize and participate in hackathons with real-time collaboration tools and interactive timelines."
    },
    {
      icon: <Users className="h-10 w-10 text-hackathon-orange" />,
      title: "Team Building",
      description: "Find the perfect teammates with our intelligent matching system and drag-and-drop team builder."
    },
    {
      icon: <Code className="h-10 w-10 text-hackathon-blue" />,
      title: "API Sandboxes",
      description: "Test your code in secure environments with access to industry-standard APIs and tools."
    },
    {
      icon: <Trophy className="h-10 w-10 text-hackathon-secondary-purple" />,
      title: "Competitions",
      description: "Participate in diverse challenge formats from corporate hackathons to sustainability-focused events."
    },
    {
      icon: <BarChart className="h-10 w-10 text-hackathon-pink" />,
      title: "Analytics",
      description: "Track your progress, team performance, and competition metrics with comprehensive dashboards."
    },
  ];

  // Audience targets
  const audienceTargets = [
    {
      title: "For Students",
      description: "Build your portfolio, gain real-world experience, and connect with potential employers through hackathons.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      color: "from-hackathon-purple to-hackathon-blue"
    },
    {
      title: "For Companies",
      description: "Discover top talent, promote your brand, and solve real business challenges through sponsored hackathons.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      color: "from-hackathon-orange to-hackathon-pink"
    },
    {
      title: "For Colleges",
      description: "Showcase your institution, facilitate inter-college competitions, and provide valuable experiences for students.",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67", 
      color: "from-hackathon-blue to-hackathon-sky-blue"
    },
    {
      title: "For Mentors",
      description: "Share your expertise, guide the next generation of talent, and expand your professional network.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      color: "from-hackathon-secondary-purple to-hackathon-purple"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="h-screen min-h-[600px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-hackathon-pink/10 dark:from-hackathon-dark dark:to-hackathon-purple/10">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-hackathon-purple/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-20 h-72 w-72 bg-hackathon-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 right-1/2 h-80 w-80 bg-hackathon-pink/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              <span className="gradient-text">Virtual Hackathon Platform</span>
              <br />
              <span className="text-3xl md:text-5xl">Unleash Innovation Together</span>
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Connect students, colleges, companies, and mentors in a vibrant ecosystem
              to collaborate, learn, and create impactful solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="btn-primary text-lg px-8 py-6"
                onClick={() => navigate('/register')}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/80 dark:bg-black/20 text-lg px-8 py-6 border-2 hover:bg-white dark:hover:bg-black/40 transition-all"
                onClick={() => navigate('/challenges')}
              >
                Explore Challenges
              </Button>
            </div>
            
            <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Trusted by leading organizations</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-70">
                <div className="h-8 w-20 bg-gray-400/30 rounded-md"></div>
                <div className="h-8 w-24 bg-gray-400/30 rounded-md"></div>
                <div className="h-8 w-16 bg-gray-400/30 rounded-md"></div>
                <div className="h-8 w-28 bg-gray-400/30 rounded-md"></div>
                <div className="h-8 w-20 bg-gray-400/30 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-hackathon-dark/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Powerful Features</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Our platform is packed with innovative tools to make virtual hackathons engaging, collaborative, and impactful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className={cn(
                  "glass-card card-hover animate-on-scroll",
                  "border-0 shadow-lg hover:shadow-xl transition-all"
                )}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* For Everyone Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              For Everyone in the Ecosystem
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              HackathonVerse brings together all participants in the innovation ecosystem,
              creating a collaborative environment where everyone benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {audienceTargets.map((target, index) => (
              <div 
                key={target.title}
                className="relative overflow-hidden rounded-2xl h-80 animate-on-scroll" 
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={target.image} 
                    alt={target.title} 
                    className="w-full h-full object-cover filter brightness-[0.35]"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 opacity-70 bg-gradient-to-tr ${target.color}`}></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">{target.title}</h3>
                  <p className="text-white/90 mb-4">{target.description}</p>
                  <Button 
                    variant="outline" 
                    className="self-start bg-white/10 hover:bg-white/20 border-white text-white w-auto"
                    onClick={() => navigate('/register')}
                  >
                    Join Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-hackathon-purple to-hackathon-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Rocket className="h-16 w-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Hackathon Journey?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of innovators, creators, and problem-solvers on the ultimate virtual hackathon platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="default"
                className="bg-white text-hackathon-purple hover:bg-white/90 text-lg"
                onClick={() => navigate('/register')}
              >
                Create Account <Star className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 text-lg"
                onClick={() => navigate('/challenges')}
              >
                Browse Hackathons
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
