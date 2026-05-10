export const SITE_NAME = "Task-Marketplace";
export const SITE_DESCRIPTION = "The premium creative marketplace built for college students. Post tasks, submit work, win contests, and earn.";
export const SITE_URL = "https://Task-Marketplace.io";

export const TASK_CATEGORIES = [
  { value: "graphic-design", label: "Graphic Design", icon: "Palette", color: "#8B5CF6" },
  { value: "web-development", label: "Web Development", icon: "Code2", color: "#3B82F6" },
  { value: "video-editing", label: "Video Editing", icon: "Film", color: "#EC4899" },
  { value: "content-writing", label: "Content Writing", icon: "PenTool", color: "#10B981" },
  { value: "ui-ux-design", label: "UI/UX Design", icon: "Figma", color: "#F59E0B" },
  { value: "photography", label: "Photography", icon: "Camera", color: "#EF4444" },
  { value: "social-media", label: "Social Media", icon: "Share2", color: "#06B6D4" },
  { value: "data-analytics", label: "Data Analytics", icon: "BarChart3", color: "#8B5CF6" },
  { value: "presentation", label: "Presentation", icon: "Presentation", color: "#F97316" },
  { value: "other", label: "Other", icon: "MoreHorizontal", color: "#6B7280" },
] as const;

export const TASK_PRIORITIES = [
  { value: "low", label: "Low", color: "#10B981" },
  { value: "medium", label: "Medium", color: "#F59E0B" },
  { value: "high", label: "High", color: "#EF4444" },
  { value: "urgent", label: "Urgent", color: "#DC2626" },
] as const;

export const TASK_STATUSES = [
  { value: "draft", label: "Draft", color: "#6B7280" },
  { value: "open", label: "Open", color: "#3B82F6" },
  { value: "in-progress", label: "In Progress", color: "#F59E0B" },
  { value: "review", label: "Under Review", color: "#8B5CF6" },
  { value: "completed", label: "Completed", color: "#10B981" },
  { value: "cancelled", label: "Cancelled", color: "#EF4444" },
] as const;

export const SUBMISSION_STATUSES = [
  { value: "pending", label: "Pending", color: "#6B7280" },
  { value: "shortlisted", label: "Shortlisted", color: "#F59E0B" },
  { value: "accepted", label: "Accepted", color: "#10B981" },
  { value: "rejected", label: "Rejected", color: "#EF4444" },
  { value: "winner", label: "Winner", color: "#8B5CF6" },
] as const;

export const NAV_ITEMS = {
  client: [
    { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { label: "My Tasks", href: "/dashboard/tasks", icon: "ClipboardList" },
    { label: "Create Task", href: "/dashboard/tasks/create", icon: "PlusCircle" },
    { label: "Submissions", href: "/dashboard/submissions", icon: "FileCheck" },
    { label: "Messages", href: "/dashboard/messages", icon: "MessageSquare" },
    { label: "Wallet", href: "/dashboard/wallet", icon: "Wallet" },
    { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  ],
  contributor: [
    { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { label: "Browse Tasks", href: "/tasks", icon: "Search" },
    { label: "My Submissions", href: "/dashboard/submissions", icon: "FileCheck" },
    { label: "Messages", href: "/dashboard/messages", icon: "MessageSquare" },
    { label: "Wallet", href: "/dashboard/wallet", icon: "Wallet" },
    { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  ],
  admin: [
    { label: "Overview", href: "/admin", icon: "LayoutDashboard" },
    { label: "Users", href: "/admin/users", icon: "Users" },
    { label: "Tasks", href: "/admin/tasks", icon: "ClipboardList" },
    { label: "Submissions", href: "/admin/submissions", icon: "FileCheck" },
    { label: "Payments", href: "/admin/payments", icon: "CreditCard" },
    { label: "Disputes", href: "/admin/disputes", icon: "AlertTriangle" },
    { label: "Reports", href: "/admin/reports", icon: "BarChart3" },
  ],
} as const;

export const STATS_DATA = {
  totalTasks: 12847,
  totalUsers: 45200,
  totalPayouts: 2340000,
  activeContests: 342,
};
