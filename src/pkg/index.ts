import DbModels from '../config/db.models.config';
import FixtureController from './controllers/fixture.controller';
import TeamController from './controllers/team.controller';
import UserController from './controllers/user.controller';
import FixtureRepo from './repos/fixture.repo';
import TeamRepo from './repos/team.repo';
import UserRepo from './repos/user.repo';
import FixtureUseCase from './usecases/fixture.usecase';
import TeamUseCase from './usecases/team.usecase';
import UserUseCase from './usecases/user.usecase';

export default {
  UserService: new UserController(new UserUseCase(new UserRepo(DbModels))),
  TeamService: new TeamController(new TeamUseCase(new TeamRepo(DbModels), new UserRepo(DbModels))),
  FixtureService: new FixtureController(
    new FixtureUseCase(new TeamRepo(DbModels), new FixtureRepo(DbModels), new UserRepo(DbModels)),
  ),
};
