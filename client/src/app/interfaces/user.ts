export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  userType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditUserDTO {
  firstName: string;
  lastName: string;
  bio: string;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  userType: string;
}
