const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const shippingSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("Shipping", shippingSchema);
