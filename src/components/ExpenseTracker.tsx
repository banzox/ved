"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Plus, Trash2 } from "lucide-react";

export default function ExpenseTracker({ dict }: { dict: any }) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");

  // Basic categories
  const categories = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Salary", "Investment", "Other"];
  
  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#64748b'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    const newTx = {
      id: Date.now().toString(),
      amount: Number(amount),
      category,
      type,
      date: new Date().toLocaleDateString()
    };

    setTransactions([newTx, ...transactions]);
    setAmount("");
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Calculate data for Pie Chart (Expenses only)
  const expensesData = categories.map(cat => {
    const total = transactions
      .filter(t => t.type === 'expense' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: cat, value: total };
  }).filter(d => d.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Add Transaction Form */}
      <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5 h-fit">
        <h3 className="text-xl font-bold text-white mb-6">{dict.dashboard.add_transaction}</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-lg border font-medium transition-colors ${type === 'expense' ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'bg-zinc-950 border-white/10 text-zinc-400'}`}
              >
                Expense
              </button>
              <button 
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-lg border font-medium transition-colors ${type === 'income' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : 'bg-zinc-950 border-white/10 text-zinc-400'}`}
              >
                Income
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-zinc-500">$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-4 transition-colors">
            <Plus size={20} />
            Add Transaction
          </button>
        </form>
      </div>

      {/* Chart and List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 h-[300px]">
            <h3 className="text-lg font-bold text-white mb-2">Expenses by Category</h3>
            {expensesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => `$${value}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500">
                No expenses yet
              </div>
            )}
          </div>

          {/* Transactions List */}
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 h-[300px] flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4">{dict.dashboard.recent_transactions}</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {transactions.length > 0 ? transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5">
                  <div>
                    <p className="font-medium text-white">{tx.category}</p>
                    <p className="text-xs text-zinc-500">{tx.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-white'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount}
                    </span>
                    <button onClick={() => handleDelete(tx.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
                  No transactions added
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
