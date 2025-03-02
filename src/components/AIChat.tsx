
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, MessageCircle, User, Bot, ChevronDown, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Define the message type for our chat
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// Quick prompt suggestions
const PROMPT_SUGGESTIONS = [
  "What are the latest tech trends?",
  "Recommend a good laptop for video editing",
  "Compare wireless vs wired headphones",
  "What smart home devices are worth buying?",
  "Help me choose between iPhone and Android"
];

const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a message to send to the AI assistant");
      return;
    }

    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date()
    };

    // Add user message to the chat
    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { 
          prompt: prompt,
          // Send conversation history for context (last 5 messages)
          history: messages.slice(-5).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }
      });

      if (error) throw error;
      
      // Create an assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      // Add assistant message to the chat
      setMessages(prev => [...prev, assistantMessage]);
      toast.success("AI assistant responded!");
    } catch (error) {
      console.error("Error calling AI assistant:", error);
      toast.error("Failed to get a response from the AI assistant");
    } finally {
      setLoading(false);
    }
  };

  const handlePromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const clearConversation = () => {
    setMessages([]);
    setShowSuggestions(true);
    toast.info("Conversation cleared");
  };

  return (
    <Card className="w-full shadow-md overflow-hidden border-accent/20 bg-gradient-to-b from-background to-secondary/20">
      <CardHeader className="bg-secondary/30 border-b border-border/30">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MessageCircle className="text-accent h-6 w-6" />
          Mctech-hub AI Assistant
        </CardTitle>
        <CardDescription>
          Ask our AI assistant about gadgets, tech advice, or recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 h-[400px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Bot className="h-16 w-16 mx-auto mb-4 text-accent opacity-40" />
            <h3 className="text-lg font-medium mb-2">Ask me anything about tech</h3>
            <p className="max-w-sm mx-auto">I can help you with product recommendations, tech advice, or answer questions about the latest gadgets.</p>
          </div>
        )}
        
        {messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  message.role === "user" ? "ml-auto" : "mr-auto"
                )}
              >
                <div 
                  className={cn(
                    "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-background",
                    message.role === "user" ? "bg-accent order-2" : "bg-primary"
                  )}
                >
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                
                <div 
                  className={cn(
                    "p-4 rounded-2xl text-sm",
                    message.role === "user" 
                      ? "bg-accent text-accent-foreground rounded-tr-none" 
                      : "bg-muted rounded-tl-none"
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={cn(
                    "text-xs mt-1 opacity-70",
                    message.role === "user" ? "text-accent-foreground" : "text-muted-foreground"
                  )}>
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute:'2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {showSuggestions && (
          <div className="mt-6 pt-4 border-t border-border/30">
            <h4 className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3 flex items-center">
              <ChevronDown className="h-3 w-3 mr-1" /> Suggested questions
            </h4>
            <div className="flex flex-wrap gap-2">
              {PROMPT_SUGGESTIONS.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-accent/20 hover:bg-accent/10 hover:text-accent"
                  onClick={() => handlePromptSuggestion(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="bg-secondary/50 px-4 py-2 rounded-full flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
              <span className="text-sm text-muted-foreground">AI is thinking...</span>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 border-t border-border/30 bg-secondary/20">
        {messages.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearConversation}
            className="mr-auto hover:bg-destructive/10 hover:text-destructive"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            New Chat
          </Button>
        )}
        
        <div className={cn("flex-1 relative", messages.length > 0 ? "ml-2" : "")}>
          <Textarea
            placeholder="Type your question here..."
            className="min-h-[60px] pr-16 resize-none border-accent/20 focus-visible:ring-accent"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={loading || !prompt.trim()} 
            className="absolute right-2 bottom-2 h-8 px-2 bg-accent hover:bg-accent/90"
            size="sm"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
