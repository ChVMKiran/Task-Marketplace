"use client";
import useSWR from "swr";
import { useAuth } from "./auth-context";
import { mockTasks } from "./mock-data";

const fetcher = async ([url, token]: [string, string | null]) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  
  try {
    const res = await fetch(`${apiUrl}${url}`, { 
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
    revalidateOnFocus: false,
  });
  
  // Filter mock data based on category and search
  const filteredMockTasks = mockTasks.filter((t) => {
    const matchCat = !category || category === "all" || t.category === category;
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  
  // Use backend data if available, fallback to filtered mock data
  const tasks = data?.tasks && data.tasks.length > 0 ? data?.tasks : filteredMockTasks;
  
  return { tasks, isLoading: isLoading && !data, isError: error };
}

export function useTask(id: string) {
  const { data, error, isLoading } = useSWR([`/tasks/${id}`, null], fetcher, {
    onError: () => {},
    revalidateOnFocus: false,
  });
  
  // Fallback to mock data
  const mockTask = mockTasks.find((t) => t.id === id);
  const task = data?.task || mockTask;
  
  return { task, isLoading: isLoading && !data, isError: error && !mockTask };
}

export function useSubmissions(taskId?: string) {
  const { token } = useAuth();
  const query = taskId ? `?taskId=${taskId}` : "";
  const { data, error, isLoading, mutate } = useSWR(token ? [`/submissions${query}`, token] : null, fetcher, {
    onError: () => {},
    revalidateOnFocus: false,
  });
  return { submissions: data?.submissions || [], isLoading: isLoading && !data, isError: error, mutate };
}

export function useNotifications() {
  const { token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(token ? ["/notifications", token] : null, fetcher, {
    onError: () => {},
    revalidateOnFocus: false,
  });
  return { notifications: data?.notifications || [], isLoading: isLoading && !data, isError: error, mutate };
}

export function useMessages() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/messages", token] : null, fetcher, {
    onError: () => {},
    revalidateOnFocus: false,
  });
  return { conversations: data?.conversations || [], isLoading: isLoading && !data, isError: error };
}

export function useUsers() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/users", token] : null, fetcher, {
    onError: () => {},
    revalidateOnFocus: false,
  });
  return { users: data?.users || [], isLoading: isLoading && !data, isError: error };
}

export function usePayments() {
  const { token } = useAuth();
  const { data, error, isLoading } = useSWR(token ? ["/payments", token] : null, fetcher, {
    onError: () => {},
    revalidateOnFocus: false,
  });
  return { payments: data?.payments || [], isLoading: isLoading && !data, isError: error };
}