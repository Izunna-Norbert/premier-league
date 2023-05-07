import { seedFixtures, seedTeams, seedUsers } from './datastore.migration';

async function runMigrations() {
  const users = await seedUsers(50);
  const teams = await seedTeams();
  const fixtures = await seedFixtures(40);
  console.log('users', users);
  console.log('teams', teams);
  console.log('fixtures', fixtures);
}

runMigrations();
