import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Package from "@/models/Package";

export async function GET() {
    try {
        await connectToDatabase();
        const packages = await Package.find({}).sort({ order: 1 });
        return NextResponse.json(packages);
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to fetch packages", error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const newPackage = await Package.create(body);
        return NextResponse.json(newPackage, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to create package", error: error.message }, { status: 500 });
    }
}
