// Keep in sync with the server MentorshipResponseCreateDTO file

export enum MentorshipResponseDecision {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  PENDING = 'Pending',
}

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
