import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Loan from "@/models/Loan";
import Insurance from "@/models/Insurance";

export async function GET() {
    try {
        await dbConnect();

        // Find all loans that have insurance (assuming all loans right now)
        const loans = await Loan.find({ status: { $ne: "closed" } }).populate('agentId branchId');

        let totalUnrecognized = 0;
        let recognizedThisMonth = 0;
        const recentAmortizations: any[] = [];

        loans.forEach(loan => {
            // Assume insurance fee is 10% of loanAmount (as per accounting UI logic)
            const fee = loan.loanAmount * 0.1;
            const perMonth = fee / 36;

            const remainingMonths = 36 - loan.paidInstallments;
            totalUnrecognized += (perMonth * Math.max(0, remainingMonths));
            recognizedThisMonth += perMonth;

            recentAmortizations.push({
                device: loan.deviceModel,
                id: loan.contractId,
                perMonth: perMonth,
                month: loan.paidInstallments + 1
            });
        });

        return NextResponse.json({
            success: true,
            totalUnrecognized,
            recognizedThisMonth,
            recentAmortizations: recentAmortizations.slice(-5)
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
