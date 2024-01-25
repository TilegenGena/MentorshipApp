// Keep in sync with the client MentorshipRequestCreateDTO file

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
