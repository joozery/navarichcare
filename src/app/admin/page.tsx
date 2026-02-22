"use client";

import React from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Users, Smartphone, AlertCircle, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

const stats = [
    { label: "กำไรสุทธิจริง", value: "฿820,900", delta: "+12.4%", up: true, icon: <TrendingUp size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "ดอกเบี้ยรับจริง", value: "฿674,200", delta: "+8.1%", up: true, icon: <TrendingUp size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "รายได้ประกัน (ตัดงวด)", value: "฿148,500", delta: "36 งวด", up: true, icon: <ShieldCheck size={20} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "หนี้เสีย (NPL)", value: "฿61,000", delta: "-2.3%", up: false, icon: <TrendingDown size={20} />, color: "text-red-600", bg: "bg-red-50" },
];

const nplByAgent = [
    { agent: "นารี สดใส", loans: 15, npl: 3, rate: "20.0%", risk: "critical" },
    { agent: "วิชัย ก้องไกร", loans: 42, npl: 6, rate: "14.3%", risk: "high" },
    { agent: "สมชาย มีรุ่งเรือง", loans: 58, npl: 4, rate: "6.9%", risk: "medium" },
    { agent: "สุพรรณษา ใจดี", loans: 71, npl: 2, rate: "2.8%", risk: "low" },
];

const recentClaims = [
    { device: "iPhone 15 Pro Max", type: "จอแตก", status: "กำลังซ่อม", agent: "AG-001", time: "2 ชม." },
    { device: "iPhone 14 Plus", type: "น้ำเข้า", status: "รอเคลม", agent: "AG-003", time: "5 ชม." },
    { device: "iPad Pro M4", type: "แบตเสื่อม", status: "เสร็จแล้ว", agent: "AG-002", time: "1 วัน" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-gray-800">Dashboard ภาพรวม</h2>
                <p className="text-gray-500 text-sm mt-1">สรุปรายงานการเงิน NPL และสถิติการเคลมประจำเดือน</p>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.label}</p>
                            <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center ${s.color}`}>{s.icon}</div>
                        </div>
                        <p className="text-2xl font-black text-gray-800 mb-1">{s.value}</p>
                        <div className={`flex items-center gap-1 text-xs font-bold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                            {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{s.delta}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* NPL by Agent */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                        <Users size={16} className="text-red-500" />
                        <h4 className="font-bold text-gray-800 text-sm">NPL แยกตาม Agent</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {nplByAgent.map((a) => (
                            <div key={a.agent} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${a.risk === "critical" ? "bg-red-500" : a.risk === "high" ? "bg-orange-500" : a.risk === "medium" ? "bg-amber-400" : "bg-emerald-500"}`} />
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{a.agent}</p>
                                        <p className="text-xs text-gray-500">{a.loans} สัญญา • NPL {a.npl} ราย</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${a.risk === "critical" ? "bg-red-50 text-red-600" : a.risk === "high" ? "bg-orange-50 text-orange-600" : a.risk === "medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                                    {a.rate}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Claims */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-blue-500" />
                        <h4 className="font-bold text-gray-800 text-sm">งานเคลมล่าสุด</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentClaims.map((c, i) => (
                            <div key={i} className="p-4 flex items-center gap-3">
                                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Smartphone size={16} className="text-gray-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 truncate">{c.device}</p>
                                    <p className="text-xs text-gray-500">{c.type} • {c.agent}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "เสร็จแล้ว" ? "bg-emerald-50 text-emerald-600" : c.status === "กำลังซ่อม" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{c.status}</span>
                                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-0.5 justify-end"><Clock size={9} />{c.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recovery Rate */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-5 rounded-xl flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-amber-400 mb-1"><AlertCircle size={14} /><span className="text-xs font-black uppercase tracking-wider">NPL Recovery Estimate</span></div>
                    <p className="text-sm font-bold">มูลค่ากู้คืนจากเครื่องยึด (คิด 30% ของยอดผ่อน)</p>
                    <p className="text-xs text-gray-400 mt-0.5">ยอดรวม NPL ฿203,000 × 30%</p>
                </div>
                <div className="text-right"><p className="text-xs text-gray-400">ประมาณการ</p><p className="text-3xl font-black text-amber-400">฿60,900</p></div>
            </div>
        </div>
    );
}
