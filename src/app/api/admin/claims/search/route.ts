import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { query } = await req.json();

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ error: "ระบุข้อความสำหรับค้นหา" }, { status: 400 });
        }

        // ค้นหาจาก IMEI หรือ เลขบัตรประชาชน แบบตรงๆ
        const cleanQuery = query.trim();
        const registration = await Registration.findOne({
            $or: [
                { imei: cleanQuery },
                { idCard: cleanQuery }
            ]
        }).sort({ createdAt: -1 });

        if (!registration) {
            return NextResponse.json({ error: "ไม่พบข้อมูลในระบบ หรือไม่มีกรมธรรม์ที่เปิดใช้งานอยู่" }, { status: 404 });
        }

        if (registration.status !== "approved") {
            return NextResponse.json({
                error: "ประกันของลูกค้ายังไม่ได้รับการอนุมัติ สถานะปัจจุบัน: " + registration.status
            }, { status: 403 });
        }

        return NextResponse.json({
            success: true,
            data: registration
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
