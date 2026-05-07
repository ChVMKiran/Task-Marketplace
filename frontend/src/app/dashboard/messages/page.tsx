"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft } from "lucide-react";
import { useMessages } from "@/lib/api";
import { mockUser, mockMessages } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";

export default function MessagesPage() {
  const { conversations: mockConversations, isLoading: loadingMsgs } = useMessages();

  const [selectedConv, setSelectedConv] = useState(mockConversations ? mockConversations[0] : null);
  const [messageInput, setMessageInput] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-slate-400 text-sm mt-1">Communicate with clients and contributors</p>
      </div>

      {!selectedConv ? (
        <div className="glass-card rounded-2xl p-10 text-center text-slate-400">No messages found.</div>
      ) : (
      <div className="glass-card rounded-2xl overflow-hidden flex" style={{ height: "calc(100vh - 220px)" }}>
        {/* Conversations list */}
        <div className={`w-full md:w-80 border-r border-white/5 flex flex-col shrink-0 ${mobileShowChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Search conversations..." className="input-field pl-9 text-sm py-2" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv: any) => (
              <button
                key={conv.id}
                onClick={() => { setSelectedConv(conv); setMobileShowChat(true); }}
                className={`w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-white/[0.03] transition-colors border-b border-white/5 ${selectedConv.id === conv.id ? "bg-white/[0.03]" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {conv.participants[1].name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white truncate">{conv.participants[1].name}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">{formatRelativeTime(conv.updatedAt)}</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">{conv.taskTitle}</div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage.content}</div>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-violet-500 text-[10px] text-white flex items-center justify-center font-medium shrink-0 mt-1">{conv.unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!mobileShowChat ? "hidden md:flex" : "flex"}`}>
          {/* Chat header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-white/5 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileShowChat(false)} className="md:hidden text-slate-400 mr-1"><ArrowLeft className="w-5 h-5" /></button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                {selectedConv.participants[1].name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{selectedConv.participants[1].name}</div>
                <div className="text-xs text-slate-500">{selectedConv.taskTitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400"><Phone className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400"><Video className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {mockMessages.map((msg: any) => {
              const isMe = msg.senderId === mockUser.id;
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMe ? "bg-violet-500/20 border border-violet-500/20" : "bg-navy-800/60 border border-white/5"}`}>
                    <p className="text-sm text-slate-200">{msg.content}</p>
                    <p className="text-[10px] text-slate-500 mt-1 text-right">{formatRelativeTime(msg.createdAt)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-navy-800/50 hover:bg-slate-700/50 flex items-center justify-center text-slate-400"><Paperclip className="w-4 h-4" /></button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="input-field flex-1"
                onKeyDown={(e) => { if (e.key === "Enter" && messageInput.trim()) setMessageInput(""); }}
              />
              <button className="w-9 h-9 rounded-xl bg-violet-500 hover:bg-violet-600 flex items-center justify-center text-white transition-colors"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
