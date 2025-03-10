
import React from "react";
import BaseDataset from "./BaseDataset";

const toolsData = [
  {
    id: "TOOL-001",
    name: "LangChain",
    description: "Framework for developing applications powered by language models",
    features: ["Chains", "Agents", "Memory", "Document loaders"],
    usage_example: "from langchain import PromptTemplate, LLMChain, OpenAI",
    integration: "Works with multiple LLMs including OpenAI, Anthropic, etc.",
    link: "https://www.langchain.com/"
  },
  {
    id: "TOOL-002",
    name: "LlamaIndex",
    description: "Data framework for building LLM applications with custom data",
    features: ["Data connectors", "Indices", "Query engines", "Advanced RAG"],
    usage_example: "from llama_index import GPTSimpleVectorIndex, Document",
    integration: "Compatible with most LLMs and vector databases",
    link: "https://www.llamaindex.ai/"
  },
  {
    id: "TOOL-003",
    name: "Semantic Kernel",
    description: "Microsoft's SDK for integrating AI with programming languages",
    features: ["Skills", "Semantic functions", "Planners", "Memory"],
    usage_example: "using Microsoft.SemanticKernel;",
    integration: "Works with .NET, Python, Java, and multiple LLM providers",
    link: "https://github.com/microsoft/semantic-kernel"
  }
];

const fieldDescriptions = {
  id: "Unique identifier",
  name: "Tool name",
  description: "Purpose and functionality",
  features: "Key capabilities",
  usage_example: "Sample code",
  integration: "Compatible models/frameworks",
  link: "Official website"
};

const ToolsDataset = () => {
  return (
    <BaseDataset
      title="Tools & Frameworks"
      description="Software tools and frameworks for working with language models"
      fields={["id", "name", "description", "features", "usage_example", "integration", "link"]}
      data={toolsData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default ToolsDataset;
