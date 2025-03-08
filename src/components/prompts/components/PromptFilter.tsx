
import { Prompt } from "../types";

interface PromptFilterProps {
  prompts: Prompt[];
  searchQuery: string;
  activeFilter: string;
  sortBy: string;
  currentCategory: string;
}

export const usePromptFilter = ({
  prompts,
  searchQuery,
  activeFilter,
  sortBy,
  currentCategory
}: PromptFilterProps) => {
  
  const getFilteredPrompts = () => {
    let filtered = [...prompts];
    
    if (searchQuery) {
      filtered = filtered.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (currentCategory !== "all") {
      filtered = filtered.filter(prompt => 
        prompt.tags.includes(currentCategory)
      );
    }
    
    switch (activeFilter) {
      case "favorites":
        filtered = filtered.filter(prompt => prompt.favorite);
        break;
      case "gpt4":
        filtered = filtered.filter(prompt => prompt.model === "GPT-4");
        break;
      case "claude":
        filtered = filtered.filter(prompt => prompt.model === "Claude");
        break;
    }
    
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return filtered;
  };
  
  const filteredPrompts = getFilteredPrompts();
  const hasFilters = Boolean(searchQuery || activeFilter !== "all" || currentCategory !== "all");
  
  return {
    filteredPrompts,
    hasFilters
  };
};
