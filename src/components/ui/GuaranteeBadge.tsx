
import React from "react";
import { BadgeCheck, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GuaranteeBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const GuaranteeBadge: React.FC<GuaranteeBadgeProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "text-xs py-1 px-2",
    md: "text-sm py-1.5 px-3",
    lg: "text-base py-2 px-4"
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1.5 bg-green-50 border border-green-200 
                          text-green-800 rounded-full ${sizeClasses[size]} ${className}`}>
            <BadgeCheck className="w-4 h-4" />
            <span className="font-medium">Satisfaction Guarantee</span>
            <Info className="w-3.5 h-3.5 text-green-600 ml-0.5" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3">
          <p className="text-sm">
            100% Money-Back Guarantee until lunch on Day 1. 
            If you're not completely satisfied, we'll refund your full payment with no questions asked.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GuaranteeBadge;
