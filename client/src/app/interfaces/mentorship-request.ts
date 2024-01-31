// Keep in sync with the client MentorshipRequestCreateDTO file

import { UserDTO } from './user';

export interface MentorshipRequestCreateDTO {
  mentorId: number;
  requestMessage: string;
  startDate: string;
  endDate: string;
}

export interface MentorshipRequestGetDTO {
  id: number;
  menteeId: number;
  mentorId: number;
  requestMessage: string;
  startDate: string;
  endDate: string;
}

export interface Mentorship {
  id: number;
  menteeId: number;
  mentorId: number;
  startDate: string;
  endDate: string;
  mentor: UserDTO;
  mentee: UserDTO;
}
