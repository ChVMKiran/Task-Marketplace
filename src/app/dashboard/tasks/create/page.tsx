"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Calendar, DollarSign, Tag, FileText, Image, Film, Users, AlertCircle, ChevronDown } from "lucide-react";
import { TASK_CATEGORIES, TASK_PRIORITIES } from "@/lib/constants";

export default function CreateTaskPage() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Task</h1>
        <p className="text-zinc-400 text-sm mt-1">Post a creative task and receive submissions from talented students</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2"><FileText className="w-4 h-4 text-violet-400" /> Task Details</h2>

          <div>
            <label className="text-sm text-zinc-400 mb-1.5 block">Task Title</label>
            <input type="text" placeholder="e.g., Design a Modern Event Poster" className="input-field" />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1.5 block">Description</label>
            <textarea rows={5} placeholder="Describe your task in detail..." className="input-field resize-none" />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1.5 block">Requirements</label>
            <textarea rows={4} placeholder="List specific requirements..." className="input-field resize-none" />
          </div>
        </motion.div>

        {/* Category and budget */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2"><Tag className="w-4 h-4 text-violet-400" /> Classification</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Category</label>
              <select className="input-field appearance-none cursor-pointer">
                <option value="">Select category</option>
                {TASK_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Submission Type</label>
              <select className="input-field appearance-none cursor-pointer">
                <option value="">Select type</option>
                <option value="image">Image / Poster</option>
                <option value="video">Video</option>
                <option value="code">Code / Website</option>
                <option value="document">Document</option>
                <option value="design">Design File</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1.5 block">Tags (comma separated)</label>
            <input type="text" placeholder="e.g., poster, event, design" className="input-field" />
          </div>
        </motion.div>

        {/* Budget & Deadline */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center gap-2"><DollarSign className="w-4 h-4 text-violet-400" /> Budget & Timeline</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Budget (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">₹</span>
                <input type="number" placeholder="5000" className="input-field pl-8" />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="date" className="input-field pl-10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Priority</label>
              <select className="input-field appearance-none cursor-pointer">
                {TASK_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Max Winners</label>
              <input type="number" placeholder="1" min={1} max={10} className="input-field" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Visibility</label>
              <select className="input-field appearance-none cursor-pointer">
                <option value="public">Public</option>
                <option value="college-only">College Only</option>
                <option value="department-only">Department Only</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Attachments */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2"><Upload className="w-4 h-4 text-violet-400" /> Attachments</h2>
          <div className="border-2 border-dashed border-zinc-700/50 rounded-xl p-8 text-center hover:border-violet-500/30 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <p className="text-sm text-zinc-400">Drag & drop reference files here, or <span className="text-violet-400">browse</span></p>
            <p className="text-xs text-zinc-600 mt-1">PNG, JPG, PDF, ZIP up to 50MB</p>
          </div>
        </motion.div>

        {/* Submit buttons */}
        <div className="flex items-center justify-end gap-3">
          <button type="button" className="btn-secondary px-6 py-2.5">Save as Draft</button>
          <button type="submit" className="btn-primary px-8 py-2.5">Publish Task</button>
        </div>
      </form>
    </div>
  );
}
