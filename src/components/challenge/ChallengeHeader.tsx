
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface ChallengeHeaderProps {
  logo: string;
  company: string;
  status: string;
  participationStatus?: string;
  difficulty: string;
  title: string;
  description: string;
  participants: number;
  startDate: string;
  endDate: string;
  prizePool: string;
  tags: string[];
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  logo,
  company,
  status,
  participationStatus,
  difficulty,
  title,
  description,
  participants,
  startDate,
  endDate,
  prizePool,
  tags,
}) => (
  <div className="flex flex-col md:flex-row gap-6">
    <div className="flex-shrink-0">
      <Avatar className="h-24 w-24">
        <AvatarImage src={logo} />
        <AvatarFallback>{company.substring(0, 2)}</AvatarFallback>
      </Avatar>
    </div>
    <div className="flex-1">
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge variant={status === "Active" ? "default" : status === "Completed" ? "secondary" : "outline"}>
          {status}
        </Badge>
        {participationStatus && (
          <Badge variant="secondary" className="bg-primary/10">
            {participationStatus}
          </Badge>
        )}
        <Badge variant="outline" className="bg-primary/5">
          {difficulty}
        </Badge>
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-muted-foreground">Start Date</p>
          <p className="font-medium">{startDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">End Date</p>
          <p className="font-medium">{endDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Prize Pool</p>
          <p className="font-medium">{prizePool}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Participants</p>
          <p className="font-medium">{participants}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-primary/10">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  </div>
);
