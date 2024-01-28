// Keep in sync with the client MentorshipResponseCreateDTO file
import { MentorshipResponseDecision } from './mentorship-response.model';

export interface MentorshipResponseCreateDTO {
  requestId: number;
  responseMessage: string;
  responseStatus: MentorshipResponseDecision;
}

export interface MentorshipResponseDTOGet {
  id: number;
  requestId: number;
  responseMessage: string;
  responseStatus: MentorshipResponseDecision;
}

export interface MentorshipDTO {
  menteeId: number;
  mentorId: number;
  startDate: string;
  endDate: string;
}
