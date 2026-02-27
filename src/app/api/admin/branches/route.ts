import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Branch from "@/models/Branch";

export async function GET() {
    try {
        await dbConnect();
        const branches = await Branch.find().sort({ name: 1 });
        return NextResponse.json({ success: true, branches });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const branch = await Branch.create(body);
        return NextResponse.json({ success: true, branch });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
