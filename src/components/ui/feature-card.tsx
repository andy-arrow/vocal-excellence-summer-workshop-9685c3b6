
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={`flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-apple-light ${className}`}>
      <div className="flex-shrink-0">
        <Icon className="w-5 h-5 text-apple-blue" />
      </div>
      <div>
        <h3 className="text-[17px] font-medium text-apple-text mb-1">{title}</h3>
        <p className="text-[15px] leading-relaxed text-apple-grey">{description}</p>
      </div>
    </div>
  );
}
