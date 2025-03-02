
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a message to send to the AI assistant");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { prompt: prompt }
      });

      if (error) throw error;
      
      setResponse(data.response);
      toast.success("AI assistant responded!");
    } catch (error) {
      console.error("Error calling AI assistant:", error);
      toast.error("Failed to get a response from the AI assistant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Mctech-hub AI Assistant</CardTitle>
        <CardDescription>Ask our AI assistant about gadgets, tech advice, or recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Type your question here..."
          className="min-h-[100px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        {response && (
          <div className="p-4 bg-secondary/30 rounded-md">
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSendMessage} 
          disabled={loading || !prompt.trim()} 
          className="ml-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
