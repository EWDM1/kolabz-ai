
import React from "react";
import BaseDataset from "./BaseDataset";

const modelsData = [
  {
    id: "MOD-001",
    name: "GPT-4",
    developer: "OpenAI",
    release_date: "2023-03",
    capabilities: "Advanced reasoning, code generation, multimodal understanding",
    optimal_prompting: ["TECH-001", "TECH-003"],
    limitations: "Hallucinations, reasoning errors with complex math, limited knowledge cutoff",
    documentation: "https://platform.openai.com/docs/models/gpt-4"
  },
  {
    id: "MOD-002",
    name: "Claude 3",
    developer: "Anthropic",
    release_date: "2024-03",
    capabilities: "Long context window, nuanced instruction following, reduced hallucinations",
    optimal_prompting: ["TECH-001", "TECH-003"],
    limitations: "Occasional evasiveness on controversial topics",
    documentation: "https://www.anthropic.com/claude"
  },
  {
    id: "MOD-003",
    name: "Gemini",
    developer: "Google",
    release_date: "2023-12",
    capabilities: "Multimodal understanding, real-time information, coding assistance",
    optimal_prompting: ["TECH-001", "TECH-002"],
    limitations: "Inconsistent performance across domains",
    documentation: "https://ai.google.dev/models/gemini"
  }
];

const fieldDescriptions = {
  id: "Unique identifier",
  name: "Model name",
  developer: "Creating organization",
  release_date: "Initial release date",
  capabilities: "Key strengths",
  optimal_prompting: "Techniques that work best",
  limitations: "Known issues",
  documentation: "Official documentation"
};

const ModelsDataset = () => {
  return (
    <BaseDataset
      title="Models"
      description="Information about various LLMs and their characteristics"
      fields={["id", "name", "developer", "release_date", "capabilities", "optimal_prompting", "limitations", "documentation"]}
      data={modelsData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default ModelsDataset;
