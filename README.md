https://lucid.app/lucidchart/b8146c43-ef1e-4dd0-93d8-3751e708711c/edit?viewport_loc=-199%2C49%2C1077%2C937%2C0_0&invitationId=inv_2757db89-ab8f-4226-a9a2-217a28c33695

# react-live-messenger

## Description

A real-time chat web app where users can log in, add friends and communicate with them in real time.
This application was built publicly with the entire build process avaiable on YouTube in a tutorial format.

[YouTube Playist](https://www.youtube.com/playlist?list=PLBieMfwfePY-PPxTYmYZteqYpC_D7W1JT)

## Project Structure

-   client - React.js Frontend
-   server - Node.js Backend
-   common - code shared between client and server

## How it works

-   Front-End: React.js
-   Back-End: Node.js / Express.js / Socket.io
-   Authenticaion: JWT
-   Database: PostgreSQL for the users, and Redis for the messages

## Running the Project

-   Clone the repository
-   CD into the client and server repository and run `yarn install`
-   run a redis container with
  `docker run --name my-redis-container -d -p 6379:6379 redis redis-server --save 60 1 --loglevel warning`


-   Have a PostreSQL container running. Make sure docker desktop is running. --name is container name. -p is port mapping. --rm will delete container when done.
    `docker run --name postgres-dev -e POSTGRES_PASSWORD=admin -p 5001:5432 -d postgres`

    In docker desktop, open the terminal for the postgres container.
    Connect to postgres
    `psql -U postgres`

List databases
`\l`

Create database
`CREATE DATABASE messenger;`

Connect to database
`\c messenger`

Display tables
`\dt`

List users
`\du`

-   Initialize the database `node init-db.js`
-   Note: all environment variables must be defined in a file named `.env`
-   Run `yarn dev:server` and `yarn dev:client`

##

Instead of starting redis and postgres above, could run docker compose up. His postgres container doesn't have tables either. So have to go in docker desktop and create it.

In docker compose yml, db port "5001:5432" means postman/localhost can hit 5001 and it will go to 5432 inside the postgres container.

In docker compose, the db in db:5432 corresponds to the generated host that compose creates for the db service.

##

REDIS
Get all keys
`keys *`
