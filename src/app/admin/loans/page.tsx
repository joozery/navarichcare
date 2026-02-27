"use client";
import React, { useState, useEffect } from "react";
import { Smartphone, Search, Filter, Plus, Lock, CheckCircle2, AlertTriangle, MoreHorizontal, AlertCircle, Clock, Calendar, ArrowUpRight, ChevronRight, User, CreditCard, ChevronLeft, Download, Eye, Loader2 } from "lucide-react";

const statusMap = {
    normal: { label: "ปกติ", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700", ring: "ring-emerald-100" },
    warning: { label: "ค้าง 1-3 วัน", dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700", ring: "ring-amber-100" },
    critical: { label: "ค้าง 7 วัน+", dot: "bg-red-500", badge: "bg-red-50 text-red-700", ring: "ring-red-100" },
    closed: { label: "ปิดบัญชี", dot: "bg-slate-500", badge: "bg-slate-50 text-slate-700", ring: "ring-slate-100" },
};

export default function LoansPage() {
    const [filter, setFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loans, setLoans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [agents, setAgents] = useState<any[]>([]);
    const [branches, setBranches] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        idCard: "",
        deviceModel: "",
        imei: "",
        loanAmount: 0,
        totalInstallments: 12,
        loanType: "ผ่อนเครื่อง" as "ผ่อนเครื่อง" | "จำนำ iCloud",
        agentId: "",
        branchId: "",
        idCardImage: "",
        deviceImage: "",
        notes: ""
    });

    const [selectedLoan, setSelectedLoan] = useState<any>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [paymentData, setPaymentData] = useState({ amount: 0, paymentMethod: "transfer" as const, note: "" });

    useEffect(() => {
        fetchLoans();
        fetchAgentsAndBranches();
    }, []);

    const fetchAgentsAndBranches = async () => {
        try {
            const [aRes, bRes] = await Promise.all([fetch("/api/admin/agents"), fetch("/api/admin/branches")]);
            const [aData, bData] = await Promise.all([aRes.json(), bRes.json()]);
            if (aData.success) setAgents(aData.agents);
            if (bData.success) setBranches(bData.branches);
        } catch (e) {
            console.error("Fetch agents/branches failed", e);
        }
    };

    const fetchLoans = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/loans");
            const data = await res.json();
            if (data.success) setLoans(data.loans);
        } catch (err) {
            console.error("Fetch loans failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateContract = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/loans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                fetchLoans();
                setFormData({ customerName: "", customerPhone: "", idCard: "", deviceModel: "", imei: "", loanAmount: 0, totalInstallments: 12, loanType: "ผ่อนเครื่อง", agentId: "", branchId: "", idCardImage: "", deviceImage: "", notes: "" });
            } else {
                alert(data.error || "Error creating contract");
            }
        } catch (err) {
            alert("Connection error");
        } finally {
            setSubmitting(false);
        }
    };

    const openPaymentModal = (loan: any) => {
        setSelectedLoan(loan);
        setPaymentData({ amount: loan.monthlyPayment, paymentMethod: "transfer", note: "" });
        setIsPaymentModalOpen(true);
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ loanId: selectedLoan._id, ...paymentData, recordedBy: "admin" })
            });
            const data = await res.json();
            if (data.success) {
                setIsPaymentModalOpen(false);
                fetchLoans();
                alert(`SUCCESS: ${data.receiptId}`);
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("Connection error");
        } finally {
            setSubmitting(false);
        }
    };

    const stats = {
        normal: loans.filter(l => l.status === "normal").length,
        warning: loans.filter(l => l.status === "warning").length,
        critical: loans.filter(l => l.status === "critical").length,
    };

    const handleSyncStatus = async () => {
        try {
            const res = await fetch("/api/admin/loans/sync-status");
            const data = await res.json();
            if (data.success) {
                alert(`อัปเดตสถานะสำเร็จ: ${data.updatedCount} รายการ`);
                fetchLoans();
            }
        } catch (e) { alert("Error syncing status"); }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">จัดการสินเชื่อ & สัญญา</h2>
                    <p className="text-slate-500 text-sm mt-1 font-black uppercase tracking-widest opacity-40">Loan & Smart Contract Management</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleSyncStatus} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        <Clock size={18} /> อัปเดตสถานะล่าช้า
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                        <Plus size={18} /> สร้างสัญญาใหม่
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { key: "normal", label: "สถานะปกติ", count: stats.normal, color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={24} /> },
                    { key: "warning", label: "ค้างชำระเล็กน้อย", count: stats.warning, color: "text-amber-600", bg: "bg-amber-50", icon: <Clock size={24} /> },
                    { key: "critical", label: "ค้างชำระวิกฤต", count: stats.critical, color: "text-red-600", bg: "bg-red-50", icon: <AlertCircle size={24} /> },
                ].map((s) => (
                    <div key={s.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center group cursor-pointer hover:border-blue-500 transition-all" onClick={() => setFilter(s.key)}>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                            <h3 className="text-3xl font-black text-slate-900">{s.count} <span className="text-xs text-slate-400">Contracts</span></h3>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>{s.icon}</div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Customer / Contract</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Installments</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan={5} className="py-20 text-center opacity-40 uppercase font-black tracking-widest text-xs">Synchronizing Data...</td></tr>
                        ) : loans.filter(l => filter === "all" || l.status === filter).map(loan => (
                            <tr key={loan._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-5">
                                    <p className="text-sm font-black text-slate-900 uppercase">{loan.customerName}</p>
                                    <p className="text-[10px] font-bold text-blue-600 uppercase mt-0.5">{loan.contractId} • {loan.deviceModel}</p>
                                </td>
                                <td className="px-6 py-5 font-black text-slate-900">฿{loan.loanAmount.toLocaleString()}</td>
                                <td className="px-6 py-5 text-xs font-bold text-slate-400">{loan.paidInstallments}/{loan.totalInstallments} งวด</td>
                                <td className="px-6 py-5">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${statusMap[loan.status as keyof typeof statusMap]?.badge || 'bg-slate-50 text-slate-400'}`}>
                                        {statusMap[loan.status as keyof typeof statusMap]?.label || loan.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right flex justify-end gap-2 text-right">
                                    <button onClick={() => { setSelectedLoan(loan); setIsDocModalOpen(true); }} className="p-1.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all"><Eye size={16} /></button>
                                    {loan.status !== 'closed' && (
                                        <button onClick={() => openPaymentModal(loan)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-md shadow-emerald-100">Pay</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Loan Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-2xl font-black text-slate-900 uppercase">สร้างสัญญาใหม่</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 font-bold uppercase text-xs">Close</button>
                        </div>
                        <form onSubmit={handleCreateContract} className="p-8 overflow-y-auto max-h-[70vh] space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ชื่อลูกค้า</label>
                                    <input required value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">เบอร์โทรศัพท์</label>
                                    <input required value={formData.customerPhone} onChange={e => setFormData({ ...formData, customerPhone: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">รุ่นอุปกรณ์</label>
                                    <input required value={formData.deviceModel} onChange={e => setFormData({ ...formData, deviceModel: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">IMEI</label>
                                    <input required value={formData.imei} onChange={e => setFormData({ ...formData, imei: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">สาขา</label>
                                    <select required value={formData.branchId} onChange={e => setFormData({ ...formData, branchId: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                                        <option value="">เลือกสาขา</option>
                                        {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">พนักงานขาย</label>
                                    <select required value={formData.agentId} onChange={e => setFormData({ ...formData, agentId: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                                        <option value="">เลือก Agent</option>
                                        {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ยอดจัด (บาท)</label>
                                    <input type="number" required value={formData.loanAmount} onChange={e => setFormData({ ...formData, loanAmount: Number(e.target.value) })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-black text-blue-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ระยะเวลา</label>
                                    <select value={formData.totalInstallments} onChange={e => setFormData({ ...formData, totalInstallments: Number(e.target.value) })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                                        {[12, 18, 24, 36].map(v => <option key={v} value={v}>{v} งวด</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">รูปบัตรประชาชน</label>
                                    <div className="relative group">
                                        <input type="file" accept="image/*" onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setFormData({ ...formData, idCardImage: reader.result as string });
                                                reader.readAsDataURL(file);
                                            }
                                        }} className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" />
                                        {formData.idCardImage && <div className="mt-2 h-20 w-32 rounded-lg bg-slate-100 overflow-hidden border border-slate-200"><img src={formData.idCardImage} className="w-full h-full object-cover" /></div>}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">รูปเครื่องลูกค้า</label>
                                    <div className="relative group">
                                        <input type="file" accept="image/*" onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setFormData({ ...formData, deviceImage: reader.result as string });
                                                reader.readAsDataURL(file);
                                            }
                                        }} className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" />
                                        {formData.deviceImage && <div className="mt-2 h-20 w-32 rounded-lg bg-slate-100 overflow-hidden border border-slate-200"><img src={formData.deviceImage} className="w-full h-full object-cover" /></div>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">หมายเหตุเพิ่มเติม</label>
                                <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold h-20 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="..." />
                            </div>
                            <button type="submit" disabled={submitting} className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50">
                                {submitting ? "กำลังสร้างสัญญา..." : "สร้างสัญญาและพิมพ์เอกสาร"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {isPaymentModalOpen && selectedLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="p-8 bg-emerald-600 text-white">
                            <h3 className="text-2xl font-black uppercase italic">รับชำระค่างวด</h3>
                            <p className="text-[10px] font-bold uppercase opacity-60 mt-1">{selectedLoan.customerName} | {selectedLoan.contractId}</p>
                        </div>
                        <form onSubmit={handlePayment} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">จำนวนเงิน (บาท)</label>
                                <input type="number" required value={paymentData.amount} onChange={e => setPaymentData({ ...paymentData, amount: Number(e.target.value) })} className="w-full bg-slate-50 border-none rounded-xl p-4 text-2xl font-black text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ช่องทาง</label>
                                <select value={paymentData.paymentMethod} onChange={e => setPaymentData({ ...paymentData, paymentMethod: e.target.value as any })} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold outline-none">
                                    <option value="transfer">โอนเงินเข้าบัญชี</option>
                                    <option value="cash">เงินสดหน้าตู้</option>
                                </select>
                            </div>
                            <button type="submit" disabled={submitting} className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 italic">
                                {submitting ? "PROCESSING..." : "CONFIRM PAYMENT"}
                            </button>
                            <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">ย้อนกลับ</button>
                        </form>
                    </div>
                </div>
            )}
            {/* Document Viewer Modal */}
            {isDocModalOpen && selectedLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 uppercase">เอกสารประกอบสัญญา</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase mt-1">{selectedLoan.customerName} • {selectedLoan.contractId}</p>
                            </div>
                            <button onClick={() => setIsDocModalOpen(false)} className="text-slate-300 hover:text-slate-900 font-bold uppercase text-xs">Close</button>
                        </div>
                        <div className="p-8 grid md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">รูปบัตรประชาชน</label>
                                <div className="aspect-[3/2] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center text-slate-300">
                                    {selectedLoan.idCardImage ? (
                                        <img src={selectedLoan.idCardImage} className="w-full h-full object-contain" alt="ID Card" />
                                    ) : (
                                        <div className="text-center"><User size={48} className="mx-auto mb-2 opacity-20" /><p className="text-[10px] font-black italic uppercase">No Document</p></div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">รูปเครื่อง / อุปกรณ์</label>
                                <div className="aspect-[3/2] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center text-slate-300">
                                    {selectedLoan.deviceImage ? (
                                        <img src={selectedLoan.deviceImage} className="w-full h-full object-contain" alt="Device" />
                                    ) : (
                                        <div className="text-center"><Smartphone size={48} className="mx-auto mb-2 opacity-20" /><p className="text-[10px] font-black italic uppercase">No Document</p></div>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">ข้อมูลเพิ่มเติม</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">IMEI</p><p className="text-sm font-black text-slate-900">{selectedLoan.imei}</p></div>
                                    <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">เลขบัตรประชาชน</p><p className="text-sm font-black text-slate-900">{selectedLoan.idCard}</p></div>
                                    <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">เบอร์โทร</p><p className="text-sm font-black text-slate-900">{selectedLoan.customerPhone}</p></div>
                                    <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">หมายเหตุ</p><p className="text-sm font-black text-slate-900">{selectedLoan.notes || "-"}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
