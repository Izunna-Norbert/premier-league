import { ICreateTeam, ITeamUseCaseResponse, IUpdateTeam } from '../interfaces/team.interface';
import TeamRepo from '../repos/team.repo';
import UserRepo from '../repos/user.repo';

export default class TeamUseCase {
  private readonly teamRepo: TeamRepo;
  private readonly userRepo: UserRepo;

  constructor(teamRepo: TeamRepo, userRepo: UserRepo) {
    this.teamRepo = teamRepo;
    this.userRepo = userRepo;
  }

  async create(payload: ICreateTeam): Promise<ITeamUseCaseResponse> {
    try {
      const team = await this.teamRepo.create(payload);
      if (!team) {
        return {
          success: false,
          message: 'Cannot create team',
        };
      }
      return {
        success: true,
        message: 'Team created successfully',
        data: team,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot create team',
        error: error.message,
      };
    }
  }

  async findOneById(id: string): Promise<ITeamUseCaseResponse> {
    try {
      const team = await this.teamRepo.findOneById(id);
      if (!team) {
        return {
          success: false,
          message: 'Team not found',
        };
      }
      return {
        success: true,
        message: 'Team found successfully',
        data: team,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find team',
        error: error.message,
      };
    }
  }

  async updateOneById(id: string, payload: IUpdateTeam): Promise<ITeamUseCaseResponse> {
    try {
      const team = await this.teamRepo.updateOneById(id, payload);
      if (!team) {
        return {
          success: false,
          message: 'Team not found',
        };
      }
      return {
        success: true,
        message: 'Team updated successfully',
        data: team,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot update team',
        error: error.message,
      };
    }
  }

  async searchTeamsByName(name: string): Promise<ITeamUseCaseResponse> {
    try {
      const teams = await this.teamRepo.searchTeamsByName(name);
      if (!teams) {
        return {
          success: false,
          message: 'Teams not found',
        };
      }
      return {
        success: true,
        message: 'Teams found successfully',
        data: teams,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find teams',
        error: error.message,
      };
    }
  }

  async deleteOneById(id: string): Promise<ITeamUseCaseResponse> {
    try {
      const team = await this.teamRepo.deleteOneById(id);
      if (!team) {
        return {
          success: false,
          message: 'Team not found',
        };
      }
      return {
        success: true,
        message: 'Team deleted successfully',
        data: team,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot delete team',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<ITeamUseCaseResponse> {
    try {
      const teams = await this.teamRepo.findAll();
      if (!teams) {
        return {
          success: false,
          message: 'Teams not found',
        };
      }
      return {
        success: true,
        message: 'Teams found successfully',
        data: teams,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find teams',
        error: error.message,
      };
    }
  }

  async findTeamsByUser(userId: string): Promise<ITeamUseCaseResponse> {
    try {
      const teams = await this.teamRepo.findTeamsByUser(userId);
      if (!teams) {
        return {
          success: false,
          message: 'Teams not found',
        };
      }
      return {
        success: true,
        message: 'Teams found successfully',
        data: teams,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find teams',
        error: error.message,
      };
    }
  }
}
