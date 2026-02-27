"use client";
import React, { useState, useEffect } from "react";
import { Info, Receipt, Calendar, Loader2 } from "lucide-react";

export default function AccountingPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/accounting")
            .then(res => res.json())
            .then(json => {
                if (json.success) setData(json);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4 opacity-40">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="font-black uppercase tracking-[0.3em] text-xs">Loading Accounting Data...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">บัญชี & Amortization</h2>
                <p className="text-slate-500 text-sm mt-1 font-black uppercase tracking-widest opacity-40">Monthly Revenue Recognition Analysis</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 text-blue-600">
                        <Info size={18} />
                        <h3 className="font-black text-slate-900 uppercase italic">Revenue Recognition Model</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-bold">
                        ค่าประกัน 10% (฿{(data.totalUnrecognized + (data.recognizedThisMonth * 36)).toLocaleString()})
                        จะถูก <span className="text-blue-600 font-black italic">แบ่งออกเป็น 36 งวด</span>
                        เพื่อรับรู้รายได้รายเดือนอย่างสม่ำเสมอตามระยะเวลาครองงาน
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">รายได้รอรับรู้</p>
                            <p className="text-2xl font-black text-slate-900">฿{data.totalUnrecognized.toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl shadow-slate-200">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">รับรู้แล้วเดือนนี้</p>
                            <p className="text-2xl font-black text-blue-400">฿{data.recognizedThisMonth.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
                    <h3 className="font-black mb-6 flex items-center gap-2 uppercase italic tracking-wider">
                        <Calendar size={18} className="text-blue-400" /> การตัดงวดรายได้เดือนนี้
                    </h3>
                    <div className="space-y-4 relative z-10">
                        {data.recentAmortizations.map((item: any, i: number) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Receipt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase italic">{item.device}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">งวดที่ {item.month}/36 • {item.id}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-black text-blue-400">+฿{item.perMonth.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
