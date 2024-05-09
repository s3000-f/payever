# Backend Software Web Engineer Assessment at payever

This project is the result of a challenge designed to assess the skills needed for a Back-end Engineer role. It involves building a simple REST application from the ground up, utilizing Nest.js, Typescript, MongoDB, RabbitMQ, and integrating with an external API (https://reqres.in/).

## Content

[1. Getting Started](#getting-started)  
&emsp;[1.1 Requirements](#requirements)  
[2. API Resources](#api-resources)  
&emsp;[2.1 Endpoints](#endpoints)  
[3. Automated Tests](#automated-tests)  
[4. Technologies](#technologies)

## Getting Started

This section provides instructions to set up the project.

### Requirements

Ensure these technologies are installed and running locally:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [RabbitMQ](https://www.rabbitmq.com/download.html)

To Run the application and the dependencies using docker, run the following command:
``` bash
docker-compose up
```

Follow these steps to configure your environment:

1. Edit the *'.env.example'* file as described within.
2. Run `npm install` to install all dependencies.
3. Use `npm run start:dev` to launch the application on port 3000, ready for testing and further development.

## API Resources

Interact with the application via an HTTP client like Insomnia, Postman.

### Endpoints

1. **POST /api/users:** Adds a user to the database and notifies via email and a RabbitMQ event.
2. **GET /api/user/{userId}:** Fetches user data, returning a JSON-formatted user.
3. **GET /api/user/{userId}/avatar:** Initially retrieves a user image from a URL, then saves to local storage with subsequent requests fetching the file directly.
4. **DELETE /api/user/{userId}/avatar:** Removes a user's avatar from both local storage and the database.

## Automated Tests

Unit Tests are available to ensure functionality. Run tests using:

``` bash
npm run test
```

Coverage details can be obtained with `npm run test:cov`.

## Technologies

Key technologies used in this project:

- Node.js
- Nest.js
- MongoDB
- Typescript
- RabbitMQ
