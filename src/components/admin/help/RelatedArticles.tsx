
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Lightbulb, ExternalLink } from "lucide-react";

export interface RelatedArticle {
  id: string;
  title: string;
  type: "kb" | "guide" | "faq";
  icon: "kb" | "guide" | "tip";
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "kb":
        return <BookOpen className="h-4 w-4 text-muted-foreground" />;
      case "guide":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case "tip":
        return <Lightbulb className="h-4 w-4 text-muted-foreground" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getButtonText = (type: string) => {
    switch (type) {
      case "kb":
        return "Read Article";
      case "guide":
        return "View Guide";
      case "faq":
        return "View Answer";
      default:
        return "Read More";
    }
  };

  return (
    <Card className="mt-4 bg-muted/40">
      <CardContent className="p-4">
        <h4 className="text-sm font-medium mb-3">Related Articles</h4>
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(article.icon)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{article.title}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1"
              >
                {getButtonText(article.type)}
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedArticles;
