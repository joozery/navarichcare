"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { CheckCircle2, Download, ChevronLeft, Printer, ShieldCheck, Info } from "lucide-react";

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [imei, setImei] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");

    // Step 3 Personal Details
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [idCard, setIdCard] = useState("");
    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(false);
    const [registrationResult, setRegistrationResult] = useState<any>(null);
    const [showCertificate, setShowCertificate] = useState(false);

    const certificateRef = useRef<HTMLDivElement>(null);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone,
                    imei,
                    brand,
                    model,
                    fullName,
                    email,
                    idCard,
                    address,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setRegistrationResult(result.data);
                setStep(4);
            } else {
                alert("เกิดข้อผิดพลาด: " + result.message);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (showCertificate && registrationResult) {
        return (
            <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 print:bg-white print:py-0">
                <div className="mb-6 flex gap-4 print:hidden">
                    <button
                        onClick={() => setShowCertificate(false)}
                        className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"
                    >
                        <ChevronLeft size={18} /> ย้อนกลับ
                    </button>
                    <button
                        onClick={handlePrint}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
                    >
                        <Printer size={18} /> พิมพ์ใบรับรอง / พิมพ์เป็น PDF
                    </button>
                </div>

                {/* Printable Certificate UI (Kept from premium version for functionality) */}
                <div
                    ref={certificateRef}
                    className="w-[800px] bg-white shadow-2xl overflow-hidden relative print:shadow-none print:w-full print:border-0 border-[16px] border-[#d4ae6e]/20"
                    style={{ aspectRatio: '1 / 1.414' }}
                >
                    <div className="absolute inset-4 border border-[#d4ae6e] pointer-events-none"></div>
                    <div className="p-12 space-y-8 relative">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h1 className="text-4xl font-black text-[#0c4a6e] tracking-tight uppercase italic flex items-center gap-2">
                                    CERTIFICATE <span className="text-[#d4ae6e]">นรวิชญ์ แคร์</span>
                                </h1>
                                <p className="text-[#d4ae6e] text-xs font-black tracking-[0.3em] uppercase">
                                    CERTIFICATE OF MOBILE INSURANCE
                                </p>
                            </div>
                            <img src="/logo/logonavarich.png" alt="Logo" className="h-12 object-contain" />
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#0c4a6e] text-white px-4 py-1 inline-block text-[11px] font-black uppercase tracking-widest rounded-r-full">
                                ข้อมูลผู้รับความคุ้มครอง (CUSTOMER INFORMATION)
                            </div>
                            <div className="grid grid-cols-2 gap-y-4 text-sm font-bold text-slate-700 mt-4 px-2">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">ชื่อ-นามสกุล / FULL NAME</p>
                                    <p className="text-base text-[#0c4a6e] border-b border-slate-100 pb-1">{registrationResult.fullName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">เบอร์โทรศัพท์ / PHONE NUMBER</p>
                                    <p className="text-base text-[#0c4a6e] border-b border-slate-100 pb-1">{registrationResult.phone}</p>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">เลขที่บัตรประชาชน / ID CARD NUMBER</p>
                                    <p className="text-base text-[#0c4a6e] border-b border-slate-100 pb-1">XXX-XXXX-{registrationResult.idCard.slice(-4)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#0c4a6e] text-white px-4 py-1 inline-block text-[11px] font-black uppercase tracking-widest rounded-r-full">
                                รายละเอียดอุปกรณ์ (DEVICE DETAILS)
                            </div>
                            <div className="grid grid-cols-3 gap-6 text-sm font-bold text-slate-700 mt-4 px-2">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">ยี่ห้อ/รุ่น / BRAND MODEL</p>
                                    <p className="text-base text-[#0c4a6e] uppercase">{registrationResult.brand} {registrationResult.model}</p>
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">เลข IMEI / IMEI NUMBER</p>
                                    <p className="text-base text-[#0c4a6e] tracking-widest">{registrationResult.imei}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#0c4a6e] text-white px-4 py-1 inline-block text-[11px] font-black uppercase tracking-widest rounded-r-full">
                                สรุปความคุ้มครอง (COVERAGE SUMMARY)
                            </div>
                            <table className="w-full text-left mt-4 border-collapse overflow-hidden rounded-xl border border-slate-100">
                                <thead>
                                    <tr className="bg-[#fcf8f1] border-b border-[#ebd7b1]">
                                        <th className="px-6 py-3 text-[10px] font-black text-[#d4ae6e] uppercase tracking-widest">รายการคุ้มครอง</th>
                                        <th className="px-6 py-3 text-[10px] font-black text-[#d4ae6e] uppercase tracking-widest text-center">จำกัดสิทธิ์</th>
                                        <th className="px-6 py-3 text-[10px] font-black text-[#d4ae6e] uppercase tracking-widest text-center">ทุนประกันภัย</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-bold text-slate-700">
                                    <tr className="border-b border-slate-50">
                                        <td className="px-6 py-4 flex items-center gap-2">หน้าจอแตก (Broken Screen)</td>
                                        <td className="px-6 py-4 text-center">1 ครั้ง</td>
                                        <td className="px-6 py-4 text-center font-black text-[#0c4a6e]">Full Coverage</td>
                                    </tr>
                                    <tr className="border-b border-slate-50">
                                        <td className="px-6 py-4 flex items-center gap-2">ความเสียหายจากของเหลว (Liquid)</td>
                                        <td className="px-6 py-4 text-center">1 ครั้ง</td>
                                        <td className="px-6 py-4 text-center font-black text-[#0c4a6e]">฿5,000.00</td>
                                    </tr>
                                    <tr className="">
                                        <td className="px-6 py-4 flex items-center gap-2">การโจรกรรม (Theft)</td>
                                        <td className="px-6 py-4 text-center">1 ครั้ง</td>
                                        <td className="px-6 py-4 text-center font-black text-[#0c4a6e]">฿10,000.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black text-[#0c4a6e] uppercase tracking-widest flex items-center gap-2">
                                    <Info size={12} className="text-[#d4ae6e]" /> ข้อยกเว้นสำคัญ (EXCLUSIONS)
                                </h4>
                                <ul className="text-[9px] text-slate-500 font-bold space-y-1.5 list-disc pl-4 italic">
                                    <li>การเจตนาทำให้ทรัพย์สินเสียหาย (Intentional Damage)</li>
                                    <li>การซ่อมแซมจากร้านภายนอกที่ไม่ได้รับอนุญาต</li>
                                    <li>การลบชื่อผู้ใช้หรือรหัสผ่านเครื่อง (ID/Pass lock)</li>
                                    <li>ความเสียหายที่เกิดขึ้นก่อนการสมัครบริการ</li>
                                </ul>
                            </div>
                            <div className="text-right flex flex-col items-end justify-center">
                                <div className="w-24 h-24 rounded-full border border-slate-100 flex items-center justify-center relative bg-[#fcf8f1]/30">
                                    <p className="text-[8px] font-black text-[#d4ae6e] uppercase tracking-widest text-center px-2">
                                        Certified Naravich Care
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 grid grid-cols-2 gap-20">
                            <div className="text-center space-y-2 border-t border-slate-200 pt-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">ลงชื่อผู้รับความคุ้มครอง</p>
                                <p className="text-xs font-bold text-slate-700">({registrationResult.fullName})</p>
                            </div>
                            <div className="text-center space-y-2 border-t border-slate-200 pt-3 flex flex-col items-center">
                                <div className="h-6 italic font-serif text-blue-900 font-bold -mb-4">Naravich S.</div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">ลงชื่อผู้ให้ความคุ้มครอง</p>
                                <p className="text-xs font-bold text-slate-700">(Naravich Care Co., Ltd.)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @media print {
                        body { margin: 0; padding: 0; }
                        nav, footer, button { display: none !important; }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            {/* Header / Logo */}
            <div className="w-full py-6 flex justify-center border-b border-gray-100">
                <Link href="/">
                    <Image
                        src="/logo/logonavarich.png"
                        alt="NaravichCare Logo"
                        width={180}
                        height={48}
                        className="h-10 w-auto object-contain"
                    />
                </Link>
            </div>

            <main className="w-full max-w-[600px] px-6 py-12 flex flex-col items-center">
                {/* Original UI Title Section */}
                <div className="text-center mb-12">
                    <h1 className="text-[40px] font-black tracking-tight flex flex-col items-center">
                        <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent uppercase text-center">
                            สมัครบริการ Naravich Care
                        </span>
                        <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mt-2 rounded-full" />
                    </h1>
                    {step === 2 && (
                        <p className="text-2xl font-bold text-gray-800 mt-8">รายละเอียดอุปกรณ์ของคุณ</p>
                    )}
                    {step === 3 && (
                        <p className="text-2xl font-bold text-gray-800 mt-8">รายละเอียดส่วนตัว</p>
                    )}
                    {step === 4 && (
                        <div className="mt-8 flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-500 text-4xl font-black">✓</span>
                            </div>
                            <p className="text-3xl font-black text-gray-900">สมัครบริการสำเร็จ!</p>
                            <p className="text-gray-500 font-bold">ข้อมูลของท่านถูกนำเข้าสู่ระบบความคุ้มครองเรียบร้อยแล้ว</p>
                        </div>
                    )}
                </div>

                {/* Form Steps - Restoration of original styles */}
                <div className="w-full space-y-8">
                    {step === 1 && (
                        <>
                            <div className="space-y-3">
                                <label className="text-xl font-bold text-gray-800 block">
                                    ระบุหมายเลขโทรศัพท์ของคุณ
                                </label>
                                <input
                                    type="text"
                                    placeholder="กรอกหมายเลขโทรศัพท์ 10 หลักของคุณ"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xl font-bold text-gray-800 block">
                                    หมายเลขเลข IMEI
                                </label>
                                <input
                                    type="text"
                                    placeholder="กรอกหมายเลขเลข IMEI 15 หลัก"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg"
                                    value={imei}
                                    onChange={(e) => setImei(e.target.value)}
                                />
                            </div>

                            <p className="text-xl font-bold text-gray-700 text-center py-4">
                                ตรวจสอบหมายเลขเลขได้ เพียงกด <span className="text-pink-600">*#06#</span> โทรออก
                            </p>

                            <div className="pt-8">
                                <button
                                    onClick={nextStep}
                                    className="w-full bg-[#9da3af] hover:bg-pink-600 text-white font-bold py-5 rounded-[1.5rem] text-2xl transition-all shadow-lg"
                                    disabled={!phone || !imei}
                                >
                                    ต่อไป
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="space-y-3">
                                <label className="text-2xl font-bold text-gray-800 block">ยี่ห้อ :</label>
                                <select
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg bg-white appearance-none"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option value="">เลือกยี่ห้อ</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Oppo">Oppo</option>
                                    <option value="Vivo">Vivo</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-2xl font-bold text-gray-800 block">รุ่น :</label>
                                <select
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg bg-white appearance-none"
                                    value={model}
                                    disabled={!brand}
                                    onChange={(e) => setModel(e.target.value)}
                                >
                                    <option value="">{brand ? "เลือกรุ่น" : "กรุณาเลือกยี่ห้อก่อน"}</option>
                                    {brand === "Apple" && (
                                        <>
                                            <option value="iPhone 16 Pro Max">iPhone 16 Pro Max</option>
                                            <option value="iPhone 15">iPhone 15</option>
                                        </>
                                    )}
                                    {brand === "Samsung" && (
                                        <>
                                            <option value="S24 Ultra">Samsung S24 Ultra</option>
                                            <option value="S23">Samsung S23</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-8">
                                <button
                                    onClick={prevStep}
                                    className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-4 rounded-[1.5rem] text-2xl transition-all shadow-lg"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="w-full bg-[#9da3af] hover:bg-pink-600 text-white font-bold py-4 rounded-[1.5rem] text-2xl transition-all shadow-lg"
                                    disabled={!brand || !model}
                                >
                                    ต่อไป
                                </button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="space-y-6 text-left">
                                <div className="space-y-2">
                                    <label className="text-xl font-bold text-gray-800 block">ชื่อ-นามสกุล :</label>
                                    <input
                                        type="text"
                                        placeholder="ระบุชื่อ-นามสกุล ของคุณ"
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xl font-bold text-gray-800 block">อีเมล :</label>
                                    <input
                                        type="email"
                                        placeholder="ระบุอีเมลของคุณ"
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xl font-bold text-gray-800 block">เลขบัตรประชาชน :</label>
                                    <input
                                        type="text"
                                        placeholder="ระบุเลขบัตรประชาชน 13 หลัก"
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg"
                                        value={idCard}
                                        onChange={(e) => setIdCard(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xl font-bold text-gray-800 block">ที่อยู่ :</label>
                                    <textarea
                                        placeholder="ระบุที่อยู่สำหรับการจัดส่งเอกสาร"
                                        rows={3}
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg resize-none"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-8">
                                <button
                                    onClick={prevStep}
                                    className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-4 rounded-[1.5rem] text-2xl transition-all shadow-lg"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:scale-[1.02] text-white font-bold py-4 rounded-[1.5rem] text-2xl transition-all shadow-lg disabled:opacity-50"
                                    disabled={!fullName || !idCard || loading}
                                >
                                    {loading ? "กำลังบันทึก..." : "สมัครบริการ"}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <div className="pt-8 text-center space-y-8 animate-in slide-in-from-bottom-5 duration-700">
                            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                    ยินดีด้วย! ท่านได้ทำการสมัครบริการสำเร็จแล้ว<br />
                                    <span className="text-pink-600 font-black">ใบรับรองความคุ้มครองดิจิทัลของท่านพร้อมใช้งานแล้ว</span>
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => setShowCertificate(true)}
                                    className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] text-xl font-black uppercase hover:bg-pink-600 hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    <Download size={24} />
                                    ดู / ดาวน์โหลดใบรับรอง
                                </button>

                                <Link
                                    href="/"
                                    className="w-full py-4 border-2 border-gray-100 text-gray-400 font-bold rounded-[1.5rem] text-lg hover:bg-gray-50 transition-all text-center"
                                >
                                    กลับสู่หน้าหลัก
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
