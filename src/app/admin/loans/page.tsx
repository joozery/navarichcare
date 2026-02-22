"use client";

import React, { useState } from "react";
import { Smartphone, Search, Filter, Plus, Lock, CheckCircle2, AlertTriangle, MoreHorizontal, AlertCircle, Clock } from "lucide-react";

const loans = [
    { id: "NC-1001", customer: "คุณมานพ ใจดี", device: "iPhone 15 Pro Max", agent: "AG-001", amount: "฿45,000", paid: 8, total: 24, overdue: 0, type: "ผ่อน", status: "normal" },
    { id: "NC-1002", customer: "คุณรัตนา แช่ลี้", device: "iPhone 14 Plus", agent: "AG-002", amount: "฿32,000", paid: 3, total: 12, overdue: 2, type: "ผ่อน", status: "warning" },
    { id: "NC-1003", customer: "คุณเกรียงไกร มีสุข", device: "iPhone 15", agent: "AG-001", amount: "฿38,500", paid: 1, total: 12, overdue: 8, type: "iCloud", status: "critical" },
    { id: "NC-1004", customer: "คุณนารี สดใส", device: "iPad Pro M4", agent: "AG-003", amount: "฿54,000", paid: 6, total: 36, overdue: 0, type: "ผ่อน", status: "normal" },
];

const statusMap = {
    normal: { label: "ปกติ", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700" },
    warning: { label: "ค้าง 1-3 วัน", dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700" },
    critical: { label: "ค้าง 7 วัน+", dot: "bg-red-500", badge: "bg-red-50 text-red-700" },
};

export default function LoansPage() {
    const [filter, setFilter] = useState("all");
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">จัดการสินเชื่อ (Loan Management)</h2>
                    <p className="text-gray-500 text-sm mt-1">ผ่อนมือถือ (ดอก 3%/เดือน) และจำนำ iCloud พร้อมคำนวณยอดค้างชำระ Real-time</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700">
                    <Plus size={16} /> เพิ่มสัญญาใหม่
                </button>
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "ปกติ", count: 142, color: "border-emerald-200 bg-emerald-50", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
                    { label: "ค้าง 1-3 วัน", count: 28, color: "border-amber-200 bg-amber-50", icon: <Clock size={16} className="text-amber-500" /> },
                    { label: "ค้าง 7 วัน+", count: 11, color: "border-red-200 bg-red-50", icon: <AlertCircle size={16} className="text-red-500" /> },
                ].map((s) => (
                    <div key={s.label} className={`p-4 rounded-xl border ${s.color}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {s.icon}
                            <p className="text-sm font-bold text-gray-700">{s.label}</p>
                        </div>
                        <p className="text-2xl font-black text-gray-800">{s.count} <span className="text-sm font-normal text-gray-400">ราย</span></p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input placeholder="ค้นหาชื่อลูกค้า, IMEI, เลขสัญญา..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none" />
                </div>
                <div className="flex gap-2">
                    {["all", "normal", "warning", "critical"].map((f) => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                            {f === "all" ? "ทั้งหมด" : statusMap[f as keyof typeof statusMap].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>{["ลูกค้า / รุ่น", "Agent", "ยอดจัด", "ความคืบหน้า", "สถานะ", "ประเภท", "จัดการ"].map((h) => (
                                <th key={h} className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loans.filter(l => filter === "all" || l.status === filter).map((loan) => {
                                const s = statusMap[loan.status as keyof typeof statusMap];
                                return (
                                    <tr key={loan.id} className="hover:bg-blue-50/20 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-bold text-gray-800">{loan.customer}</p>
                                            <p className="text-xs text-gray-400">{loan.device} • {loan.id}</p>
                                        </td>
                                        <td className="px-5 py-4 text-xs font-semibold text-blue-600">{loan.agent}</td>
                                        <td className="px-5 py-4 text-sm font-black text-gray-800">{loan.amount}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(loan.paid / loan.total) * 100}%` }} />
                                                </div>
                                                <span className="text-xs text-gray-500 whitespace-nowrap">{loan.paid}/{loan.total}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.badge}`}>{s.label}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${loan.type === "iCloud" ? "bg-purple-50 text-purple-600" : "bg-gray-100 text-gray-600"}`}>{loan.type}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                {loan.status === "critical" && (
                                                    <button className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                                        <Lock size={10} /> ล็อก iCloud
                                                    </button>
                                                )}
                                                <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><MoreHorizontal size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
