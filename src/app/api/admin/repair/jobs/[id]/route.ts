import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import RepairJob from "@/models/RepairJob";

import { sendLineFlexMessage } from "@/lib/line-messaging";

interface Context {
    params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Context) {
    try {
        await dbConnect();
        const { id } = await params;
        const job = await RepairJob.findById(id).populate("customer").populate("assignedTechnician", "name username");

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json(job);
    } catch (error) {
        console.error("Fetch Job Error:", error);
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: Context) {
    try {
        await dbConnect();
        const { id } = await params;
        const data = await req.json();

        const currentJob = await RepairJob.findById(id).populate("customer");
        if (!currentJob) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        const getStatusLabel = (status: string) => {
            switch (status) {
                case "pending": return "รอตรวจเช็ก";
                case "checking": return "กำลังเช็กอาการ";
                case "quoted": return "เสนอราคาแล้ว";
                case "waiting_approval": return "รออนุมัติ";
                case "in_progress": return "กำลังซ่อม";
                case "waiting_parts": return "รออะไหล่";
                case "testing": return "ตรวจสอบงานซ่อม";
                case "ready_pickup": return "ซ่อมเสร็จ/รอรับคืน";
                case "completed": return "รับเครื่องคืนแล้ว";
                case "cancelled": return "ยกเลิก";
                default: return status;
            }
        };

        const getStatusColor = (status: string) => {
            switch (status) {
                case "completed": return "#10B981"; // emerald
                case "ready_pickup": return "#3B82F6"; // blue
                case "cancelled": return "#EF4444"; // red
                case "checking":
                case "quoted":
                case "waiting_approval": return "#F59E0B"; // amber
                default: return "#0F172A"; // slate-900
            }
        };

        // If status is changing, track it in history and notify via LINE Messaging API
        if (data.status && data.status !== currentJob.status) {
            const historyItem = {
                status: data.status,
                changedBy: data.adminUsername || "admin",
                changedAt: new Date(),
                note: data.statusNote || "",
            };
            
            if (!currentJob.statusHistory) currentJob.statusHistory = [];
            currentJob.statusHistory.push(historyItem);
            
            if (data.status === "completed") {
                data.completedAt = new Date();
            }

            // ADVANCED LINE NOTIFICATION (FLEX MESSAGE)
            const adminUserId = process.env.LINE_ADMIN_USER_ID;
            if (adminUserId) {
                await sendLineFlexMessage(
                    adminUserId, 
                    currentJob, 
                    getStatusLabel(data.status), 
                    getStatusColor(data.status)
                );
            }
        }

        const updatedJob = await RepairJob.findByIdAndUpdate(id, data, { new: true })
            .populate("customer");

        return NextResponse.json(updatedJob);
    } catch (error: any) {
        console.error("Update Job Error:", error);
        return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Context) {
    try {
        await dbConnect();
        const { id } = await params;
        await RepairJob.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
    }
}
