const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionSchema = new Schema(
	{
		question: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

// response will be just tagging the user like @user

module.exports = model("Question", questionSchema);
