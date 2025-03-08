
import { useState } from "react";
import { Prompt } from "../types";

interface PromptSelectionProps {
  filteredPrompts: Prompt[];
  onBulkDelete: () => void;
  onExport: () => void;
}

export const usePromptSelection = ({ filteredPrompts, onBulkDelete, onExport }: PromptSelectionProps) => {
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);
  
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
    onBulkDelete();
    setSelectedPrompts([]);
  };
  
  const handleExport = () => {
    onExport();
  };
  
  return {
    selectedPrompts,
    setSelectedPrompts,
    togglePromptSelection,
    handleSelectAll,
    handleBulkDelete,
    handleExport
  };
};
