
import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth';
import { toast } from 'sonner';

export interface HackathonWithParticipation {
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
  createdAt: string;
  participationStatus?: "Registered" | "Interested" | null;
}

export const fetchAllHackathons = async (userId?: string): Promise<HackathonWithParticipation[]> => {
  try {
    const { data: hackathons, error } = await supabase
      .from('hackathons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching hackathons:', error);
      toast.error('Failed to load hackathons');
      return [];
    }

    let participationData: Record<string, string> = {};
    
    // If userId is provided, fetch participation data
    if (userId) {
      const { data: participations, error: participationError } = await supabase
        .from('hackathon_participants')
        .select('*')
        .eq('user_id', userId);
        
      if (!participationError && participations) {
        participationData = participations.reduce((acc, item) => {
          acc[item.hackathon_id] = item.status;
          return acc;
        }, {} as Record<string, string>);
      }
    }

    // Transform the data to match our frontend model
    return hackathons.map(h => ({
      id: h.id,
      title: h.title,
      description: h.description,
      company: h.company,
      logo: h.logo,
      startDate: h.start_date,
      endDate: h.end_date,
      status: h.status,
      participants: h.participants,
      registrationOpen: h.registration_open,
      prizePool: h.prize_pool,
      tags: h.tags,
      difficulty: h.difficulty,
      organizerId: h.organizer_id,
      createdAt: h.created_at,
      participationStatus: participationData[h.id] as "Registered" | "Interested" | undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching hackathons:', error);
    toast.error('Something went wrong while loading hackathons');
    return [];
  }
};

export const fetchUserHackathons = async (userId: string): Promise<HackathonWithParticipation[]> => {
  try {
    const { data: participations, error: participationsError } = await supabase
      .from('hackathon_participants')
      .select('*')
      .eq('user_id', userId);
      
    if (participationsError || !participations || participations.length === 0) {
      return [];
    }
    
    const hackathonIds = participations.map(p => p.hackathon_id);
    
    const { data: hackathons, error } = await supabase
      .from('hackathons')
      .select('*')
      .in('id', hackathonIds);
      
    if (error) {
      console.error('Error fetching user hackathons:', error);
      toast.error('Failed to load your hackathons');
      return [];
    }
    
    // Create participation status map
    const statusMap = participations.reduce((acc, p) => {
      acc[p.hackathon_id] = p.status;
      return acc;
    }, {} as Record<string, string>);
    
    // Transform data
    return hackathons.map(h => ({
      id: h.id,
      title: h.title,
      description: h.description,
      company: h.company,
      logo: h.logo,
      startDate: h.start_date,
      endDate: h.end_date,
      status: h.status,
      participants: h.participants,
      registrationOpen: h.registration_open,
      prizePool: h.prize_pool,
      tags: h.tags,
      difficulty: h.difficulty,
      organizerId: h.organizer_id,
      createdAt: h.created_at,
      participationStatus: statusMap[h.id] as "Registered" | "Interested" | undefined
    }));
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error('Failed to load your hackathons');
    return [];
  }
};

export const fetchCreatedHackathons = async (organizerId: string): Promise<HackathonWithParticipation[]> => {
  try {
    const { data: hackathons, error } = await supabase
      .from('hackathons')
      .select('*')
      .eq('organizer_id', organizerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching created hackathons:', error);
      toast.error('Failed to load created hackathons');
      return [];
    }

    // Transform data
    return hackathons.map(h => ({
      id: h.id,
      title: h.title,
      description: h.description,
      company: h.company,
      logo: h.logo,
      startDate: h.start_date,
      endDate: h.end_date,
      status: h.status,
      participants: h.participants,
      registrationOpen: h.registration_open,
      prizePool: h.prize_pool,
      tags: h.tags,
      difficulty: h.difficulty,
      organizerId: h.organizer_id,
      createdAt: h.created_at
    }));
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error('Failed to load created hackathons');
    return [];
  }
};

export const createHackathon = async (hackathonData: Omit<HackathonWithParticipation, 'id' | 'createdAt'>, user: User): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('hackathons')
      .insert([
        {
          title: hackathonData.title,
          description: hackathonData.description,
          company: user.organization || hackathonData.company,
          logo: hackathonData.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(hackathonData.title.substring(0, 2))}&background=random`,
          start_date: hackathonData.startDate,
          end_date: hackathonData.endDate,
          status: hackathonData.status,
          participants: 0,
          registration_open: hackathonData.registrationOpen,
          prize_pool: hackathonData.prizePool,
          tags: hackathonData.tags,
          difficulty: hackathonData.difficulty,
          organizer_id: user.id
        }
      ])
      .select();

    if (error) {
      console.error('Error creating hackathon:', error);
      toast.error('Failed to create hackathon');
      return null;
    }

    toast.success('Hackathon created successfully!');
    return data[0].id;
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error('Something went wrong while creating the hackathon');
    return null;
  }
};

export const deleteHackathon = async (hackathonId: string, userId: string): Promise<boolean> => {
  try {
    // First verify this user is the creator
    const { data: hackathon, error: fetchError } = await supabase
      .from('hackathons')
      .select('organizer_id')
      .eq('id', hackathonId)
      .single();
      
    if (fetchError || !hackathon) {
      toast.error('Hackathon not found');
      return false;
    }
    
    if (hackathon.organizer_id !== userId) {
      toast.error('You do not have permission to delete this hackathon');
      return false;
    }
    
    // Delete participants first (due to foreign key constraints)
    const { error: participantError } = await supabase
      .from('hackathon_participants')
      .delete()
      .eq('hackathon_id', hackathonId);
      
    if (participantError) {
      console.error('Error deleting hackathon participants:', participantError);
    }
    
    // Now delete the hackathon
    const { error } = await supabase
      .from('hackathons')
      .delete()
      .eq('id', hackathonId);

    if (error) {
      console.error('Error deleting hackathon:', error);
      toast.error('Failed to delete hackathon');
      return false;
    }

    toast.success('Hackathon deleted successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error('Something went wrong while deleting the hackathon');
    return false;
  }
};

export const joinHackathon = async (hackathonId: string, userId: string, status: "Registered" | "Interested"): Promise<boolean> => {
  try {
    // Check if already joined
    const { data: existing, error: checkError } = await supabase
      .from('hackathon_participants')
      .select('*')
      .eq('hackathon_id', hackathonId)
      .eq('user_id', userId)
      .single();
      
    if (!checkError && existing) {
      // Already joined, update status
      const { error: updateError } = await supabase
        .from('hackathon_participants')
        .update({ status })
        .eq('hackathon_id', hackathonId)
        .eq('user_id', userId);
        
      if (updateError) {
        console.error('Error updating participation status:', updateError);
        toast.error('Failed to update status');
        return false;
      }
    } else {
      // New participation
      const { error } = await supabase
        .from('hackathon_participants')
        .insert([
          {
            hackathon_id: hackathonId,
            user_id: userId,
            status
          }
        ]);

      if (error) {
        console.error('Error joining hackathon:', error);
        toast.error('Failed to join hackathon');
        return false;
      }
      
      // Also update participant count
      await supabase.rpc('increment_participants', { hackathon_id: hackathonId });
    }

    toast.success(status === 'Registered' ? 'Successfully registered for hackathon!' : 'Marked as interested in hackathon');
    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error('Something went wrong');
    return false;
  }
};
