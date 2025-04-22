
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative rounded-full transition-all h-10 w-10",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all",
        theme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"
      )} />
      <Moon className={cn(
        "absolute h-[1.2rem] w-[1.2rem] transition-all",
        theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
