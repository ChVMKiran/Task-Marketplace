"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp, Clock, Trophy, Wallet, ArrowUpRight, ArrowDownRight,
  ChevronRight, Sparkles, Eye, FileCheck, Star
} from "lucide-react";
import { useTasks, useSubmissions, useNotifications } from "@/lib/api";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const stats = [
  { label: "Active Tasks", value: "24", change: "+12%", up: true, icon: Clock, color: "#3B82F6" },
  { label: "Total Earnings", value: "₹1,25,000", change: "+28%", up: true, icon: TrendingUp, color: "#10B981" },
  { label: "Win Rate", value: "68%", change: "+5%", up: true, icon: Trophy, color: "#F59E0B" },
  { label: "Wallet Balance", value: "₹28,500", change: "-", up: true, icon: Wallet, color: "#8B5CF6" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks: mockTasks, isLoading: loadingTasks } = useTasks();
  const { submissions: mockSubmissions, isLoading: loadingSubs } = useSubmissions();
  const { notifications: mockNotifications, isLoading: loadingNotifs } = useNotifications();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'} 👋</h1>
          <p className="text-slate-400 text-sm mt-1">Here&apos;s what&apos;s happening with your account today.</p>
        </div>
        <Link href="/tasks" className="btn-primary text-sm flex items-center gap-1.5 hidden sm:flex">
          Browse Tasks <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* AI Insight Banner */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-card rounded-2xl p-5 flex items-start gap-4 glow-purple">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-violet-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">AI Insight</h3>
          <p className="text-sm text-slate-400">You have a 85% match rate with <span className="text-violet-300 font-medium">UI/UX Design</span> tasks. 3 new high-budget tasks were posted today that match your skills. Your win rate is 15% above average — keep it up!</p>
        </div>
        <Link href="/tasks" className="btn-secondary text-xs px-3 py-1.5 shrink-0">View Matches</Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              {stat.change !== "-" && (
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Trending Tasks</h3>
            <Link href="/tasks" className="text-xs text-violet-400 hover:text-violet-300">View all</Link>
          </div>
          <div className="divide-y divide-white/5">
            {mockTasks.slice(0, 5).map((task, i) => (
              <Link key={task.id} href={`/tasks/${task.id}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  task.priority === "urgent" ? "bg-red-400" : task.priority === "high" ? "bg-yellow-400" : "bg-blue-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">{task.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">by {task.client?.name || "Unknown"} · {task.submissionCount} submissions</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold text-white">{formatCurrency(task.budget)}</div>
                  <div className="text-xs text-slate-500">{task.deadline.slice(5)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
          </div>
          <div className="divide-y divide-white/5">
            {mockNotifications.slice(0, 5).map((notif) => (
              <div key={notif.id} className="px-5 py-3.5 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  notif.type === "submission" ? "bg-blue-500/10" :
                  notif.type === "payout" ? "bg-emerald-500/10" :
                  notif.type === "task" ? "bg-yellow-500/10" : "bg-violet-500/10"
                }`}>
                  {notif.type === "submission" ? <FileCheck className="w-4 h-4 text-blue-400" /> :
                   notif.type === "payout" ? <Wallet className="w-4 h-4 text-emerald-400" /> :
                   notif.type === "task" ? <Clock className="w-4 h-4 text-yellow-400" /> :
                   <Star className="w-4 h-4 text-violet-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-300">{notif.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{formatRelativeTime(notif.createdAt)}</div>
                </div>
                {!notif.read && <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Your Recent Submissions</h3>
          <Link href="/dashboard/submissions" className="text-xs text-violet-400 hover:text-violet-300">View all</Link>
        </div>
        <div className="divide-y divide-white/5">
          {mockSubmissions.map((sub) => (
            <div key={sub.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-navy-800/50 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-200 truncate">{sub.task.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">Version {sub.version} · {formatRelativeTime(sub.submittedAt)}</div>
              </div>
              <span className={`badge ${
                sub.status === "winner" ? "badge-winner" :
                sub.status === "shortlisted" ? "badge-progress" :
                sub.status === "pending" ? "badge-open" : "badge-urgent"
              }`}>
                {sub.status === "winner" && <Trophy className="w-3 h-3" />}
                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
