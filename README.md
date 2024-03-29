# Slick Chat

A simple real time chatting application built using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).
Checkout some of the screenshots [here](./Screenshots.md)!

# About

The entire application is written in Typescript. We use React for the front end and Express for the backend. The database used is PostgresQL and Socket.IO is used for implementing WebSockets.

This is the currently hosted application's architecture:

![App Arch](https://i.imgur.com/0TEktFs.png)

# Features

## Implemented

- [x] Chatting (duh)
- [x] Authentication (currently local)
- [x] Real time updates
- [x] Responsive
- [x] Infinite Scrolling for group chats
- [x] A robust API to allow front-ends for other platforms(like [TUIs](https://www.wikiwand.com/en/Text-based_user_interface))
- [x] Home Page
- [x] A catchy name
- [x] Notification support

# Setup

- Install [PostgreSQL](https://www.postgresql.org/download/).
- Install [Redis](https://redis.io/docs/getting-started/installation/).
- Clone the repository on your system.
- Replace the following files with the configuration as you want and save them without the '.example' suffix: [frontend env](./front-end/.env.example), [server env](./server/.env.example) and [database env](./server/src/sqlz/config/config.json.example)
- Install deps and start the server by:

```sh
cd server
npm install
npm run dev
```

- Install deps and start the frontend dev server in another terminal tab by:

```sh
cd front-end
npm install
npm start
```

# Contributors

- [Shashwat Khanna](https://github.com/TheTrio)
- [Varun Shrivastava](https://github.com/varun-s22)
- [Rushikesh Tote](https://github.com/rushitote)
