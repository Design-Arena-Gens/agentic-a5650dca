'use client';

import { ArrowDownRight, ArrowUpRight, Banknote, CalendarDays } from 'lucide-react';
import { MonthlySnapshot } from '@/data/expenses';

type SummaryCardsProps = {
  snapshot: MonthlySnapshot;
  previous?: MonthlySnapshot;
};

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const percentage = (current: number, previous?: MonthlySnapshot) => {
  if (!previous || previous.spent === 0) return null;
  const diff = ((current - previous.spent) / previous.spent) * 100;
  return Math.round(diff * 10) / 10;
};

export function SummaryCards({ snapshot, previous }: SummaryCardsProps) {
  const change = percentage(snapshot.spent, previous);
  const changePositive = change !== null && change <= 0;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-black/[0.03]">
        <header className="flex items-center justify-between text-sm text-zinc-500">
          <span>Total Spent</span>
          <Banknote className="h-4 w-4 text-zinc-400" />
        </header>
        <p className="mt-4 text-3xl font-semibold text-zinc-900">{currency(snapshot.spent)}</p>
        <p className="mt-2 text-sm text-zinc-500">
          Budget: <span className="font-medium text-zinc-800">{currency(snapshot.budget)}</span>
        </p>
      </article>

      <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-black/[0.03]">
        <header className="flex items-center justify-between text-sm text-zinc-500">
          <span>Income</span>
          <CalendarDays className="h-4 w-4 text-zinc-400" />
        </header>
        <p className="mt-4 text-3xl font-semibold text-zinc-900">{currency(snapshot.income)}</p>
        <p className="mt-2 text-sm text-zinc-500">
          Savings:{" "}
          <span className="font-medium text-emerald-600">
            {currency(snapshot.income - snapshot.spent)}
          </span>
        </p>
      </article>

      <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-black/[0.03]">
        <header className="flex items-center justify-between text-sm text-zinc-500">
          <span>Month over Month</span>
          {change !== null && (changePositive ? <ArrowDownRight className="h-4 w-4 text-emerald-500" /> : <ArrowUpRight className="h-4 w-4 text-rose-500" />)}
        </header>
        <p className="mt-4 text-3xl font-semibold text-zinc-900">
          {change === null ? "—" : `${Math.abs(change)}%`}
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          {change === null
            ? "No previous comparison"
            : changePositive
              ? "Spend decreased vs prior month"
              : "Spend increased vs prior month"}
        </p>
      </article>
    </section>
  );
}
