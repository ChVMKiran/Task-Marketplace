export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "contributor" | "admin";
  avatar?: string;
  department?: string;
  year?: string;
  college?: string;
  skills?: string[];
  bio?: string;
  portfolioLinks?: string[];
  rating: number;
  totalTasks: number;
  totalEarnings: number;
  totalWins: number;
  isVerified: boolean;
  joinedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  requirements: string;
  category: string;
  tags: string[];
  budget: number;
  deadline: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "draft" | "open" | "in-progress" | "review" | "completed" | "cancelled";
  visibility: "public" | "college-only" | "department-only";
  submissionType: string;
  maxWinners: number;
  attachments: Attachment[];
  client: User;
  submissionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: string;
  taskId: string;
  task: Task;
  contributor: User;
  files: Attachment[];
  comment: string;
  status: "pending" | "shortlisted" | "accepted" | "rejected" | "winner";
  rating?: number;
  feedback?: string;
  version: number;
  submittedAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "payout" | "refund";
  amount: number;
  status: "pending" | "completed" | "failed";
  description: string;
  taskId?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "task" | "submission" | "payout" | "system" | "message";
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  taskId?: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  taskId?: string;
  taskTitle?: string;
  lastMessage: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Review {
  id: string;
  fromUser: User;
  toUser: User;
  taskId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface WalletData {
  balance: number;
  pendingAmount: number;
  totalEarnings: number;
  totalWithdrawals: number;
  transactions: Transaction[];
}

export interface AnalyticsData {
  tasksPosted: number;
  tasksCompleted: number;
  submissionsReceived: number;
  avgRating: number;
  totalSpent: number;
  totalEarned: number;
  monthlyData: { month: string; tasks: number; earnings: number; submissions: number }[];
  categoryBreakdown: { category: string; count: number; percentage: number }[];
  recentActivity: { action: string; timestamp: string; details: string }[];
}
