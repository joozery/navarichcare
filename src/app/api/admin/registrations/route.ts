import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function GET() {
    try {
        await connectToDatabase();
        const registrations = await Registration.find().sort({ createdAt: -1 });
        return NextResponse.json({ data: registrations }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await connectToDatabase();
        const { id, status, paymentReceipt, policyNumber } = await req.json();

        const updateData: any = { status };
        if (paymentReceipt) updateData.paymentReceipt = paymentReceipt;
        if (policyNumber) updateData.policyNumber = policyNumber;
        if (status === "approved") updateData.approvedAt = new Date();

        const registration = await Registration.findByIdAndUpdate(id, updateData, { new: true });

        return NextResponse.json({ message: "Updated successfully", data: registration }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
