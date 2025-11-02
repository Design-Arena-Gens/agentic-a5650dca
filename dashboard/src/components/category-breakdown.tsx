'use client';

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { CategoryBudget, ExpenseCategoryKey } from '@/data/expenses';

type CategoryBreakdownProps = {
  data: CategoryBudget[];
};

const categoryColors: Record<ExpenseCategoryKey, string> = {
  Housing: '#0F172A',
  Transportation: '#2563EB',
  Food: '#16A34A',
  Utilities: '#F97316',
  Entertainment: '#DB2777',
  Health: '#0EA5E9',
  Subscriptions: '#7C3AED',
  Travel: '#E11D48',
  Other: '#6B7280',
};

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-black/[0.03]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Category Breakdown</h2>
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Budget vs spent
        </span>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="spent"
                nameKey="category"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.category} fill={categoryColors[entry.category]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, _name, payload) => {
                  const item = payload.payload as CategoryBudget;
                  return [
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(value),
                    `${payload.name} (${Math.round((value / item.allocated) * 100)}% of budget)`,
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-3">
          {data.map((item) => {
            const percent = Math.round((item.spent / item.allocated) * 100);
            return (
              <li
                key={item.category}
                className="rounded-xl border border-zinc-100 p-4 shadow-sm shadow-black/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: categoryColors[item.category] }}
                    />
                    <p className="text-sm font-medium text-zinc-800">{item.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.spent)}
                  </p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(percent, 100)}%`,
                      backgroundColor: categoryColors[item.category],
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  {percent}% of {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(item.allocated)}{' '}
                  budget
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
