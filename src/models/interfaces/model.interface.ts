import { Document } from 'mongoose';

export interface MUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

export interface MTeam extends Document {
  id: string;
  name: string;
  description: string;
  createdBy: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface MFixture extends Document {
  id: string;
  homeTeam: any;
  awayTeam: any;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
  startDate: Date;
  endDate: Date;
  createdBy: any;
  createdAt: Date;
  updatedAt: Date;
}
