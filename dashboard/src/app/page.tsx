import { ExpenseDashboard } from "@/components/expense-dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-100 py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ExpenseDashboard />
      </div>
    </div>
  );
}
