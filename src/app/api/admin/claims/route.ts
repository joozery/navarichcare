import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Claim from "@/models/Claim";
import Insurance from "@/models/Insurance";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { insuranceId, claimType, deductibleAmount, description, photoEvidence } = await req.json();

        const insurance = await Insurance.findById(insuranceId);
        if (!insurance) {
            return NextResponse.json({ error: "ไม่พบข้อมูลกรมธรรม์" }, { status: 404 });
        }

        if (insurance.status !== "active") {
            return NextResponse.json({ error: "กรมธรรม์นี้ไม่อยู่ในสถานะคุ้มครอง" }, { status: 400 });
        }

        // 1. Check Quota
        const currentQuota = insurance.quota[claimType as keyof typeof insurance.quota];
        if (currentQuota.used >= currentQuota.total) {
            return NextResponse.json({ error: `โควตาสำหรับ ${claimType} หมดแล้ว` }, { status: 400 });
        }

        // 2. Create Claim Record
        const claim = await Claim.create({
            insuranceId,
            policyId: insurance.policyId,
            imei: insurance.imei,
            claimType,
            deductibleAmount,
            description,
            photoEvidence,
            status: "completed" // Assuming simple workflow for now
        });

        // 3. Update Quota
        insurance.quota[claimType as keyof typeof insurance.quota].used += 1;
        await insurance.save();

        return NextResponse.json({ success: true, claim });
    } catch (error: any) {
        console.error("Claim processing error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const claims = await Claim.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, claims });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
