
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/components/prompts/types";

// Mock initial data
const initialPrompts: Prompt[] = [
  {
    id: 1,
    title: "Marketing Campaign Strategy",
    model: "GPT-4",
    date: "2023-07-15",
    content: "Create a comprehensive marketing campaign strategy for a new product launch targeting millennials that incorporates social media, influencer partnerships, and traditional marketing channels. Include specific KPIs for measuring success and a timeline for implementation.",
    tags: ["marketing", "strategy"],
    favorite: true
  },
  {
    id: 2,
    title: "Research Literature Review",
    model: "Claude",
    date: "2023-07-12",
    content: "Conduct a thorough literature review on the effects of climate change on marine ecosystems in the past decade. Synthesize key findings, identify gaps in current research, and suggest directions for future studies. Include references to relevant peer-reviewed publications.",
    tags: ["research", "academic", "climate"],
  },
  {
    id: 3,
    title: "Website UX Improvement",
    model: "GPT-4",
    date: "2023-07-10",
    content: "Analyze the following website design and provide specific recommendations for improving user experience, focusing on navigation structure, mobile responsiveness, and accessibility compliance. Prioritize suggestions based on potential impact and implementation difficulty.",
    tags: ["design", "ux"],
  },
  {
    id: 4,
    title: "Code Review: React Component",
    model: "Claude",
    date: "2023-07-08",
    content: "Review this React component for performance issues, potential bugs, and adherence to best practices. Provide specific code suggestions for improvements, explaining the reasoning behind each recommendation. Consider factors like state management, component lifecycle, and code reusability.",
    tags: ["coding", "react", "technical"],
    favorite: true
  },
  {
    id: 5,
    title: "Product Description Generator",
    model: "GPT-3.5",
    date: "2023-07-05",
    content: "Generate compelling product descriptions for an e-commerce store selling eco-friendly home goods. Each description should highlight unique features, benefits, materials used, and how the product contributes to sustainability. Include appropriate keywords for SEO.",
    tags: ["ecommerce", "content", "marketing"],
  },
  {
    id: 6,
    title: "Technical Documentation",
    model: "GPT-4",
    date: "2023-07-01",
    content: "Create clear and comprehensive documentation for a REST API, including endpoint descriptions, request/response formats, authentication requirements, error handling, and usage examples. Format the documentation in markdown suitable for inclusion in a developer portal.",
    tags: ["technical", "documentation", "api"],
  },
];

export const usePromptsData = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentCategory, setCurrentCategory] = useState("all");
  
  // Derive all tags from prompts
  const allTags = Array.from(new Set(
    prompts.flatMap(prompt => prompt.tags)
  )).sort();
  
  // Calculate prompt count by category
  const promptCountByCategory = allTags.reduce((acc, tag) => {
    acc[tag] = prompts.filter(p => p.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);
  
  // Toggle favorite status for a prompt
  const toggleFavorite = (id: number) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id 
        ? { ...prompt, favorite: !prompt.favorite } 
        : prompt
    ));
    
    const prompt = prompts.find(p => p.id === id);
    const newStatus = !prompt?.favorite;
    
    toast({
      title: newStatus ? "Added to favorites" : "Removed from favorites",
      description: `"${prompt?.title}" has been ${newStatus ? "added to" : "removed from"} your favorites`,
    });
  };
  
  // Delete a prompt
  const handleDeletePrompt = (id: number) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
    toast({
      title: "Prompt deleted",
      description: "The prompt has been removed from your library",
    });
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("all");
    setSortBy("recent");
    setCurrentCategory("all");
  };
  
  // Navigate to create a new prompt
  const handleCreateNewPrompt = () => {
    navigate("/dashboard");
    
    toast({
      title: "Create new prompt",
      description: "Opening prompt creator...",
    });
  };
  
  return {
    prompts,
    setPrompts,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    currentCategory,
    setCurrentCategory,
    allTags,
    promptCountByCategory,
    toggleFavorite,
    handleDeletePrompt,
    handleClearFilters,
    handleCreateNewPrompt
  };
};
