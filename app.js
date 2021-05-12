require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema/schema");
const rootValue = require("./graphql/resolvers/rootValue");
const { buildSchema } = require("graphql");
const bcrypt = require("bcrypt");

const app = express();

const users = [];
const saltRounds = 12;

const transformUser = (user) => {
	return { ...user, password: null };
};

app.use(
	"/graphql",
	graphqlHTTP({
		schema: buildSchema(`
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
    `),
		rootValue: {
			users: () => {
				return users.map((user) => transformUser(user));
			},
			createUser: async (args) => {
				console.log(args);
				const { username, password } = args.userInput;
				const user = {
					username,
					password: await bcrypt.hash(password, saltRounds),
				};
				users.push(user);
				return transformUser(user);
			},
			loginUser: async ({ username, password }) => {
				let user = users.find((user) => user.username === username);
				if (!user) {
					throw new Error("User not found", 404);
				}

				const passwordOK = await bcrypt.compare(password, user.password);

				if (!passwordOK) {
					throw new Error("Wrong credentials", 401);
				}

				return transformUser(user);
			},
		},
		graphiql: true,
	})
);

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
