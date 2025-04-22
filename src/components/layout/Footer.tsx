
import React from "react";
import { Heart, Github, Twitter, Linkedin, Facebook, Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-hackathon-dark pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-hackathon-purple to-hackathon-blue rounded-md mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <h2 className="text-xl font-bold gradient-text">HackathonVerse</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              The ultimate platform for virtual hackathons, connecting students, colleges, companies, and mentors in a vibrant collaborative environment.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="/challenges" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Challenges</a>
              </li>
              <li>
                <a href="/teams" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Teams</a>
              </li>
              <li>
                <a href="/mentorship" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Mentorship</a>
              </li>
              <li>
                <a href="/resources" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Resources</a>
              </li>
              <li>
                <a href="/leaderboard" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Leaderboard</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Contact</a>
              </li>
              <li>
                <a href="/careers" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Careers</a>
              </li>
              <li>
                <a href="/partners" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Partners</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary hover:underline">Blog</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} HackathonVerse. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/terms" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary hover:underline">
                Terms of Service
              </a>
              <a href="/privacy" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary hover:underline">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary hover:underline">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 dark:text-gray-500 text-xs">
            Made with <Heart className="inline-block h-3 w-3 text-red-500 animate-pulse" /> for hackathon enthusiasts around the world
          </div>
        </div>
      </div>
    </footer>
  );
};
