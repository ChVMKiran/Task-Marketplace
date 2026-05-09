"use client";
import { motion } from "framer-motion";
import { Users, ClipboardList, CreditCard, AlertTriangle, TrendingUp, ArrowUpRight, Activity, Shield } from "lucide-react";

const stats = [
  { label: "Total Users", value: "45,200", change: "+320 this week", icon: Users, color: "#3B82F6" },
  { label: "Active Tasks", value: "342", change: "+28 today", icon: ClipboardList, color: "#10B981" },
  { label: "Revenue", value: "₹23.4L", change: "+18% MoM", icon: CreditCard, color: "#8B5CF6" },
  { label: "Open Disputes", value: "7", change: "-3 from last week", icon: AlertTriangle, color: "#EF4444" },
];

const recentUsers = [
  { name: "Neha Agrawal", email: "neha@iitb.ac.in", role: "Contributor", college: "IIT Bombay", status: "active" },
  { name: "Rohan Desai", email: "rohan@nitt.edu", role: "Client", college: "NIT Trichy", status: "active" },
  { name: "Kavya Reddy", email: "kavya@bits.ac.in", role: "Contributor", college: "BITS Pilani", status: "pending" },
  { name: "Arjun Sinha", email: "arjun@dtu.ac.in", role: "Client", college: "DTU Delhi", status: "active" },
  { name: "Sanya Kapoor", email: "sanya@srm.edu", role: "Contributor", college: "SRM Chennai", status: "suspended" },
];

const recentPayments = [
  { user: "Arjun Mehta", amount: "₹5,000", task: "TechFest Poster", status: "completed" },
  { user: "Riya Kapoor", amount: "₹8,000", task: "Portfolio Website", status: "pending" },
  { user: "Dev Sharma", amount: "₹12,000", task: "Food App UI", status: "completed" },
  { user: "Sneha Patel", amount: "₹3,500", task: "Campus Photography", status: "review" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black flex items-center gap-2"><Shield className="w-6 h-6 text-red-400" /> Admin Overview</h1>
        <p className="text-neutral-600 text-sm mt-1">Platform metrics and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="text-xs text-neutral-600 mt-1">{stat.label}</div>
            <div className="text-xs text-emerald-400 mt-0.5">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black">Recent Users</h3>
            <span className="text-xs text-red-400">Manage</span>
          </div>
          <div className="divide-y divide-white/5">
            {recentUsers.map((user, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center text-black text-xs font-semibold">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-neutral-600 truncate">{user.name}</div>
                  <div className="text-xs text-neutral-600">{user.college} · {user.role}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  user.status === "active" ? "bg-emerald-500/10 text-emerald-400" :
                  user.status === "pending" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"
                }`}>{user.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black">Pending Payouts</h3>
            <span className="text-xs text-red-400">Review all</span>
          </div>
          <div className="divide-y divide-white/5">
            {recentPayments.map((payment, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  payment.status === "completed" ? "bg-emerald-500/10" : payment.status === "pending" ? "bg-yellow-500/10" : "bg-neutral-100"
                }`}>
                  <CreditCard className={`w-4 h-4 ${
                    payment.status === "completed" ? "text-emerald-400" : payment.status === "pending" ? "text-yellow-400" : "text-neutral-900"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-neutral-600">{payment.user}</div>
                  <div className="text-xs text-neutral-600">{payment.task}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-black">{payment.amount}</div>
                  <span className={`text-xs ${
                    payment.status === "completed" ? "text-emerald-400" : payment.status === "pending" ? "text-yellow-400" : "text-neutral-900"
                  }`}>{payment.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform activity chart */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-black mb-6 flex items-center gap-2"><Activity className="w-4 h-4 text-red-400" /> Platform Activity (Last 7 Days)</h3>
        <div className="flex items-end gap-2 h-40">
          {[65, 80, 45, 90, 75, 95, 70].map((val, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-red-600 to-orange-400 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
            <span key={d} className="text-[10px] text-neutral-600 flex-1 text-center">{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
