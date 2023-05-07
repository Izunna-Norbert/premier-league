# Author: Izunna Norbert Agu
FROM node:19-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json /app
COPY yarn.lock /app

# Install app dependencies
RUN yarn


# Bundle app source
COPY . /app


# Build app
RUN yarn build

# Start app
CMD ["yarn", "start"]


