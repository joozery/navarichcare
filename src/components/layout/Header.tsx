import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
    return (
        <header className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
            {/* Top bar (gray text) */}
            <div className="hidden border-b md:flex h-8 items-center px-4 md:px-8 text-[11px] text-gray-500 justify-between">
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-purple-600 transition-colors">บริษัทของเรา</Link>
                    <Link href="#" className="hover:text-purple-600 transition-colors">ลูกค้าองค์กร</Link>
                    <Link href="#" className="hover:text-purple-600 transition-colors">ค้นหาทรูช้อป</Link>
                </div>
                <div>
                    <Link href="#" className="flex items-center gap-1.5 hover:text-purple-600 transition-colors">
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-white rounded-[4px] px-1.5 py-[1px] text-[9px] font-bold">NC</span>
                        แอป NaravichCare
                    </Link>
                </div>
            </div>

            {/* Main Nav (white background) */}
            <div className="flex h-[72px] items-center px-4 md:px-8 justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="shrink-0 mr-10 hover:opacity-90 transition-opacity">
                    <Image
                        src="/logo/logonavarich.png"
                        alt="NaravichCare Logo"
                        width={180}
                        height={48}
                        className="h-12 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 font-medium text-[15px] text-gray-700 w-full justify-start">
                    <Link href="#" className="hover:text-purple-600 transition-colors py-2">แพ็กเกจโปรโมชัน</Link>
                    <Link href="#" className="hover:text-purple-600 transition-colors py-2">เน็ตบ้าน</Link>
                    <Link href="#" className="hover:text-purple-600 transition-colors py-2">ออนไลน์สโตร์</Link>
                    <Link href="#" className="hover:text-purple-600 transition-colors py-2">บริการลูกค้า</Link>
                    <Link href="#" className="hover:text-purple-600 transition-colors py-2">สิทธิพิเศษ</Link>
                    <Link href="#" className="hover:text-purple-600 transition-colors py-2">เครือข่ายและเทคโนโลยี</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center shrink-0 ml-auto">
                    <button className="text-gray-500 hover:text-purple-600 transition-colors" aria-label="Search">
                        <Search className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </header>
    );
}
