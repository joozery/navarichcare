"use client";
import React, { useState, useEffect } from "react";
import { ShieldCheck, Plus, Search, Monitor, Droplets, Battery, FileText, Loader2, CheckCircle2 } from "lucide-react";

export default function InsurancePage() {
    const [tab, setTab] = useState<"policies" | "certificates">("policies");
    const [policies, setPolicies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [submittingClaim, setSubmittingClaim] = useState(false);
    const [claimData, setClaimData] = useState({
        claimType: "screen",
        deductibleAmount: 1000,
        description: ""
    });

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const res = await fetch("/api/admin/insurance");
            const data = await res.json();
            if (data.success) {
                setPolicies(data.policies);
            }
        } catch (err) {
            console.error("Fetch policies failed", err);
        } finally {
            setLoading(false);
        }
    };

    const calculateMonthsLeft = (endDate: string) => {
        const end = new Date(endDate);
        const now = new Date();
        const diffTime = end.getTime() - now.getTime();
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
        return Math.max(0, diffMonths);
    };

    const openClaimModal = (policy: any) => {
        setSelectedPolicy(policy);
        setIsClaimModalOpen(true);
    };

    const handleClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittingClaim(true);
        try {
            const res = await fetch("/api/admin/claims", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    insuranceId: selectedPolicy._id,
                    ...claimData,
                    photoEvidence: [] // Placeholder
                })
            });
            const data = await res.json();
            if (data.success) {
                setIsClaimModalOpen(false);
                fetchPolicies();
                alert("บันทึกการเคลมและตัดโควตาสำเร็จ!");
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        } finally {
            setSubmittingClaim(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">ระบบประกัน (Insurance Quota System)</h2>
                    <p className="text-gray-500 text-sm mt-1 font-medium italic">จัดการโควต้าประกัน จอ / น้ำ / แบต พร้อมออกใบรับรองดิจิทัล</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <Plus size={16} />ออกกรมธรรม์ใหม่
                </button>
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
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="relative flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input placeholder="ค้นหา IMEI หรือชื่อลูกค้า..." className="w-full bg-gray-50 border border-transparent rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none focus:bg-white focus:border-blue-500 transition-all font-medium" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {loading ? (
                            <div className="col-span-full flex flex-col items-center py-20 opacity-40">
                                <Loader2 size={32} className="animate-spin mb-2" />
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">กำลังดึงข้อมูลกรมธรรม์...</p>
                            </div>
                        ) : policies.length === 0 ? (
                            <div className="col-span-full bg-white rounded-xl border border-gray-200 p-20 text-center opacity-20">
                                <ShieldCheck size={48} className="mx-auto mb-2 text-slate-400" />
                                <p className="text-sm font-black uppercase tracking-widest text-slate-400">ยังไม่มีข้อมูลกรมธรรม์ในระบบ</p>
                            </div>
                        ) : policies.map(p => {
                            const monthsLeft = calculateMonthsLeft(p.endDate);
                            const customerName = p.loanId?.customerName || "ไม่พบข้อมูล";
                            const deviceModel = p.loanId?.deviceModel || "ไม่ระบุรุ่น";
                            const imei = p.loanId?.imei || p.imei;

                            return (
                                <div key={p._id} className="bg-white rounded-xl border border-gray-200 p-5 group hover:shadow-xl hover:shadow-slate-100 transition-all border-l-4 border-l-blue-500">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><ShieldCheck size={20} /></div>
                                            <div>
                                                <p className="font-black text-gray-800 uppercase tracking-tight text-sm">{customerName}</p>
                                                <p className="text-[10px] text-gray-500 font-bold">{deviceModel} • IMEI: <span className="text-blue-500">{imei}</span></p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full uppercase tracking-widest ring-1 ring-blue-100">{p.policyId}</span>
                                            <p className="text-[10px] font-black text-slate-400 mt-1.5 uppercase">เหลือ {monthsLeft}/36 เดือน</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-1 bg-gray-100 rounded-full mb-5 overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(monthsLeft / 36) * 100}%` }} />
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {[
                                            { icon: <Monitor size={14} />, label: "จอแตก", used: p.quota.screen.used, total: p.quota.screen.total },
                                            { icon: <Droplets size={14} />, label: "น้ำเข้า", used: p.quota.water.used, total: p.quota.water.total },
                                            { icon: <Battery size={14} />, label: "แบตเตอรี่", used: p.quota.battery.used, total: p.quota.battery.total },
                                        ].map(q => (
                                            <div key={q.label} className={`p-2.5 rounded-lg border text-center transition-all ${q.used >= q.total ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-200"}`}>
                                                <div className={`flex justify-center mb-1 ${q.used >= q.total ? "text-red-500" : "text-slate-400"}`}>{q.icon}</div>
                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-0.5">{q.label}</p>
                                                <p className={`text-sm font-black ${q.used >= q.total ? "text-red-500" : "text-gray-800"}`}>
                                                    {q.total - q.used}<span className="text-[10px] text-slate-400 ml-0.5">/{q.total}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-gray-50 flex justify-end">
                                        <button
                                            onClick={() => openClaimModal(p)}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md active:scale-95"
                                        >
                                            <ShieldCheck size={12} /> แจ้งเคลม / ตัดโควตา
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {tab === "certificates" && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center text-center">
                    <FileText size={48} className="text-gray-200 mb-4" />
                    <h4 className="font-bold text-gray-400 uppercase tracking-widest">ใบรับรองดิจิทัลจะปรากฏที่นี่</h4>
                    <p className="text-sm text-gray-400 mt-1 font-medium">ส่งให้ลูกค้าอัตโนมัติทาง LINE/SMS เมื่อออกกรมธรรม์</p>
                </div>
            )}

            {/* Claim Modal */}
            {isClaimModalOpen && selectedPolicy && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
                        <div className="p-6 bg-slate-900 text-white relative">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                            <h3 className="text-xl font-black uppercase tracking-tight">แจ้งเคลมเปลี่ยนอะไหล่</h3>
                            <p className="text-[10px] opacity-60 font-bold mt-1 uppercase">ลูกค้า: {selectedPolicy.loanId?.customerName} • IMEI: {selectedPolicy.imei}</p>
                        </div>
                        <form onSubmit={handleClaim} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ประเภทการเคลม</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: "screen", label: "จอแตก", icon: <Monitor size={16} /> },
                                        { id: "water", label: "น้ำเข้า", icon: <Droplets size={16} /> },
                                        { id: "battery", label: "แบตเสื่อม", icon: <Battery size={16} /> }
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setClaimData({ ...claimData, claimType: type.id })}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${claimData.claimType === type.id ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200"}`}
                                        >
                                            {type.icon}
                                            <span className="text-[9px] font-black uppercase">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ค่าธรรมเนียม (Deductible)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-900">฿</span>
                                    <input
                                        type="number"
                                        required
                                        value={claimData.deductibleAmount}
                                        onChange={(e) => setClaimData({ ...claimData, deductibleAmount: Number(e.target.value) })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 pl-8 pr-4 text-xl font-black text-blue-600 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">รายละเอียดอาการ / หมายเหตุ</label>
                                <textarea
                                    placeholder="เช่น หน้าจอแตกร้าวจากการทำตก..."
                                    value={claimData.description}
                                    onChange={(e) => setClaimData({ ...claimData, description: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm font-medium h-20 outline-none focus:border-blue-500 placeholder:text-slate-300"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsClaimModalOpen(false)} className="flex-1 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">ยกเลิก</button>
                                <button type="submit" disabled={submittingClaim} className="flex-[2] py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-all">
                                    {submittingClaim ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                                    ยืนยันการเคลม & ตัดโควตา
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
