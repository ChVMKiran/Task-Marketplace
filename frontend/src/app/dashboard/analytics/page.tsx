"use client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Trophy, Target, ArrowUpRight } from "lucide-react";
import { mockAnalytics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  const data = mockAnalytics;
  const maxEarning = Math.max(...data.monthlyData.map(d => d.earnings));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Track your performance and growth</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tasks Completed", value: data.tasksCompleted.toString(), icon: Target, color: "#3B82F6" },
          { label: "Total Earned", value: formatCurrency(data.totalEarned), icon: TrendingUp, color: "#10B981" },
          { label: "Avg. Rating", value: data.avgRating.toFixed(1), icon: Trophy, color: "#F59E0B" },
          { label: "Submissions", value: data.submissionsReceived.toString(), icon: BarChart3, color: "#8B5CF6" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                <stat.icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings chart (simplified bar chart) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-6">Monthly Earnings</h3>
          <div className="flex items-end gap-3 h-48">
            {data.monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-slate-400">{formatCurrency(d.earnings).replace("₹", "₹")}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.earnings / maxEarning) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-violet-400 min-h-[4px]"
                  style={{ maxHeight: "100%" }}
                />
                <span className="text-[10px] text-slate-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {data.categoryBreakdown.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-slate-300">{cat.category}</span>
                  <span className="text-slate-500">{cat.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        </div>
        <div className="divide-y divide-white/5">
          {data.recentActivity.map((activity, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-4 hover:bg-white/[0.02]">
              <div className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-slate-300">{activity.action}</div>
                <div className="text-xs text-slate-500 mt-0.5">{activity.details}</div>
              </div>
              <span className="text-xs text-slate-500">{activity.timestamp.split("T")[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
