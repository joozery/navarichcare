"use client";

import React, { useState } from "react";
import { Users, Search, Filter, Plus, TrendingDown, Award, Target, AlertCircle, CreditCard } from "lucide-react";

const agents = [
    { id: "AG-001", name: "สุพรรณษา ใจดี", region: "กรุงเทพ HQ", portfolio: "฿2.4M", npl: "1.2%", commission: "฿24,000", score: 95, status: "excellent" },
    { id: "AG-002", name: "สมชาย มีรุ่งเรือง", region: "สมุทรปราการ", portfolio: "฿1.8M", npl: "0.8%", commission: "฿18,500", score: 98, status: "excellent" },
    { id: "AG-003", name: "วิชัย ก้องไกร", region: "นนทบุรี", portfolio: "฿3.1M", npl: "4.5%", commission: "฿31,000", score: 72, status: "warning" },
    { id: "AG-004", name: "นารี สดใส", region: "ปทุมธานี", portfolio: "฿1.2M", npl: "12.0%", commission: "฿12,400", score: 45, status: "critical" },
];

export default function AgentsManagement() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">จัดการตัวแทน (Agent Management)</h2>
                    <p className="text-gray-500 text-sm mt-1">ค่าคอมมิชชั่น, คะแนน NPL Score และระบบแจ้งเตือน Agent คุณภาพต่ำ</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    <Plus size={16} /> เพิ่มตัวแทนใหม่
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: <Users size={18} />, label: "ตัวแทนทั้งหมด", value: "48 คน", sub: "↑ เพิ่ม 4 คนเดือนนี้", bg: "bg-blue-50", color: "text-blue-500", subColor: "text-emerald-600" },
                    { icon: <Award size={18} />, label: "ค่าคอมฯ ค้างจ่าย", value: "฿85,900", sub: "จ่ายทันทีเมื่อสัญญาอนุมัติ", bg: "bg-amber-50", color: "text-amber-500", subColor: "text-gray-400" },
                    { icon: <Target size={18} />, label: "NPL เฉลี่ย", value: "2.4%", sub: "↑ สูงกว่าเป้า 0.4%", bg: "bg-red-50", color: "text-red-500", subColor: "text-red-600" },
                ].map(s => (
                    <div key={s.label} className="bg-white p-5 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3"><div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center ${s.color}`}>{s.icon}</div><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.label}</p></div>
                        <p className="text-2xl font-black text-gray-800">{s.value}</p>
                        <p className={`text-xs font-bold mt-1 ${s.subColor}`}>{s.sub}</p>
                    </div>
                ))}
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700"><strong>Agent นารี สดใส (AG-004)</strong> มีอัตรา NPL สูงผิดปกติ (12%) — ระบบได้แจ้งเตือน Super Admin แล้ว แนะนำระงับสิทธิ์คีย์ใบสมัครชั่วคราว</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="ค้นหารหัส / ชื่อตัวแทน..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"><Filter size={16} />กรอง</button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>{["ตัวแทน", "พื้นที่", "มูลค่าพอร์ต", "NPL Score", "ค่าคอมมิชชั่น", "จัดการ"].map(h => (
                                <th key={h} className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">{h}</th>
                            ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {agents.map((a) => (
                                <tr key={a.id} className="hover:bg-blue-50/20 transition-colors">
                                    <td className="px-5 py-4"><p className="text-sm font-bold text-gray-800">{a.name}</p><p className="text-xs text-blue-500 font-bold">{a.id}</p></td>
                                    <td className="px-5 py-4 text-xs font-semibold text-gray-600">{a.region}</td>
                                    <td className="px-5 py-4 text-sm font-black text-gray-800">{a.portfolio}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${a.score > 90 ? "bg-emerald-500" : a.score > 70 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${a.score}%` }}></div>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${a.status === "excellent" ? "bg-emerald-50 text-emerald-600" : a.status === "warning" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>NPL {a.npl}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4"><div className="flex items-center gap-2"><CreditCard size={14} className="text-gray-400" /><span className="text-sm font-black text-emerald-600">{a.commission}</span></div></td>
                                    <td className="px-5 py-4"><button className="text-blue-500 text-xs font-bold hover:underline">ดูรายละเอียด</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
