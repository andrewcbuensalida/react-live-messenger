https://lucid.app/lucidchart/b8146c43-ef1e-4dd0-93d8-3751e708711c/edit?viewport_loc=-199%2C49%2C1077%2C937%2C0_0&invitationId=inv_2757db89-ab8f-4226-a9a2-217a28c33695
# react-live-messenger

## Description

A real-time chat web app where users can log in, add friends and communicate with them in real time.
This application was built publicly with the entire build process avaiable on YouTube in a tutorial format.

[YouTube Playist](https://www.youtube.com/playlist?list=PLBieMfwfePY-PPxTYmYZteqYpC_D7W1JT)

## Project Structure

- client - React.js Frontend
- server - Node.js Backend
- common - code shared between client and server

## How it works

- Front-End: React.js
- Back-End: Node.js / Express.js / Socket.io
- Authenticaion: JWT
- Database: PostgreSQL and Redis

## Running the Project

- Clone the repository
- CD into the repository and run `yarn`
- Have a Redis instance listening on `localhost:6379` OR define an env variable named `REDIS_URL`
      Install redis on windows
      open wsl then input commands in https://redis.io/docs/getting-started/installation/install-redis-on-windows/

      Then start redis
        sudo service redis-server start

- Have a PostreSQL db running and provide either `DATABASE_URL` as an environment variable, or provide the following:
  <br/>`DATABASE_NAME`
  <br/>`DATABASE_HOST`
  <br/>`DATABASE_USER`
  <br/>`DATABASE_PASSWORD`
  <br/>`DATABASE_PORT`
  <br/>`COOKIE_SECRET`

        database: "messenger",
        host: "localhost",
        username: "postgres",
        password: "admin",
        port: 5432,

    start a postgres instance. Make sure docker desktop is running. --name is container name. -p is port mapping. --rm will delete container when done.
  docker run --name postgres-dev -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres

  In docker desktop, open the terminal for the postgres container. 
Connect to postgres
  psql -U postgres

List databases 
  \l

Create database
  CREATE DATABASE messenger;

Connect to database
  \c messenger

Display tables
  \dt

List users 
  \du

- Initialize the database with the queries found in `packages/server/database.sql`
- Note: all environment variables must be defined in a file named `.env`
- Run `yarn dev:server` and `yarn dev:client`

================================================
(This might not be a probem after all)
When doing yarn dev:client, it gets stuck at 
  Note that the development build is not optimized.
  To create a production build, use npm run build.
Trying to use node 20 instead of 16. Now it errors with
  digital envelope routines::unsupported
Now trying node 18. Still 
  digital envelope routines::unsupported
Trying to upgrade react-scripts to 5+
  npm uninstall react-scripts
  npm install react-scripts
Now the error is
  Failed to parse source map from 'C:\swe\code\redis-postgres-socketio-node-react-messenger\node_modules\src\index.ts' file: Error: ENOENT: no such file or directory, open 'C:\swe\code\redis-postgres-socketio-node-react-messenger\node_modules\src\index.ts'

  webpack compiled with 1 warning

Now trying 
  "scripts": {
		"start": "react-scripts --openssl-legacy-provider start",
It gets stuck again at (not a bad thing)
  Note that the development build is not optimized.
  To create a production build, use npm run build.
=================================

Instead of starting redis and postgres above,  could run docker compose up. His postgres container doesn't have tables either. So have to go in docker desktop and create it.


In docker compose yml, db port "5001:5432" means postman/localhost can hit 5001 and it will go to 5432 inside the postgres container. 

In docker compose, the db in db:5432 corresponds to the generated host that compose creates for the db service.

===================================
REDIS
Get all keys
  keys *