
# LifeX take home challenge

THANK YOU in advance for participating in the coding challenge from LifeX. We hope you find this as much fun as we do! ❤️


## Statement

You will be given a problem to solve and your task is to outline possible solutions to this problem and implement one of your solution to the backend.
As we understand that the challenge can be time consuming and your time limited, we ask you to spend no more than 4h on this project.
By 4 hours in, please feel free to stop working and explain what refactors / code organization / enhancements you would have made.
On top of that we want to show our appreciation of the time you spend on it - by donating $100 to the charity or open source project of your choice upon completion.

## Provided code
We've provided a backend (GraphQL API connected to a SQL database) for you to get up and running fast! We encourage you to use it if you think it will help, but feel free to roll your own solution if you like.

The code is very similar to our current backend as it use libraries we rely on: [TypeORM](https://typeorm.io/#/), [TypeGraphQL](https://typegraphql.com/) and [Jest](https://jestjs.io/) as testing framework

### Available scripts
1. `npm run start` To run the graphql server locally on port 3005
2. `npm run test` To run the tests on file changes
3. `npm run test:coverage` To run the tests and compute code coverage

### Tips
 - You don't need to preserve any of the existing code; feel free to modify them as you wish.
- Use any languages, frameworks, or libraries you like. Pick something you are comfortable with.
- Assume you don't need authentication
- Assume every users are current LifeX members 

## The problem
LifeX is present is different cities and countries and would like to offer extra services to the current members.
These services can for example be a tennis court in Paris or a boat in Copenhagen.
We would like to be able to manage the services and make it possible for the members to book them for a period that can vary from a hour to couple of days

### Requirements
- A service is available in only one city
- A member can book only one service at a time
- A service can only be book by one user at a time

### To go further
Let's say that instead of having one tennis court in Paris, we have multiple (Tennis court #1, Tennis court #2....). How would you update your solution to allow members to still book a service but without having to specify which number. In other words, a member wants to book a tennis court but don't care if it's tennis court #1 or tennis court #2

**Don't actually implement this**, but instead briefly explain what you would change and be prepared to talk about it during the tech interview 

## Submission

Create a zip file of your project (remove the `node_modules` folder) and send it to Jordane or Salomé
Don't forget to let us know which charity or open source project (present on this website: [https://opencollective.com/](https://opencollective.com/) ) you want to support
