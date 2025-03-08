
import { PromptCard } from "./PromptCard";
import { PromptListHeader } from "./PromptListHeader";
import { EmptyPromptState } from "./EmptyPromptState";
import { usePromptSelection } from "./components/PromptSelection";
import { usePromptFilter } from "./components/PromptFilter";
import { exportPrompts } from "./components/PromptExport";
import { Prompt } from "./types";

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
  
  // Use the custom hooks for filtering and selection
  const { filteredPrompts, hasFilters } = usePromptFilter({
    prompts,
    searchQuery,
    activeFilter,
    sortBy,
    currentCategory
  });
  
  const handleBulkDelete = () => {
    setPrompts(prompts.filter(prompt => !selectedPrompts.includes(prompt.id)));
  };
  
  const handleExport = () => {
    const promptsToExport = selectedPrompts.length > 0 
      ? prompts.filter(p => selectedPrompts.includes(p.id)) 
      : filteredPrompts;
      
    exportPrompts(promptsToExport);
  };
  
  const { 
    selectedPrompts, 
    togglePromptSelection, 
    handleSelectAll 
  } = usePromptSelection({ 
    filteredPrompts, 
    onBulkDelete: handleBulkDelete, 
    onExport: handleExport 
  });
  
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
