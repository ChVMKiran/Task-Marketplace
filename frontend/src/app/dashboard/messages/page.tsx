"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Search, Phone, Video, MoreVertical, Paperclip, ArrowLeft, MessageSquare } from "lucide-react";
import { useMessages, apiPost } from "@/lib/api";
import { mockUser, mockMessages, mockConversations as fallbackConversations } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export default function MessagesPage() {
  const { conversations: apiConversations, isLoading } = useMessages();
  const { user, token } = useAuth();

  // Use API conversations if available, else fallback to mock
  const conversations = apiConversations.length > 0 ? apiConversations : fallbackConversations;

  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  // Auto-select first conversation when loaded
  useEffect(() => {
    if (conversations.length > 0 && !selectedConvId) {
      setSelectedConvId(conversations[0].id);
    }
  }, [conversations, selectedConvId]);

  const selectedConv = conversations.find((c: { id: string }) => c.id === selectedConvId);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConv) return;
    try {
      await apiPost(`/messages/${selectedConv.id}`, { content: messageInput }, token);
      setMessageInput("");
    } catch {
      // Fallback: just clear the input
      setMessageInput("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Messages</h1>
        <p className="text-neutral-600 text-sm mt-1">Communicate with clients and contributors</p>
      </div>

      {isLoading ? (
        <div className="glass-card rounded-2xl p-10 text-center text-neutral-600">
          <div className="inline-flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
            Loading messages...
          </div>
        </div>
      ) : conversations.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 text-lg font-medium">No messages yet</p>
          <p className="text-neutral-500 text-sm mt-2">Start a conversation by messaging a task client or contributor.</p>
        </div>
      ) : !selectedConv ? (
        <div className="glass-card rounded-2xl p-10 text-center text-neutral-600">Select a conversation to start.</div>
      ) : (
      <div className="glass-card rounded-2xl overflow-hidden flex" style={{ height: "calc(100vh - 220px)" }}>
        {/* Conversations list */}
        <div className={`w-full md:w-80 border-r border-neutral-200 flex flex-col shrink-0 ${mobileShowChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-3 border-b border-neutral-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              <input type="text" placeholder="Search conversations..." className="input-field pl-9 text-sm py-2" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv: { id: string, participants: { name: string }[], updatedAt: string, taskTitle?: string, lastMessage?: { content: string }, unreadCount?: number }) => (
              <button
                key={conv.id}
                onClick={() => { setSelectedConvId(conv.id); setMobileShowChat(true); }}
                className={`w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-neutral-100/50 transition-colors border-b border-neutral-200 ${selectedConvId === conv.id ? "bg-neutral-100/50" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center text-black text-xs font-semibold shrink-0">
                  {conv.participants[1]?.name?.split(" ").map((n: string) => n[0]).join("") || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black truncate">{conv.participants[1]?.name || "Unknown"}</span>
                    <span className="text-[10px] text-neutral-600 shrink-0">{formatRelativeTime(conv.updatedAt)}</span>
                  </div>
                  {conv.taskTitle && <div className="text-xs text-neutral-600 truncate mt-0.5">{conv.taskTitle}</div>}
                  {conv.lastMessage && <div className="text-xs text-neutral-600 truncate mt-0.5">{conv.lastMessage.content}</div>}
                </div>
                {(conv.unreadCount || 0) > 0 && (
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-[10px] text-black flex items-center justify-center font-medium shrink-0 mt-1">{conv.unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!mobileShowChat ? "hidden md:flex" : "flex"}`}>
          {/* Chat header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-neutral-200 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileShowChat(false)} className="md:hidden text-neutral-600 mr-1"><ArrowLeft className="w-5 h-5" /></button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center text-black text-xs font-semibold">
                {selectedConv.participants[1]?.name?.split(" ").map((n: string) => n[0]).join("") || "?"}
              </div>
              <div>
                <div className="text-sm font-medium text-black">{selectedConv.participants[1]?.name || "Unknown"}</div>
                {selectedConv.taskTitle && <div className="text-xs text-neutral-600">{selectedConv.taskTitle}</div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg hover:bg-neutral-100/50 flex items-center justify-center text-neutral-600"><Phone className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg hover:bg-neutral-100/50 flex items-center justify-center text-neutral-600"><Video className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg hover:bg-neutral-100/50 flex items-center justify-center text-neutral-600"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {mockMessages.map((msg: { id: string, senderId: string, content: string, createdAt: string }) => {
              const isMe = msg.senderId === (user?.id || mockUser.id);
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMe ? "bg-neutral-100 border border-neutral-200" : "bg-neutral-100/50 border border-neutral-200"}`}>
                    <p className="text-sm text-neutral-600">{msg.content}</p>
                    <p className="text-[10px] text-neutral-600 mt-1 text-right">{formatRelativeTime(msg.createdAt)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neutral-200 shrink-0">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-neutral-100/50 hover:bg-neutral-100/50 flex items-center justify-center text-neutral-600"><Paperclip className="w-4 h-4" /></button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="input-field flex-1"
                onKeyDown={(e) => { if (e.key === "Enter" && messageInput.trim()) handleSendMessage(); }}
              />
              <button onClick={handleSendMessage} className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-100 flex items-center justify-center text-black transition-colors"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
