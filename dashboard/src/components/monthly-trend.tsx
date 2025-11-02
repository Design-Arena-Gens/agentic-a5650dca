'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MonthlySnapshot } from '@/data/expenses';

type MonthlyTrendProps = {
  snapshots: MonthlySnapshot[];
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function MonthlyTrend({ snapshots }: MonthlyTrendProps) {
  const data = snapshots.map((item) => ({
    month: item.month.split(' ')[0],
    spent: item.spent,
    budget: item.budget,
    income: item.income,
  }));

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-black/[0.03]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Spending Trend</h2>
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Last 4 months
        </span>
      </header>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F4F4F5" strokeDasharray="4 4" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={(value) => currencyFormatter.format(value)} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value: number) => currencyFormatter.format(value)}
              contentStyle={{
                borderRadius: 12,
                borderColor: '#E4E4E7',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
              }}
            />
            <Area type="monotone" dataKey="income" stroke="#10B981" fill="url(#income)" strokeWidth={2} />
            <Area type="monotone" dataKey="spent" stroke="#2563EB" fill="url(#spent)" strokeWidth={2} />
            <Area type="monotone" dataKey="budget" stroke="#A855F7" fill="rgba(168,85,247,0.12)" strokeDasharray="6 6" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
