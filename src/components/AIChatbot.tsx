import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickResponses: Record<string, string> = {
  "how to apply": "To apply for a scheme: 1) Browse schemes at /schemes 2) Check your eligibility 3) Click 'Register for Scheme' 4) Fill in the required details 5) Upload documents 6) Submit your application.",
  "eligibility": "Your eligibility depends on factors like age, income, location, gender, and caste category. Complete your profile and run the eligibility check to see which schemes you qualify for.",
  "documents": "Common documents needed: Aadhaar Card, Income Certificate, Age Proof, Bank Account Details, Caste Certificate (if applicable), and Disability Certificate (if applicable).",
  "aadhaar": "Aadhaar is required for most government schemes as the primary identity verification document. You can verify your Aadhaar through our platform.",
  "status": "You can track your application status in the Dashboard under 'My Applications'. Status updates include: Submitted, Under Review, Approved, and Rejected.",
  "contact": "For help, you can: 1) Use this AI chat 2) Contact a nearby NGO 3) Visit your nearest government office. Use the Help Center for more options.",
  "pension": "Pension schemes are available for senior citizens (60+) with limited income. The Senior Citizens Pension Scheme provides ₹3,000/month. Check your eligibility now!",
  "scholarship": "Multiple scholarship schemes are available for students. The Student Merit Scholarship provides ₹50,000/year tuition + ₹20,000 stipend. Income limit applies.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();

  for (const [key, response] of Object.entries(quickResponses)) {
    if (lower.includes(key)) return response;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("help")) {
    return "Hello! I'm the Benefits GPS AI Assistant. I can help you with:\n• Finding eligible schemes\n• Understanding eligibility criteria\n• Document requirements\n• Application process\n• Tracking application status\n\nWhat would you like to know?";
  }

  return "I can help you with government schemes, eligibility checks, document requirements, and application tracking. Try asking about specific topics like 'How to apply', 'eligibility', 'documents needed', or 'pension schemes'.";
}

export const AIChatbot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Benefits GPS AI Assistant. How can I help you today? Ask me about schemes, eligibility, or documents.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full hero-gradient text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] card-elevated flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="hero-gradient p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{t("chatbot.title")}</p>
              <p className="text-white/70 text-xs">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5 text-accent" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="bg-secondary rounded-lg px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t("chatbot.placeholder")}
              className="text-sm"
            />
            <Button size="icon" onClick={sendMessage} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
