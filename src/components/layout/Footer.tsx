
import React from "react";
import { Instagram, Facebook, Mail, HelpCircle } from "lucide-react";

export const Footer = () => (
  <footer className="bg-background border-t border-border py-8 mt-10 animate-fade-in">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center select-none">
        <span className="font-semibold text-xl gradient-text animate-gradient-x">HackathonVerse</span>
        <span className="ml-2 text-muted-foreground">© {new Date().getFullYear()}</span>
      </div>
      <div className="flex gap-6 mt-2 md:mt-0">
        {/* Social media with animated hover */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="rounded-full p-3 bg-gradient-to-tr from-hackathon-purple to-hackathon-blue shadow-lg hover:scale-110 hover:bg-gradient-to-br transition-all duration-300"
        >
          <Instagram className="h-7 w-7 text-white drop-shadow-md transition-all duration-200 animate-pulse" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="rounded-full p-3 bg-gradient-to-tr from-hackathon-blue to-hackathon-purple shadow-lg hover:scale-110 hover:bg-gradient-to-bl transition-all duration-300"
        >
          <Facebook className="h-7 w-7 text-white drop-shadow-md transition-all duration-200 animate-pulse" />
        </a>
        <a
          href="/support"
          aria-label="Help/FAQ"
          className="rounded-full p-3 bg-gradient-to-tr from-hackathon-orange to-hackathon-blue shadow-lg hover:scale-110 hover:bg-gradient-to-tr transition-all duration-300"
        >
          <HelpCircle className="h-7 w-7 text-white drop-shadow-md transition-all duration-200 animate-bounce" />
        </a>
        <a
          href="/feedback"
          aria-label="Feedback"
          className="rounded-full p-3 bg-gradient-to-tr from-hackathon-pink to-hackathon-purple shadow-lg hover:scale-110 hover:bg-gradient-to-r transition-all duration-300"
        >
          <Mail className="h-7 w-7 text-white drop-shadow-md transition-all duration-200 animate-bounce" />
        </a>
      </div>
      <div className="text-sm text-muted-foreground mt-2 md:mt-0 select-none animate-fade-in">
        Made with <span className="text-hackathon-purple animate-pulse">♥</span> for young hackers!
      </div>
    </div>
  </footer>
);

