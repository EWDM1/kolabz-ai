
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";

// Local storage keys
export const SAVED_PROMPT_KEY = "kolabz_last_optimized_prompt";
export const SAVED_FORM_STATE_KEY = "kolabz_prompt_form_state";

export interface FormState {
  llm: string;
  specialty: string;
  tone: string;
  detailLevel: string;
  promptObjective: string;
  context: string;
  specificQuestions: string;
  constraints: string;
}

export const usePromptForm = () => {
  const { user } = useAuth();
  // Form state
  const [llm, setLlm] = useState("gpt-4");
  const [specialty, setSpecialty] = useState("");
  const [tone, setTone] = useState("");
  const [detailLevel, setDetailLevel] = useState("");
  const [promptObjective, setPromptObjective] = useState("");
  const [context, setContext] = useState("");
  const [specificQuestions, setSpecificQuestions] = useState("");
  const [constraints, setConstraints] = useState("");
  
  // Result state
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  
  // Clear form when user changes
  useEffect(() => {
    handleClearForm();
  }, [user?.id]);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    if (!user) return; // Don't load saved state if no user is logged in
    
    // Load the last generated prompt
    const savedPrompt = localStorage.getItem(SAVED_PROMPT_KEY);
    if (savedPrompt) {
      setOptimizedPrompt(savedPrompt);
    }

    // Load form state
    const savedFormState = localStorage.getItem(SAVED_FORM_STATE_KEY);
    if (savedFormState) {
      try {
        const parsedState = JSON.parse(savedFormState) as FormState;
        setLlm(parsedState.llm || "gpt-4");
        setSpecialty(parsedState.specialty || "");
        setTone(parsedState.tone || "");
        setDetailLevel(parsedState.detailLevel || "");
        setPromptObjective(parsedState.promptObjective || "");
        setContext(parsedState.context || "");
        setSpecificQuestions(parsedState.specificQuestions || "");
        setConstraints(parsedState.constraints || "");
      } catch (err) {
        console.error("Error parsing saved form state:", err);
      }
    }
  }, [user]);

  // Save form state to localStorage whenever it changes
  useEffect(() => {
    if (!user) return; // Don't save state if no user is logged in
    
    const formState: FormState = {
      llm,
      specialty,
      tone,
      detailLevel,
      promptObjective,
      context,
      specificQuestions,
      constraints
    };
    
    localStorage.setItem(SAVED_FORM_STATE_KEY, JSON.stringify(formState));
  }, [llm, specialty, tone, detailLevel, promptObjective, context, specificQuestions, constraints, user]);

  // Handle clearing the form
  const handleClearForm = () => {
    // Reset all form fields to default values
    setLlm("gpt-4");
    setSpecialty("");
    setTone("");
    setDetailLevel("");
    setPromptObjective("");
    setContext("");
    setSpecificQuestions("");
    setConstraints("");
    setOptimizedPrompt("");
    
    // Clear local storage
    localStorage.removeItem(SAVED_PROMPT_KEY);
    localStorage.removeItem(SAVED_FORM_STATE_KEY);
  };

  return {
    llm, setLlm,
    specialty, setSpecialty,
    tone, setTone,
    detailLevel, setDetailLevel,
    promptObjective, setPromptObjective,
    context, setContext,
    specificQuestions, setSpecificQuestions,
    constraints, setConstraints,
    optimizedPrompt, setOptimizedPrompt,
    handleClearForm
  };
};
