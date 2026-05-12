"use client";
import useSWR from "swr";
import { useAuth } from "./auth-context";
import { mockTasks } from "./mock-data";
import { API_BASE_URL } from "./constants";

const fetcher = async ([url, token]: [string, string | null]) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, { 
      headers,
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    if (!res.ok) {
      console.warn(`API request failed with status ${res.status}, falling back to mock data`);
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.warn(`API fetch failed for ${url}:`, error, "Using mock data as fallback");
    throw error;
  }
};

export function useTasks(category?: string, search?: string) {
  const query = new URLSearchParams();
  if (category && category !== "all") query.append("category", category);
  if (search) query.append("search", search);
  
  const { data, error, isLoading } = useSWR([`/tasks?${query.toString()}`, null], fetcher, {
    onError: () => {}, // Suppress error logging for fallback
  });
  
  // Filter mock data based on category and search
  const filteredMockTasks = mockTasks.filter((t) => {
    const matchCat = !category || category === "all" || t.category === category;
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  
  // Use backend data if available, fallback to filtered mock data
  const tasks = data?.tasks && data.tasks.length > 0 ? data.tasks.map((t: any) => ({...t, id: t._id || t.id})) : filteredMockTasks;
  
  return { tasks, isLoading: isLoading && !data, isError: error };
}

export function useTask(id: string) {
  const { data, error, isLoading } = useSWR([`/tasks/${id}`, null], fetcher, {
    onError: () => {},
  });
  
  // Fallback to mock data
  const mockTask = mockTasks.find((t) => t.id === id);
  const task = data?.task ? { ...data.task, id: data.task._id || data.task.id } : mockTask;
  
  return { task, isLoading: isLoading && !data, isError: error && !mockTask };
}

export function useSubmissions(taskId?: string) {
  const { token } = useAuth();
  const query = taskId ? `?taskId=${taskId}` : "";
  const { data, error, isLoading, mutate } = useSWR(token ? [`/submissions${query}`, token] : null, fetcher, {
    onError: () => {},
  });
  return { submissions: data?.submissions?.map((s: any) => ({...s, id: s._id || s.id})) || [], isLoading: isLoading && !data, isError: error, mutate };
}

export function useNotifications() {
  const { token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(token ? ["/notifications", token] : null, fetcher, {
    onError: () => {},
  });
  return { notifications: data?.notifications?.map((n: any) => ({...n, id: n._id || n.id})) || [], isLoading: isLoading && !data, isError: error, mutate };
}

export function useMessages() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/messages/conversations", token] : null, fetcher, {
    onError: () => {},
  });
  return { conversations: data?.conversations?.map((c: any) => ({...c, id: c._id || c.id})) || [], isLoading: isLoading && !data, isError: error };
}

export function useUsers() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/users", token] : null, fetcher, {
    onError: () => {},
  });
  return { users: data?.users?.map((u: any) => ({...u, id: u._id || u.id})) || [], isLoading: isLoading && !data, isError: error };
}

export function usePayments() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/payments", token] : null, fetcher, {
    onError: () => {},
  });
  return { payments: data?.payments?.map((p: any) => ({...p, id: p._id || p.id})) || [], isLoading: isLoading && !data, isError: error };
}

export function useWallet() {
  const { token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(token ? ["/payments/wallet", token] : null, fetcher, {
    onError: () => {},
  });
  return { wallet: data?.wallet || null, isLoading: isLoading && !data, isError: error, mutate };
}

export async function apiPost(url: string, body: Record<string, unknown>, token: string | null) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${url}`, { method: "POST", headers, body: JSON.stringify(body) });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}

export async function apiPut(url: string, body: Record<string, unknown>, token: string | null) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${url}`, { method: "PUT", headers, body: JSON.stringify(body) });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}