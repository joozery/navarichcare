"use client";

import React, { useState } from "react";
import {
    Smartphone,
    Search,
    Filter,
    Plus,
    Lock,
    CheckCircle2,
    AlertTriangle,
    MoreHorizontal,
    AlertCircle,
    Clock,
    Calendar,
    ArrowUpRight,
    ChevronRight,
    User,
    CreditCard,
    ChevronLeft,
    Download,
    Eye
} from "lucide-react";

// Mock Data
const loans = [
    { id: "NC-1001", customer: "คุณมานพ ใจดี", device: "iPhone 15 Pro Max", agent: "AG-001", amount: "฿45,000", paid: 8, total: 24, overdue: 0, type: "ผ่อนเครื่อง", status: "normal", avatar: "MJ" },
    { id: "NC-1002", customer: "คุณรัตนา แช่ลี้", device: "iPhone 14 Plus", agent: "AG-002", amount: "฿32,000", paid: 3, total: 12, overdue: 2, type: "ผ่อนเครื่อง", status: "warning", avatar: "RL" },
    { id: "NC-1003", customer: "คุณเกรียงไกร มีสุข", device: "iPhone 15", agent: "AG-001", amount: "฿38,500", paid: 1, total: 12, overdue: 8, type: "จำนำ iCloud", status: "critical", avatar: "KM" },
    { id: "NC-1004", customer: "คุณนารี สดใส", device: "iPad Pro M4", agent: "AG-003", amount: "฿54,000", paid: 6, total: 36, overdue: 0, type: "ผ่อนเครื่อง", status: "normal", avatar: "NS" },
];

