import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface EligibilityScoreCardProps {
  score: number;
  ruleMatches?: {
    age: boolean;
    income: boolean;
    location: boolean;
    gender: boolean;
    category: boolean;
  };
  compact?: boolean;
}

export const EligibilityScoreCard = ({ score, ruleMatches, compact = false }: EligibilityScoreCardProps) => {
  const { t } = useLanguage();
  const allMatch = ruleMatches ? Object.values(ruleMatches).every(Boolean) : false;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={cn("text-lg font-bold", allMatch ? "text-success" : "text-destructive")}>
          {allMatch ? t("eligibility.eligible") : t("eligibility.notEligible")}
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated p-6">
      <div className="flex items-start gap-6">
        {/* Binary Result */}
        <div className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center border-4",
          allMatch
            ? "border-success bg-success/10"
            : "border-destructive bg-destructive/10"
        )}>
          <span className={cn("text-xl font-bold", allMatch ? "text-success" : "text-destructive")}>
            {allMatch ? "YES" : "NO"}
          </span>
        </div>

        {/* Rule Matches */}
        {ruleMatches && (
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-semibold text-foreground mb-3">Eligibility Criteria</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ruleMatches).map(([key, value]) => (
                <div
                  key={key}
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    value ? "text-success" : "text-destructive"
                  )}
                >
                  {value ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                  <span className="capitalize">{key}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Score Label */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-2 w-2 rounded-full",
            allMatch ? "bg-success" : "bg-destructive"
          )} />
          <span className="text-sm font-medium">
            {allMatch ? t("eligibility.eligible") : t("eligibility.notEligible")}
          </span>
        </div>
        {!allMatch && ruleMatches && (
          <p className="text-xs text-muted-foreground mt-2">
            Missing: {Object.entries(ruleMatches).filter(([, v]) => !v).map(([k]) => k).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};
