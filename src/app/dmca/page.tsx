import Navbar from "@/components/Navbar";

export default function DMCAPage() {
  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 leading-relaxed">
        <h1 className="text-4xl font-bold text-white mb-8">حقوق الملكية (DMCA)</h1>
        
        <p className="mb-6 text-lg">
          موقع "سينما ماكس" يحترم حقوق الملكية الفكرية للآخرين ويسعى للالتزام بقانون حقوق المؤلف للألفية الرقمية (DMCA).
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">طبيعة الموقع</h2>
          <p className="mb-4">
            نحن لا نستضيف أي فيديوهات أو أفلام على خوادمنا (Servers). الموقع عبارة عن محرك بحث وروابط خارجية لمواقع استضافة الفيديو المعروفة.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">تبليغ عن انتهاك</h2>
          <p className="mb-4">
            إذا كنت صاحب حق ملكية وتعتقد أن هناك محتوى في الموقع ينتهك حقوقك، يرجى مراسلتنا وتضمين المعلومات التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>وصف العمل المحمي بحقوق الطبع والنشر الذي تدعي أنه تم انتهاكه.</li>
            <li>رابط (URL) المحتوى الذي ترغب في إزالته من موقعنا.</li>
            <li>معلومات الاتصال بك (البريد الإلكتروني).</li>
            <li>بيان يؤكد أنك تملك الحق في طلب الإزالة.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">التواصل</h2>
          <p>
            يمكنكم التواصل معنا للإبلاغ عن أي انتهاك عبر البريد الإلكتروني المخصص لذلك، وسنقوم بمراجعة الطلب وإزالة الروابط خلال 48 ساعة عمل.
          </p>
        </section>
      </div>
    </main>
  );
}
