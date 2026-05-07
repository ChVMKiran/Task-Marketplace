"use client";
import useSWR from "swr";
import { useAuth } from "./auth-context";

const fetcher = async ([url, token]: [string, string | null]) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}${url}`, { headers });
  if (!res.ok) throw new Error("An error occurred while fetching the data.");
  return res.json();
};

export function useTasks(category?: string, search?: string) {
  const query = new URLSearchParams();
  if (category && category !== "all") query.append("category", category);
  if (search) query.append("search", search);
  
  const { data, error, isLoading } = useSWR([`/tasks?${query.toString()}`, null], fetcher);
  return { tasks: data?.tasks || [], isLoading, isError: error };
}

export function useTask(id: string) {
  const { data, error, isLoading } = useSWR([`/tasks/${id}`, null], fetcher);
  return { task: data?.task, isLoading, isError: error };
}

export function useSubmissions(taskId?: string) {
  const { token } = useAuth();
  const query = taskId ? `?taskId=${taskId}` : "";
  const { data, error, isLoading, mutate } = useSWR(token ? [`/submissions${query}`, token] : null, fetcher);
  return { submissions: data?.submissions || [], isLoading, isError: error, mutate };
}

export function useNotifications() {
  const { token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(token ? ["/notifications", token] : null, fetcher);
  return { notifications: data?.notifications || [], isLoading, isError: error, mutate };
}

export function useMessages() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/messages", token] : null, fetcher);
  return { conversations: data?.conversations || [], isLoading, isError: error };
}

export function useUsers() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/users", token] : null, fetcher);
  return { users: data?.users || [], isLoading, isError: error };
}

export function usePayments() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/payments", token] : null, fetcher);
  return { payments: data?.payments || [], isLoading, isError: error };
}