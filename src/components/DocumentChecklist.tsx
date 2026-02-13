import { useLanguage } from "@/i18n/LanguageContext";
import { CheckCircle, XCircle, FileText } from "lucide-react";

interface DocumentChecklistProps {
  requiredDocs: string[];
  uploadedDocs?: string[];
  category?: string;
}

export const DocumentChecklist = ({
  requiredDocs,
  uploadedDocs = [],
  category,
}: DocumentChecklistProps) => {
  const { t } = useLanguage();

  const allDocs = [
    "Aadhaar Card",
    "Income Certificate",
    ...(category === "Education" ? ["Previous Marksheet"] : []),
    ...(requiredDocs.includes("Caste Certificate") ? ["Caste Certificate"] : []),
    ...(requiredDocs.includes("Disability Certificate") ? ["Disability Certificate"] : []),
    "Bank Account Details",
  ];

  // Deduplicate
  const uniqueDocs = [...new Set(allDocs)];

  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-accent" />
        {t("docs.checklist")}
      </h3>
      <div className="space-y-2">
        {uniqueDocs.map((doc) => {
          const uploaded = uploadedDocs.includes(doc);
          return (
            <div
              key={doc}
              className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                uploaded
                  ? "border-success/30 bg-success/5"
                  : "border-border"
              }`}
            >
              {uploaded ? (
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive shrink-0" />
              )}
              <span className="text-sm text-foreground">{doc}</span>
              <span
                className={`ml-auto text-xs font-medium ${
                  uploaded ? "text-success" : "text-destructive"
                }`}
              >
                {uploaded ? "✔" : "✖"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
