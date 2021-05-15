const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema(
	{
		category: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: String, // not required
		photos: [String], // autoconvert to small size
		videos: [String], // set max size, maybe autoconvert?
		price: {
			type: Number,
			required: true,
		},
		questions: [
			{
				type: Schema.Types.ObjectId,
				ref: "Question",
			},
		],
	},
	{ timestamps: true }
);

module.exports = model("Item", itemSchema);
