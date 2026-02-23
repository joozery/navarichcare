"use client";

import React from "react";
import {
    TrendingUp,
    TrendingDown,
    ShieldCheck,
    Users,
    Smartphone,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Activity,
    CreditCard,
    ArrowRight,
    Calendar,
    ChevronRight,
    Search
} from "lucide-react";

// Mock Data for Premium Look
const stats = [
    {
        label: "กำไรสุทธิจริง",
        value: "฿820,900",
        delta: "+12.4%",
        up: true,
        icon: <Activity size={18} />,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        description: "เทียบกับเดือนที่แล้ว"
    },
    {
        label: "ดอกเบี้ยรับสะสม",
        value: "฿674,200",
        delta: "+8.1%",
        up: true,
        icon: <CreditCard size={18} />,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        description: "สัญญาสถานะปกติ"
    },
    {
        label: "รายได้ค่าบริการ/ประกัน",
        value: "฿148,500",
        delta: "36 งวด",
        up: true,
        icon: <ShieldCheck size={18} />,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        description: "ทยอยรับรู้รายได้รายเดือน"
    },
    {
        label: "หนี้เสีย (NPL)",
        value: "฿61,000",
        delta: "-2.3%",
        up: false,
        icon: <TrendingDown size={18} />,
        color: "text-red-500",
        bg: "bg-red-500/10",
        description: "อยู่ระหว่างติดตามกู้คืน"
    },
];

const nplByAgent = [
    { agent: "นารี สดใส", loans: 15, npl: 3, rate: "20.0%", risk: "critical", avatar: "NS" },
    { agent: "วิชัย ก้องไกร", loans: 42, npl: 6, rate: "14.3%", risk: "high", avatar: "WK" },
    { agent: "สมชาย มีรุ่งเรือง", loans: 58, npl: 4, rate: "6.9%", risk: "medium", avatar: "SM" },
    { agent: "สุพรรณษา ใจดี", loans: 71, npl: 2, rate: "2.8%", risk: "low", avatar: "SJ" },
];

const recentClaims = [
    { device: "iPhone 15 Pro Max", type: "จอแตก", status: "กำลังซ่อม", agent: "AG-001", time: "2 ชม.", color: "blue" },
    { device: "iPhone 14 Plus", type: "น้ำเข้า", status: "รอดำเนินการ", agent: "AG-003", time: "5 ชม.", color: "amber" },
    { device: "iPad Pro M4", type: "แบตเตอรี่", status: "เสร็จสมบูรณ์", agent: "AG-002", time: "1 วัน", color: "emerald" },
];

