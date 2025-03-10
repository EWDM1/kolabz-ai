
import React from "react";
import BaseDataset from "./BaseDataset";

const techniquesData = [
  {
    id: "TECH-001",
    name: "Chain-of-Thought Prompting",
    description: "A prompting technique that encourages the model to explain its reasoning step-by-step",
    use_cases: ["Complex reasoning", "Math problems", "Logical deduction"],
    examples: "Let's think through this step by step...",
    best_practices: "Be explicit about asking for step-by-step reasoning",
    related_techniques: ["TECH-003", "TECH-005"],
    references: "https://www.promptingguide.ai/techniques/cot"
  },
  {
    id: "TECH-002",
    name: "Zero-Shot Prompting",
    description: "Requesting the model to perform a task without providing examples",
    use_cases: ["Simple tasks", "Classification", "Generation"],
    examples: "Translate the following English text to French: 'Hello, how are you?'",
    best_practices: "Use clear instructions and specific output formats",
    related_techniques: ["TECH-003"],
    references: "https://www.promptingguide.ai/techniques/zeroshot"
  },
  {
    id: "TECH-003",
    name: "Few-Shot Prompting",
    description: "Providing multiple examples to guide model output",
    use_cases: ["Text classification", "Complex reasoning", "Format adherence"],
    examples: "Example 1: Translate 'Hello' to French: 'Bonjour'. Example 2: Translate 'Goodbye' to French: 'Au revoir'.",
    best_practices: "Use diverse examples, avoid overfitting, be consistent in formatting",
    related_techniques: ["TECH-001", "TECH-002"],
    references: "https://www.promptingguide.ai/techniques/fewshot"
  }
];

const fieldDescriptions = {
  id: "Unique identifier",
  name: "Technique name",
  description: "Brief explanation",
  use_cases: "Scenarios where effective",
  examples: "Example prompts",
  best_practices: "Tips for optimal use",
  related_techniques: "Related technique IDs",
  references: "Links to in-depth information"
};

const TechniquesDataset = () => {
  return (
    <BaseDataset
      title="Techniques"
      description="Prompt engineering techniques and strategies for effective LLM communication"
      fields={["id", "name", "description", "use_cases", "examples", "best_practices", "related_techniques", "references"]}
      data={techniquesData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default TechniquesDataset;
