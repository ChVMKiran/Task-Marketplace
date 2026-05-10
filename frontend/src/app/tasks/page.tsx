"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Clock, Users, Bookmark, ArrowUpRight, SlidersHorizontal, Loader } from "lucide-react";
import { useTasks } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { TASK_CATEGORIES } from "@/lib/constants";

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { tasks, isLoading } = useTasks(selectedCategory, searchQuery);

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === "all" || t.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Task Marketplace</h1>
        <p className="text-neutral-600 text-sm mt-1">Discover creative tasks and start earning</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === "all" ? "bg-neutral-100 text-neutral-900 border border-neutral-200" : "bg-neutral-50/50 text-neutral-600 border border-neutral-200 hover:border-neutral-200"
            }`}
        >
          All Tasks
        </button>
        {TASK_CATEGORIES.slice(0, 7).map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.value ? "bg-neutral-100 text-neutral-900 border border-neutral-200" : "bg-neutral-50/50 text-neutral-600 border border-neutral-200 hover:border-neutral-200"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-600">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" /> Loading tasks...
            </span>
          ) : (
            `${filtered.length} task${filtered.length !== 1 ? 's' : ''} found`
          )}
        </div>
      </div>

      {/* Task grid */}
      {isLoading && filtered.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 h-64 animate-pulse">
              <div className="bg-neutral-100 h-6 rounded w-1/3 mb-4" />
              <div className="bg-neutral-100 h-4 rounded w-full mb-2" />
              <div className="bg-neutral-100 h-4 rounded w-5/6 mb-4" />
              <div className="bg-neutral-100 h-20 rounded mt-auto" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-600 text-lg">No tasks found matching your criteria.</p>
          <p className="text-neutral-600 text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/tasks/${task.id}`} className="block glass-card rounded-2xl p-5 h-full group hover:border-neutral-200 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className={`badge ${task.status === "open" ? "badge-open" : task.status === "in-progress" ? "badge-progress" : "badge-completed"
                    }`}>
                    {task.status === "open" ? "Open" : task.status === "in-progress" ? "In Progress" : task.status}
                  </span>
                  <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-base font-semibold text-black mb-2 line-clamp-2 group-hover:text-neutral-900 transition-colors">
                  {task.title}
                </h3>

                <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{task.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {task.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-neutral-100/50 text-xs text-neutral-600 border border-neutral-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-neutral-600">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-600">
                      <Users className="w-3.5 h-3.5" />
                      {task.submissionCount}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-black">{formatCurrency(task.budget)}</span>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-200">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center text-[10px] text-black font-semibold">
                    {task.client && task.client.name ? task.client.name.split(" ").map(n => n[0]).join("") : "CC"}
                  </div>
                  <span className="text-xs text-neutral-600">{task.client?.name || "Task-Marketplace"}</span>
                  <div className="flex-1" />
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
