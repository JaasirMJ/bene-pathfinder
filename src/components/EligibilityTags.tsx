import { useLanguage } from "@/i18n/LanguageContext";
import { CheckCircle, XCircle } from "lucide-react";

interface EligibilityTagsProps {
  ruleMatches?: {
    age: boolean;
    income: boolean;
    location: boolean;
    gender: boolean;
    category: boolean;
  };
}

export const EligibilityTags = ({ ruleMatches }: EligibilityTagsProps) => {
  const { t } = useLanguage();

  if (!ruleMatches) return null;

  const tags = [
    { key: "age", ok: ruleMatches.age, okLabel: t("eligibility.ageOk"), failLabel: t("eligibility.ageNotEligible") },
    { key: "income", ok: ruleMatches.income, okLabel: t("eligibility.incomeOk"), failLabel: t("eligibility.overIncomeLimit") },
    { key: "location", ok: ruleMatches.location, okLabel: t("eligibility.locationOk"), failLabel: t("eligibility.invalidState") },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag.key}
          className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
            tag.ok
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {tag.ok ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          {tag.ok ? tag.okLabel : tag.failLabel}
        </span>
      ))}
    </div>
  );
};

export const EligibilityBinaryResult = ({ ruleMatches }: EligibilityTagsProps) => {
  const { t } = useLanguage();

  if (!ruleMatches) return null;

  const allMatch = Object.values(ruleMatches).every(Boolean);
  const failedRules = Object.entries(ruleMatches).filter(([, v]) => !v).map(([k]) => k);

  return (
    <div className="space-y-3">
      <div
        className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
          allMatch
            ? "border-success bg-success/5"
            : "border-destructive bg-destructive/5"
        }`}
      >
        {allMatch ? (
          <CheckCircle className="h-8 w-8 text-success" />
        ) : (
          <XCircle className="h-8 w-8 text-destructive" />
        )}
        <div>
          <p className={`text-lg font-bold ${allMatch ? "text-success" : "text-destructive"}`}>
            {allMatch ? t("eligibility.eligible") : t("eligibility.notEligible")}
          </p>
          {!allMatch && (
            <p className="text-sm text-muted-foreground mt-1">
              Failed: {failedRules.map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(", ")}
            </p>
          )}
        </div>
      </div>

      <EligibilityTags ruleMatches={ruleMatches} />
    </div>
  );
};
