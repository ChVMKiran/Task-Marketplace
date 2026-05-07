"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock, Globe, CircleDot } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Campus<span className="text-violet-400">Craft</span></span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-zinc-400 mb-8">Sign in to your account to continue</p>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="btn-secondary flex items-center justify-center gap-2 py-2.5">
              <CircleDot className="w-4 h-4" /> Google
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2 py-2.5">
              <Globe className="w-4 h-4" /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-500">or continue with email</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }} className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" className="input-field pl-10" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-zinc-400">Password</label>
                <a href="#" className="text-xs text-violet-400 hover:text-violet-300">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 group mt-2">
              Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-sm text-zinc-500 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-violet-400 hover:text-violet-300 font-medium">Sign up</Link>
          </p>
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden bg-zinc-900/50">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative z-10 text-center p-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/30">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Start Creating Today</h2>
          <p className="text-zinc-400 max-w-sm mx-auto">Join 45,000+ students who are building their careers through creative work on CampusCraft.</p>
        </motion.div>
      </div>
    </div>
  );
}
