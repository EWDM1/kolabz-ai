
import React from "react";
import BaseDataset from "./BaseDataset";

const caseStudiesData = [
  {
    id: "CASE-001",
    title: "Customer Support Automation for E-commerce",
    problem: "High volume of repetitive customer queries causing long wait times",
    solution: "Implemented a GPT-4 based chatbot with few-shot prompting and RAG",
    outcome: "Reduced response time by 80%, resolved 65% of queries without human intervention",
    lessons_learned: "Fine-tuning prompt examples with real conversation data significantly improved accuracy"
  },
  {
    id: "CASE-002",
    title: "Legal Document Analysis System",
    problem: "Manual review of contracts taking too long and missing important clauses",
    solution: "Created a specialized prompt system with Chain-of-Thought reasoning to analyze contract terms",
    outcome: "90% accuracy in identifying problematic clauses, 75% reduction in review time",
    lessons_learned: "Breaking down the analysis into explicit steps improved reliability"
  },
  {
    id: "CASE-003",
    title: "Educational Content Generation for K-12",
    problem: "Creating personalized learning materials for different student levels was resource-intensive",
    solution: "Developed a templated prompt system with Claude 3 that adapts explanation level based on age group",
    outcome: "Generated materials for 3 different age groups with 85% teacher approval rating",
    lessons_learned: "Including explicit instructions about vocabulary simplification was crucial for younger audiences"
  }
];

const fieldDescriptions = {
  id: "Unique identifier",
  title: "Case study title",
  problem: "Challenge addressed",
  solution: "Techniques/tools used",
  outcome: "Results/metrics",
  lessons_learned: "Key takeaways"
};

const CaseStudiesDataset = () => {
  return (
    <BaseDataset
      title="Case Studies"
      description="Real-world examples of prompt engineering applications and outcomes"
      fields={["id", "title", "problem", "solution", "outcome", "lessons_learned"]}
      data={caseStudiesData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default CaseStudiesDataset;
