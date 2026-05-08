"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, FileCheck, Wallet, Clock, MessageSquare, Star, CheckCheck } from "lucide-react";
import { useNotifications } from "@/lib/api";
import { formatRelativeTime } from "@/lib/utils";

const iconMap: Record<string, typeof Bell> = { task: Clock, submission: FileCheck, payout: Wallet, message: MessageSquare, system: Star };
const colorMap: Record<string, string> = { task: "bg-yellow-500/10 text-yellow-400", submission: "bg-blue-500/10 text-blue-400", payout: "bg-emerald-500/10 text-emerald-400", message: "bg-violet-500/10 text-violet-400", system: "bg-pink-500/10 text-pink-400" };

export default function NotificationsPage() {
  const { notifications: mockNotifications } = useNotifications();

  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => setNotifications(notifications.map((n: { id: string, type: string, title: string, message: string, createdAt: string, read: boolean }) => ({ ...n, read: true })));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 text-sm mt-1">{notifications.filter(n => !n.read).length} unread notifications</p>
        </div>
        <button onClick={markAllRead} className="btn-secondary text-sm flex items-center gap-2">
          <CheckCheck className="w-4 h-4" /> Mark all read
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5">
        {notifications.map((notif, i) => {
          const Icon = iconMap[notif.type] || Bell;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer ${!notif.read ? "bg-violet-500/[0.03]" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[notif.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${notif.read ? "text-slate-300" : "text-white"}`}>{notif.title}</span>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-violet-400" />}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{notif.message}</p>
                <span className="text-xs text-slate-600 mt-1 block">{formatRelativeTime(notif.createdAt)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
