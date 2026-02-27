"use client";
import React, { useState, useEffect } from "react";
import { Users, Search, Filter, Plus, TrendingDown, Award, Target, AlertCircle, CreditCard, Loader2 } from "lucide-react";

export default function AgentsManagement() {
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const res = await fetch("/api/admin/agents");
            const data = await res.json();
            if (data.success) {
                setAgents(data.agents);
            }
        } catch (err) {
            console.error("Fetch agents failed", err);
        } finally {
            setLoading(false);
        }
    };

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { icon: <Users size={18} />, label: "ตัวแทนทั้งหมด", value: `${agents.length} คน`, sub: "↑ เพิ่มขึ้นเดือนนี้", bg: "bg-blue-50", color: "text-blue-500", subColor: "text-emerald-600" },
                    { icon: <Award size={18} />, label: "ค่าคอมฯ เฉลี่ย", value: "฿0", sub: "รอสรุปยอดรายเดือน", bg: "bg-amber-50", color: "text-amber-500", subColor: "text-gray-400" },
                    { icon: <Target size={18} />, label: "NPL เฉลี่ย", value: "0%", sub: "ภายในเกณฑ์ปกติ", bg: "bg-red-50", color: "text-red-500", subColor: "text-emerald-600" },
                ].map(s => (
                    <div key={s.label} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3"><div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center ${s.color}`}>{s.icon}</div><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.label}</p></div>
                        <p className="text-2xl font-black text-gray-800">{s.value}</p>
                        <p className={`text-xs font-bold mt-1 ${s.subColor}`}>{s.sub}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3 shadow-sm">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="ค้นหารหัส / ชื่อตัวแทน..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none focus:bg-white focus:border-blue-500 transition-all" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all"><Filter size={16} />กรอง</button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>{["ตัวแทน", "รหัส", "เบอร์โทร", "NPL Score", "คอมมิชชั่น", "สถานะ", "จัดการ"].map(h => (
                                <th key={h} className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">{h}</th>
                            ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-20 text-center">
                                        <Loader2 className="animate-spin text-blue-500 mx-auto" size={32} />
                                        <p className="text-xs font-black text-slate-400 mt-2 uppercase">กำลังโหลด...</p>
                                    </td>
                                </tr>
                            ) : agents.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-20 text-center opacity-20">
                                        <Users size={48} className="mx-auto" />
                                        <p className="text-sm font-black uppercase tracking-widest mt-2">ยังไม่มีข้อมูลตัวแทน</p>
                                    </td>
                                </tr>
                            ) : agents.map((a) => (
                                <tr key={a._id} className="hover:bg-blue-50/20 transition-colors">
                                    <td className="px-5 py-4"><p className="text-sm font-bold text-gray-800 uppercase">{a.name}</p></td>
                                    <td className="px-5 py-4 text-xs font-black text-blue-600 uppercase">{a.agentCode}</td>
                                    <td className="px-5 py-4 text-xs font-bold text-gray-500">{a.phone}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${a.nplScore > 10 ? "bg-red-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(a.nplScore * 5, 100)}%` }}></div>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${a.nplScore > 10 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>{a.nplScore}%</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[11px] font-black text-slate-900">{a.commissionRate}%</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest ${a.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                                            {a.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4"><button className="text-blue-500 text-[10px] font-black uppercase hover:underline">แก้ไข</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
