import DbModels from '../../config/db.models.config';
import { MFixture } from '../../models/interfaces/model.interface';
import { IFixture } from '../interfaces/fixture.interface';

export default class FixtureRepo {
  private readonly datastore: typeof DbModels;
  constructor(dbModels: typeof DbModels) {
    this.datastore = dbModels;
  }

  async create(payload: IFixture): Promise<MFixture> {
    return await this.datastore.Fixture.create(payload);
  }

  async findOneById(id: string): Promise<MFixture | null> {
    return await this.datastore.Fixture.findById(id);
  }

  async updateOneById(id: string, payload: any): Promise<MFixture | null> {
    return await this.datastore.Fixture.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteOneById(id: string): Promise<MFixture | null> {
    return await this.datastore.Fixture.findByIdAndDelete(id);
  }

  async findAll(): Promise<MFixture[]> {
    //sort by earliest date first
    return await this.datastore.Fixture.find().sort({ startDate: 1 });
  }

  async findUpcomingFixtures(): Promise<MFixture[]> {
    return await this.datastore.Fixture.find({ startDate: { $gte: new Date() } }).sort({ startDate: 1 });
  }

  async findPastFixtures(): Promise<MFixture[]> {
    return await this.datastore.Fixture.find({ startDate: { $lt: new Date() } }).sort({ startDate: 1 });
  }

  async findFixturesByTeam(teamId: string): Promise<MFixture[]> {
    return await this.datastore.Fixture.find({ $or: [{ homeTeam: teamId }, { awayTeam: teamId }] }).sort({
      startDate: 1,
    });
  }

  async searchFixtures(query: string): Promise<MFixture[]> {
    return await this.datastore.Fixture.find({
      $or: [{ homeTeamName: { $regex: query, $options: 'i' } }, { awayTeamName: { $regex: query, $options: 'i' } }],
    }).sort({ startDate: 1 });
  }

  async searchFixturesByTeam(query: string, teamId: string): Promise<MFixture[]> {
    return await this.datastore.Fixture.find({
      $or: [
        { homeTeamName: { $regex: query, $options: 'i' }, homeTeam: teamId },
        { awayTeamName: { $regex: query, $options: 'i' }, awayTeam: teamId },
      ],
    }).sort({ startDate: 1 });
  }
}
