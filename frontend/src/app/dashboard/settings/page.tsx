"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, Key, Mail, Smartphone, Moon, Sun, Monitor, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiPut } from "@/lib/api";

function ToggleSwitch({ enabled = false, onChange }: { enabled?: boolean; onChange?: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${enabled ? "bg-black" : "bg-neutral-200"}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { user, token } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  // Notification toggles
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [taskAlerts, setTaskAlerts] = useState(true);
  const [subUpdates, setSubUpdates] = useState(true);
  const [payoutAlerts, setPayoutAlerts] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
    // Fetch full profile
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setName(data.user.name || "");
            setEmail(data.user.email || "");
            setDepartment(data.user.department || "");
            setYear(data.user.year || "");
            setBio(data.user.bio || "");
          }
        }
      } catch {
        // Use auth context data
      }
    };
    fetchProfile();
  }, [user, token]);

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setSaveSuccess(false);
    try {
      await apiPut("/users/profile", { name, department, year, bio }, token);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Settings</h1>
        <p className="text-neutral-600 text-sm mt-1">Manage your account preferences</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-sm font-medium text-red-600">{error}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-emerald-600">Changes saved successfully!</span>
        </div>
      )}

      {/* Profile settings */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-black flex items-center gap-2"><User className="w-4 h-4 text-neutral-900" /> Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm text-neutral-600 mb-1.5 block">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" /></div>
          <div><label className="text-sm text-neutral-600 mb-1.5 block">Email</label><input type="email" value={email} disabled className="input-field opacity-60 cursor-not-allowed" /></div>
          <div><label className="text-sm text-neutral-600 mb-1.5 block">Department</label><input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="input-field" /></div>
          <div><label className="text-sm text-neutral-600 mb-1.5 block">Year</label><input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="input-field" /></div>
        </div>
        <div><label className="text-sm text-neutral-600 mb-1.5 block">Bio</label><textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="input-field resize-none" /></div>
        <button onClick={handleSave} disabled={isSaving} className="btn-primary text-sm px-6 flex items-center gap-2 disabled:opacity-50">
          {isSaving ? <><Loader className="w-4 h-4 animate-spin" /> Saving...</> : "Save Changes"}
        </button>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-black flex items-center gap-2"><Bell className="w-4 h-4 text-neutral-900" /> Notifications</h2>
        {[
          { label: "Email notifications", desc: "Receive email for important updates", enabled: emailNotifs, toggle: () => setEmailNotifs(!emailNotifs) },
          { label: "Push notifications", desc: "Browser push notifications", enabled: pushNotifs, toggle: () => setPushNotifs(!pushNotifs) },
          { label: "Task alerts", desc: "New tasks matching your skills", enabled: taskAlerts, toggle: () => setTaskAlerts(!taskAlerts) },
          { label: "Submission updates", desc: "Status changes on your submissions", enabled: subUpdates, toggle: () => setSubUpdates(!subUpdates) },
          { label: "Payout alerts", desc: "Payment processed notifications", enabled: payoutAlerts, toggle: () => setPayoutAlerts(!payoutAlerts) },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-1">
            <div><div className="text-sm text-black">{item.label}</div><div className="text-xs text-neutral-600">{item.desc}</div></div>
            <ToggleSwitch enabled={item.enabled} onChange={item.toggle} />
          </div>
        ))}
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-black flex items-center gap-2"><Palette className="w-4 h-4 text-neutral-900" /> Appearance</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Sun, label: "Light", active: true },
            { icon: Moon, label: "Dark", active: false },
            { icon: Monitor, label: "System", active: false },
          ].map((theme) => (
            <button key={theme.label} className={`p-3 rounded-xl border text-center transition-all ${theme.active ? "border-neutral-200 bg-neutral-100" : "border-neutral-200 hover:border-neutral-200"}`}>
              <theme.icon className={`w-5 h-5 mx-auto mb-1 ${theme.active ? "text-neutral-900" : "text-neutral-600"}`} />
              <span className={`text-sm ${theme.active ? "text-black" : "text-neutral-600"}`}>{theme.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-black flex items-center gap-2"><Shield className="w-4 h-4 text-neutral-900" /> Security</h2>
        <div className="space-y-3">
          <button className="btn-secondary text-sm flex items-center gap-2 w-full sm:w-auto"><Key className="w-4 h-4" /> Change Password</button>
          <button className="btn-secondary text-sm flex items-center gap-2 w-full sm:w-auto"><Smartphone className="w-4 h-4" /> Enable 2FA</button>
        </div>
        <div className="pt-4 border-t border-neutral-200">
          <button className="text-sm text-red-400 hover:text-red-300">Delete Account</button>
        </div>
      </motion.div>
    </div>
  );
}
