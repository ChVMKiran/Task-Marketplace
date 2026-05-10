"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Upload, FileText, Link as LinkIcon, Send, ArrowLeft, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiPost } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function NewSubmissionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId") || "";
  const { token } = useAuth();

  const [comment, setComment] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Please add a comment describing your work.");
      return;
    }

    if (!taskId) {
      setError("No task selected. Please navigate from a task page to submit work.");
      return;
    }

    setIsSubmitting(true);

    try {
      const files = externalUrl ? [{ name: "External Link", url: externalUrl, type: "url", size: 0 }] : [];
      await apiPost("/submissions", { taskId, files, comment }, token);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/submissions");
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit work");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-12 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Submission Sent!</h2>
          <p className="text-neutral-600">Your work has been submitted successfully. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/dashboard/submissions" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Submissions
      </Link>
      
      <div>
        <h1 className="text-2xl font-bold text-black">Submit Your Work</h1>
        <p className="text-neutral-600 text-sm mt-1">Upload your files or provide links to your completed task.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-sm font-medium text-red-600">{error}</span>
        </div>
      )}

      {!taskId && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
          <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
          <span className="text-sm font-medium text-yellow-700">No task selected. Navigate from a task detail page to submit work.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><Upload className="w-4 h-4 text-neutral-900" /> Attachments</h2>
          <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-neutral-200 transition-colors cursor-pointer bg-neutral-100/30">
            <Upload className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-600">Drag & drop your deliverables here, or <span className="text-neutral-900 font-medium">browse</span></p>
            <p className="text-xs text-neutral-500 mt-1">PNG, JPG, PDF, ZIP up to 50MB</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><LinkIcon className="w-4 h-4 text-neutral-900" /> External Links</h2>
          <div>
            <label className="text-sm text-neutral-600 mb-1.5 block">Repository or Live URL (Optional)</label>
            <input type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://github.com/..." className="input-field" disabled={isSubmitting} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><FileText className="w-4 h-4 text-neutral-900" /> Additional Notes</h2>
          <div>
            <label className="text-sm text-neutral-600 mb-1.5 block">Comments for the Client *</label>
            <textarea 
              rows={5} 
              placeholder="Describe your approach or any important details..." 
              className="input-field resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </motion.div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="btn-secondary px-6 py-2.5" disabled={isSubmitting}>Cancel</button>
          <button type="submit" disabled={isSubmitting || !taskId} className="btn-primary px-8 py-2.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? <><Loader className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Work</>}
          </button>
        </div>
      </form>
    </div>
  );
}
