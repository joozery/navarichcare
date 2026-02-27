import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const data = await req.json();
        const user = await AdminUser.findByIdAndUpdate(params.id, data, { new: true });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update admin user" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const user = await AdminUser.findByIdAndDelete(params.id);
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete admin user" }, { status: 500 });
    }
}
