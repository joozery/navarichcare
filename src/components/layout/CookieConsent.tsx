"use client";

import React, { useState } from "react";

export function CookieConsent() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="fixed bottom-10 left-0 right-0 z-[100] px-4 pointer-events-none">
            <div className="max-w-5xl mx-auto pointer-events-auto">
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-10 border border-gray-50 flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-10 duration-700">

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-black text-gray-900 mb-3">เว็บไซต์นี้ใช้คุกกี้</h3>
                        <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed font-medium">
                            เพื่อมอบประสบการณ์ที่ดีในการใช้งานเว็บไซต์ เราใช้คุกกี้เพื่อวิเคราะห์การใช้งาน และนำเสนอคอนเทนต์ที่ตรงใจคุณมากขึ้น
                            ศึกษา รายละเอียดได้ที่ <a href="#" className="text-cyan-500 font-bold hover:underline">ประกาศความเป็นส่วนตัว</a>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                        <button
                            onClick={() => setVisible(false)}
                            className="w-full md:px-12 py-3.5 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-black text-sm rounded-full shadow-lg shadow-purple-100 hover:opacity-90 transition-all active:scale-95"
                        >
                            ยอมรับคุกกี้ทั้งหมด
                        </button>
                        <button
                            onClick={() => setVisible(false)}
                            className="w-full md:px-12 py-3.5 bg-white border border-purple-100 text-purple-600 font-black text-sm rounded-full hover:bg-purple-50 transition-all active:scale-95"
                        >
                            ตั้งค่ารายการคุกกี้
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
