import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function GET() {
    try {
        await connectToDatabase();
        const registrations = await Registration.find()
            .select("-images -paymentReceipt")
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json({ data: registrations }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await connectToDatabase();
        const { id, status, paymentReceipt, policyNumber, referenceNumber } = await req.json();

        const updateData: any = { status };
        if (paymentReceipt) updateData.paymentReceipt = paymentReceipt;
        if (policyNumber !== undefined) updateData.policyNumber = policyNumber;
        if (referenceNumber !== undefined) updateData.referenceNumber = referenceNumber;
        if (status === "approved") updateData.approvedAt = new Date();

        const registration = await Registration.findByIdAndUpdate(id, updateData, { new: true });

        return NextResponse.json({ message: "Updated successfully", data: registration }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectToDatabase();
        const { ids } = await req.json();
        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ message: "ids array required" }, { status: 400 });
        }
        const result = await Registration.deleteMany({ _id: { $in: ids } });
        return NextResponse.json({ success: true, deletedCount: result.deletedCount }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
