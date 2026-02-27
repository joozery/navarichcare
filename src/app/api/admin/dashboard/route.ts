import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Loan from "@/models/Loan";
import Payment from "@/models/Payment";
import Insurance from "@/models/Insurance";
import Claim from "@/models/Claim";
import Agent from "@/models/Agent";

export async function GET() {
    try {
        await dbConnect();

        // Basic stats
        const totalLoans = await Loan.countDocuments();
        const activeLoans = await Loan.find({ status: { $ne: 'closed' } });

        // Net Profit Calculation (Simplified: Service Fees + Total Paid Interest - Overdue)
        // For demonstration, let's just sum up payments vs loan principal
        const allPayments = await Payment.find();
        const totalCollected = allPayments.reduce((sum, p) => sum + p.amount, 0);

        const allLoans = await Loan.find();
        const totalPrincipal = allLoans.reduce((sum, l) => sum + l.loanAmount, 0);

        // This is a placeholder for more complex logic
        const netProfit = totalCollected - (totalPrincipal * 0.1); // Mock cost

        const nplCount = await Loan.countDocuments({ status: { $in: ['warning', 'critical'] } });
        const nplValue = await Loan.aggregate([
            { $match: { status: { $in: ['warning', 'critical'] } } },
            { $group: { _id: null, total: { $sum: "$remainingBalance" } } }
        ]);

        const recentClaims = await Claim.find()
            .populate({
                path: 'insuranceId',
                populate: { path: 'loanId' }
            })
            .sort({ createdAt: -1 })
            .limit(5);

        const agents = await Agent.find();
        const agentPerformance = await Promise.all(agents.map(async (agent) => {
            const agentLoans = await Loan.countDocuments({ agentId: agent._id });
            const agentNpl = await Loan.countDocuments({ agentId: agent._id, status: { $in: ['warning', 'critical'] } });
            return {
                agent: agent.name,
                loans: agentLoans,
                npl: agentNpl,
                rate: agentLoans > 0 ? ((agentNpl / agentLoans) * 100).toFixed(1) + "%" : "0%",
                avatar: agent.name.substring(0, 2).toUpperCase()
            };
        }));

        return NextResponse.json({
            success: true,
            stats: {
                netProfit: "฿" + netProfit.toLocaleString(),
                totalCollected: "฿" + totalCollected.toLocaleString(),
                nplValue: "฿" + (nplValue[0]?.total || 0).toLocaleString(),
                activeLoansCount: activeLoans.length
            },
            agentPerformance,
            recentClaims: recentClaims.map(c => ({
                device: (c.insuranceId as any)?.loanId?.deviceModel || "Unknown",
                type: c.claimType === 'screen' ? 'จอแตก' : c.claimType === 'water' ? 'น้ำเข้า' : 'แบตเตอรี่',
                status: c.status === 'completed' ? 'เสร็จสมบูรณ์' : 'รอดำเนินการ',
                time: "Recently",
                color: c.claimType === 'screen' ? 'blue' : c.claimType === 'water' ? 'amber' : 'emerald'
            }))
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
