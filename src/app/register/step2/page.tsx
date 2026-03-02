"use client";
import { useRouter } from "next/navigation";
import { useRegister } from "../RegisterContext";

export default function Step2() {
    const router = useRouter();
    const { brand, setBrand, model, setModel, devicePrice, setDevicePrice } = useRegister();

    return (
        <div className="w-full max-w-[600px] mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center">รายละเอียดอุปกรณ์ของคุณ</h2>

            <div className="space-y-3">
                <label className="text-2xl font-bold text-gray-800 block">ยี่ห้อ :</label>
                <select
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-blue-600 focus:outline-none transition-colors text-lg bg-white appearance-none"
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
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-blue-600 focus:outline-none transition-colors text-lg bg-white appearance-none"
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

            <div className="space-y-3">
                <label className="text-2xl font-bold text-gray-800 block">ราคาเครื่อง (บาท) :</label>
                <input
                    type="number"
                    placeholder="ระบุราคาอุปกรณ์ของคุณ"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-blue-600 focus:outline-none transition-colors text-lg bg-white"
                    value={devicePrice}
                    onChange={(e) => setDevicePrice(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8">
                <button
                    onClick={() => router.back()}
                    className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-4 rounded-[1.5rem] text-2xl transition-all shadow-lg"
                >
                    ย้อนกลับ
                </button>
                <button
                    onClick={() => router.push("/register/step3")}
                    className="w-full bg-[#9da3af] hover:bg-blue-600 text-white font-bold py-4 rounded-[1.5rem] text-2xl transition-all shadow-lg"
                    disabled={!brand || !model || !devicePrice}
                >
                    ต่อไป
                </button>
            </div>
        </div>
    );
}
