
export type UserRole = "student" | "company" | "college" | "mentor";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  organization?: string;
  position?: string;
  website?: string;
  location?: string;
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: User[];
  leaderId: string;
  createdAt: Date;
  updatedAt: Date;
  skills?: string[];
  hackathonId?: string;
  projectName?: string;
  projectDescription?: string;
  projectRepo?: string;
  projectDemo?: string;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  company: string;
  logo: string;
  startDate: string;
  endDate: string;
  status: "Upcoming" | "Active" | "Completed";
  participants: number;
  registrationOpen: boolean;
  prizePool: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  organizerId: string;
  organizer?: User;
  teams?: Team[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId: string;
  team?: Team;
  hackathonId: string;
  hackathon?: Hackathon;
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  submissionDate: Date;
  status: "Draft" | "Submitted" | "Reviewed";
  score?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MentoringSession {
  id: string;
  mentorId: string;
  mentor?: User;
  teamId: string;
  team?: Team;
  hackathonId: string;
  hackathon?: Hackathon;
  scheduledDate: Date;
  duration: number; // in minutes
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender?: User;
  teamId: string;
  team?: Team;
  createdAt: Date;
  isRead: boolean;
}
