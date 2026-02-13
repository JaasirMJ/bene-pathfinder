import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Tractor, Accessibility, BookOpen, Landmark, Utensils, Briefcase, Home, Baby } from "lucide-react";

const categoryIcons: Record<string, { icon: React.ElementType; emoji: string }> = {
  Education: { icon: GraduationCap, emoji: "🎓" },
  "Women & Child": { icon: Baby, emoji: "👩‍🦰" },
  Pension: { icon: Landmark, emoji: "🧓" },
  Agriculture: { icon: Tractor, emoji: "🚜" },
  Disability: { icon: Accessibility, emoji: "🧑‍🦽" },
  Skills: { icon: BookOpen, emoji: "👨‍🎓" },
  Healthcare: { icon: Heart, emoji: "🏥" },
  Housing: { icon: Home, emoji: "🏠" },
  Employment: { icon: Briefcase, emoji: "💼" },
  Business: { icon: Briefcase, emoji: "💼" },
  "Food Security": { icon: Utensils, emoji: "🍽️" },
};

interface SchemeTypeBadgeProps {
  category: string;
}

export const SchemeTypeBadge = ({ category }: SchemeTypeBadgeProps) => {
  const config = categoryIcons[category];
  if (!config) return null;

  return (
    <span className="text-sm">
      {config.emoji}
    </span>
  );
};

export const SchemeImportanceBadge = ({ category }: { category: string }) => {
  const badgeMap: Record<string, { label: string; className: string }> = {
    Pension: { label: "Senior Citizens", className: "bg-warning/10 text-warning" },
    Education: { label: "Student Focused", className: "bg-info/10 text-info" },
    "Women & Child": { label: "Women Empowerment", className: "bg-accent/10 text-accent" },
    Agriculture: { label: "Rural Support", className: "bg-success/10 text-success" },
    Healthcare: { label: "High Priority Scheme", className: "bg-destructive/10 text-destructive" },
    Disability: { label: "High Priority Scheme", className: "bg-destructive/10 text-destructive" },
  };

  const badge = badgeMap[category];
  if (!badge) return null;

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.className}`}>
      {badge.label}
    </span>
  );
};
