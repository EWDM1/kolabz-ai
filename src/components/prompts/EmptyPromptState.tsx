
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyPromptStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onCreatePrompt: () => void;
}

export const EmptyPromptState = ({
  hasFilters,
  onClearFilters,
  onCreatePrompt
}: EmptyPromptStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No prompts found</h3>
      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
        {hasFilters
          ? "No prompts match your current filters. Try adjusting or clearing your filters."
          : "You haven't saved any prompts yet. Create your first prompt to get started."}
      </p>
      {hasFilters ? (
        <Button onClick={onClearFilters}>
          Clear All Filters
        </Button>
      ) : (
        <Button onClick={onCreatePrompt}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Your First Prompt
        </Button>
      )}
    </div>
  );
};
