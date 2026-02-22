"use client";
import React, { useState } from "react";
import { Building2, Users, Plus, MapPin, Phone, MoreHorizontal } from "lucide-react";

const branches = [
    { id: "BR-01", name: "สาขากรุงเทพ HQ", address: "ถ.สุขุมวิท แขวงคลองเตย", phone: "02-XXX-0001", staff: 8, loans: 142, manager: "คุณสมศักดิ์ วงศ์ดี" },
    { id: "BR-02", name: "สาขาสมุทรปราการ", address: "ถ.สุขุมวิท แขวงบางนา", phone: "02-XXX-0002", staff: 5, loans: 89, manager: "คุณมาลี รักงาน" },
    { id: "BR-03", name: "สาขานนทบุรี", address: "ถ.ติวานนท์ ต.บางกระสอ", phone: "02-XXX-0003", staff: 4, loans: 67, manager: "คุณวิไล สุขใจ" },
];

const staff = [
    { name: "คุณสมศักดิ์ วงศ์ดี", role: "ผู้จัดการสาขา", branch: "กรุงเทพ HQ", status: "active" },
    { name: "คุณนิภา ใจดี", role: "พนักงานขาย", branch: "กรุงเทพ HQ", status: "active" },
    { name: "คุณมาลี รักงาน", role: "ผู้จัดการสาขา", branch: "สมุทรปราการ", status: "active" },
];

export default function BranchesPage() {
    const [tab, setTab] = useState<"branches" | "staff">("branches");
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">สาขา & พนักงาน</h2>
                    <p className="text-gray-500 text-sm mt-1">จัดการสาขาและพนักงานทั่วประเทศ</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700"><Plus size={16} />เพิ่มสาขา</button>
            </div>

            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
                {[
                    { k: "branches", l: "สาขา", icon: <Building2 size={14} /> },
                    { k: "staff", l: "พนักงาน", icon: <Users size={14} /> }
                ].map(t => (
                    <button
                        key={t.k}
                        onClick={() => setTab(t.k as any)}
                        className={`px-5 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${tab === t.k ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        {t.icon} {t.l}
                    </button>
                ))}
            </div>

            {tab === "branches" && (
                <div className="grid md:grid-cols-3 gap-4">
                    {branches.map(b => (
                        <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Building2 size={20} /></div>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{b.id}</span>
                            </div>
                            <h4 className="font-black text-gray-800 mb-1">{b.name}</h4>
                            <p className="text-xs text-gray-500 mb-3">ผู้จัดการ: {b.manager}</p>
                            <div className="space-y-2 text-xs text-gray-500">
                                <div className="flex items-center gap-2"><MapPin size={12} className="text-gray-400" />{b.address}</div>
                                <div className="flex items-center gap-2"><Phone size={12} className="text-gray-400" />{b.phone}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                                <div className="text-center"><p className="text-lg font-black text-gray-800">{b.staff}</p><p className="text-[10px] text-gray-400">พนักงาน</p></div>
                                <div className="text-center"><p className="text-lg font-black text-blue-600">{b.loans}</p><p className="text-[10px] text-gray-400">สัญญา</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "staff" && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>{["พนักงาน", "บทบาท", "สาขา", "สถานะ", ""].map(h => (
                                <th key={h} className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">{h}</th>
                            ))}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {staff.map((s, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-black">{s.name[3]}</div><p className="text-sm font-bold text-gray-800">{s.name}</p></div></td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{s.role}</td>
                                    <td className="px-5 py-4 text-xs font-semibold text-blue-600">{s.branch}</td>
                                    <td className="px-5 py-4"><span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">ทำงานอยู่</span></td>
                                    <td className="px-5 py-4"><button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><MoreHorizontal size={16} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
