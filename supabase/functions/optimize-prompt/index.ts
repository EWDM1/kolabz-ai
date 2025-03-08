
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if API key is configured
    if (!DEEPSEEK_API_KEY) {
      console.error("DEEPSEEK_API_KEY is not configured");
      return new Response(JSON.stringify({ 
        error: "DeepSeek API key is not configured. Please add the API key in the Supabase dashboard." 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const {
      llm,
      specialty,
      tone,
      detailLevel,
      promptObjective,
      context,
      specificQuestions,
      constraints
    } = await req.json();

    // Validate required fields
    if (!promptObjective || promptObjective.trim() === "") {
      return new Response(JSON.stringify({ 
        error: "Prompt objective is required" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    console.log("Received request with parameters:", {
      llm,
      specialty,
      tone,
      detailLevel,
      promptObjective: promptObjective.substring(0, 50) + "...", // Log truncated for brevity
    });

    // Prepare data for DeepSeek API
    const specialtyText = specialty || "knowledgeable";
    const toneText = tone || "";
    const detailText = detailLevel || "detailed";
    
    const systemMessage = `You are an expert prompt engineer tasked with creating the most effective prompts for AI models. Based on the user's parameters, craft a structured prompt that follows best practices for ${llm || "large language models"}. Your output should be JUST THE PROMPT with no explanations or conclusions - this ensures users can copy-paste without editing.`;
    
    const userMessage = `Create an optimized prompt based on these parameters:
    - Target AI Model: ${llm || "Any LLM"}
    - Specialization: ${specialty || "General"}
    - Tone: ${tone || "Professional"}
    - Detail Level: ${detailLevel || "Standard"}
    - Main Objective: ${promptObjective}
    - Context: ${context || ""}
    - Specific Questions: ${specificQuestions || ""}
    - Constraints: ${constraints || ""}
    
    The prompt should be in a structured format using [Role], [Context], [Task], [Format], and [Constraints] sections as appropriate. Make it highly effective for the intended AI model. DO NOT include any explanations or introductory text. Output ONLY the prompt text.`;

    // Call DeepSeek API
    console.log("Calling DeepSeek API...");
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // Handle API response
    const responseText = await response.text();
    console.log(`DeepSeek API response status: ${response.status}`);
    
    if (!response.ok) {
      if (response.status === 402) {
        console.error("DeepSeek API payment required error:", responseText);
        return new Response(JSON.stringify({ 
          error: "Your DeepSeek API account requires payment or has reached its limit. Please check your account status or try using a different API model." 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        });
      }

      console.error("DeepSeek API error:", responseText);
      return new Response(JSON.stringify({ 
        error: `Error from DeepSeek API (${response.status}): ${response.statusText}` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    try {
      // Parse the response body as JSON
      const data = JSON.parse(responseText);
      console.log("DeepSeek API response successfully processed");
      
      // Extract the optimized prompt from the response
      const optimizedPrompt = data.choices[0].message.content;

      return new Response(JSON.stringify({ optimizedPrompt }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (parseError) {
      console.error("Error parsing DeepSeek API response:", parseError);
      return new Response(JSON.stringify({ 
        error: "Failed to parse the API response",
        details: parseError.message,
        rawResponse: responseText.substring(0, 200) + "..." // Include part of the raw response for debugging
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error in optimize-prompt function:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred while processing your request" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
