import DbModels from '../../config/db.models.config';
import { MUser } from '../../models/interfaces/model.interface';
import { IAdvancedFind, ICreateUser } from '../interfaces/user.interface';

export default class UserRepo {
  private readonly datastore: typeof DbModels;
  constructor(dbModels: typeof DbModels) {
    this.datastore = dbModels;
  }

  async create(payload: ICreateUser): Promise<MUser> {
    return await this.datastore.User.create(payload);
  }

  async findOneByEmail(email: string): Promise<MUser | null> {
    return await this.datastore.User.findOne({ email });
  }

  async findOneById(id: string): Promise<MUser | null> {
    return await this.datastore.User.findById(id);
  }

  async updateOneById(id: string, payload: any): Promise<MUser | null> {
    return await this.datastore.User.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteOneById(id: string): Promise<MUser | null> {
    return await this.datastore.User.findByIdAndDelete(id);
  }

  async findAll(): Promise<MUser[]> {
    return await this.datastore.User.find();
  }

  async advancedFind(data: IAdvancedFind): Promise<any> {
    const { query, limit, page, filter } = data;
    let response = {
      users: [] as any[],
      fixtures: [] as any[],
      teams: [] as any[],
    };

    const regex = new RegExp(query, 'i');
    const functions = [];
    if (filter) {
      switch (filter) {
        case 'users':
          functions.push(
            this.datastore.User.find({ $or: [{ name: regex }, { email: regex }] })
              .limit(limit)
              .skip((page - 1) * limit),
          );
          break;
        case 'fixtures':
          functions.push(
            this.datastore.Fixture.find({ $or: [{ homeTeamName: regex }, { awayTeamName: regex }] })
              .limit(limit)
              .skip((page - 1) * limit),
          );
          break;
        case 'teams':
          functions.push(
            this.datastore.Team.find({ name: regex })
              .limit(limit)
              .skip((page - 1) * limit),
          );
          break;
        default:
          break;
      }
    } else {
      functions.push(
        this.datastore.User.find({ $or: [{ name: regex }, { email: regex }] })
          .limit(limit)
          .skip((page - 1) * limit),
      );
      functions.push(
        this.datastore.Fixture.find({ $or: [{ homeTeamName: regex }, { awayTeamName: regex }] })
          .limit(limit)
          .skip((page - 1) * limit),
      );
      functions.push(
        this.datastore.Team.find({ name: regex })
          .limit(limit)
          .skip((page - 1) * limit),
      );
    }
    await Promise.all(functions).then((values) => {
      if (filter) {
        switch (filter) {
          case 'users':
            response.users = values[0];
            break;
          case 'fixtures':
            response.fixtures = values[0];
            break;
          case 'teams':
            response.teams = values[0];
            break;
          default:
            break;
        }
      } else {
        response.users = values[0];
        response.fixtures = values[1];
        response.teams = values[2];
      }
    });
    return response;
    // await Promise.all([
    //   this.datastore.User.find({
    //     $or: [{ name: regex }, { email: regex }],
    //   })
    //     .limit(limit)
    //     .skip((page - 1) * limit),
    //   this.datastore.Fixture.find({
    //     $or: [{ homeTeamName: regex }, { awayTeamName: regex }],
    //   })
    //     .limit(limit)
    //     .skip((page - 1) * limit),
    //   this.datastore.Team.find({
    //     name: regex,
    //   })
    //     .limit(limit)
    //     .skip((page - 1) * limit),
    // ]).then((values) => {
    //   response.users = values[0];
    //   response.fixtures = values[1];
    //   response.teams = values[2];
    // });
    // return response;
  }
}
