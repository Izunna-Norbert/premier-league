import {
  ICreateFixture,
  IFixture,
  IFixtureUseCaseResponse,
  IUpdateFixture,
  IUpdateFixtureScore,
} from '../interfaces/fixture.interface';
import { ICreateTeam, ITeamUseCaseResponse } from '../interfaces/team.interface';
import FixtureRepo from '../repos/fixture.repo';
import TeamRepo from '../repos/team.repo';
import UserRepo from '../repos/user.repo';

export default class FixtureUseCase {
  private readonly teamRepo: TeamRepo;
  private readonly fixtureRepo: FixtureRepo;
  private readonly userRepo: UserRepo;

  constructor(teamRepo: TeamRepo, fixtureRepo: FixtureRepo, userRepo: UserRepo) {
    this.teamRepo = teamRepo;
    this.fixtureRepo = fixtureRepo;
    this.userRepo = userRepo;
  }

  async create(payload: ICreateFixture): Promise<IFixtureUseCaseResponse> {
    try {
      const { homeTeam, awayTeam } = payload;
      const homeTeamExists = await this.teamRepo.findOneById(homeTeam);
      if (!homeTeamExists) {
        return {
          success: false,
          message: 'Home team not found',
        };
      }
      const awayTeamExists = await this.teamRepo.findOneById(awayTeam);
      if (!awayTeamExists) {
        return {
          success: false,
          message: 'Away team not found',
        };
      }
      const params: IFixture = {
        homeTeam: homeTeamExists.id,
        awayTeam: awayTeamExists.id,
        homeTeamName: homeTeamExists.name,
        awayTeamName: awayTeamExists.name,
        startDate: payload.startDate,
        // 90 minutes after start date
        endDate: new Date(new Date(payload.startDate).getTime() + 90 * 60000),
        createdBy: payload.createdBy,
      };
      const fixture = await this.fixtureRepo.create(params);
      if (!fixture) {
        return {
          success: false,
          message: 'Cannot create fixture',
        };
      }
      return {
        success: true,
        message: 'Fixture created successfully',
        data: fixture,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot create fixture',
        error: error.message,
      };
    }
  }

  async findOneById(id: string): Promise<IFixtureUseCaseResponse> {
    try {
      const fixture = await this.fixtureRepo.findOneById(id);
      if (!fixture) {
        return {
          success: false,
          message: 'Fixture not found',
        };
      }
      return {
        success: true,
        message: 'Fixture found successfully',
        data: fixture,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find fixture',
        error: error.message,
      };
    }
  }

  async updateOneById(id: string, payload: IUpdateFixture): Promise<IFixtureUseCaseResponse> {
    try {
      const { homeTeam, awayTeam, startDate } = payload;
      const params: any = {};
      if (homeTeam) {
        const homeTeamExists = await this.teamRepo.findOneById(homeTeam);
        if (!homeTeamExists) {
          return {
            success: false,
            message: 'Home team not found',
          };
        }
        params['homeTeam'] = homeTeamExists.id;
        params['homeTeamName'] = homeTeamExists.name;
      }
      if (awayTeam) {
        const awayTeamExists = await this.teamRepo.findOneById(awayTeam);
        if (!awayTeamExists) {
          return {
            success: false,
            message: 'Away team not found',
          };
        }
        params['awayTeam'] = awayTeamExists.id;
        params['awayTeamName'] = awayTeamExists.name;
      }
      if (startDate) {
        params['startDate'] = new Date(startDate);
        params['endDate'] = new Date(new Date(startDate).getTime() + 90 * 60000);
      }
      const fixture = await this.fixtureRepo.updateOneById(id, params);
      if (!fixture) {
        return {
          success: false,
          message: 'Fixture not found',
        };
      }
      return {
        success: true,
        message: 'Fixture updated successfully',
        data: fixture,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot update fixture',
        error: error.message,
      };
    }
  }

  async updateOneByIdScore(id: string, payload: IUpdateFixtureScore): Promise<IFixtureUseCaseResponse> {
    try {
      const currentFixture = await this.fixtureRepo.findOneById(id);
      if (!currentFixture) return { success: false, message: 'Fixture not found' };
      if (currentFixture.startDate > new Date()) return { success: false, message: 'Fixture not started' };
      if (currentFixture.endDate < new Date()) return { success: false, message: 'Fixture has ended' };
      const fixture = await this.fixtureRepo.updateOneById(id, payload);
      if (!fixture) {
        return {
          success: false,
          message: 'Fixture not found',
        };
      }
      return {
        success: true,
        message: 'Fixture updated successfully',
        data: fixture,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot update fixture',
        error: error.message,
      };
    }
  }

  async deleteOneById(id: string): Promise<IFixtureUseCaseResponse> {
    try {
      const fixture = await this.fixtureRepo.deleteOneById(id);
      if (!fixture) {
        return {
          success: false,
          message: 'Fixture not found',
        };
      }
      return {
        success: true,
        message: 'Fixture deleted successfully',
        data: fixture,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot delete fixture',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<IFixtureUseCaseResponse> {
    try {
      const fixtures = await this.fixtureRepo.findAll();
      return {
        success: true,
        message: 'Fixtures found successfully',
        data: fixtures,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find fixtures',
        error: error.message,
      };
    }
  }

  async findUpcomingFixtures(): Promise<IFixtureUseCaseResponse> {
    try {
      const fixtures = await this.fixtureRepo.findUpcomingFixtures();
      return {
        success: true,
        message: 'Fixtures found successfully',
        data: fixtures,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find fixtures',
        error: error.message,
      };
    }
  }

  async findPastFixtures(): Promise<IFixtureUseCaseResponse> {
    try {
      const fixtures = await this.fixtureRepo.findPastFixtures();
      return {
        success: true,
        message: 'Fixtures found successfully',
        data: fixtures,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find fixtures',
        error: error.message,
      };
    }
  }

  async findFixturesByTeam(teamId: string): Promise<IFixtureUseCaseResponse> {
    try {
      const fixtures = await this.fixtureRepo.findFixturesByTeam(teamId);
      return {
        success: true,
        message: 'Fixtures found successfully',
        data: fixtures,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find fixtures',
        error: error.message,
      };
    }
  }

  async searchFixtures(query: string): Promise<IFixtureUseCaseResponse> {
    try {
      const fixtures = await this.fixtureRepo.searchFixtures(query);
      return {
        success: true,
        message: 'Fixtures found successfully',
        data: fixtures,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find fixtures',
        error: error.message,
      };
    }
  }

  async searchFixturesByTeam(query: string, teamId: string): Promise<IFixtureUseCaseResponse> {
    try {
      const fixtures = await this.fixtureRepo.searchFixturesByTeam(query, teamId);
      return {
        success: true,
        message: 'Fixtures found successfully',
        data: fixtures,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find fixtures',
        error: error.message,
      };
    }
  }
}
