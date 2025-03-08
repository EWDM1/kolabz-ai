
import { Prompt } from "../types";

export const exportPrompts = (promptsToExport: Prompt[]) => {
  const exportData = JSON.stringify(promptsToExport, null, 2);
  const blob = new Blob([exportData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "my-prompts.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