export default function AdminDashboard() {
    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">ภาพรวมผู้บริหาร</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <Calendar size={12} /> 23 ก.พ. 2569
                        </span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">แดชบอร์ดสรุปการเงิน</h2>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                        <Search size={16} className="text-slate-400" />
                        ค้นหาด่วน...
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        ดาวน์โหลดรายงาน
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>

            {/* Main KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
                        {/* Decorative background element */}
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-150 duration-700 ${s.bg}`}></div>

                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className={`w-11 h-11 ${s.bg} rounded-lg flex items-center justify-center ${s.color}`}>
                                {s.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                                {s.up ? "+" : "-"}{s.delta}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tight">{s.value}</h3>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium mt-3 flex items-center gap-1">
                                <Clock size={10} /> {s.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-12 gap-6">

                {/* Performance Chart Placeholder Section (Left) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h4 className="font-black text-slate-900 text-lg">วิเคราะห์การเติบโตของรายได้</h4>
                                <p className="text-sm text-slate-400 font-medium">เปรียบเทียบรายได้จริงกับประมาณการรายเดือน</p>
                            </div>
                            <div className="flex gap-2">
                                {['1W', '1M', '3M', 'ทั้งหมด'].map(t => (
                                    <button key={t} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${t === '1M' ? "bg-slate-900 text-white shadow-md shadow-slate-200" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Simulated Area Chart Design using CSS and Bento bars */}
                        <div className="h-72 flex items-stretch justify-between gap-2 md:gap-4 mt-12 bg-slate-50/50 rounded-xl p-6 relative group/chart border border-slate-100/50">
                            {[45, 60, 40, 80, 55, 90, 75, 85, 65, 95, 80, 70].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col group/bar cursor-pointer relative">
                                    <div className="flex-1 flex flex-col justify-end px-0.5 md:px-1">
                                        <div
                                            className="w-full bg-gradient-to-t from-emerald-400 to-cyan-400 rounded-t-lg transition-all duration-700 ease-out relative group-hover/bar:from-emerald-500 group-hover/bar:to-cyan-500 shadow-[0_-4px_12px_-4px_rgba(52,211,153,0.3)]"
                                            style={{ height: `${h}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 shadow-xl text-white text-[10px] px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap z-30 pointer-events-none mb-2">
                                                <div className="font-black">฿{(h * 10).toLocaleString()}k</div>
                                                <div className="text-[8px] text-white/60 text-center">Revenue</div>
                                                {/* Tooltip Arrow */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                            </div>

                                            {/* Glass shine effect on bar */}
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-lg"></div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-col items-center">
                                        <div className="w-1 h-1 rounded-full bg-slate-200 group-hover/bar:bg-emerald-400 mb-1.5 transition-colors"></div>
                                        <span className={`text-[9px] font-black uppercase tracking-tighter ${i === 11 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            {['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'][i]}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-50">
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">ทรัพย์สินรวม</p>
                                <p className="text-xl font-black text-slate-900">฿12.8M</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">เคสเคลมที่ดำเนินการ</p>
                                <p className="text-xl font-black text-slate-900">18 <span className="text-xs font-bold text-blue-500">เครื่อง</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">ระดับความเสี่ยง</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-emerald-500"></div>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600">ปลอดภัย</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Section - NPL & Claims (Right) */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* NPL Status Section */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-red-500" />
                                <h4 className="font-black text-slate-900 text-sm">NPL แยกตาม Agent</h4>
                            </div>
                            <button className="text-[10px] font-black uppercase text-blue-600 tracking-wider hover:underline flex items-center gap-1">
                                ดูอันดับทั้งหมด <ArrowRight size={10} />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {nplByAgent.map((a) => (
                                <div key={a.agent} className="p-4 hover:bg-slate-50 transition-colors group flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${a.risk === 'critical' ? 'bg-red-500 text-white' :
                                            a.risk === 'high' ? 'bg-orange-400 text-white' :
                                                a.risk === 'medium' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {a.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{a.agent}</p>
                                            <p className="text-[10px] text-slate-400 font-bold">{a.loans} สัญญา • NPL {a.npl} ราย</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 justify-end">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${a.risk === "critical" ? "bg-red-50 text-red-600" :
                                                a.risk === "high" ? "bg-orange-50 text-orange-600" :
                                                    a.risk === "medium" ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-600"
                                                }`}>
                                                {a.rate}
                                            </span>
                                            <ChevronRight size={14} className="text-slate-200" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Claims Status Section */}
                    <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xl shadow-slate-200">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="font-black text-white text-sm tracking-tight flex items-center gap-2">
                                <ShieldCheck size={18} className="text-blue-400" />
                                งานเคลมล่าสุด
                            </h4>
                            <span className="bg-blue-600 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">สด</span>
                        </div>

                        <div className="space-y-4">
                            {recentClaims.map((c, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color === 'blue' ? 'bg-blue-600/20 text-blue-400' :
                                        c.color === 'amber' ? 'bg-amber-600/20 text-amber-400' : 'bg-emerald-600/20 text-emerald-400'
                                        }`}>
                                        <Smartphone size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 overflow-hidden">
                                            <p className="text-sm font-black text-white truncate">{c.device}</p>
                                            <span className="text-[9px] text-white/40 font-bold whitespace-nowrap">{c.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-white/50 font-bold mt-1">
                                            <span>{c.type}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                            <span className={
                                                c.status === 'เสร็จสมบูรณ์' ? 'text-emerald-400' :
                                                    c.status === 'กำลังซ่อม' ? 'text-blue-400' : 'text-amber-400'
                                            }>{c.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white text-slate-900 transition-all">
                            ดูประวัติย้อนหลัง
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Insight Banner */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                {/* Decorative background circle */}
                <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full transition-transform group-hover:scale-125 duration-1000"></div>

                <div className="relative z-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                        <div className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest">ข้อมูลวิเคราะห์ทางการเงิน</div>
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight">ประมาณการกู้คืน NPL</h3>
                    <p className="text-blue-100 text-sm md:text-base font-medium max-w-xl">
                        จากการวิเคราะห์ข้อมูลปัจจุบัน ระบบคาดการณ์มูลค่ากู้คืนจากเครื่องยึดที่ **฿60,900** (คิดเป็น 30% ของยอดค้างชำระทั้งหมด)
                    </p>
                </div>

                <div className="relative z-10 flex flex-col items-center md:items-end">
                    <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-1 opacity-70">ยอดกู้คืนคาดการณ์</p>
                    <p className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 animate-in slide-in-from-right-10 duration-1000">฿60,900</p>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2 group">
                        จัดการทรัพย์สินรอการขาย
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

        </div>
    );
}
