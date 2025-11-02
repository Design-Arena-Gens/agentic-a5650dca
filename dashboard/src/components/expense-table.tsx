'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Search } from 'lucide-react';
import { ExpenseCategoryKey, ExpenseItem } from '@/data/expenses';

type ExpenseTableProps = {
  expenses: ExpenseItem[];
  categories: ExpenseCategoryKey[];
};

const categoryLabels: Record<ExpenseCategoryKey, string> = {
  Housing: 'Housing',
  Transportation: 'Transportation',
  Food: 'Food & Dining',
  Utilities: 'Utilities',
  Entertainment: 'Entertainment',
  Health: 'Health & Wellness',
  Subscriptions: 'Subscriptions',
  Travel: 'Travel',
  Other: 'Other',
};

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(iso));

export function ExpenseTable({ expenses, categories }: ExpenseTableProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ExpenseCategoryKey | 'All'>('All');

  const filtered = useMemo(() => {
    const lower = query.toLowerCase().trim();
    return expenses
      .filter((expense) =>
        category === 'All' ? true : expense.category === category,
      )
      .filter((expense) =>
        !lower
          ? true
          : expense.description.toLowerCase().includes(lower) ||
            expense.paymentMethod.toLowerCase().includes(lower),
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query, category, expenses]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-black/[0.03]">
      <header className="flex flex-col gap-3 border-b border-zinc-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Recent Activity</h2>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <label className="group relative flex-1 sm:w-56">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-600" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search transactions"
              className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
            />
          </label>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value === 'All' ? 'All' : (event.target.value as ExpenseCategoryKey))
            }
            className="w-full rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 sm:w-44"
          >
            <option value="All">All categories</option>
            {categories.map((key) => (
              <option key={key} value={key}>
                {categoryLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="max-h-[420px] overflow-auto">
        <table className="min-w-full divide-y divide-zinc-100 text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium text-zinc-500">
                Description
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-zinc-500">
                Category
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-zinc-500">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-zinc-500">
                Payment
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-right text-zinc-500">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-right text-zinc-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((expense) => (
              <tr key={expense.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 text-zinc-800">{expense.description}</td>
                <td className="px-6 py-4">{categoryLabels[expense.category]}</td>
                <td className="px-6 py-4">{formatDate(expense.date)}</td>
                <td className="px-6 py-4">{expense.paymentMethod}</td>
                <td className="px-6 py-4 text-right font-semibold text-zinc-900">
                  {currency(expense.amount)}
                </td>
                <td className="px-6 py-4 text-right">
                  {expense.status === 'Cleared' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Cleared
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                      <Clock3 className="h-3.5 w-3.5" />
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-sm text-zinc-400">
                  No transactions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
