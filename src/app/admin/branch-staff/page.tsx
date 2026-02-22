"use client";
import React, { useState } from "react";
import { ClipboardList, Smartphone, ShieldCheck, CreditCard, Search, CheckCircle2 } from "lucide-react";

export default function BranchStaffPage() {
    const [activeTab, setActiveTab] = useState<"loans" | "claims" | "deductible">("loans");

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h2 className="text-2xl font-black text-gray-800">Branch Staff Portal</h2>
                <p className="text-gray-500 text-sm mt-1">คีย์ข้อมูลสินเชื่อ ตรวจสภาพเครื่อง ดำเนินการเคลม บันทึกค่า Deductible</p>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                {[{ k: "loans", l: "💳 คีย์สินเชื่อ" }, { k: "claims", l: "🛡️ ดำเนินเคลม" }, { k: "deductible", l: "💰 Deductible" }].map(t => (
                    <button key={t.k} onClick={() => setActiveTab(t.k as any)} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${activeTab === t.k ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>{t.l}</button>
                ))}
            </div>

            {activeTab === "loans" && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100"><h4 className="font-bold text-gray-800">คีย์ข้อมูลสินเชื่อใหม่</h4></div>
                    <div className="p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {[["ชื่อ-นามสกุลลูกค้า", ""], ["เบอร์โทรศัพท์", ""], ["รุ่นมือถือ", "เช่น iPhone 15 Pro"], ["หมายเลข IMEI", ""], ["ยอดจัดสินเชื่อ (฿)", "45000"], ["จำนวนงวด", "12"]].map(([label, ph], i) => (
                                <div key={i}><label className="text-xs font-bold text-gray-600 mb-1 block">{label}</label>
                                    <input placeholder={ph} className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                                </div>
                            ))}
                        </div>
                        <div><label className="text-xs font-bold text-gray-600 mb-1 block">ประเภทสัญญา</label>
                            <div className="grid grid-cols-2 gap-3">
                                {["ผ่อนมือถือปกติ (ดอก 3%/เดือน)", "จำนำ iCloud"].map((t, i) => (
                                    <label key={i} className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 text-sm font-semibold text-gray-700">
                                        <input type="radio" name="type" className="accent-blue-600" />{t}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <p className="text-xs font-bold text-blue-700 mb-2">📸 อัปโหลดรูปบังคับ 6 รายการ</p>
                            <div className="grid grid-cols-3 gap-2">
                                {["มุมซ้ายหน้า", "มุมขวาหน้า", "ด้านหลัง", "มุมล่าง", "สุขภาพแบต", "ใบสัญญา"].map((l, i) => (
                                    <div key={i} className="bg-white border-2 border-dashed border-blue-200 p-3 rounded-lg text-center cursor-pointer hover:border-blue-400">
                                        <p className="text-[9px] font-bold text-blue-500">{l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="w-full py-3 bg-blue-600 text-white font-black rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center gap-2">
                            <CheckCircle2 size={16} /> บันทึกและออกสัญญา
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "claims" && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                    <h4 className="font-bold text-gray-800">ค้นหา IMEI เพื่อดำเนินการเคลม</h4>
                    <div className="flex gap-3">
                        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input placeholder="กรอก IMEI..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm outline-none" />
                        </div>
                        <button className="px-5 py-3 bg-blue-600 text-white font-bold rounded-lg text-sm">ค้นหา</button>
                    </div>
                    <p className="text-xs text-gray-400 text-center">กรอก IMEI เพื่อตรวจสอบสิทธิ์ประกัน แล้วระบบจะแสดงขั้นตอนการเคลม 6 ขั้น</p>
                </div>
            )}

            {activeTab === "deductible" && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                    <h4 className="font-bold text-gray-800">บันทึกการรับค่า Deductible</h4>
                    <div className="space-y-4">
                        {[["เลขสัญญา / IMEI", ""], ["ประเภทการเคลม", ""], ["ค่า Deductible (฿)", "1000"]].map(([l, p], i) => (
                            <div key={i}><label className="text-xs font-bold text-gray-600 mb-1 block">{l}</label>
                                <input placeholder={p} className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm outline-none" />
                            </div>
                        ))}
                        <div><label className="text-xs font-bold text-gray-600 mb-1 block">ช่องทางชำระ</label>
                            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm outline-none">
                                <option>เงินสด</option><option>โอนเงิน</option>
                            </select>
                        </div>
                        <button className="w-full py-3 bg-emerald-600 text-white font-black rounded-lg text-sm hover:bg-emerald-700">✓ บันทึกการชำระ</button>
                    </div>
                </div>
            )}
        </div>
    );
}
