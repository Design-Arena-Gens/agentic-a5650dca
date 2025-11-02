'use client';

import { CalendarCheck2, Landmark } from 'lucide-react';
import { UpcomingBill } from '@/data/expenses';

type UpcomingBillsProps = {
  bills: UpcomingBill[];
};

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(iso));

export function UpcomingBills({ bills }: UpcomingBillsProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-black/[0.03]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Upcoming Bills</h2>
        <CalendarCheck2 className="h-5 w-5 text-zinc-400" />
      </header>

      <ul className="space-y-4">
        {bills.map((bill) => (
          <li
            key={bill.id}
            className="flex items-start justify-between rounded-xl border border-zinc-100 bg-zinc-50/60 p-4"
          >
            <div>
              <p className="text-sm font-semibold text-zinc-800">{bill.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-zinc-400">
                Due {formatDate(bill.dueDate)}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{bill.category}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-zinc-900">{currency(bill.amount)}</p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-500">
                <Landmark className="h-3.5 w-3.5 text-zinc-400" />
                {bill.autopay ? 'Autopay enabled' : 'Manual payment'}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
