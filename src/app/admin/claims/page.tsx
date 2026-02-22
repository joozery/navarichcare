"use client";
import React, { useState } from "react";
import { Search, ShieldCheck, CheckSquare, CreditCard, Wrench, ClipboardList, FileCheck, ChevronRight, Monitor, Droplets, Battery, ImageIcon } from "lucide-react";

const steps = [
    { n: 1, title: "ค้นหา IMEI", icon: <Search size={16} /> },
    { n: 2, title: "ตรวจ Void", icon: <ShieldCheck size={16} /> },
    { n: 3, title: "Deductible", icon: <CreditCard size={16} /> },
    { n: 4, title: "ระบุอะไหล่", icon: <Wrench size={16} /> },
    { n: 5, title: "รูปหลังซ่อม", icon: <ImageIcon size={16} /> },
    { n: 6, title: "ตัดสิทธิ์", icon: <FileCheck size={16} /> },
];

const quota = [
    { type: "Screen", title: "จอแตก", remaining: 1, total: 2, icon: <Monitor size={18} />, deductible: "฿1,000" },
    { type: "Water", title: "น้ำเข้า", remaining: 1, total: 1, icon: <Droplets size={18} />, deductible: "฿1,500" },
    { type: "Battery", title: "แบตเตอรี่", remaining: 1, total: 1, icon: <Battery size={18} />, deductible: "ฟรี" },
];

export default function ClaimsPage() {
    const [activeStep, setActiveStep] = useState(1);
    const [imei, setImei] = useState("");
    const [showNew, setShowNew] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">งานเคลม (Insurance Claims)</h2>
                    <p className="text-gray-500 text-sm mt-1">ระบบเคลมประกัน 6 ขั้นตอน พร้อมตัดสิทธิ์ Quota อัตโนมัติ</p>
                </div>
                {!showNew && <button onClick={() => setShowNew(true)} className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700">+ เปิดเคสใหม่</button>}
            </div>

            {showNew ? (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center gap-2 flex-wrap">
                        {steps.map((s, i) => (
                            <React.Fragment key={s.n}>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeStep >= s.n ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-400"}`}>
                                    {activeStep > s.n ? <CheckSquare size={13} /> : s.icon}
                                    <span className="hidden sm:inline">{s.title}</span>
                                </div>
                                {i < steps.length - 1 && <ChevronRight size={14} className="text-gray-300 shrink-0" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="p-6 min-h-[320px]">
                        {activeStep === 1 && (
                            <div className="space-y-5">
                                <div><h3 className="text-lg font-black text-gray-800 mb-1">ระบุหมายเลขเครื่อง (IMEI)</h3>
                                    <p className="text-gray-500 text-sm">ค้นหาสิทธิ์ประกันด้วย IMEI</p>
                                </div>
                                <div className="max-w-md flex gap-3">
                                    <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input type="text" placeholder="กรอก IMEI..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm outline-none" value={imei} onChange={e => setImei(e.target.value)} />
                                    </div>
                                    <button className="px-4 py-3 bg-blue-600 text-white font-bold rounded-lg text-sm">ค้นหา</button>
                                </div>
                                {imei.length > 5 && (
                                    <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl max-w-xl">
                                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-blue-200">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-sm border border-blue-200 text-blue-700">i15</div>
                                            <div><h4 className="font-bold text-gray-800">iPhone 15 Pro Max – คุณมานพ ใจดี</h4>
                                                <p className="text-xs text-gray-500">IMEI: {imei} • NC-1001</p>
                                                <p className="text-xs text-emerald-600 font-bold mt-1">✓ ประกันคงเหลือ 24 เดือน</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {quota.map(q => (
                                                <div key={q.type} className="bg-white p-3 rounded-lg border border-blue-100 text-center">
                                                    <div className="flex justify-center mb-1 text-blue-600">{q.icon}</div>
                                                    <p className="text-[10px] font-bold text-gray-700">{q.title}</p>
                                                    <p className="text-xl font-black text-blue-600">{q.remaining}<span className="text-xs text-gray-400">/{q.total}</span></p>
                                                    <p className="text-[9px] text-gray-400">{q.deductible}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeStep === 2 && (
                            <div className="space-y-4 max-w-lg">
                                <h3 className="text-lg font-black text-gray-800">ตรวจสอบเงื่อนไข Void</h3>
                                {["เครื่องไม่มีร่องรอย Jailbreak", "ไม่มีการดัดแปลงชิ้นส่วน", "ไม่ใช่ความเสียหายจากการตั้งใจ", "ลูกค้าแสดงบัตรประจำตัว"].map((c, i) => (
                                    <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 text-sm font-semibold text-gray-700">
                                        <input type="checkbox" className="w-4 h-4 accent-blue-600" />{c}
                                    </label>
                                ))}
                            </div>
                        )}
                        {activeStep === 3 && (
                            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                                <div className="text-blue-600 mb-3"><CreditCard size={48} /></div>
                                <p className="font-bold text-gray-600">ขั้นตอน 3: {steps[2].title}</p>
                                <p className="text-sm mt-1">กรอกข้อมูลสำหรับขั้นตอนนี้</p>
                            </div>
                        )}
                        {activeStep === 4 && (
                            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                                <div className="text-blue-600 mb-3"><Wrench size={48} /></div>
                                <p className="font-bold text-gray-600">ขั้นตอน 4: {steps[3].title}</p>
                                <p className="text-sm mt-1">กรอกข้อมูลสำหรับขั้นตอนนี้</p>
                            </div>
                        )}
                        {activeStep === 5 && (
                            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                                <div className="text-blue-600 mb-3"><ImageIcon size={48} /></div>
                                <p className="font-bold text-gray-600">ขั้นตอน 5: {steps[4].title}</p>
                                <p className="text-sm mt-1">กรอกข้อมูลสำหรับขั้นตอนนี้</p>
                            </div>
                        )}
                        {activeStep === 6 && (
                            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                                <div className="text-emerald-600 mb-3"><FileCheck size={48} /></div>
                                <p className="font-bold text-gray-600">ขั้นตอน 6: {steps[5].title}</p>
                                <p className="text-sm mt-1">กรอกข้อมูลสำหรับขั้นตอนนี้</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 p-5 border-t border-gray-200 flex justify-between">
                        <button onClick={() => activeStep === 1 ? setShowNew(false) : setActiveStep(Math.max(1, activeStep - 1))} className="px-5 py-2.5 font-semibold text-gray-500 hover:text-gray-700 text-sm">
                            {activeStep === 1 ? "ยกเลิก" : "← ย้อนกลับ"}
                        </button>
                        <button onClick={() => setActiveStep(Math.min(6, activeStep + 1))} disabled={activeStep === 1 && imei.length < 5}
                            className={`px-6 py-2.5 font-bold rounded-lg text-sm transition-colors ${activeStep === 1 && imei.length < 5 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                            {activeStep === 6 ? "✓ ยืนยันและตัดสิทธิ์" : "ถัดไป →"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center text-center">
                    <ClipboardList size={48} className="text-gray-200 mb-4" />
                    <h4 className="font-bold text-gray-400">ยังไม่มีงานเคลม คลิก "เปิดเคสใหม่" เพื่อเริ่มต้น</h4>
                </div>
            )}
        </div>
    );
}
