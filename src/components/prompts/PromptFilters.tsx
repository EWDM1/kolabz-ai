
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PromptFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const PromptFilters = ({
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
  hasActiveFilters,
  onClearFilters
}: PromptFiltersProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium text-sm">Filter by</div>
          <div className="space-y-1 pl-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`block text-sm ${activeFilter === "all" ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              All prompts
            </button>
            <button
              onClick={() => setActiveFilter("favorites")}
              className={`block text-sm ${activeFilter === "favorites" ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveFilter("gpt4")}
              className={`block text-sm ${activeFilter === "gpt4" ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              GPT-4 only
            </button>
            <button
              onClick={() => setActiveFilter("claude")}
              className={`block text-sm ${activeFilter === "claude" ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              Claude only
            </button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="font-medium text-sm">Sort by</div>
          <div className="space-y-1 pl-1">
            <button
              onClick={() => setSortBy("recent")}
              className={`block text-sm ${sortBy === "recent" ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              Most recent
            </button>
            <button
              onClick={() => setSortBy("oldest")}
              className={`block text-sm ${sortBy === "oldest" ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              Oldest first
            </button>
            <button
              onClick={() => setSortBy("alphabetical")}
              className={`block text-sm ${sortBy === "alphabetical" ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              Alphabetical
            </button>
          </div>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2" 
            onClick={onClearFilters}
          >
            <X className="mr-2 h-3 w-3" />
            Clear Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
