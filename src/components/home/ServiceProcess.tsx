export function ServiceProcess() {
    const rows = [
        {
            request: "ภายในวัน (Same day)",
            delivery: "เจ้าหน้าที่เข้ารับภายในวัน",
            area: "กรุงเทพมหานคร, สมุทรปราการ, นนทบุรี, ปทุมธานี, มหาชัย, สาลาคาม",
            shade: false,
        },
        {
            request: (
                <>
                    ขอรับบริการเวลา<br />8.00 - 14.00 น.
                </>
            ),
            delivery: "เจ้าหน้าที่เข้ารับเครื่องในวันตัดไป",
            area: "กรุงเทพมหานคร และปริมณฑล",
            shade: true,
        },
        {
            request: (
                <>
                    ขอรับบริการ 8.00 - 14.00 น.<br />(พื้นที่ต่างจังหวัด)
                </>
            ),
            delivery: "เจ้าหน้าที่เข้ารับเครื่องภายใน 2-3 วันทำการ",
            area: (
                <>
                    <p><span className="font-bold text-gray-800">ภาคเหนือ :</span> เชียงใหม่, ลำพูน, เชียงราย, พะเยา, น่าน, แพร่, ตาก, สุโขทัย, อุตรดิตถ์, พิษณุโลก, กำแพงเพชร และพิจิตร</p>
                    <p className="mt-1.5"><span className="font-bold text-gray-800">ภาคกลาง :</span> ลพบุรี, สิงห์บุรี, ชัยนาท, นครสวรรค์, อุทัยธานี, สุพรรณบุรี และอ่างทอง</p>
                    <p className="mt-1.5"><span className="font-bold text-gray-800">ภาคตะวันออก :</span> ชลบุรี, ระยอง, สระแก้ว, ปราจีนบุรี, จันทบุรี และตราด</p>
                    <p className="mt-1.5"><span className="font-bold text-gray-800">ภาคตะวันตก :</span> ราชบุรี, กาญจนบุรี, เพชรบุรี และประจวบคีรีขันธ์</p>
                </>
            ),
            shade: false,
        },
        {
            request: (
                <>
                    ขอรับบริการ 8.00 - 14.00 น.<br />(พื้นที่ห่างไกล)
                </>
            ),
            delivery: "เจ้าหน้าที่เข้ารับเครื่องภายใน 3-5 วันทำการ",
            area: "แม่ฮ่องสอน, ยะลา, ปัตตานี, นราธิวาส เกาะต่างๆ (เกาะสมุย, เกาะพะงัน, เกาะเต้า, เกาะช้าง เป็นต้น)",
            shade: true,
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">

                <div className="rounded-3xl overflow-hidden border border-blue-100 shadow-lg shadow-blue-50/50">

                    {/* Dark Header */}
                    <div className="bg-gray-950 text-white text-center py-7 px-6">
                        <p className="text-sm font-bold text-blue-200 mb-1.5 tracking-wider uppercase">Service Request</p>
                        <p className="text-xl md:text-2xl font-black">
                            เปลี่ยนเครื่อง รับเครื่องทดแทน หรือการซ่อมแซมเครื่อง
                        </p>
                    </div>

                    {/* Blue Column Headers */}
                    <div className="grid grid-cols-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm md:text-base">
                        <div className="px-6 py-4 border-r border-white/20 flex items-center">รับคำขอใช้บริการ</div>
                        <div className="px-6 py-4 border-r border-white/20 flex items-center">ระยะเวลาในการจัดส่ง</div>
                        <div className="px-6 py-4 flex items-center text-center leading-snug">
                            พื้นที่ให้บริการเข้ารับ/<br />จัดส่งอุปกรณ์โทรศัพท์เคลื่อนที่
                        </div>
                    </div>

                    {/* Rows */}
                    {rows.map((row, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-3 border-t border-blue-50 text-sm md:text-base ${row.shade ? "bg-blue-50/40" : "bg-white"}`}
                        >
                            <div className="px-6 py-5 border-r border-blue-50 font-bold text-blue-700 flex items-center">
                                {row.request}
                            </div>
                            <div className="px-6 py-5 border-r border-blue-50 text-gray-600 flex items-center">
                                {row.delivery}
                            </div>
                            <div className="px-6 py-5 text-gray-600 text-sm leading-relaxed">
                                {row.area}
                            </div>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="bg-gray-950 text-white text-center text-sm py-4 px-6">
                        ในรับรองสิทธิการรับบริการ ระยะจัดส่งไปยัง email ลูกค้า ภายใน 7 วันทำการ
                    </div>

                </div>
            </div>
        </section>
    );
}
