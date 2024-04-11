export type User = {
  createdAt: Date | null;
  updatedAt: Date | null;
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  password: string;
  active: boolean;
  dateOfBirth: Date | null;
  facebookAccountId: number;
  googleAccountId: number;
  role: string | null;
};
