"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Upload, FileText, Link as LinkIcon, Send, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewSubmissionPage() {
  const router = useRouter();
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the data to the API
    alert("Submission successful!");
    router.push("/dashboard/submissions");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/dashboard/submissions" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Submissions
      </Link>
      
      <div>
        <h1 className="text-2xl font-bold text-black">Submit Your Work</h1>
        <p className="text-neutral-600 text-sm mt-1">Upload your files or provide links to your completed task.</p>
      </div>

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
            <input type="url" placeholder="https://github.com/..." className="input-field" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-black flex items-center gap-2"><FileText className="w-4 h-4 text-neutral-900" /> Additional Notes</h2>
          <div>
            <label className="text-sm text-neutral-600 mb-1.5 block">Comments for the Client</label>
            <textarea 
              rows={5} 
              placeholder="Describe your approach or any important details..." 
              className="input-field resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
        </motion.div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="btn-secondary px-6 py-2.5">Cancel</button>
          <button type="submit" className="btn-primary px-8 py-2.5 flex items-center gap-2">
            <Send className="w-4 h-4" /> Submit Work
          </button>
        </div>
      </form>
    </div>
  );
}
