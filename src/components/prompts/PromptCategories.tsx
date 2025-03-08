
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PromptCategoriesProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  promptCountByCategory: Record<string, number>;
  totalPrompts: number;
}

export const PromptCategories = ({
  categories,
  activeCategory,
  onCategoryChange,
  promptCountByCategory,
  totalPrompts,
}: PromptCategoriesProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full px-3 py-2 text-sm rounded-md flex justify-between items-center ${
              activeCategory === "all" 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-foreground hover:bg-muted"
            }`}
          >
            <span>All Prompts</span>
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
              {totalPrompts}
            </span>
          </button>
          
          {categories.map((tag) => (
            <button
              key={tag}
              onClick={() => onCategoryChange(tag)}
              className={`w-full px-3 py-2 text-sm rounded-md flex justify-between items-center ${
                activeCategory === tag
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span>#{tag}</span>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                {promptCountByCategory[tag] || 0}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
