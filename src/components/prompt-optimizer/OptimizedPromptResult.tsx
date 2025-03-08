
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PromptDisplay from "./components/PromptDisplay";
import PromptActions from "./components/PromptActions";

interface OptimizedPromptResultProps {
  optimizedPrompt: string;
  onSavePrompt?: (prompt: string) => void;
}

const OptimizedPromptResult = ({ optimizedPrompt, onSavePrompt }: OptimizedPromptResultProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState(optimizedPrompt);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(isEditing ? editablePrompt : optimizedPrompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard"
    });
  };

  const handleEditPrompt = () => {
    if (isEditing) {
      // Save edits
      setIsEditing(false);
    } else {
      // Start editing
      setEditablePrompt(optimizedPrompt);
      setIsEditing(true);
    }
  };

  const handleSavePrompt = () => {
    const promptToSave = isEditing ? editablePrompt : optimizedPrompt;
    
    if (onSavePrompt) {
      onSavePrompt(promptToSave);
    }
    
    toast({
      title: "Saved!",
      description: "Prompt saved to your library"
    });
  };

  if (!optimizedPrompt) return null;

  return (
    <div className="mt-6 space-y-4">
      <PromptDisplay 
        isEditing={isEditing}
        optimizedPrompt={optimizedPrompt}
        editablePrompt={editablePrompt}
        onEditablePromptChange={setEditablePrompt}
      />
      
      <PromptActions 
        isEditing={isEditing}
        onCopyPrompt={handleCopyPrompt}
        onEditPrompt={handleEditPrompt}
        onSavePrompt={handleSavePrompt}
      />
    </div>
  );
};

export default OptimizedPromptResult;
