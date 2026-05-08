"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileCheck, Trophy, Clock, Eye, Download, Filter, ChevronRight } from "lucide-react";
import { useTasks, useSubmissions } from "@/lib/api";
import { formatRelativeTime, formatCurrency } from "@/lib/utils";

export default function SubmissionsPage() {
  const { tasks: mockTasks, isLoading: loadingTasks } = useTasks();
  const { submissions: mockSubmissions, isLoading: loadingSubs } = useSubmissions();

  const allSubs = [...mockSubmissions, ...mockTasks.slice(2, 6).map((t, i) => ({
    id: `sub_extra_${i}`,
    taskId: t.id,
    task: t,
    contributor: { ...(mockSubmissions?.[0]?.contributor || { id: "usr_mock", name: "User", email: "user@example.com", role: "contributor" }), id: `usr_extra_${i}`, name: ["Priya Das", "Kabir Jain", "Ishaan Nag", "Tara Bose"][i] },
    files: [{ id: `file_x${i}`, name: `submission_${i}.zip`, url: "#", type: "application/zip", size: 5000000 }],
    comment: "Submission for task",
    status: (["pending", "shortlisted", "accepted", "rejected"] as const)[i],
    version: 1,
    submittedAt: "2026-05-04",
    updatedAt: "2026-05-05",
  }))];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Submissions</h1>
          <p className="text-slate-400 text-sm mt-1">Track all your submissions and their status</p>
        </div>
        <button className="btn-secondary text-sm flex items-center gap-2"><Filter className="w-4 h-4" /> Filter</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: allSubs.length, color: "#3B82F6" },
          { label: "Shortlisted", value: allSubs.filter(s => s.status === "shortlisted").length, color: "#F59E0B" },
          { label: "Accepted", value: allSubs.filter(s => s.status === "accepted" || s.status === "winner").length, color: "#10B981" },
          { label: "Won", value: allSubs.filter(s => s.status === "winner").length, color: "#8B5CF6" },
        ].map((s, i) => (
          <div key={i} className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Submissions list */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {allSubs.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                sub.status === "winner" ? "bg-violet-500/10" :
                sub.status === "shortlisted" ? "bg-yellow-500/10" :
                sub.status === "accepted" ? "bg-emerald-500/10" :
                sub.status === "rejected" ? "bg-red-500/10" : "bg-navy-800/50"
              }`}>
                {sub.status === "winner" ? <Trophy className="w-5 h-5 text-violet-400" /> :
                 <FileCheck className="w-5 h-5 text-slate-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-200 truncate">{sub.task?.title || "Unknown Task"}</div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>v{sub.version || 1}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(sub.submittedAt)}</span>
                  <span>·</span>
                  <span>{formatCurrency(sub.task?.budget || 0)}</span>
                </div>
              </div>
              <span className={`badge ${
                sub.status === "winner" ? "badge-winner" :
                sub.status === "shortlisted" ? "badge-progress" :
                sub.status === "accepted" ? "badge-completed" :
                sub.status === "rejected" ? "badge-urgent" : "badge-open"
              }`}>
                {sub.status ? sub.status.charAt(0).toUpperCase() + sub.status.slice(1) : "Pending"}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
