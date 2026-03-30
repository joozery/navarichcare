import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import RepairCustomer from "@/models/RepairCustomer";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");
        const phone = searchParams.get("phone");

        let filter: any = {};
        if (phone) {
            filter.phone = phone;
        } else if (query) {
            filter = {
                $or: [
                    { firstName: { $regex: query, $options: "i" } },
                    { lastName: { $regex: query, $options: "i" } },
                    { phone: { $regex: query, $options: "i" } },
                ],
            };
        }

        const customers = await RepairCustomer.find(filter).sort({ createdAt: -1 }).limit(50);
        return NextResponse.json(customers);
    } catch (error) {
        console.error("Fetch Customers Error:", error);
        return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();
        
        // Basic validation
        if (!data.firstName || !data.lastName || !data.phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const customer = await RepairCustomer.create(data);
        return NextResponse.json(customer, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Customer already exists" }, { status: 400 });
        }
        console.error("Create Customer Error:", error);
        return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
    }
}
