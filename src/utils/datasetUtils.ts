/**
 * Utility functions and types for creating datasets from promptingguide.ai
 */

export interface BaseDatasetEntry {
  id: string;
  references?: string[];
}

// Techniques Dataset Types
export interface TechniqueEntry extends BaseDatasetEntry {
  name: string;
  description: string;
  use_cases: string[];
  examples: string[];
  best_practices: string[];
  related_techniques: string[];
}

// Applications Dataset Types
export interface ApplicationEntry extends BaseDatasetEntry {
  name: string;
  description: string;
  examples: string[];
  challenges: string[];
  related_techniques: string[];
  case_studies: string[];
}

// Models Dataset Types
export interface ModelEntry extends BaseDatasetEntry {
  name: string;
  developer: string;
  release_date: string;
  capabilities: string[];
  optimal_prompting: string[];
  limitations: string[];
  documentation: string;
}

// Tools/Frameworks Dataset Types
export interface ToolEntry extends BaseDatasetEntry {
  name: string;
  description: string;
  features: string[];
  usage_example: string;
  integration: string[];
  link: string;
}

// Research Papers Dataset Types
export interface PaperEntry extends BaseDatasetEntry {
  title: string;
  authors: string[];
  publication_date: string;
  key_findings: string[];
  citations: number;
  link: string;
}

// Glossary Dataset Types
export interface GlossaryEntry {
  term: string;
  definition: string;
  example: string;
}

// Tutorials/Guides Dataset Types
export interface GuideEntry extends BaseDatasetEntry {
  title: string;
  objective: string;
  steps: string[];
  prerequisites: string[];
  resources: string[];
}

// Case Studies Dataset Types
export interface CaseStudyEntry extends BaseDatasetEntry {
  title: string;
  problem: string;
  solution: string[];
  outcome: string;
  lessons_learned: string[];
}

/**
 * Creates a unique ID for a dataset entry with proper prefix
 */
export function createDatasetId(type: string, index: number): string {
  const prefix = {
    technique: 'TECH',
    application: 'APP',
    model: 'MOD',
    tool: 'TOOL',
    paper: 'PAPER',
    guide: 'GUIDE',
    case: 'CASE'
  }[type.toLowerCase()] || 'ITEM';
  
  return `${prefix}-${String(index + 1).padStart(3, '0')}`;
}

/**
 * Validates if the dataset entry has all required fields
 */
export function validateEntry(entry: any, requiredFields: string[]): boolean {
  return requiredFields.every(field => !!entry[field]);
}

/**
 * Cross-references entities between datasets
 */
export function crossReferenceDatasets(
  sourceEntries: BaseDatasetEntry[],
  targetEntries: BaseDatasetEntry[],
  relationField: string
): BaseDatasetEntry[] {
  return sourceEntries.map(entry => {
    const entryAsAny = entry as any;
    if (entryAsAny[relationField] && Array.isArray(entryAsAny[relationField])) {
      // Keep existing relations but validate they exist in target dataset
      const validRelations = entryAsAny[relationField].filter((id: string) => 
        targetEntries.some(target => target.id === id)
      );
      entryAsAny[relationField] = validRelations;
    }
    return entry;
  });
}

/**
 * Merge datasets of the same type
 */
export function mergeDatasets<T extends BaseDatasetEntry>(datasets: T[][]): T[] {
  const mergedMap = new Map<string, T>();
  
  datasets.flat().forEach(entry => {
    if (mergedMap.has(entry.id)) {
      // Merge with existing entry
      const existing = mergedMap.get(entry.id) as any;
      const newEntry = entry as any;
      
      Object.keys(newEntry).forEach(key => {
        if (Array.isArray(existing[key]) && Array.isArray(newEntry[key])) {
          // Merge arrays without duplicates
          existing[key] = [...new Set([...existing[key], ...newEntry[key]])];
        } else if (newEntry[key] && !existing[key]) {
          // Use new value if existing is empty
          existing[key] = newEntry[key];
        }
      });
    } else {
      mergedMap.set(entry.id, entry);
    }
  });
  
  return Array.from(mergedMap.values());
}
