import { faker } from '@faker-js/faker';
import { MUser, MFixture, MTeam } from '../models/interfaces/model.interface';
import { IFixture } from '../pkg/interfaces/fixture.interface';
import { ICreateTeam } from '../pkg/interfaces/team.interface';
import { ICreateUser } from '../pkg/interfaces/user.interface';
import DbModels from '../config/db.models.config';
import json from '../top5.json';

export const seedUsers = async (count: number): Promise<MUser[]> => {
  const users: MUser[] = [];
  for (let i = 0; i < count; i++) {
    const payload: ICreateUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.fullName(),
    };
    const user = await DbModels.User.create(payload);
    users.push(user);
  }
  return users;
};

export const seedTeams = async (): Promise<MTeam[]> => {
  const teams: MTeam[] = [];
  const premTeams = json.find((league) => league.name === 'Premier League');
  console.info('premTeams', premTeams?.clubs.length);
  const randomUser = await DbModels.User.findOne({ isAdmin: true });
  if (premTeams) {
    for (const team of premTeams.clubs) {
      const payload: ICreateTeam = {
        name: team.name,
        description: faker.lorem.paragraph(),
        createdBy: randomUser?.id,
      };
      const newTeam = await DbModels.Team.create(payload);
      teams.push(newTeam);
    }
  }
  return teams;
};

export const seedFixtures = async (count: number): Promise<MFixture[]> => {
  const fixtures: MFixture[] = [];
  const teams = await DbModels.Team.find();
  const randomUser = await DbModels.User.findOne({ isAdmin: true });
  if (teams && teams.length > 0) {
    for (let i = 0; i < count; i++) {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      const awayTeam = teams[Math.floor(Math.random() * teams.length)];
      if (homeTeam.id === awayTeam.id) continue;
      const payload: IFixture = {
        homeTeam: homeTeam.id,
        awayTeam: awayTeam.id,
        homeTeamName: homeTeam.name,
        awayTeamName: awayTeam.name,
        homeTeamScore: Math.floor(Math.random() * 5),
        awayTeamScore: Math.floor(Math.random() * 5),
        startDate: faker.date.past(),
        //90 minutes after start date
        endDate: new Date(new Date().getTime() + 90 * 60000),
        createdBy: randomUser?.id,
      };
      const newFixture = await DbModels.Fixture.create(payload);
      fixtures.push(newFixture);
    }
  }
  return fixtures;
};
