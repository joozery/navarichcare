"use client";
import React, { useState } from "react";
import { ShieldCheck, Plus, Search, Monitor, Droplets, Battery, FileText } from "lucide-react";

const policies = [
    { id: "INS-1001", customer: "คุณมานพ ใจดี", device: "iPhone 15 Pro Max", imei: "357823049123456", startDate: "10 ม.ค. 2569", endDate: "10 ม.ค. 2572", screen: 1, water: 1, battery: 1, monthsLeft: 24 },
    { id: "INS-1002", customer: "คุณรัตนา แช่ลี้", device: "iPhone 14 Plus", imei: "357823049988877", startDate: "5 ธ.ค. 2568", endDate: "5 ธ.ค. 2571", screen: 0, water: 1, battery: 1, monthsLeft: 22 },
    { id: "INS-1004", customer: "คุณนารี สดใส", device: "iPad Pro M4", imei: "357823049000123", startDate: "15 ส.ค. 2568", endDate: "15 ส.ค. 2571", screen: 2, water: 1, battery: 0, monthsLeft: 30 },
];

export default function InsurancePage() {
    const [tab, setTab] = useState<"policies" | "certificates">("policies");
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">ระบบประกัน (Insurance Quota System)</h2>
                    <p className="text-gray-500 text-sm mt-1">จัดการโควต้าประกัน จอ / น้ำ / แบต พร้อมออกใบรับรองดิจิทัล</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700"><Plus size={16} />ออกกรมธรรม์ใหม่</button>
            </div>

            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
                {[
                    { k: "policies", l: "กรมธรรม์ทั้งหมด", icon: <FileText size={14} /> },
                    { k: "certificates", l: "ใบรับรองดิจิทัล", icon: <ShieldCheck size={14} /> }
                ].map(t => (
                    <button
                        key={t.k}
                        onClick={() => setTab(t.k as any)}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${tab === t.k ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        {t.icon} {t.l}
                    </button>
                ))}
            </div>

            {tab === "policies" && (
                <>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input placeholder="ค้นหา IMEI หรือชื่อลูกค้า..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none max-w-md" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {policies.map(p => (
                            <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><ShieldCheck size={20} /></div>
                                        <div><p className="font-black text-gray-800">{p.customer}</p>
                                            <p className="text-xs text-gray-500">{p.device} • IMEI: {p.imei}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{p.id}</span>
                                        <p className="text-xs text-gray-400 mt-1">เหลือ {p.monthsLeft}/36 เดือน</p>
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full mb-4">
                                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((36 - p.monthsLeft) / 36) * 100}%` }} />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { icon: <Monitor size={16} />, label: "จอแตก", used: 2 - p.screen, total: 2, color: "blue" },
                                        { icon: <Droplets size={16} />, label: "น้ำเข้า", used: 1 - p.water, total: 1, color: "cyan" },
                                        { icon: <Battery size={16} />, label: "แบตเตอรี่", used: 1 - p.battery, total: 1, color: "amber" },
                                    ].map(q => (
                                        <div key={q.label} className={`p-3 rounded-lg border text-center ${q.used === q.total ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
                                            <div className={`flex justify-center mb-1 ${q.used === q.total ? "text-red-500" : "text-gray-500"}`}>{q.icon}</div>
                                            <p className="text-[10px] font-bold text-gray-600">{q.label}</p>
                                            <p className={`text-lg font-black ${q.used === q.total ? "text-red-500" : "text-gray-800"}`}>{q.total - q.used}<span className="text-xs text-gray-400">/{q.total}</span></p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {tab === "certificates" && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center text-center">
                    <FileText size={48} className="text-gray-200 mb-4" />
                    <h4 className="font-bold text-gray-400">ใบรับรองดิจิทัลจะปรากฏที่นี่</h4>
                    <p className="text-sm text-gray-400 mt-1">ส่งให้ลูกค้าอัตโนมัติทาง LINE/SMS เมื่อออกกรมธรรม์</p>
                </div>
            )}
        </div>
    );
}
