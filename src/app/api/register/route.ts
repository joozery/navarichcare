import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const registration = await Registration.create(body);

        return NextResponse.json(
            { message: "Registration created successfully", data: registration },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { message: "Failed to create registration", error: error.message },
            { status: 500 }
        );
    }
}
