import { getDictionary, Locale } from "@/i18n/getDictionary";
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default async function Dashboard({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const stats = [
    { title: dict.dashboard.total_balance, amount: "$24,500.00", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: dict.dashboard.monthly_income, amount: "+$4,200.00", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: dict.dashboard.monthly_expenses, amount: "-$1,850.00", icon: TrendingDown, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{dict.common.dashboard}</h1>
        <p className="text-zinc-400">Welcome back! Here is your financial overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white">{stat.amount}</h3>
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder for Charts */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 h-[400px] flex items-center justify-center">
          <p className="text-zinc-500">Cash Flow Chart Placeholder</p>
        </div>
        
        {/* Recent Transactions */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">{dict.dashboard.recent_transactions}</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">{dict.dashboard.add_transaction}</button>
          </div>
          <div className="flex flex-col items-center justify-center h-[250px]">
            <DollarSign className="w-12 h-12 text-zinc-700 mb-4" />
            <p className="text-zinc-500">No recent transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
