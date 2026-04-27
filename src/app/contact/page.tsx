import Navbar from "@/components/Navbar";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      <Navbar />
      
      <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">اتصل بنا</h1>
          <p className="text-gray-400">هل لديك استفسار أو واجهت مشكلة؟ نحن هنا للمساعدة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">البريد الإلكتروني</h3>
                <p className="text-gray-400 text-sm">support@cinemamax.space</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">الدعم الفني</h3>
                <p className="text-gray-400 text-sm">متاح على مدار الساعة للرد على استفساراتكم.</p>
              </div>
            </div>
          </div>

          {/* Contact Form (UI Only) */}
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">الاسم بالكامل</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="أدخل اسمك..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">الرسالة</label>
                <textarea 
                  rows={4}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
