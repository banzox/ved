import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 leading-relaxed">
        <h1 className="text-4xl font-bold text-white mb-8">سياسة الخصوصية</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">1. جمع المعلومات</h2>
          <p className="mb-4">
            نحن في "سينما ماكس" نحترم خصوصيتك. نحن لا نقوم بجمع أي بيانات شخصية حساسة عن زوارنا. المعلومات الوحيدة التي قد يتم جمعها هي بيانات تقنية عامة مثل نوع المتصفح وعنوان IP لتحسين تجربة التصفح وحمايتها.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">2. ملفات تعريف الارتباط (Cookies)</h2>
          <p className="mb-4">
            نستخدم ملفات تعريف الارتباط لتخزين تفضيلاتك مثل "قائمتي" ولتحليل حركة المرور على الموقع. يمكنك تعطيل هذه الملفات من إعدادات متصفحك في أي وقت.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">3. إعلانات الطرف الثالث</h2>
          <p className="mb-4">
            قد نستخدم شركات إعلانات تابعة لأطراف ثالثة لخدمة الإعلانات عند زيارة موقعنا. قد تستخدم هذه الشركات معلومات عن زياراتك لهذا الموقع (باستثناء اسمك أو عنوانك) من أجل تقديم إعلانات حول السلع والخدمات التي تهمك.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">4. التغييرات في السياسة</h2>
          <p>
            نحتفظ بالحق في إجراء تغييرات على سياسة الخصوصية هذه في أي وقت. سيتم نشر أي تغييرات هنا فور اعتمادها.
          </p>
        </section>
      </div>
    </main>
  );
}
