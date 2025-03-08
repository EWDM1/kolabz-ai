
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanCardProps {
  id: string;
  name: string;
  price: { monthly: string; annual: string };
  description: string;
  features: PlanFeature[];
  savings?: string;
  isSelected: boolean;
  isAnnual: boolean;
  onSelect: (id: string) => void;
}

const PlanCard = ({ 
  id, 
  name, 
  price, 
  description, 
  features, 
  savings, 
  isSelected, 
  isAnnual, 
  onSelect 
}: PlanCardProps) => {
  return (
    <Card 
      className={`${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{name}</CardTitle>
          {isAnnual && savings && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              Save {savings}
            </span>
          )}
        </div>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">
            {isAnnual ? price.annual : price.monthly}
          </span>
          <span className="text-muted-foreground ml-2 text-sm">
            {isAnnual ? "/year" : "/month"}
          </span>
        </div>
        <CardDescription className="mt-1.5">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2">
                {feature.included ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <span className="h-4 w-4 text-muted-foreground/30">✕</span>
                )}
              </div>
              <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground/60'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant={isSelected ? "default" : "outline"}
          onClick={() => onSelect(id)}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Selected
            </>
          ) : (
            "Select Plan"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
