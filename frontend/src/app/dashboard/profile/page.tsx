"use client";
import { motion } from "framer-motion";
import { Star, Trophy, Briefcase, MapPin, Calendar, ExternalLink, Edit3, Award, TrendingUp, Loader } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { mockUser } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { user: authUser, token } = useAuth();
  const [profile, setProfile] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setProfile({ ...mockUser, ...data.user, id: data.user._id || data.user.id });
          }
        }
      } catch {
        // Fallback to mock data
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const user = profile;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-12 text-center">
          <Loader className="w-6 h-6 animate-spin text-neutral-600 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-200/10 via-transparent to-neutral-400/10" />
        <div className="relative flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center text-black text-2xl font-bold shadow-lg shadow-neutral-200">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-black">{user.name}</h1>
              {user.isVerified && <span className="badge badge-completed">✓ Verified</span>}
            </div>
            <p className="text-neutral-600 text-sm mb-3">{user.bio || "No bio set yet."}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {user.role}</span>
              {user.college && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {user.college}</span>}
              {(user.department || user.year) && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {[user.department, user.year].filter(Boolean).join(" · ")}</span>}
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> {user.rating}</span>
            </div>
          </div>
          <button className="btn-secondary text-sm flex items-center gap-2"><Edit3 className="w-4 h-4" /> Edit Profile</button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tasks Completed", value: user.totalTasks, icon: Briefcase, color: "#3B82F6" },
          { label: "Contest Wins", value: user.totalWins, icon: Trophy, color: "#F59E0B" },
          { label: "Total Earnings", value: formatCurrency(user.totalEarnings), icon: TrendingUp, color: "#10B981" },
          { label: "Rating", value: user.rating.toString(), icon: Star, color: "#8B5CF6" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-5 text-center">
            <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
            <div className="text-xl font-bold text-black">{s.value}</div>
            <div className="text-xs text-neutral-600 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Skills */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-black mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-neutral-900" /> Skills</h3>
        <div className="flex flex-wrap gap-2">
          {(user.skills && user.skills.length > 0) ? user.skills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-sm text-neutral-900">{skill}</span>
          )) : (
            <p className="text-sm text-neutral-500">No skills added yet.</p>
          )}
        </div>
      </div>

      {/* Portfolio links */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-black mb-4 flex items-center gap-2"><ExternalLink className="w-4 h-4 text-neutral-900" /> Portfolio</h3>
        <div className="space-y-2">
          {(user.portfolioLinks && user.portfolioLinks.length > 0) ? user.portfolioLinks.map((link) => (
            <a key={link} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> {link}
            </a>
          )) : (
            <p className="text-sm text-neutral-500">No portfolio links added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
