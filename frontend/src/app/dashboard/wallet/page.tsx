"use client";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownRight, Plus, Download, TrendingUp, Clock, CreditCard, RefreshCw } from "lucide-react";
import { mockWallet } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

export default function WalletPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Wallet</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your earnings and payments</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Withdraw</button>
          <button className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Funds</button>
        </div>
      </div>

      {/* Balance cards */}
      <motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Available Balance", value: formatCurrency(mockWallet.balance), icon: Wallet, color: "#8B5CF6" },
          { label: "Pending", value: formatCurrency(mockWallet.pendingAmount), icon: Clock, color: "#F59E0B" },
          { label: "Total Earned", value: formatCurrency(mockWallet.totalEarnings), icon: TrendingUp, color: "#10B981" },
          { label: "Withdrawn", value: formatCurrency(mockWallet.totalWithdrawals), icon: CreditCard, color: "#3B82F6" },
        ].map((card, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}>
                <card.icon className="w-4.5 h-4.5" style={{ color: card.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <div className="text-xs text-zinc-500 mt-1">{card.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Transactions */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Transaction History</h3>
          <button className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Refresh</button>
        </div>
        <div className="divide-y divide-white/5">
          {mockWallet.transactions.map((txn) => (
            <div key={txn.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                txn.type === "payout" ? "bg-emerald-500/10" :
                txn.type === "deposit" ? "bg-blue-500/10" :
                txn.type === "withdrawal" ? "bg-orange-500/10" : "bg-violet-500/10"
              }`}>
                {txn.type === "payout" ? <ArrowDownRight className="w-5 h-5 text-emerald-400" /> :
                 txn.type === "deposit" ? <ArrowUpRight className="w-5 h-5 text-blue-400" /> :
                 txn.type === "withdrawal" ? <ArrowUpRight className="w-5 h-5 text-orange-400" /> :
                 <RefreshCw className="w-5 h-5 text-violet-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-200">{txn.description}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{formatDate(txn.createdAt)}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${
                  txn.type === "deposit" || txn.type === "payout" || txn.type === "refund" ? "text-emerald-400" : "text-red-400"
                }`}>
                  {txn.type === "withdrawal" ? "-" : "+"}{formatCurrency(txn.amount)}
                </div>
                <span className={`text-xs ${txn.status === "completed" ? "text-emerald-400" : txn.status === "pending" ? "text-yellow-400" : "text-red-400"}`}>
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
