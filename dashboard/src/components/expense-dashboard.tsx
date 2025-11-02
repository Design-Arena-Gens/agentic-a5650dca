'use client';

import { useMemo, useState } from 'react';
import { CalendarRange } from 'lucide-react';
import {
  MonthKey,
  MONTHS,
  expensesByMonth,
  ExpenseCategoryKey,
  MonthlySnapshot,
} from '@/data/expenses';
import { SummaryCards } from './summary-cards';
import { ExpenseTable } from './expense-table';
import { CategoryBreakdown } from './category-breakdown';
import { MonthlyTrend } from './monthly-trend';
import { UpcomingBills } from './upcoming-bills';

const allSnapshots: MonthlySnapshot[] = MONTHS.map((month) => expensesByMonth[month].summary);

export function ExpenseDashboard() {
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>('March 2025');

  const dataset = expensesByMonth[selectedMonth];
  const monthIndex = MONTHS.findIndex((month) => month === selectedMonth);
  const previousSnapshot = monthIndex > 0 ? expensesByMonth[MONTHS[monthIndex - 1]].summary : undefined;

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          dataset.categoryBudgets
            .map((item) => item.category)
            .sort((a, b) => a.localeCompare(b)),
        ),
      ) as ExpenseCategoryKey[],
    [dataset.categoryBudgets],
  );

  const monthlyTrend = useMemo(() => allSnapshots.slice(Math.max(0, monthIndex - 3), monthIndex + 1), [monthIndex]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Personal finance</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Expense Overview</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Track spending, budget performance, and upcoming commitments at a glance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CalendarRange className="hidden h-9 w-9 rounded-full border border-zinc-200 p-2 text-zinc-500 lg:block" />
          <select
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value as MonthKey)}
            className="w-full rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-medium text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 lg:w-56"
          >
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </header>

      <SummaryCards snapshot={dataset.summary} previous={previousSnapshot} />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <MonthlyTrend snapshots={monthlyTrend} />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <CategoryBreakdown data={dataset.categoryBudgets} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ExpenseTable expenses={dataset.expenses} categories={categories} />
        </div>
        <div className="lg:col-span-4">
          <UpcomingBills bills={dataset.upcoming} />
        </div>
      </div>
    </div>
  );
}
