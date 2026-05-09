"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock, User, GraduationCap, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"contributor" | "client">("contributor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await register(name, email, password, role);
      if (user.role === 'admin') {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10 bg-white">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2.5 mb-10 group">
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-md">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-black text-black tracking-tight">CampusCraft</span>
          </Link>

          <h1 className="text-3xl font-black text-black mb-2 tracking-tight">Create your account</h1>
          <p className="text-sm text-neutral-500 mb-8 font-medium">Join the creative marketplace for college students</p>

          {/* Role selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { value: "contributor" as const, label: "I want to earn", icon: GraduationCap, sub: "Submit work & win" },
              { value: "client" as const, label: "I want to hire", icon: User, sub: "Post tasks & review" },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                disabled={isLoading}
                className={`p-4 rounded-xl border text-left transition-all shadow-sm ${
                  role === r.value
                    ? "border-black bg-neutral-50 ring-1 ring-black"
                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <r.icon className={`w-5 h-5 mb-2 ${role === r.value ? "text-black" : "text-neutral-500"}`} />
                <div className={`text-sm font-bold ${role === r.value ? "text-black" : "text-neutral-700"}`}>{r.label}</div>
                <div className={`text-xs font-medium mt-0.5 ${role === r.value ? "text-neutral-700" : "text-neutral-500"}`}>{r.sub}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-neutral-200 rounded-xl text-sm font-semibold text-black hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm">
              <GoogleIcon /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-neutral-200 rounded-xl text-sm font-semibold text-black hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm">
              <GithubIcon /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">or email</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-sm font-medium text-red-600">{error}</span>
              </div>
            )}
            <div>
              <label className="text-sm font-semibold text-black mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-black mb-1.5 block">College Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-black mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                  required
                  minLength={8}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 group transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-xs text-neutral-500 font-medium text-center mt-6">By signing up, you agree to our Terms of Service and Privacy Policy</p>
          <p className="text-sm text-neutral-500 font-medium text-center mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-black hover:underline font-bold">Sign in</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden bg-neutral-50 border-l border-neutral-200">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-neutral-200/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-white rounded-full blur-[80px]" />
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="relative z-10 text-center p-12 max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-neutral-200/50 border border-neutral-100">
            <Zap className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-4xl font-black text-black mb-4 tracking-tight leading-tight">Join the<br />Community</h2>
          <p className="text-neutral-500 font-medium leading-relaxed">Create stunning work, build your portfolio, and earn while still in college.</p>
        </motion.div>
      </div>
    </div>
  );
}
