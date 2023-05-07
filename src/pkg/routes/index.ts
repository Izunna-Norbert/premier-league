import { AuthRoutes } from './auth.route';
import { FixtureRoutes } from './fixture.route';
import { SearchRoutes } from './search.route';
import { TeamRoutes } from './team.route';
import { UserRoutes } from './user.route';

export default {
  auth: AuthRoutes(),
  user: UserRoutes(),
  team: TeamRoutes(),
  fixture: FixtureRoutes(),
  search: SearchRoutes(),
};
