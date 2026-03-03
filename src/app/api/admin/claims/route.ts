import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Claim from "@/models/Claim";

// GET all claims
export async function GET() {
    try {
        await dbConnect();
        const claims = await Claim.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: claims });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST create new claim
export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const claim = await Claim.create(body);
        return NextResponse.json({ success: true, data: claim }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
