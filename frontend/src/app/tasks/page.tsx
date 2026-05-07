"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Clock, Users, Bookmark, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { useTasks } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { TASK_CATEGORIES } from "@/lib/constants";

export default function TasksPage() {
  const { tasks: mockTasks, isLoading: loadingTasks } = useTasks();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = mockTasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === "all" || t.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Task Marketplace</h1>
        <p className="text-slate-400 text-sm mt-1">Discover creative tasks and start earning</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field w-auto min-w-[160px] appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {TASK_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <button className="btn-secondary flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === "all" ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-navy-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600"
          }`}
        >
          All Tasks
        </button>
        {TASK_CATEGORIES.slice(0, 7).map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.value ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-navy-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="text-sm text-slate-500">{filtered.length} tasks found</div>

      {/* Task grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/tasks/${task.id}`} className="block glass-card rounded-2xl p-5 h-full group">
              <div className="flex items-start justify-between mb-3">
                <span className={`badge ${
                  task.status === "open" ? "badge-open" : task.status === "in-progress" ? "badge-progress" : "badge-completed"
                }`}>
                  {task.status === "open" ? "Open" : task.status === "in-progress" ? "In Progress" : task.status}
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); }}
                  className="text-slate-600 hover:text-violet-400 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">
                {task.title}
              </h3>

              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{task.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {task.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-navy-800/60 text-xs text-slate-400 border border-slate-700/30">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5" />
                    {task.submissionCount}
                  </span>
                </div>
                <span className="text-sm font-bold text-white">{formatCurrency(task.budget)}</span>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] text-white font-semibold">
                  {task.client.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="text-xs text-slate-400">{task.client.name}</span>
                <div className="flex-1" />
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
