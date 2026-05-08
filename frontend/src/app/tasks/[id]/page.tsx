"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Users, Calendar, Tag, DollarSign, Upload, Star, Share2, Bookmark, AlertTriangle, FileCheck, Trophy, Eye } from "lucide-react";
import { useTask, useSubmissions } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const { task, isLoading: loadingTask } = useTask(params.id);
  const { submissions: mockSubmissions, isLoading: loadingSubs } = useSubmissions(params.id);

  if (loadingTask) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/tasks" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tasks
        </Link>
        <div className="text-center py-20">
          <div className="inline-flex items-center gap-2 text-slate-400">
            <div className="w-4 h-4 border-2 border-slate-700 border-t-violet-400 rounded-full animate-spin" />
            Loading task details...
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/tasks" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tasks
        </Link>
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">Task not found</p>
          <Link href="/tasks" className="text-violet-400 hover:text-violet-300 text-sm mt-4 inline-block">
            Back to all tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/tasks" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tasks
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`badge ${
                  task.status === "open" ? "badge-open" : task.status === "in-progress" ? "badge-progress" : "badge-completed"
                }`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                {task.priority === "high" || task.priority === "urgent" ? (
                  <span className="badge badge-urgent"><AlertTriangle className="w-3 h-3" /> {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-xl bg-navy-800/50 hover:bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"><Bookmark className="w-4 h-4" /></button>
                <button className="w-9 h-9 rounded-xl bg-navy-800/50 hover:bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">{task.title}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                {task.client && task.client.name ? task.client.name.split(" ").map(n => n[0]).join("") : "CC"}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{task.client?.name || "CampusCraft"}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {task.client?.rating || "N/A"} · {task.client?.college || "Campus"}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Description</h3>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{task.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white mb-2">Requirements</h3>
              <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line bg-navy-900/50 rounded-xl p-4 border border-white/5">{task.requirements}</div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {task.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-lg bg-navy-800/60 text-xs text-slate-400 border border-slate-700/30">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Submissions preview */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-violet-400" /> Submissions ({task.submissionCount})
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {mockSubmissions.slice(0, 2).map((sub) => (
                <div key={sub.id} className="px-5 py-4 flex items-center gap-4 hover:bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold">
                    {sub.contributor.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-200">{sub.contributor.name}</div>
                    <div className="text-xs text-slate-500 truncate">{sub.comment}</div>
                  </div>
                  <span className={`badge ${sub.status === "winner" ? "badge-winner" : sub.status === "shortlisted" ? "badge-progress" : "badge-open"}`}>
                    {sub.status === "winner" && <Trophy className="w-3 h-3" />}
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Budget</span>
              <span className="text-xl font-bold text-white">{formatCurrency(task.budget)}</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Deadline</span><span className="text-white">{formatDate(task.deadline)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Users className="w-4 h-4" /> Submissions</span><span className="text-white">{task.submissionCount}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Trophy className="w-4 h-4" /> Winners</span><span className="text-white">{task.maxWinners}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Tag className="w-4 h-4" /> Category</span><span className="text-white capitalize">{task.category.replace("-", " ")}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Eye className="w-4 h-4" /> Visibility</span><span className="text-white capitalize">{task.visibility}</span></div>
            </div>
            <div className="h-px bg-white/5" />
            <Link href="/dashboard/submissions/new" className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm">
              <Upload className="w-4 h-4" /> Submit Your Work
            </Link>
          </motion.div>

          {/* Deadline countdown */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white">Time Remaining</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { value: "14", label: "Days" },
                { value: "06", label: "Hours" },
                { value: "32", label: "Min" },
                { value: "15", label: "Sec" },
              ].map((t, i) => (
                <div key={i} className="bg-navy-900/60 rounded-lg p-2 border border-white/5">
                  <div className="text-xl font-bold text-white">{t.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase">{t.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
