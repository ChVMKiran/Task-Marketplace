"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTasks } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PlusCircle, Clock, Filter, ChevronRight } from "lucide-react";

export default function MyTasksPage() {
  const { tasks: mockTasks, isLoading: loadingTasks } = useTasks();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Tasks</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all your posted tasks</p>
        </div>
        <Link href="/dashboard/tasks/create" className="btn-primary text-sm flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> New Task
        </Link>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
          <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Filter className="w-3 h-3" /> Filter</button>
        </div>
        <div className="divide-y divide-white/5">
          {mockTasks.map((task, i) => (
            <Link key={task.id} href={`/tasks/${task.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                task.status === "open" ? "bg-blue-400" : task.status === "in-progress" ? "bg-yellow-400" : "bg-emerald-400"
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-200 truncate">{task.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span className="capitalize">{task.category.replace("-", " ")}</span>
                  <span>·</span>
                  <span>{task.submissionCount} submissions</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(task.deadline)}</span>
                </div>
              </div>
              <span className={`badge ${task.status === "open" ? "badge-open" : task.status === "in-progress" ? "badge-progress" : "badge-completed"}`}>
                {task.status === "in-progress" ? "In Progress" : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
              <span className="text-sm font-semibold text-white">{formatCurrency(task.budget)}</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
