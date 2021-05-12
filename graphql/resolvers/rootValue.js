const bcrypt = require("bcrypt");

const users = [];
const saltRounds = 12;

const transformUser = (user) => {
	return { ...user, password: null };
};

module.exports = {
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
};
