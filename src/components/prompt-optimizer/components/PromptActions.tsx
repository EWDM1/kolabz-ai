
import React from "react";
import { Copy, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromptActionsProps {
  isEditing: boolean;
  onCopyPrompt: () => void;
  onEditPrompt: () => void;
  onSavePrompt: () => void;
}

const PromptActions = ({
  isEditing,
  onCopyPrompt,
  onEditPrompt,
  onSavePrompt,
}: PromptActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onCopyPrompt}
        className="flex items-center gap-1.5"
      >
        <Copy className="h-3.5 w-3.5" />
        Copy to Clipboard
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onEditPrompt}
        className="flex items-center gap-1.5"
      >
        <FileEdit className="h-3.5 w-3.5" />
        {isEditing ? "Save Edits" : "Edit Prompt"}
      </Button>

      <Button
        variant="secondary"
        size="sm"
        onClick={onSavePrompt}
        className="flex items-center gap-1.5 ml-auto"
      >
        Save Prompt
      </Button>
    </div>
  );
};

export default PromptActions;
