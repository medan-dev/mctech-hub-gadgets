
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Type for message in conversation
type Message = {
  role: "system" | "user" | "assistant";
  content: string;
}

// Define system prompt for the AI
const systemPrompt: Message = {
  role: "system",
  content: `You are the helpful AI assistant for Mctech-hub Gadgets, a premium technology and gadgets shop.
  
Your main responsibilities are:
- Provide helpful, accurate information about technology, gadgets, and electronics
- Give product recommendations based on user needs
- Answer questions about tech trends, comparisons between products, and general tech advice
- Be concise, friendly, and informative in your responses
- When recommending products, focus on value, features, and quality

Try to keep your responses under 150 words unless a detailed explanation is needed.
Use markdown formatting when appropriate to make your responses easy to read.`
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    // Get request body
    const { prompt, history = [] } = await req.json()

    console.log('Received prompt:', prompt)
    console.log('Conversation history length:', history.length)

    // Prepare conversation history for OpenAI
    const messages: Message[] = [systemPrompt]

    // Add conversation history if provided
    if (history && history.length > 0) {
      history.forEach((msg: Message) => {
        messages.push(msg)
      })
    }

    // Add the new user prompt
    messages.push({
      role: "user",
      content: prompt
    })

    console.log('Sending', messages.length, 'messages to OpenAI')

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error('OpenAI API error:', data.error)
      throw new Error(`OpenAI API error: ${data.error.message}`)
    }

    const aiResponse = data.choices[0].message.content

    console.log('AI response generated successfully')

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
