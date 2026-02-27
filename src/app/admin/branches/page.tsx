"use client";
import React, { useState, useEffect } from "react";
import { Building2, Users, Plus, MapPin, Phone, MoreHorizontal, Loader2 } from "lucide-react";

export default function BranchesPage() {
    const [tab, setTab] = useState<"branches" | "staff">("branches");
    const [branches, setBranches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const res = await fetch("/api/admin/branches");
            const data = await res.json();
            if (data.success) {
                setBranches(data.branches);
            }
        } catch (err) {
            console.error("Fetch branches failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">สาขา & พนักงาน</h2>
                    <p className="text-gray-500 text-sm mt-1">จัดการสาขาและพนักงานทั่วประเทศ</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"><Plus size={16} />เพิ่มสาขา</button>
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

            {loading ? (
                <div className="flex flex-col items-center py-20 opacity-40">
                    <Loader2 size={32} className="animate-spin text-blue-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2">กำลังโหลดข้อมูล...</p>
                </div>
            ) : tab === "branches" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {branches.length === 0 ? (
                        <div className="col-span-full py-20 text-center opacity-20">
                            <Building2 size={48} className="mx-auto" />
                            <p className="text-sm font-black uppercase mt-2">ยังไม่มีข้อมูลสาขา</p>
                        </div>
                    ) : branches.map(b => (
                        <div key={b._id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-xl hover:shadow-slate-100 transition-all border-l-4 border-l-blue-500">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Building2 size={20} /></div>
                                <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest ${b.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                                    {b.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                            <h4 className="font-black text-gray-800 mb-1 uppercase tracking-tight">{b.name}</h4>
                            <div className="space-y-2 mt-4">
                                <div className="flex items-start gap-2 text-[11px] font-bold text-slate-500 uppercase">
                                    <MapPin size={12} className="text-slate-300 mt-0.5 shrink-0" />
                                    <span className="line-clamp-2">{b.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-black text-slate-900">
                                    <Phone size={12} className="text-blue-500 shrink-0" />
                                    <span>{b.phone}</span>
                                </div>
                            </div>
                            <div className="mt-5 pt-4 border-t border-slate-50 flex justify-end">
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">แก้ไข</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "staff" && (
                <div className="bg-white rounded-xl border border-gray-200 p-20 text-center shadow-sm opacity-20">
                    <Users size={48} className="mx-auto text-slate-400" />
                    <h4 className="font-black text-slate-400 uppercase tracking-widest mt-4">ระบบจัดการพนักงานสาขา</h4>
                    <p className="text-xs text-slate-400 mt-1 uppercase">จะเปิดใช้งานเร็วๆ นี้</p>
                </div>
            )}
        </div>
    );
}
