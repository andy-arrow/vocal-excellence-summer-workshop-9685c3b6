
import React from "react";
import { Lock } from "lucide-react";

interface SecurePaymentBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SecurePaymentBadge: React.FC<SecurePaymentBadgeProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "text-xs py-1 px-2",
    md: "text-sm py-1.5 px-3",
    lg: "text-base py-2 px-4"
  };
  
  return (
    <div className={`inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 
                    text-slate-700 rounded-full ${sizeClasses[size]} ${className}`}>
      <Lock className="w-4 h-4" />
      <span className="font-medium">Secure Payment</span>
    </div>
  );
};

export default SecurePaymentBadge;
