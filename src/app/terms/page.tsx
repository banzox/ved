import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 leading-relaxed">
        <h1 className="text-4xl font-bold text-white mb-8">شروط الاستخدام</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">1. قبول الشروط</h2>
          <p className="mb-4">
            بمجرد دخولك واستخدامك لموقع "نتفليكس العرب"، فإنك توافق على الالتزام بالشروط والأحكام الموضحة في هذه الصفحة.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">2. حقوق المحتوى</h2>
          <p className="mb-4">
            جميع المواد المعروضة على الموقع هي لأغراض ترفيهية فقط. الموقع لا يستضيف أي ملفات فيديو على خوادمه الخاصة، بل يوفر روابط لمحتوى متاح للجمهور على الإنترنت.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">3. الاستخدام العادل</h2>
          <p className="mb-4">
            يُمنع استخدام الموقع لأي أغراض غير قانونية أو لانتهاك حقوق الملكية الفكرية للآخرين.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">4. إخلاء المسؤولية</h2>
          <p>
            نحن لا نضمن دقة أو اكتمال المعلومات المتوفرة على الموقع، ولا نتحمل مسؤولية أي أضرار ناتجة عن استخدام الموقع أو المحتوى المعروض عليه.
          </p>
        </section>
      </div>
    </main>
  );
}
