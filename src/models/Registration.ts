import mongoose, { Schema, model, models } from "mongoose";

const RegistrationSchema = new Schema(
    {
        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        imei: {
            type: String,
            required: [true, "Please provide an IMEI number"],
        },
        brand: {
            type: String,
            required: [true, "Please provide a device brand"],
        },
        model: {
            type: String,
            required: [true, "Please provide a device model"],
        },
        fullName: {
            type: String,
            required: [true, "Please provide your full name"],
        },
        email: {
            type: String,
            required: [true, "Please provide your email"],
        },
        idCard: {
            type: String,
            required: [true, "Please provide your ID Card number"],
        },
        address: {
            type: String,
            required: [true, "Please provide your address"],
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Registration = models.Registration || model("Registration", RegistrationSchema);

export default Registration;
