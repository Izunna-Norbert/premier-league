import DbModels from '../../config/db.models.config';
import { MTeam } from '../../models/interfaces/model.interface';
import { ICreateTeam } from '../interfaces/team.interface';

export default class TeamRepo {
  private readonly datastore: typeof DbModels;
  constructor(dbModels: typeof DbModels) {
    this.datastore = dbModels;
  }

  async create(payload: ICreateTeam): Promise<MTeam> {
    return await this.datastore.Team.create(payload);
  }

  async findOneById(id: string): Promise<MTeam | null> {
    return await this.datastore.Team.findById(id);
  }

  async updateOneById(id: string, payload: any): Promise<MTeam | null> {
    return await this.datastore.Team.findByIdAndUpdate(id, payload, { new: true });
  }

  async searchTeamsByName(name: string): Promise<MTeam[]> {
    return await this.datastore.Team.find({ name: { $regex: name, $options: 'i' } });
  }

  async deleteOneById(id: string): Promise<MTeam | null> {
    return await this.datastore.Team.findByIdAndDelete(id);
  }

  async findAll(): Promise<MTeam[]> {
    return await this.datastore.Team.find();
  }

  async findTeamsByUser(userId: string): Promise<MTeam[]> {
    return await this.datastore.Team.find({ createdBy: userId });
  }
}
