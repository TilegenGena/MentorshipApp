export interface RegistrationDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  userType: string;
  createdAt: Date;
  updatedAt: Date;
}
