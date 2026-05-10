"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, FileCheck, Wallet, Clock, MessageSquare, Star, CheckCheck, Loader } from "lucide-react";
import { useNotifications, apiPut } from "@/lib/api";
import { mockNotifications as fallbackNotifications } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const iconMap: Record<string, typeof Bell> = { task: Clock, submission: FileCheck, payout: Wallet, message: MessageSquare, system: Star };
const colorMap: Record<string, string> = { task: "bg-yellow-500/10 text-yellow-400", submission: "bg-neutral-100 text-neutral-900", payout: "bg-emerald-500/10 text-emerald-400", message: "bg-neutral-100 text-neutral-900", system: "bg-pink-500/10 text-pink-400" };

export default function NotificationsPage() {
  const { notifications: apiNotifications, isLoading, mutate } = useNotifications();
  const { token } = useAuth();

  // Use API notifications if available, else fallback to mock data
  const notificationsSource = apiNotifications.length > 0 ? apiNotifications : fallbackNotifications;
  const [notifications, setNotifications] = useState(notificationsSource);

  // Sync state when API data arrives
  useEffect(() => {
    if (apiNotifications.length > 0) {
      setNotifications(apiNotifications);
    } else if (!isLoading && apiNotifications.length === 0) {
      setNotifications(fallbackNotifications);
    }
  }, [apiNotifications, isLoading]);

  const markAllRead = async () => {
    setNotifications(notifications.map((n: { id: string, type: string, title: string, message: string, createdAt: string, read: boolean }) => ({ ...n, read: true })));
    try {
      await apiPut("/notifications/read-all", {}, token);
      mutate();
    } catch {
      // Silently handle error — local state already updated
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Notifications</h1>
          <p className="text-neutral-600 text-sm mt-1">{notifications.filter(n => !n.read).length} unread notifications</p>
        </div>
        <button onClick={markAllRead} className="btn-secondary text-sm flex items-center gap-2">
          <CheckCheck className="w-4 h-4" /> Mark all read
        </button>
      </div>

      {isLoading ? (
        <div className="glass-card rounded-2xl p-10 text-center text-neutral-600">
          <div className="inline-flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" /> Loading notifications...
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 text-lg font-medium">No notifications yet</p>
          <p className="text-neutral-500 text-sm mt-2">You&apos;ll see updates here when there&apos;s activity on your tasks.</p>
        </div>
      ) : (
      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-neutral-200">
        {notifications.map((notif, i) => {
          const Icon = iconMap[notif.type] || Bell;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 px-5 py-4 hover:bg-neutral-100/50 transition-colors cursor-pointer ${!notif.read ? "bg-neutral-100/50" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[notif.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${notif.read ? "text-neutral-600" : "text-black"}`}>{notif.title}</span>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-neutral-100" />}
                </div>
                <p className="text-sm text-neutral-600 mt-0.5">{notif.message}</p>
                <span className="text-xs text-neutral-600 mt-1 block">{formatRelativeTime(notif.createdAt)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      )}
    </div>
  );
}
