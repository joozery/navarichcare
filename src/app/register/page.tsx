"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

            if (response.ok) {
                setStep(4);
            } else {
                const error = await response.json();
                alert("เกิดข้อผิดพลาด: " + error.message);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        } finally {
            setLoading(false);
        }
    };

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
                {/* Title */}
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
                            <p className="text-gray-500 font-bold">เราได้รับข้อมูลของคุณเรียบร้อยแล้ว</p>
                        </div>
                    )}
                </div>

                {/* Form Steps */}
                <div className="w-full space-y-8">
                    {step === 1 && (
                        <>
                            {/* Step 1 Fields... */}
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
                            {/* Step 2 Fields... */}
                            <div className="space-y-3">
                                <label className="text-2xl font-bold text-gray-800 block">
                                    ยี่ห้อ :
                                </label>
                                <select
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg bg-white appearance-none"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option value="">เลือกยี่ห้อ</option>
                                    <option value="apple">Apple</option>
                                    <option value="samsung">Samsung</option>
                                    <option value="oppo">Oppo</option>
                                    <option value="vivo">Vivo</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-2xl font-bold text-gray-800 block">
                                    รุ่น :
                                </label>
                                <select
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-pink-500 focus:outline-none transition-colors text-lg bg-white appearance-none"
                                    value={model}
                                    disabled={!brand}
                                    onChange={(e) => setModel(e.target.value)}
                                >
                                    <option value="">{brand ? "เลือกรุ่น" : "กรุณาเลือกยี่ห้อก่อน"}</option>
                                    {brand === "apple" && (
                                        <>
                                            <option value="iphone16">iPhone 16 Pro Max</option>
                                            <option value="iphone15">iPhone 15</option>
                                        </>
                                    )}
                                    {brand === "samsung" && (
                                        <>
                                            <option value="s24">Samsung S24 Ultra</option>
                                            <option value="s23">Samsung S23</option>
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
                            {/* Step 3 Fields... */}
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
                                    disabled={!fullName || !email || !address || loading}
                                >
                                    {loading ? "กำลังบันทึก..." : "สมัครบริการ"}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <div className="pt-8 text-center space-y-6">
                            <p className="text-lg text-gray-600 font-medium">
                                เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันข้อมูลภายใน 24 ชม.
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-gray-900 text-white font-bold px-12 py-4 rounded-2xl hover:bg-black transition-colors"
                            >
                                กลับสู่หน้าหลัก
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
