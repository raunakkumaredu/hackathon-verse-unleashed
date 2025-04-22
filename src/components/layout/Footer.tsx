import React from "react";
import { Instagram, Facebook } from "lucide-react";

export const Footer = () => (
  <footer className="bg-background border-t border-border py-8 mt-10 animate-fade-in">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center">
        <span className="font-semibold text-xl gradient-text">HackathonVerse</span>
        <span className="ml-2 text-muted-foreground">© {new Date().getFullYear()}</span>
      </div>
      <div className="flex gap-4 mt-2 sm:mt-0">
        {/* Social media with interactive hover */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full p-2 hover:bg-gradient-to-tr hover:from-hackathon-purple hover:to-hackathon-blue transition">
          <Instagram className="h-6 w-6 text-hackathon-purple hover:text-white transition" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full p-2 hover:bg-gradient-to-tr hover:from-hackathon-blue hover:to-hackathon-purple transition">
          <Facebook className="h-6 w-6 text-hackathon-blue hover:text-white transition" />
        </a>
      </div>
      <div className="text-sm text-muted-foreground">
        Made with <span className="text-hackathon-purple">♥</span> for young hackers!
      </div>
    </div>
  </footer>
);
