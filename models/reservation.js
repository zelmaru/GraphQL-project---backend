const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reservationSchema = new Schema(
	{
		item: {
			type: Schema.Types.ObjectId,
			ref: "Item",
		},
		buyer: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = model("Reservation", reservationSchema);
