"use client";
import React from "react";
import { Info, Receipt, Calendar } from "lucide-react";

export default function AccountingPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-gray-800">บัญชี & Amortization</h2>
                <p className="text-gray-500 text-sm mt-1">ตัดจำหน่ายรายได้ค่าประกันเฉลี่ย 36 งวด เพื่อวิเคราะห์กำไรสุทธิรายเดือน</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
                    <div className="flex items-center gap-2 text-blue-600"><Info size={18} /><h3 className="font-bold text-gray-800">หลักการรับรู้รายได้ (Revenue Amortization)</h3></div>
                    <p className="text-sm text-gray-600 leading-relaxed">ค่าประกัน 10% ที่เก็บจากลูกค้าจะถูก <span className="text-blue-600 font-bold">แบ่งออกเป็น 36 ส่วนเท่ากัน</span> กำไรสุทธิที่แสดงใน Dashboard จะเป็นกำไรที่ <span className="text-emerald-600 font-bold">หักลบหนี้เสียและค่าซ่อมจริง</span> แล้วเท่านั้น</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-500 mb-1">รายได้รอรับรู้</p><p className="text-xl font-black text-gray-800">฿4,250,800</p></div>
                        <div className="bg-blue-600 p-4 rounded-xl text-white"><p className="text-xs text-blue-200 mb-1">รับรู้แล้วเดือนนี้</p><p className="text-xl font-black">฿148,500</p></div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs space-y-1.5 text-gray-700">
                        <p>+ ดอกเบี้ยรับจริง</p><p>+ รายได้ประกัน (ตัดงวดแล้ว)</p>
                        <p className="text-red-500">− หนี้เสีย (NPL)</p><p className="text-red-500">− ค่าซ่อม / ค่าอะไหล่</p>
                        <div className="border-t border-gray-300 pt-1.5 font-black text-emerald-600">= กำไรสุทธิจริง</div>
                    </div>
                </div>

                <div className="bg-[#0F172A] text-white p-6 rounded-xl">
                    <h3 className="font-bold mb-5 flex items-center gap-2"><Calendar size={18} className="text-cyan-400" />การตัดงวดเดือนนี้</h3>
                    <div className="space-y-3">
                        {[{ device: "iPhone 15 Pro Max", id: "NC-1001", perMonth: 125, month: 8 }, { device: "iPad Pro M4", id: "NC-1004", perMonth: 150, month: 3 }, { device: "iPhone 14 Plus", id: "NC-1002", perMonth: 88.88, month: 14 }].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-cyan-400"><Receipt size={16} /></div>
                                    <div><p className="text-sm font-bold">{item.device}</p><p className="text-[10px] text-gray-400">งวดที่ {item.month}/36 • {item.id}</p></div>
                                </div>
                                <p className="text-sm font-black text-cyan-400">+฿{item.perMonth.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center">
                        <p className="text-xs text-gray-400">รวมตัดงวดเดือนนี้</p>
                        <p className="text-xl font-black text-cyan-300">฿148,500</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
