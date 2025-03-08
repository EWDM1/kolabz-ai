
import { useState } from "react";
import { Search, SlidersHorizontal, Download, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface PromptListHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedPrompts: number[];
  filteredPrompts: any[];
  handleSelectAll: () => void;
  handleBulkDelete: () => void;
  handleExport: () => void;
}

export const PromptListHeader = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
  selectedPrompts,
  filteredPrompts,
  handleSelectAll,
  handleBulkDelete,
  handleExport
}: PromptListHeaderProps) => {
  return (
    <>
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search prompts..." 
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Sort & Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSortBy("recent")}>
                  Most recent
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  Oldest first
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                  Alphabetical
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                  All prompts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("favorites")}>
                  Favorites only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("gpt4")}>
                  GPT-4 only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("claude")}>
                  Claude only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10"
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      {selectedPrompts.length > 0 && (
        <div className="bg-muted/50 border-b border-border px-4 py-2 flex justify-between items-center">
          <div className="text-sm">
            {selectedPrompts.length} {selectedPrompts.length === 1 ? "prompt" : "prompts"} selected
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedPrompts.length === filteredPrompts.length ? "Deselect All" : "Select All"}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleBulkDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
