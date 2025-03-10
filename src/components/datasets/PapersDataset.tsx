
import React from "react";
import BaseDataset from "./BaseDataset";

const papersData = [
  {
    id: "PAPER-001",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: ["Jason Wei", "Xuezhi Wang", "Dale Schuurmans", "Maarten Bosma", "Brian Ichter"],
    publication_date: "2022",
    key_findings: "Prompting LLMs to reason step-by-step dramatically improves performance on complex tasks",
    citations: 3500,
    link: "https://arxiv.org/abs/2201.11903"
  },
  {
    id: "PAPER-002",
    title: "Training language models to follow instructions with human feedback",
    authors: ["Long Ouyang", "Jeff Wu", "Xu Jiang", "Diogo Almeida", "Carroll L. Wainwright"],
    publication_date: "2022",
    key_findings: "RLHF can align language models to follow human instructions more effectively",
    citations: 2800,
    link: "https://arxiv.org/abs/2203.02155"
  },
  {
    id: "PAPER-003",
    title: "Language Models are Few-Shot Learners",
    authors: ["Tom B. Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah"],
    publication_date: "2020",
    key_findings: "Large language models can learn to perform tasks from a few examples",
    citations: 15000,
    link: "https://arxiv.org/abs/2005.14165"
  }
];

const fieldDescriptions = {
  id: "Unique identifier",
  title: "Paper title",
  authors: "List of authors",
  publication_date: "Year published",
  key_findings: "Main conclusions",
  citations: "Citation count",
  link: "URL to paper"
};

const PapersDataset = () => {
  return (
    <BaseDataset
      title="Research Papers"
      description="Key academic papers in prompt engineering and LLM research"
      fields={["id", "title", "authors", "publication_date", "key_findings", "citations", "link"]}
      data={papersData}
      fieldDescriptions={fieldDescriptions}
    />
  );
};

export default PapersDataset;
