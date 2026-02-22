"use client";

import { useState } from "react";

const plans = [
    {
        range: "8,001 - 20,000 บาท",
        monthly: "179",
        yearly: "1,990",
    },
    {
        range: "20,001 - 30,000 บาท",
        monthly: "219",
        yearly: "2,390",
    },
    {
        range: "30,001 - 40,000 บาท",
        monthly: "249",
        yearly: "2,690",
    },
    {
        range: "40,001 บาท ขึ้นไป",
        monthly: "329",
        yearly: "3,690",
    },
];

export function PricingPackages() {
    const [active, setActive] = useState(0);

    return (
        <section className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
                    แพ็กเกจบริการ
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6"
                        >
                            {/* Header */}
                            <div>
                                <p className="text-xs font-bold text-gray-500 mb-0.5">ราคาเครื่อง</p>
                                <p className="text-sm font-black text-gray-800">{plan.range}</p>
                            </div>

                            {/* Monthly */}
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xs font-bold text-gray-600">รายเดือน</span>
                                        <span className="text-2xl font-black text-gray-900 ml-1">{plan.monthly}</span>
                                        <span className="text-xs font-bold text-gray-500">บาท</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-medium">ราคารวม VAT</p>
                                </div>
                                <button className="shrink-0 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs font-black px-3 py-2 rounded-xl transition-all whitespace-nowrap shadow-sm shadow-blue-200">
                                    สมัครบริการ
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100" />

                            {/* Yearly */}
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xs font-bold text-gray-600">รายปี</span>
                                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 ml-1">{plan.yearly}</span>
                                        <span className="text-xs font-bold text-gray-500">บาท</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-medium">ราคารวม VAT</p>
                                </div>
                                <button className="shrink-0 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs font-black px-3 py-2 rounded-xl transition-all whitespace-nowrap shadow-sm shadow-blue-200">
                                    สมัครบริการ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {[0, 1, 2].map((d) => (
                        <button
                            key={d}
                            onClick={() => setActive(d)}
                            className={`rounded-full transition-all ${active === d ? "w-6 h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500" : "w-2.5 h-2.5 bg-gray-300"}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
