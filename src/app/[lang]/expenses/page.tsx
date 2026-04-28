import { getDictionary, Locale } from "@/i18n/getDictionary";
import ExpenseTracker from "@/components/ExpenseTracker";

export default async function ExpensesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{dict.common.expenses} Tracker</h1>
        <p className="text-zinc-400 max-w-2xl">Keep track of your income and expenses to manage your budget effectively.</p>
      </div>

      <ExpenseTracker dict={dict} />
    </div>
  );
}
