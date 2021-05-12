const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type User {
  username: String!
  password: String
}

type RootQuery {
  users: [User!]!
  loginUser(username: String!, password: String!): User!
}

input UserInput {
  username: String!
  password: String!
}

type RootMutation {
  createUser(userInput: UserInput): User
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
