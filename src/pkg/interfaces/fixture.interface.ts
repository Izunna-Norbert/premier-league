export interface ICreateFixture {
  homeTeam: string;
  awayTeam: string;
  startDate: Date;
  createdBy: string;
}

export interface IFixture {
  homeTeam: string;
  awayTeam: string;
  homeTeamName: string;
  awayTeamName: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
}

export interface IFixtureUseCaseResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface IUpdateFixture {
  homeTeam?: string;
  awayTeam?: string;
  startDate?: Date;
  updatedBy?: string;
}

export interface IUpdateFixtureScore {
  homeTeamScore?: number;
  awayTeamScore?: number;
}
