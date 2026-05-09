"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, LayoutDashboard, ClipboardList, PlusCircle, FileCheck, MessageSquare,
  Wallet, BarChart3, Search, Bell, Settings, LogOut, Menu, X, ChevronDown, User
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Browse Tasks", href: "/tasks", icon: Search },
  { label: "My Tasks", href: "/dashboard/tasks", icon: ClipboardList },
  { label: "Create Task", href: "/dashboard/tasks/create", icon: PlusCircle },
  { label: "Submissions", href: "/dashboard/submissions", icon: FileCheck },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const bottomItems = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push("/auth/login");
      else if (user.role === "admin") router.push("/admin");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (href: string) => pathname === href;

  if (isLoading || !user || user.role === "admin") return null;

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';

  return (
    <div className="min-h-screen flex bg-white">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-neutral-200 bg-surface shrink-0">
        <div className="p-5 border-b border-neutral-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold text-black">Campus<span className="text-neutral-900">Craft</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-neutral-100 text-neutral-900 border border-neutral-200"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50"
              }`}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 space-y-1 border-t border-neutral-200">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50 transition-all"
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* User card */}
        <div className="p-3 border-t border-neutral-200">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-100/50 cursor-pointer transition-all" onClick={handleLogout}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center text-black text-xs font-semibold">{initials}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-black truncate">{user?.name || "User"}</div>
              <div className="text-xs text-neutral-600 truncate capitalize">{user?.role || "Contributor"}</div>
            </div>
            <LogOut className="w-4 h-4 text-neutral-600 shrink-0" />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-[#000000]/60 z-40" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-surface border-r border-neutral-200 z-50 flex flex-col"
            >
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-lg font-bold text-black">Campus<span className="text-neutral-900">Craft</span></span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="text-neutral-600"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive(item.href) ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50"
                    }`}>
                    <item.icon className="w-4.5 h-4.5" /> {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-neutral-200 flex items-center justify-between px-6 bg-surface/50 backdrop-blur-xl sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-neutral-600 hover:text-black"><Menu className="w-5 h-5" /></button>
            <div className="hidden sm:flex items-center gap-2 bg-neutral-100 rounded-xl px-3 py-2 w-72">
              <Search className="w-4 h-4 text-neutral-600" />
              <input type="text" placeholder="Search tasks, users..." className="bg-transparent text-sm text-black placeholder-neutral-500 outline-none flex-1" />
              <kbd className="text-[10px] text-neutral-600 bg-white px-1.5 py-0.5 rounded">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/notifications" className="relative w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neutral-100 rounded-full text-[10px] text-black flex items-center justify-center font-medium">3</span>
            </Link>

            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-neutral-100/50 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center text-black text-xs font-semibold">{initials}</div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-12 w-56 glass-strong rounded-xl overflow-hidden shadow-2xl"
                  >
                    <div className="p-3 border-b border-neutral-200">
                      <div className="text-sm font-medium text-black">{user?.name || "User"}</div>
                      <div className="text-xs text-neutral-600">{user?.email || "user@campuscraft.io"}</div>
                    </div>
                    <div className="p-1.5">
                      <Link href="/dashboard/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100 transition-colors">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100 transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
