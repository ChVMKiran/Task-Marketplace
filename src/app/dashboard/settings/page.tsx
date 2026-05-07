"use client";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, Key, Mail, Smartphone, Moon, Sun, Monitor } from "lucide-react";

function ToggleSwitch({ enabled = false }: { enabled?: boolean }) {
  return (
    <div className={`w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${enabled ? "bg-violet-500" : "bg-zinc-700"}`}>
      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-4" : "translate-x-0"}`} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your account preferences</p>
      </div>

      {/* Profile settings */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-white flex items-center gap-2"><User className="w-4 h-4 text-violet-400" /> Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm text-zinc-400 mb-1.5 block">Full Name</label><input type="text" defaultValue="Arjun Mehta" className="input-field" /></div>
          <div><label className="text-sm text-zinc-400 mb-1.5 block">Email</label><input type="email" defaultValue="arjun@campuscraft.io" className="input-field" /></div>
          <div><label className="text-sm text-zinc-400 mb-1.5 block">Department</label><input type="text" defaultValue="Computer Science" className="input-field" /></div>
          <div><label className="text-sm text-zinc-400 mb-1.5 block">Year</label><input type="text" defaultValue="3rd Year" className="input-field" /></div>
        </div>
        <div><label className="text-sm text-zinc-400 mb-1.5 block">Bio</label><textarea rows={3} defaultValue="Creative developer and designer." className="input-field resize-none" /></div>
        <button className="btn-primary text-sm px-6">Save Changes</button>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-white flex items-center gap-2"><Bell className="w-4 h-4 text-violet-400" /> Notifications</h2>
        {[
          { label: "Email notifications", desc: "Receive email for important updates", enabled: true },
          { label: "Push notifications", desc: "Browser push notifications", enabled: false },
          { label: "Task alerts", desc: "New tasks matching your skills", enabled: true },
          { label: "Submission updates", desc: "Status changes on your submissions", enabled: true },
          { label: "Payout alerts", desc: "Payment processed notifications", enabled: true },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-1">
            <div><div className="text-sm text-white">{item.label}</div><div className="text-xs text-zinc-500">{item.desc}</div></div>
            <ToggleSwitch enabled={item.enabled} />
          </div>
        ))}
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-white flex items-center gap-2"><Palette className="w-4 h-4 text-violet-400" /> Appearance</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Moon, label: "Dark", active: true },
            { icon: Sun, label: "Light", active: false },
            { icon: Monitor, label: "System", active: false },
          ].map((theme) => (
            <button key={theme.label} className={`p-3 rounded-xl border text-center transition-all ${theme.active ? "border-violet-500/50 bg-violet-500/10" : "border-zinc-800 hover:border-zinc-700"}`}>
              <theme.icon className={`w-5 h-5 mx-auto mb-1 ${theme.active ? "text-violet-400" : "text-zinc-500"}`} />
              <span className={`text-sm ${theme.active ? "text-white" : "text-zinc-400"}`}>{theme.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-white flex items-center gap-2"><Shield className="w-4 h-4 text-violet-400" /> Security</h2>
        <div className="space-y-3">
          <button className="btn-secondary text-sm flex items-center gap-2 w-full sm:w-auto"><Key className="w-4 h-4" /> Change Password</button>
          <button className="btn-secondary text-sm flex items-center gap-2 w-full sm:w-auto"><Smartphone className="w-4 h-4" /> Enable 2FA</button>
        </div>
        <div className="pt-4 border-t border-white/5">
          <button className="text-sm text-red-400 hover:text-red-300">Delete Account</button>
        </div>
      </motion.div>
    </div>
  );
}
