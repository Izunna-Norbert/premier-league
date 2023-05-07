# MOCK PREMIER LEAGUE

This assessment involves building an API for a "Mock Premier League". The API serves the latest scores of fixtures of matches in the league, and supports authentication and session management, user and admin accounts, team and fixture management, and robust searching of fixtures and teams. The API also implements rate limiting and web caching using Redis.

## Technologies Used

1. NodeJS
2. Express
3. MongoDB
4. Redis
5. Docker
6. Jest
7. Supertest
8. Typescript


## Getting Started

To get started with this project, you need to have the following installed:

1. NodeJS
2. Docker
3. Docker Compose

## Installation

1. Clone this repository into your local machine:
```
git clone https://github.com/Izunna-Norbert/premier-league.git
```

2. Change into the directory of the project:
```
cd premier-league
```

3. Install all dependencies:
```
yarn install
```

4. Create a `.env` file in the root directory of the project and copy the content of `.env.example` into it. Then, update the values of the environment variables to the appropriate values.

5. If you want to seed some data into the database, run the following command:
```
yarn migrate
```

6. Start the application:
```
yarn start:dev
```
or 

```
yarn start
```

## Testing

To run tests, run the following command:
```
yarn test
```

## API Documentation

The API documentation is available at [https://documenter.getpostman.com/view/10589000/SzYXWv3i?version=latest](https://documenter.getpostman.com/view/10589000/SzYXWv3i?version=latest)

## Author

Izunna Norbert Agu

