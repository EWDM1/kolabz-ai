
import React from "react";
import BaseDataset from "./BaseDataset";

const applicationsData = [
  {
    id: "APP-001",
    name: "Customer Support Chatbots",
    description: "AI systems that handle customer inquiries and support requests",
    examples: "Banking support, e-commerce help desks, technical assistance",
    challenges: "Handling emotional customers, domain-specific knowledge, context switching",
    related_techniques: ["TECH-002", "TECH-003"],
    case_studies: "https://www.promptingguide.ai/applications/customer_support"
  },
  {
    id: "APP-002",
    name: "Content Generation",
    description: "Using AI to create various forms of content like articles, social media posts",
    examples: "Blog writing, marketing copy, creative writing",
    challenges: "Maintaining brand voice, factual accuracy, originality",
    related_techniques: ["TECH-001", "TECH-003"],
    case_studies: "https://www.promptingguide.ai/applications/content_generation"
  },
  {
    id: "APP-003",
    name: "Educational Tutoring",
    description: "AI-powered teaching assistants that help with learning and explanation",
    examples: "Math tutoring, language learning, concept explanation",
    challenges: "Adapting to student knowledge level, providing accurate information",
    related_techniques: ["TECH-001", "TECH-003"],
    case_studies: "https://www.promptingguide.ai/applications/education"
  }
];

const fieldDescriptions = {
  id: "Unique identifier",
  name: "Application name",
  description: "Summary of the application",
  examples: "Real-world implementations",
  challenges: "Common limitations and issues",
  related_techniques: "Technique IDs used",
  case_studies: "Links to case studies"
};

const ApplicationsDataset = () => {
  return (
    <BaseDataset
      title="Applications"
      description="Real-world applications and use cases of prompt engineering"
      fields={["id", "name", "description", "examples", "challenges", "related_techniques", "case_studies"]}
      data={applicationsData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default ApplicationsDataset;
