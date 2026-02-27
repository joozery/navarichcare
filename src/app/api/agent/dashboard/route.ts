import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Loan from "@/models/Loan";
import Registration from "@/models/Registration";
import Agent from "@/models/Agent";
import mongoose from "mongoose";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const agentId = searchParams.get("agentId");

        if (!agentId) {
            return NextResponse.json({ error: "Missing agentId" }, { status: 400 });
        }

        const stats = await Loan.aggregate([
            { $match: { agentId: new mongoose.Types.ObjectId(agentId) } },
            {
                $group: {
                    _id: null,
                    totalVolume: { $sum: "$loanAmount" },
                    customerCount: { $count: {} },
                }
            }
        ]);

        const summary = stats[0] || { totalVolume: 0, customerCount: 0 };

        // Calculate estimated commission (e.g., 500 per loan or % of volume)
        const estimatedCommission = summary.customerCount * 500;

        const recentLoans = await Loan.find({ agentId })
            .sort({ createdAt: -1 })
            .limit(5);

        return NextResponse.json({
            success: true,
            stats: {
                totalVolume: summary.totalVolume,
                customerCount: summary.customerCount,
                commission: estimatedCommission
            },
            recentLoans
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
