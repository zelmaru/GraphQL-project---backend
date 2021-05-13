const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		email: {
			// or social login?
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: Number,
		location: {
			// use google maps?
			lat: Number,
			lng: Number,
		},
		profilePhoto: String,
		bio: String,
		bankAccount: Number,
		items: [
			{
				type: Schema.Types.ObjectId,
				ref: "Item",
			},
		],
		orders: [
			{
				type: Schema.Types.ObjectId,
				ref: "Reservation",
			},
		],
		waysOfShipping: [{}],
	},
	{ timestamps: true }
);

module.exports = model("User", userSchema);
