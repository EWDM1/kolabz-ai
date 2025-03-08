
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { PromptCategories } from "@/components/prompts/PromptCategories";
import { PromptFilters } from "@/components/prompts/PromptFilters";
import { PromptList } from "@/components/prompts/PromptList";
import { Prompt } from "@/components/prompts/types";
import { usePromptsData } from "@/components/prompts/hooks/usePromptsData";

interface PromptsContentProps {
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
}

export const PromptsContent = ({ handleNavigation, handleLogout }: PromptsContentProps) => {
  const {
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
  } = usePromptsData();

  const hasActiveFilters = activeFilter !== "all" || sortBy !== "recent" || currentCategory !== "all";
  
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-3 lg:col-span-2">
        <DashboardSidebar 
          handleNavigation={handleNavigation}
          handleLogout={handleLogout}
          activePage="prompts"
        />
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
        <h1 className="text-2xl font-bold mb-2">My Prompts</h1>
        <p className="text-muted-foreground mb-6">
          Manage and organize your saved prompts
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 space-y-6">
            <Button 
              onClick={handleCreateNewPrompt}
              className="w-full sm:hidden"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Prompt
            </Button>
          
            <PromptCategories 
              categories={allTags}
              activeCategory={currentCategory}
              onCategoryChange={setCurrentCategory}
              promptCountByCategory={promptCountByCategory}
              totalPrompts={prompts.length}
            />
            
            <PromptFilters 
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          <div className="md:col-span-9">
            <PromptList 
              prompts={prompts}
              searchQuery={searchQuery}
              activeFilter={activeFilter}
              sortBy={sortBy}
              currentCategory={currentCategory}
              setPrompts={setPrompts}
              setSearchQuery={setSearchQuery}
              setActiveFilter={setActiveFilter}
              setSortBy={setSortBy}
              handleClearFilters={handleClearFilters}
              handleCreateNewPrompt={handleCreateNewPrompt}
              toggleFavorite={toggleFavorite}
              handleDeletePrompt={handleDeletePrompt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
