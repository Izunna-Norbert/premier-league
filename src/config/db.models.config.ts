import { MUser, MFixture, MTeam } from '../models/interfaces/model.interface';
import UserSchema from '../models/user.model';
import FixtureSchema from '../models/fixture.model';
import TeamSchema from '../models/team.model';
import db from './db.config';

const DbModels = {
  User: db.model<MUser>('User', UserSchema),
  Fixture: db.model<MFixture>('Fixture', FixtureSchema),
  Team: db.model<MTeam>('Team', TeamSchema),
};
export default DbModels;
