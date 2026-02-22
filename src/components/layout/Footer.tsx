import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Instagram, Phone, Mail, MapPin, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#0A0A0B] text-gray-400 pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <div className="mb-8">
                            <Image
                                src="/logo/logonavarich.png"
                                alt="NaravichCare"
                                width={180}
                                height={60}
                                className="brightness-0 invert object-contain h-auto"
                            />
                        </div>
                        <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-sm">
                            ยกระดับการดูแลอุปกรณ์ Apple ของคุณด้วยบริการระดับมืออาชีพ
                            คุ้มครองทุกความเสียหาย มอบความอุ่นใจในทุกการใช้งาน
                            NaravichCare คู่คิดที่แท้จริงสำหรับอุปกรณ์ของคุณ
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Facebook size={18} />, href: "#" },
                                { icon: <Youtube size={18} />, href: "#" },
                                { icon: <Instagram size={18} />, href: "#" },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:scale-110 transition-all border border-white/10"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold text-lg mb-7">บริการของเรา</h4>
                        <ul className="space-y-4">
                            {["ผ่อนมือถือ", "จำนำ iCloud", "ประกัน 3 ปี", "ซ่อมมือถือ"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm hover:text-blue-400 transition-colors flex items-center group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500 mr-0 transition-all group-hover:mr-2"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold text-lg mb-7">เกี่ยวกับเรา</h4>
                        <ul className="space-y-4">
                            {["เกี่ยวกับบริษัท", "สาขาของเรา", "ร่วมงานกับเรา", "ข่าวสาร"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm hover:text-blue-400 transition-colors flex items-center group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500 mr-0 transition-all group-hover:mr-2"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="lg:col-span-4">
                        <h4 className="text-white font-bold text-lg mb-7">ติดต่อสอบถาม</h4>
                        <div className="space-y-5 mb-8">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                                    <p className="text-sm text-gray-200 font-bold tracking-wide">02-XXX-XXXX</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Email Address</p>
                                    <p className="text-sm text-gray-200 font-bold">contact@naravichCare.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter Input */}
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="รับข่าวสารทางอีเมล..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                        <p className="text-xs text-gray-600 font-medium tracking-wide">
                            © {new Date().getFullYear()} NaravichCare. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="#" className="text-xs text-gray-600 hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
                            <Link href="#" className="text-xs text-gray-600 hover:text-white transition-colors">เงื่อนไขการใช้บริการ</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Powered by</p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center overflow-hidden">
                                <Image src="/logo/logonavarich.png" alt="Mini Logo" width={10} height={10} className="brightness-0 invert opacity-50" />
                            </div>
                            <span className="text-xs text-gray-500 font-black tracking-tight">Navarich Group</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
