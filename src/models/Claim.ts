import mongoose, { Schema, Document } from "mongoose";

export interface IClaim extends Document {
    insuranceId: mongoose.Types.ObjectId;
    policyId: string;
    imei: string;
    claimType: "screen" | "water" | "battery";
    deductibleAmount: number;
    description: string;
    status: "pending" | "processing" | "completed" | "rejected";
    technicianId?: string;
    sparePartUsed?: string;
    photoEvidence: string[]; // URLs to photos
    createdAt: Date;
    updatedAt: Date;
}

const ClaimSchema: Schema = new Schema(
    {
        insuranceId: { type: Schema.Types.ObjectId, ref: "Insurance", required: true },
        policyId: { type: String, required: true },
        imei: { type: String, required: true },
        claimType: { type: String, enum: ["screen", "water", "battery"], required: true },
        deductibleAmount: { type: Number, required: true },
        description: { type: String },
        status: { type: String, enum: ["pending", "processing", "completed", "rejected"], default: "pending" },
        technicianId: { type: String },
        sparePartUsed: { type: String },
        photoEvidence: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.models.Claim || mongoose.model<IClaim>("Claim", ClaimSchema);
