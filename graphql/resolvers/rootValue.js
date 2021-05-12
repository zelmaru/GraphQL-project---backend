const bcrypt = require("bcrypt");
const User = require("../../models/user");

const users = [];
const saltRounds = 12;

const transformUser = (user) => {
	return { ...user, password: null }; // use .toJSON(),
};

module.exports = {
	users: async () => {
		let users;
		try {
			users = await User.find({}, "-password"); // hide password hash
		} catch (err) {
			throw new Error("Could not fetch users", 500);
		}

		if (!users) {
			throw new Error("No users found", 404);
		}

		return users.map((user) => transformUser(user));
	},
	createUser: async (args) => {
		console.log(args);
		const { username, password } = args.userInput;

		let existingUser;

		try {
			existingUser = await User.findOne({ username: username });
		} catch (err) {
			throw new Error("Registration failed", 500);
		}

		if (existingUser) {
			throw new Error("This email is already in use", 422);
		}

		const user = new User({
			username,
			password: await bcrypt.hash(password, saltRounds),
		});

		try {
			await user.save();
		} catch (err) {
			throw new Error("Registration failed", 500);
		}
		return transformUser(user);
	},
	loginUser: async ({ username, password }) => {
		let user;
		try {
			user = await User.findOne({ username });
		} catch (err) {
			throw new Error("Login failed", 500);
		}

		if (!user) {
			throw new Error("User with the given username does not exist", 404);
		}

		const passwordOK = await bcrypt.compare(password, user.password);

		if (!passwordOK) {
			throw new Error("Check your password", 401);
		}

		return transformUser(user);
	},
};
