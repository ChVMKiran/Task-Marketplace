"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, LayoutDashboard, Users, ClipboardList, FileCheck, CreditCard,
  AlertTriangle, BarChart3, Settings, LogOut, Menu, X, Shield
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Tasks", href: "/admin/tasks", icon: ClipboardList },
  { label: "Submissions", href: "/admin/submissions", icon: FileCheck },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push("/auth/login");
      else if (user.role !== "admin") router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  const isActive = (href: string) => pathname === href;

  if (isLoading || !user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen flex bg-white">
      <aside className="hidden lg:flex flex-col w-64 border-r border-neutral-200 bg-surface shrink-0">
        <div className="p-5 border-b border-neutral-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold text-black">Admin <span className="text-red-400">Panel</span></span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(item.href) ? "bg-red-500/10 text-red-300 border border-red-500/20" : "text-neutral-600 hover:text-neutral-600 hover:bg-white/[0.03]"
                }`}>
              <item.icon className="w-4.5 h-4.5" /> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-neutral-200">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-600 hover:text-neutral-600 hover:bg-white/[0.03]">
            <LogOut className="w-4.5 h-4.5" /> Back to App
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-neutral-200 flex items-center px-6 bg-surface/50 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-neutral-600 mr-4"><Menu className="w-5 h-5" /></button>
          <h2 className="text-sm font-medium text-neutral-600">Task-Marketplace Admin</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{children}</motion.div>
        </main>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-[#000000]/60 z-40" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-surface border-r border-neutral-200 z-50 flex flex-col">
              <div className="p-5 border-b border-neutral-200 flex justify-between items-center">
                <span className="text-lg font-bold text-black">Admin</span>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-neutral-600" /></button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${isActive(item.href) ? "bg-red-500/10 text-red-300" : "text-neutral-600"}`}>
                    <item.icon className="w-4.5 h-4.5" /> {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
