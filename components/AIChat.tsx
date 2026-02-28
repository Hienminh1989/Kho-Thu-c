'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'zalo'>('ai');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý AI của Medicat Pro. Tôi có thể giúp gì cho bạn về thông tin thuốc?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const zaloPhone = process.env.NEXT_PUBLIC_ZALO_PHONE || '0123456789';
  const zaloUrl = `https://zalo.me/${zaloPhone}`;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "Bạn là một dược sĩ ảo chuyên nghiệp của hệ thống Medicat Pro. Hãy trả lời các câu hỏi về thuốc một cách chính xác, ngắn gọn và luôn khuyên người dùng tham khảo ý kiến bác sĩ trước khi sử dụng. Nếu câu hỏi không liên quan đến y tế hoặc thuốc, hãy khéo léo từ chối.",
        },
      });

      const aiText = response.text || "Xin lỗi, tôi không thể xử lý yêu cầu này lúc này.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Đã có lỗi xảy ra khi kết nối với trí tuệ nhân tạo. Vui lòng thử lại sau." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-blue-600 text-white flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    {activeTab === 'ai' ? <Bot className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{activeTab === 'ai' ? 'Trợ lý Medicat AI' : 'Hỗ trợ Zalo Khoa Dược'}</h3>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span className="text-[10px] opacity-80">Đang trực tuyến</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex bg-blue-700/50 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'ai' ? 'bg-white text-blue-600 shadow-sm' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Hỏi AI
                </button>
                <button
                  onClick={() => setActiveTab('zalo')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'zalo' ? 'bg-white text-blue-600 shadow-sm' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Chat Zalo
                </button>
              </div>
            </div>

            {/* Content Area */}
            {activeTab === 'ai' ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-xs text-slate-400">AI đang suy nghĩ...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Hỏi về thuốc, liều dùng..."
                      className="w-full pl-4 pr-12 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Powered by Gemini AI
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 text-center space-y-6">
                <div className="w-24 h-24 bg-[#0068FF]/10 rounded-full flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-12 h-12 text-[#0068FF]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.042 10.245C21.042 5.69 17.005 2 12.021 2C7.037 2 3 5.69 3 10.245C3 12.22 3.803 14.032 5.145 15.442C4.855 16.74 3.86 18.66 3.825 18.73C3.73 18.925 3.835 19.145 4.035 19.205C4.1 19.225 4.165 19.235 4.23 19.235C4.37 19.235 4.5 19.175 4.585 19.065C4.655 18.975 6.135 17.07 7.02 16.515C8.52 17.26 10.21 17.69 12.02 17.69C17.005 17.69 21.042 14.005 21.042 10.245Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Kết nối với Dược sĩ</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Bạn cần tư vấn chuyên sâu hoặc có thắc mắc về đơn thuốc? Hãy nhắn tin trực tiếp với dược sĩ trực ban qua Zalo.
                  </p>
                </div>
                <a 
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#0068FF] text-white rounded-xl font-bold hover:bg-[#0055D4] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#0068FF]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Mở ứng dụng Zalo
                </a>
                <p className="text-xs text-slate-400">
                  Thời gian trực: 24/7
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center hover:bg-blue-700 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
