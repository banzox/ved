"use client";
import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function CompoundCalculator({ dict }: { dict: any }) {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(8);
  const [years, setYears] = useState(10);

  const calculateData = useMemo(() => {
    let data = [];
    let currentBalance = initialAmount;
    let totalContributed = initialAmount;

    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        // Simple compounding logic for demonstration
        for (let month = 1; month <= 12; month++) {
          currentBalance += monthlyContribution;
          currentBalance *= (1 + (interestRate / 100) / 12);
          totalContributed += monthlyContribution;
        }
      }
      
      data.push({
        year: year,
        balance: Math.round(currentBalance),
        contributions: Math.round(totalContributed),
        interest: Math.round(currentBalance - totalContributed)
      });
    }
    return data;
  }, [initialAmount, monthlyContribution, interestRate, years]);

  const finalData = calculateData[calculateData.length - 1];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5 space-y-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">{dict.calculators.initial_amount}</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-zinc-500">$</span>
            <input 
              type="number" 
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">{dict.calculators.monthly_contribution}</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-zinc-500">$</span>
            <input 
              type="number" 
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">{dict.calculators.interest_rate}</label>
          <div className="relative">
            <input 
              type="number" 
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-4 pr-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-4 top-3 text-zinc-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">{dict.calculators.years}</label>
          <input 
            type="number" 
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <input 
            type="range" 
            min="1" max="40" 
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full mt-4 accent-blue-500"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <p className="text-sm text-zinc-400 mb-1">{dict.calculators.total_amount}</p>
            <h3 className="text-2xl font-bold text-white">${finalData.balance.toLocaleString()}</h3>
          </div>
          <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-6">
            <p className="text-sm text-emerald-400/70 mb-1">{dict.calculators.total_contributions}</p>
            <h3 className="text-2xl font-bold text-emerald-400">${finalData.contributions.toLocaleString()}</h3>
          </div>
          <div className="bg-zinc-900 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-sm text-blue-400/70 mb-1">{dict.calculators.total_interest}</p>
            <h3 className="text-2xl font-bold text-blue-400">${finalData.interest.toLocaleString()}</h3>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="year" stroke="#ffffff50" tick={{ fill: '#ffffff50' }} />
              <YAxis stroke="#ffffff50" tick={{ fill: '#ffffff50' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: any) => `$${Number(value).toLocaleString()}`}
              />
              <Area type="monotone" dataKey="balance" name={dict.calculators.total_amount} stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              <Area type="monotone" dataKey="contributions" name={dict.calculators.total_contributions} stroke="#10b981" strokeWidth={2} fillOpacity={0} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
