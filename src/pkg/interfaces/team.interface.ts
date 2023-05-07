export interface ICreateTeam {
  name: string;
  description: string;
  createdBy: string;
}

export interface ITeam extends ICreateTeam {}

export interface ITeamUseCaseResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface IUpdateTeam {
  name: string;
  description: string;
}
