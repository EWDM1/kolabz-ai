
import { Tag, Clock, Eye, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Prompt {
  id: number;
  title: string;
  content: string;
  model: string;
  date: string;
  tags: string[];
  favorite?: boolean;
}

interface PromptCardProps {
  prompt: Prompt;
  isSelected: boolean;
  onSelectToggle: (id: number) => void;
  onFavoriteToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PromptCard = ({
  prompt,
  isSelected,
  onSelectToggle,
  onFavoriteToggle,
  onDelete
}: PromptCardProps) => {
  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 ${
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelectToggle(prompt.id)}
              className="mr-3 h-4 w-4 rounded border-gray-300"
            />
            <h3 className="font-medium text-lg">{prompt.title}</h3>
            {prompt.favorite && (
              <button 
                onClick={() => onFavoriteToggle(prompt.id)}
                className="ml-2 text-yellow-500 hover:text-yellow-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            {!prompt.favorite && (
              <button 
                onClick={() => onFavoriteToggle(prompt.id)}
                className="ml-2 text-muted-foreground hover:text-yellow-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {prompt.date}
            </div>
            <div>|</div>
            <div>{prompt.model}</div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            onClick={() => onDelete(prompt.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm line-clamp-2 mt-2 mb-3">
        {prompt.content}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full flex items-center"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
