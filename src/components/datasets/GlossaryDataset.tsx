
import React from "react";
import BaseDataset from "./BaseDataset";

const glossaryData = [
  {
    term: "Temperature",
    definition: "A parameter that controls randomness in the model's output; higher values lead to more diverse and creative responses",
    example: "Set temperature=0 for deterministic outputs, 0.7 for creative writing"
  },
  {
    term: "Token",
    definition: "The basic unit of text processing in LLMs; a word may consist of multiple tokens",
    example: "The word 'hamburger' might be split into tokens like ['ham', 'bur', 'ger']"
  },
  {
    term: "Prompt Engineering",
    definition: "The practice of designing and optimizing inputs to language models to get desired outputs",
    example: "Crafting specific instructions like 'Answer as if you were a physics professor'"
  },
  {
    term: "Hallucination",
    definition: "When an AI generates false or unsupported information that appears plausible",
    example: "An AI confidently citing a non-existent research paper"
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    definition: "A technique where external knowledge is retrieved and provided to the model to enhance generation",
    example: "Searching a company database before answering customer questions"
  }
];

const fieldDescriptions = {
  term: "Technical term or concept",
  definition: "Explanation of meaning",
  example: "Example usage or context"
};

const GlossaryDataset = () => {
  return (
    <BaseDataset
      title="Glossary"
      description="Technical terms and concepts related to prompt engineering"
      fields={["term", "definition", "example"]}
      data={glossaryData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default GlossaryDataset;
