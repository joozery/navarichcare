"use client";
import React from "react";
import { Building2, AlertCircle, TrendingDown, Smartphone } from "lucide-react";

const nplData = [
    { customer: "เกรียงไกร มีสุข", device: "iPhone 15", agent: "AG-001", overdue: "฿4,200", days: 12, recovery: "฿11,550", status: "seized" },
    { customer: "วรรณา พลาไว", device: "iPhone 13 Pro", agent: "AG-004", overdue: "฿8,750", days: 31, recovery: "฿8,700", status: "legal" },
    { customer: "ประสิทธิ์ คงดี", device: "Samsung S24", agent: "AG-003", overdue: "฿3,100", days: 8, recovery: "฿7,800", status: "warning" },
];

const statusMap = { seized: { label: "ยึดเครื่องแล้ว", cls: "bg-red-50 text-red-600" }, legal: { label: "ดำเนินคดี", cls: "bg-purple-50 text-purple-600" }, warning: { label: "เตือนครั้งที่ 2", cls: "bg-amber-50 text-amber-600" } };

export default function NPLPage() {
    const totalNpl = 203000;
    const recoveryRate = 0.30;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-gray-800">หนี้เสีย (NPL Management)</h2>
                <p className="text-gray-500 text-sm mt-1">ติดตามหนี้เสียแยกตาม Agent และประมาณการมูลค่ากู้คืน 30%</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">มูลค่า NPL รวม</p>
                    <p className="text-2xl font-black text-red-600">฿{totalNpl.toLocaleString()}</p>
                    <p className="text-xs text-red-500 font-bold mt-1">↑ 11 ราย</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">ประมาณกู้คืน (30%)</p>
                    <p className="text-2xl font-black text-amber-600">฿{(totalNpl * recoveryRate).toLocaleString()}</p>
                    <p className="text-xs text-gray-400 font-bold mt-1">จากเครื่องยึด</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">สูญจริง (70%)</p>
                    <p className="text-2xl font-black text-gray-800">฿{(totalNpl * 0.7).toLocaleString()}</p>
                    <p className="text-xs text-gray-400 font-bold mt-1">หักออกจากกำไร</p>
                </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">Agent <strong>นารี สดใส</strong> และ <strong>วิชัย ก้องไกร</strong> มีอัตรา NPL เกินเป้า — ระบบบล็อกการรับสัญญาใหม่ชั่วคราวแล้ว</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2"><TrendingDown size={16} className="text-red-500" /><h4 className="font-bold text-gray-800 text-sm">รายการหนี้เสีย</h4></div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>{["ลูกค้า", "อุปกรณ์", "Agent", "ค้างชำระ", "วันที่ค้าง", "กู้คืนประมาณ", "สถานะ"].map(h => (
                                <th key={h} className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {nplData.map((n, i) => {
                                const s = statusMap[n.status as keyof typeof statusMap];
                                return (
                                    <tr key={i} className="hover:bg-blue-50/10">
                                        <td className="px-5 py-4 text-sm font-bold text-gray-800">{n.customer}</td>
                                        <td className="px-5 py-4"><div className="flex items-center gap-2"><Smartphone size={14} className="text-gray-400" /><span className="text-sm text-gray-600">{n.device}</span></div></td>
                                        <td className="px-5 py-4 text-xs font-bold text-blue-600">{n.agent}</td>
                                        <td className="px-5 py-4 text-sm font-black text-red-600">{n.overdue}</td>
                                        <td className="px-5 py-4 text-sm font-bold text-gray-700">{n.days} วัน</td>
                                        <td className="px-5 py-4 text-sm font-black text-amber-600">{n.recovery}</td>
                                        <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span></td>
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