const statusMap = {
    normal: { label: "ปกติ", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700", ring: "ring-emerald-100" },
    warning: { label: "ค้าง 1-3 วัน", dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700", ring: "ring-amber-100" },
    critical: { label: "ค้าง 7 วัน+", dot: "bg-red-500", badge: "bg-red-50 text-red-700", ring: "ring-red-100" },
};

export default function LoansPage() {
    const [filter, setFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">Financial Operations</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5"><Calendar size={13} /> 23 ก.พ. 2569</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">จัดการสินเชื่อ & สัญญา</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">ระบบบริหารจัดการผ่อนสมาร์ทโฟนและจำนำ iCloud ประสิทธิภาพสูง</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                        <Download size={16} className="text-slate-400" />
                        Export สรุปยอด
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                    >
                        <Plus size={18} /> สร้างสัญญาใหม่
                    </button>
                </div>
            </div>

            {/* Status Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { key: "normal", label: "สถานะปกติ", count: 142, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: <CheckCircle2 size={24} />, description: "ลูกค้าชำระตรงเวลา" },
                    { key: "warning", label: "ค้างชำระเล็กน้อย", count: 28, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", icon: <Clock size={24} />, description: "ค้างชำระช่วง 1-3 วัน" },
                    { key: "critical", label: "ค้างชำระวิกฤต", count: 11, color: "text-red-600", bg: "bg-red-50", border: "border-red-100", icon: <AlertCircle size={24} />, description: "ค้างเกิน 7 วัน (ICLOUD LOCK)" },
                ].map((s) => (
                    <div key={s.label} className={`group p-6 rounded-xl border bg-white ${s.border} hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-40`}>
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${s.bg}`}></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{s.count} <span className="text-sm font-bold text-slate-400">ราย</span></h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
                                {s.icon}
                            </div>
                        </div>

                        <div className="flex items-center justify-between relative z-10">
                            <p className="text-[11px] font-bold text-slate-400">{s.description}</p>
                            <button
                                onClick={() => setFilter(s.key)}
                                className={`text-[10px] font-black uppercase hover:underline transition-colors ${filter === s.key ? "text-blue-600" : "text-slate-400 hover:text-blue-600"}`}
                            >
                                {filter === s.key ? "กำลังแสดง..." : "ดูรายชื่อ"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        placeholder="ระบุชื่อลูกค้า, เลขที่สัญญา, IMEI หรือรหัสพนักงาน..."
                        className="w-full bg-slate-50 border border-transparent rounded-xl py-3.5 pl-12 pr-6 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium text-slate-900"
                    />
                </div>

                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl w-full lg:w-fit">
                    {["all", "normal", "warning", "critical"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex-1 lg:flex-none px-6 py-2.5 rounded-lg text-[12px] font-black transition-all ${filter === f
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-100"
                                : "text-slate-500 hover:text-slate-900"
                                }`}
                        >
                            {f === "all" ? "ทั้งหมด" : statusMap[f as keyof typeof statusMap].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Premium Table Content */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">ข้อมูลลูกค้า & รหัสสัญญา</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Agent</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">ยอดจัดสินเชื่อ</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">ความคืบหน้าการผ่อน</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">สถานะ</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">ประเภท</th>
                                <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loans.filter(l => filter === "all" || l.status === filter).map((loan) => {
                                const s = statusMap[loan.status as keyof typeof statusMap];
                                const progress = (loan.paid / loan.total) * 100;
                                return (
                                    <tr key={loan.id} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black ring-4 ring-slate-50">
                                                    {loan.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase">{loan.customer}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] text-slate-400 font-bold tracking-wider">{loan.id}</span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                                        <span className="text-[10px] text-blue-500 font-black">{loan.device}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-900">{loan.agent}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Main Branch</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-black text-slate-900 text-sm tracking-tight">{loan.amount}</td>
                                        <td className="px-6 py-6">
                                            <div className="w-32">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="text-[10px] font-black text-slate-900">{loan.paid}/{loan.total} งวด</span>
                                                    <span className="text-[10px] font-black text-slate-400">{Math.round(progress)}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full transition-all duration-1000"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`flex h-2 w-2 relative`}>
                                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${s.dot} opacity-75`}></span>
                                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${s.dot}`}></span>
                                                </span>
                                                <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border border-transparent shadow-sm ${s.badge}`}>
                                                    {s.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border border-slate-100 bg-slate-50 text-slate-500 shadow-sm ${loan.type === "จำนำ iCloud" && "bg-purple-50 text-purple-600 border-purple-100"}`}>
                                                {loan.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {loan.status === "critical" && (
                                                    <button className="flex items-center gap-1.5 px-3 py-2 bg-red-600 text-white rounded-[10px] text-[10px] font-black hover:bg-red-700 hover:scale-105 transition-all shadow-lg shadow-red-200 uppercase">
                                                        <Lock size={12} /> ยึดเครื่อง/Lock
                                                    </button>
                                                )}
                                                <button className="p-2.5 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-200">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing 4 of 142 Contracts</p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map(p => (
                            <button key={p} className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${p === 1 ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:bg-white"}`}>{p}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add New Loan Modal (Improved Design) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-xl w-full max-w-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white relative">
                            {/* Decorative header gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"></div>

                            <div>
                                <h3 className="font-black text-2xl text-slate-900 tracking-tight">สร้างสัญญาเงินกู้ใหม่</h3>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">บันทึกข้อมูลลูกค้าและเงื่อนไขการเงินรายบุคคล</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 transition-all text-slate-900 font-bold border border-slate-100">✕</button>
                        </div>

                        <div className="p-6 space-y-6 bg-white max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <section>
                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">ข้อมูลลูกค้าพื้นฐาน</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ชื่อ-นามสกุล ผู้ทำสัญญา</label>
                                        <input placeholder="ระบุชื่อจริง..." className="w-full bg-slate-50 border border-transparent rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-sm" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">เบอร์โทรศัพท์สำหรับติดต่อ</label>
                                        <input placeholder="08x-xxx-xxxx" className="w-full bg-slate-50 border border-transparent rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-sm" />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">รายละเอียดทรัพย์สิน</h4>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">รุ่นสมาร์ทโฟน / อุปกรณ์</label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                                        <input placeholder="เช่น iPhone 15 Pro Max 256GB" className="w-full bg-slate-50 border border-transparent rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-slate-900 shadow-sm" />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">เงื่อนไขงวดชำระ</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ยอดจัดสินเชื่อสุทธิ</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-900 text-sm">฿</span>
                                            <input type="number" placeholder="0.00" className="w-full bg-slate-50 border border-transparent rounded-lg py-2.5 pl-8 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-blue-600 shadow-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ระยะเวลาผ่อนชำระ</label>
                                        <select className="w-full bg-slate-50 border border-transparent rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-slate-900 shadow-sm appearance-none cursor-pointer">
                                            <option>12 งวด (1 ปี)</option>
                                            <option>18 งวด (1.5 ปี)</option>
                                            <option>24 งวด (2 ปี)</option>
                                            <option>36 งวด (3 ปี)</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">เลือกประเภทสัญญา</label>
                                <div className="flex gap-3 mt-2">
                                    <button className="flex-1 flex flex-col items-center gap-2 p-4 border-2 border-blue-600 bg-blue-50/50 rounded-xl transition-all group overflow-hidden relative">
                                        <Smartphone size={20} className="text-blue-600" />
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">แบบผ่อนเครื่อง</span>
                                        <div className="absolute top-1 right-1"><CheckCircle2 size={14} className="text-blue-600" /></div>
                                    </button>
                                    <button className="flex-1 flex flex-col items-center gap-2 p-4 border-2 border-slate-100 bg-slate-50 rounded-xl hover:border-purple-200 transition-all group">
                                        <Lock size={20} className="text-slate-300 group-hover:text-purple-400" />
                                        <span className="text-[10px] font-black text-slate-400 group-hover:text-purple-600 uppercase tracking-widest">จำนำ iCloud</span>
                                    </button>
                                </div>
                            </section>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">ย้อนกลับ</button>
                            <button onClick={() => setIsModalOpen(false)} className="flex-[2] py-3.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 shadow-lg shadow-blue-200/30 transition-all flex items-center justify-center gap-2">
                                <CreditCard size={16} /> สร้างสัญญาและพิมพ์เอกสาร
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
