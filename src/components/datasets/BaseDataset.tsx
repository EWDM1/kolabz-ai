
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BaseDatasetProps {
  title: string;
  description: string;
  fields: string[];
  data: any[];
  fieldDescriptions?: Record<string, string>;
}

const BaseDataset = ({ title, description, fields, data, fieldDescriptions }: BaseDatasetProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(term.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${title.toLowerCase().replace(/\s+/g, '-')}-dataset.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{title} Dataset</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dataset..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleExport}>
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 p-4 bg-muted/50">
          {fields.map((field) => (
            <div key={field} className="space-y-1">
              <div className="text-sm font-medium">{field}</div>
              {fieldDescriptions && fieldDescriptions[field] && (
                <div className="text-xs text-muted-foreground">{fieldDescriptions[field]}</div>
              )}
            </div>
          ))}
        </div>
        <Separator />
        <div className="p-4 space-y-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No data matches your search criteria
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div key={index} className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 p-4 border rounded-md">
                {fields.map((field) => (
                  <div key={field} className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">{field}</div>
                    <div className="text-sm break-words">
                      {Array.isArray(item[field]) 
                        ? item[field].join(", ") 
                        : String(item[field] || "-")}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseDataset;
