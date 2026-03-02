"use client";
import { useRouter } from "next/navigation";
import { useRegister } from "../RegisterContext";

export default function Step3() {
    const router = useRouter();
    const { devicePrice, packageType, setPackageType } = useRegister();
    const priceNum = Number(devicePrice) || 0;

    const packages = [
        { id: 'monthly', title: 'Naravich Care Standard', type: '(จอแตกเท่านั้น)', duration: '(รายเดือน)', price: priceNum * 0.05, unit: 'บาท / เดือน', highlights: ['ซ่อมแซมหน้าจอกรณีเกิดความเสียหายจากอุบัติเหตุได้ 1 ครั้งภายในระยะเวลาแพ็กเกจ'] },
        { id: '1year', title: 'Naravich Care Plus', type: '(จอแตก+ตัวเครื่อง)', duration: '(1 ปี)', price: priceNum * 0.05 * 12, unit: 'บาท / ปี', highlights: ['ซ่อมแซมหน้าจอกรณีเกิดความเสียหายจากอุบัติเหตุได้ 2 ครั้งภายในระยะเวลาแพ็กเกจ', 'บริการเปลี่ยนเครื่อง (Swap) และ/หรือ รับเครื่องทดแทน (Replacement) 1 ครั้ง'] },
        { id: '3years', title: 'Naravich Care Premium', type: '(คุ้มครองสูงสุด)', duration: '(3 ปี)', price: priceNum * 0.05 * 36, unit: 'บาท / 3 ปี', highlights: ['ซ่อมแซมหน้าจอกรณีเกิดความเสียหายจากอุบัติเหตุไม่จำกัดจำนวนครั้ง', 'บริการเปลี่ยนเครื่อง (Swap) และ/หรือ รับเครื่องทดแทน (Replacement) 2 ครั้ง'] },
        { id: '6years', title: 'Naravich Care Ultimate', type: '(เหมาจ่ายยาวนาน)', duration: '(6 ปี)', price: priceNum * 0.05 * 72, unit: 'บาท / 6 ปี', highlights: ['ครอบคลุมทุกความเสียหาย ตลอดระยะเวลา 6 ปี', 'สิทธิพิเศษเปลี่ยนแบตเตอรี่ฟรี 1 ครั้ง'] }
    ];

    return (
        <div className="w-full space-y-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center">เลือกแพ็กเกจความคุ้มครอง</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`rounded-3xl border-2 transition-all flex flex-col overflow-hidden relative shadow-sm ${packageType === pkg.id ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                    >
                        {/* Header Gradient */}
                        <div className="bg-gradient-to-r from-blue-700 to-cyan-500 py-3 px-4 text-center">
                            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-tight">ราคาเครื่อง</p>
                            <p className="text-xs font-black text-white uppercase tracking-tight">มากกว่า {priceNum.toLocaleString()} บาท</p>
                        </div>

                        {/* Price Bar */}
                        <div className="bg-cyan-50 py-3 text-center border-b border-cyan-100">
                            <p className="text-xl font-black text-slate-800">{pkg.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} {pkg.unit}</p>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 space-y-5">
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-900 leading-tight">
                                    {pkg.title}<br />{pkg.type} {pkg.duration}
                                </h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">({priceNum.toLocaleString()} - {(priceNum * 1.5).toLocaleString()})</p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider">ไฮไลท์</p>
                                <ul className="space-y-2 list-none">
                                    {pkg.highlights.map((h, i) => (
                                        <li key={i} className="text-[10px] font-bold text-slate-500 leading-relaxed flex gap-2">
                                            <span className="text-blue-500">•</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Select Button */}
                        <div className="p-6 pt-0 flex flex-col items-center gap-4">
                            <button
                                onClick={() => setPackageType(pkg.id)}
                                className={`w-full py-3 rounded-full text-sm font-black text-white transition-all transform active:scale-95 shadow-md ${packageType === pkg.id ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500' : 'bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500'}`}
                            >
                                {packageType === pkg.id ? 'เลือกแล้ว' : 'เลือก'}
                            </button>
                            <button className="text-[10px] font-bold text-slate-400 hover:text-blue-500 underline transition-colors uppercase tracking-widest">ดูรายละเอียด</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-12 max-w-[600px] mx-auto w-full">
                <button
                    onClick={() => router.back()}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-4 rounded-2xl text-xl transition-all"
                >
                    ย้อนกลับ
                </button>
                <button
                    onClick={() => router.push("/register/step4")}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl text-xl transition-all shadow-xl disabled:opacity-20"
                    disabled={!packageType}
                >
                    ต่อไป
                </button>
            </div>
        </div>
    );
}
