"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Calendar, DollarSign, Tag, FileText, Image, Film, Users, AlertCircle, ChevronDown, Loader, CheckCircle } from "lucide-react";
import { TASK_CATEGORIES, TASK_PRIORITIES } from "@/lib/constants";
import { apiPost } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [category, setCategory] = useState("");
  const [submissionType, setSubmissionType] = useState("");
  const [tags, setTags] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [maxWinners, setMaxWinners] = useState("1");
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = async (e: React.FormEvent, status: string = "open") => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!title || !description || !requirements || !category || !budget || !deadline) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      await apiPost("/tasks", {
        title,
        description,
        requirements,
        category,
        submissionType,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        budget: parseInt(budget),
        deadline: new Date(deadline).toISOString(),
        priority,
        maxWinners: parseInt(maxWinners) || 1,
        visibility,
        status,
      }, token);

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/tasks");
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-12 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Task Created!</h2>
          <p className="text-neutral-600">Your task has been published successfully. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Create New Task</h1>
        <p className="text-neutral-600 text-sm mt-1">Post a creative task and receive submissions from talented students</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-sm font-medium text-red-600">{error}</span>
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><FileText className="w-4 h-4 text-neutral-900" /> Task Details</h2>

          <div>
            <label className="text-sm text-neutral-600 mb-1.5 block">Task Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Design a Modern Event Poster" className="input-field" required disabled={isSubmitting} />
          </div>

          <div>
            <label className="text-sm text-neutral-600 mb-1.5 block">Description *</label>
            <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your task in detail..." className="input-field resize-none" required disabled={isSubmitting} />
          </div>

          <div>
            <label className="text-sm text-neutral-600 mb-1.5 block">Requirements *</label>
            <textarea rows={4} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="List specific requirements..." className="input-field resize-none" required disabled={isSubmitting} />
          </div>
        </motion.div>

        {/* Category and budget */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><Tag className="w-4 h-4 text-neutral-900" /> Classification</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600 mb-1.5 block">Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field appearance-none cursor-pointer" required disabled={isSubmitting}>
                <option value="">Select category</option>
                {TASK_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-neutral-600 mb-1.5 block">Submission Type</label>
              <select value={submissionType} onChange={(e) => setSubmissionType(e.target.value)} className="input-field appearance-none cursor-pointer" disabled={isSubmitting}>
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
            <label className="text-sm text-neutral-600 mb-1.5 block">Tags (comma separated)</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., poster, event, design" className="input-field" disabled={isSubmitting} />
          </div>
        </motion.div>

        {/* Budget & Deadline */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><DollarSign className="w-4 h-4 text-neutral-900" /> Budget & Timeline</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600 mb-1.5 block">Budget (₹) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 text-sm">₹</span>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="5000" className="input-field pl-8" required min={1} disabled={isSubmitting} />
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-600 mb-1.5 block">Deadline *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input-field pl-10" required disabled={isSubmitting} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-neutral-600 mb-1.5 block">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input-field appearance-none cursor-pointer" disabled={isSubmitting}>
                {TASK_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-neutral-600 mb-1.5 block">Max Winners</label>
              <input type="number" value={maxWinners} onChange={(e) => setMaxWinners(e.target.value)} placeholder="1" min={1} max={10} className="input-field" disabled={isSubmitting} />
            </div>
            <div>
              <label className="text-sm text-neutral-600 mb-1.5 block">Visibility</label>
              <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="input-field appearance-none cursor-pointer" disabled={isSubmitting}>
                <option value="public">Public</option>
                <option value="college-only">College Only</option>
                <option value="department-only">Department Only</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Attachments */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><Upload className="w-4 h-4 text-neutral-900" /> Attachments</h2>
          <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-neutral-200 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-600">Drag & drop reference files here, or <span className="text-neutral-900">browse</span></p>
            <p className="text-xs text-neutral-600 mt-1">PNG, JPG, PDF, ZIP up to 50MB</p>
          </div>
        </motion.div>

        {/* Submit buttons */}
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={(e) => handleSubmit(e as React.FormEvent, "draft")} disabled={isSubmitting} className="btn-secondary px-6 py-2.5 disabled:opacity-50">Save as Draft</button>
          <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-2.5 flex items-center gap-2 disabled:opacity-50">
            {isSubmitting ? <><Loader className="w-4 h-4 animate-spin" /> Publishing...</> : "Publish Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
