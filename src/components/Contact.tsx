import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Trash2, MessagesSquare, CheckCircle2 } from "lucide-react";
import { ProfileData, ContactMessage } from "../types";

interface ContactProps {
  data: ProfileData;
}

export default function Contact({ data }: ContactProps) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [content, setContent] = useState("");
  
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [localMessages, setLocalMessages] = useState<ContactMessage[]>([]);

  // Load message logs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`messages-${data.name}`);
      if (stored) {
        setLocalMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local messages", e);
    }
  }, [data.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !content) return;

    setIsSending(true);

    // Simulate sending time
    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: `msg-${Date.now()}`,
        senderName,
        senderEmail,
        content,
        timestamp: new Date().toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updated = [newMsg, ...localMessages];
      setLocalMessages(updated);
      try {
        localStorage.setItem(`messages-${data.name}`, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to store messages", err);
      }

      // Reset form & state flags
      setSenderName("");
      setSenderEmail("");
      setContent("");
      setIsSending(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3500);
    }, 1500);
  };

  const handleClearMessages = () => {
    setLocalMessages([]);
    try {
      localStorage.removeItem(`messages-${data.name}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight"
          >
            기약 없는 연결, 연락하기
          </motion.h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-stone-500 font-medium mt-3">궁금한 점이 있거나 흥미로운 제안이 있다면 언제든 편하게 말 걸어주세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-indigo-600 tracking-widest uppercase block">
                CONTACT DETAILS
              </span>
              <h3 className="font-display text-2xl font-bold text-stone-950 leading-snug">
                함께 새로운 아이디어를 <br />
                현실로 옮겨가 볼까요?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                의견이나 피드백, 프리랜싱 문의 혹은 커피 한 잔 나누기 위한 티 미팅 제안 모두 따뜻하게 전송받고 있습니다. 발송하시면 제 로컬 공간에 안전하게 적립 보관됩니다.
              </p>
            </div>

            {/* Visual Indicators list */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 p-4 border border-stone-100 rounded-2xl bg-stone-50/50">
                <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600 border border-stone-200/40">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">이메일 주소</span>
                  <span className="text-sm font-semibold font-mono text-stone-800">{data.contact.email}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 border border-stone-100 rounded-2xl bg-stone-50/50">
                <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600 border border-stone-200/40">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">전화 연락처</span>
                  <span className="text-sm font-semibold font-mono text-stone-800">{data.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 border border-stone-100 rounded-2xl bg-stone-50/50">
                <div className="p-3 bg-white rounded-xl shadow-sm text-amber-500 border border-stone-200/40">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">메인 활동 구역</span>
                  <span className="text-sm font-semibold text-stone-800">{data.contact.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-stone-50 border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h4 className="font-display font-bold text-stone-900 text-lg mb-6 flex items-center space-x-2">
                <Send size={16} className="text-indigo-600" />
                <span>메시지 전송 폼</span>
              </h4>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">이름 / 회사명</label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors"
                      id="input-sender-name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">답변용 연락처 (이메일)</label>
                    <input
                      type="email"
                      required
                      placeholder="gildong@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors"
                      id="input-sender-email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">문의 내용</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="프로젝트 의뢰, 기술 조율 제안, 혹은 하고 싶으신 이야기를 자유롭게 표현해주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors resize-none"
                    id="input-sender-message"
                  />
                </div>

                <div className="pt-2 relative">
                  <button
                    type="submit"
                    disabled={isSending || showSuccess}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold select-none transition-all shadow-md shadow-indigo-100 hover:bg-indigo-700 disabled:bg-stone-300 disabled:shadow-none cursor-pointer"
                    id="btn-submit-message"
                  >
                    <span>{isSending ? "위성 전송 지연 중..." : "전송하기"}</span>
                    {!isSending && <Send size={14} />}
                  </button>

                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 flex items-center justify-center space-x-2 text-sm font-semibold z-10"
                        id="form-success-banner"
                      >
                        <CheckCircle2 size={16} className="text-emerald-600 animate-bounce" />
                        <span>전송 완료! 로컬 수신 보관함에 적립 완료되었습니다.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

            {/* Transmitted Messages Inbox - Show logs of messages left locally */}
            {localMessages.length > 0 && (
              <div className="bg-stone-50 border border-stone-200/50 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-stone-900 text-sm flex items-center space-x-2">
                    <MessagesSquare size={16} className="text-stone-500" />
                    <span>전송 보관함 ({localMessages.length}개)</span>
                  </h4>
                  <button
                    onClick={handleClearMessages}
                    className="flex items-center space-x-1 px-2.5 py-1.5 border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-[10px] font-bold select-none cursor-pointer transition-colors"
                    id="btn-clear-messages"
                  >
                    <Trash2 size={12} />
                    <span>비우기</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {localMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white border border-stone-200/40 p-4 rounded-2xl text-xs space-y-1.5 relative overflow-hidden shadow-sm"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-400">
                        <span className="text-indigo-600 font-sans">{msg.senderName} ({msg.senderEmail})</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed font-sans max-h-16 overflow-y-auto">
                        {msg.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
