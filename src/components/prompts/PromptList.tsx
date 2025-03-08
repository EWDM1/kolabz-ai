
import { useState } from "react";
import { PromptCard } from "./PromptCard";
import { PromptListHeader } from "./PromptListHeader";
import { EmptyPromptState } from "./EmptyPromptState";

interface Prompt {
  id: number;
  title: string;
  content: string;
  model: string;
  date: string;
  tags: string[];
  favorite?: boolean;
}

interface PromptListProps {
  prompts: Prompt[];
  searchQuery: string;
  activeFilter: string;
  sortBy: string;
  currentCategory: string;
  setPrompts: (prompts: Prompt[]) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  setSortBy: (sort: string) => void;
  handleClearFilters: () => void;
  handleCreateNewPrompt: () => void;
  toggleFavorite: (id: number) => void;
  handleDeletePrompt: (id: number) => void;
}

export const PromptList = ({
  prompts,
  searchQuery,
  activeFilter,
  sortBy,
  currentCategory,
  setPrompts,
  setSearchQuery,
  setActiveFilter,
  setSortBy,
  handleClearFilters,
  handleCreateNewPrompt,
  toggleFavorite,
  handleDeletePrompt
}: PromptListProps) => {
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);
  
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
  
  const togglePromptSelection = (id: number) => {
    setSelectedPrompts(prev => 
      prev.includes(id) 
        ? prev.filter(promptId => promptId !== id)
        : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedPrompts.length === filteredPrompts.length) {
      setSelectedPrompts([]);
    } else {
      setSelectedPrompts(filteredPrompts.map(p => p.id));
    }
  };
  
  const handleBulkDelete = () => {
    if (selectedPrompts.length === 0) return;
    
    setPrompts(prompts.filter(prompt => !selectedPrompts.includes(prompt.id)));
    setSelectedPrompts([]);
  };
  
  const handleExport = () => {
    const promptsToExport = selectedPrompts.length > 0 
      ? prompts.filter(p => selectedPrompts.includes(p.id)) 
      : filteredPrompts;
      
    const exportData = JSON.stringify(promptsToExport, null, 2);
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-prompts.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const hasFilters = searchQuery || activeFilter !== "all" || currentCategory !== "all";
  
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <PromptListHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedPrompts={selectedPrompts}
        filteredPrompts={filteredPrompts}
        handleSelectAll={handleSelectAll}
        handleBulkDelete={handleBulkDelete}
        handleExport={handleExport}
      />
      
      <div className="p-4">
        {filteredPrompts.length > 0 ? (
          <div className="space-y-4">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isSelected={selectedPrompts.includes(prompt.id)}
                onSelectToggle={togglePromptSelection}
                onFavoriteToggle={toggleFavorite}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        ) : (
          <EmptyPromptState 
            hasFilters={hasFilters}
            onClearFilters={handleClearFilters}
            onCreatePrompt={handleCreateNewPrompt}
          />
        )}
      </div>
    </div>
  );
};
