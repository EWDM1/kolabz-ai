
import React from "react";
import BaseDataset from "./BaseDataset";

const tutorialsData = [
  {
    id: "GUIDE-001",
    title: "Building a Chain-of-Thought Prompt",
    objective: "Learn to construct effective reasoning prompts for complex problem solving",
    steps: "1. Define the problem clearly, 2. Add 'think step by step' instruction, 3. Start with an example, 4. Validate outputs",
    prerequisites: "Basic understanding of prompting",
    resources: "https://www.promptingguide.ai/techniques/cot"
  },
  {
    id: "GUIDE-002",
    title: "Creating Custom Knowledge Retrieval Systems",
    objective: "Build a RAG system that uses your own documents",
    steps: "1. Prepare document collection, 2. Split into chunks, 3. Generate embeddings, 4. Create vector database, 5. Implement retrieval logic",
    prerequisites: "Python basics, understanding of embeddings",
    resources: "https://www.llamaindex.ai/tutorials"
  },
  {
    id: "GUIDE-003",
    title: "Fine-tuning Models for Domain-Specific Tasks",
    objective: "Adapt open-source LLMs to perform specialized tasks",
    steps: "1. Prepare training data, 2. Set up fine-tuning environment, 3. Choose hyperparameters, 4. Run training, 5. Evaluate results",
    prerequisites: "Machine learning basics, Python, GPU access",
    resources: "https://huggingface.co/docs/transformers/training"
  }
];

const fieldDescriptions = {
  id: "Unique identifier",
  title: "Tutorial title",
  objective: "Learning goal",
  steps: "Step-by-step instructions",
  prerequisites: "Required knowledge/tools",
  resources: "Links to additional materials"
};

const TutorialsDataset = () => {
  return (
    <BaseDataset
      title="Tutorials & Guides"
      description="Step-by-step instructions for prompt engineering techniques"
      fields={["id", "title", "objective", "steps", "prerequisites", "resources"]}
      data={tutorialsData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default TutorialsDataset;
