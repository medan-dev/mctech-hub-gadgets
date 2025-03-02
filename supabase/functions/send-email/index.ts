
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    const resend = new Resend(RESEND_API_KEY);
    const { to, subject, html, type } = await req.json();

    if (!to || !subject || !html) {
      throw new Error('Missing required fields: to, subject, and html are required');
    }

    let emailData = {
      from: 'Mctech-hub Gadgets <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    };

    if (type === 'newsletter') {
      console.log('Sending newsletter to:', to);
      emailData.subject = 'Mctech-hub Gadgets Newsletter: ' + subject;
    } else if (type === 'order_confirmation') {
      console.log('Sending order confirmation to:', to);
      emailData.subject = 'Your Mctech-hub Gadgets Order: ' + subject;
    }

    const emailResponse = await resend.emails.send(emailData);
    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-email function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
