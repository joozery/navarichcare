import mongoose, { Schema, Document } from "mongoose";

export interface IAgent extends Document {
    agentCode: string;
    name: string;
    phone: string;
    commissionRate: number;
    nplScore: number; // 0-100
    isActive: boolean;
}

const AgentSchema: Schema = new Schema({
    agentCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    commissionRate: { type: Number, default: 5 },
    nplScore: { type: Number, default: 100 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model<IAgent>("Agent", AgentSchema);
