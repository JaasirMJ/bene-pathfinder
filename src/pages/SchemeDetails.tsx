import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EligibilityScoreCard } from "@/components/EligibilityScoreCard";
import { EligibilityBinaryResult } from "@/components/EligibilityTags";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { MissingDocsPopup } from "@/components/MissingDocsPopup";
import { SchemeTypeBadge, SchemeImportanceBadge } from "@/components/SchemeTypeBadge";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, FileText, IndianRupee, Bookmark } from "lucide-react";
import { mockSchemes } from "@/data/mockData";
import { cn } from "@/lib/utils";

const SchemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scheme = mockSchemes.find((s) => s.id === id);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { addToRecent } = useRecentlyViewed();
  const [showMissingDocs, setShowMissingDocs] = useState(false);

  useEffect(() => {
    if (id) addToRecent(id);
  }, [id]);

  if (!scheme) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Scheme Not Found</h1>
            <Link to="/schemes"><Button variant="outline">Back to Schemes</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const saved = isBookmarked(scheme.id);
  const allMatch = scheme.ruleMatches ? Object.values(scheme.ruleMatches).every(Boolean) : false;
  const missingDocs = ["Income Certificate", "Caste Certificate"].filter(() => Math.random() > 0.5); // Simulated

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 section-container py-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" className="gap-1" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <button
            onClick={() => toggleBookmark(scheme.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium",
              saved
                ? "text-warning bg-warning/10"
                : "text-muted-foreground hover:text-warning hover:bg-warning/5"
            )}
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
            {saved ? "Saved" : "Save for Later"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge variant={scheme.type === "central" ? "central" : "state"}>
                  {scheme.type === "central" ? "Central" : "State"}
                </Badge>
                <Badge variant="category" className="gap-1">
                  <SchemeTypeBadge category={scheme.category} />
                  {scheme.category}
                </Badge>
                <SchemeImportanceBadge category={scheme.category} />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{scheme.title}</h1>
              <p className="text-sm text-muted-foreground mb-1">{scheme.ministry}</p>
              <p className="text-muted-foreground mt-4">{scheme.description}</p>
            </div>

            {/* Binary Eligibility */}
            {scheme.ruleMatches && (
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Your Eligibility</h2>
                <EligibilityBinaryResult ruleMatches={scheme.ruleMatches} />
                {!allMatch && (
                  <Button
                    variant="outline"
                    className="mt-4 gap-2 text-destructive"
                    onClick={() => setShowMissingDocs(true)}
                  >
                    <FileText className="h-4 w-4" />
                    View Missing Requirements
                  </Button>
                )}
              </div>
            )}

            {/* Benefits */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-success" /> Benefits
              </h2>
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <p className="font-semibold text-foreground">{scheme.benefits}</p>
              </div>
            </div>

            {/* Eligibility criteria */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Eligibility Criteria</h2>
              {scheme.ruleMatches && (
                <div className="space-y-2">
                  {Object.entries(scheme.ruleMatches).map(([rule, matched]) => (
                    <div key={rule} className="flex items-center gap-2">
                      {matched ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="capitalize text-sm text-foreground">{rule}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Document Checklist */}
            <DocumentChecklist
              requiredDocs={scheme.documents}
              uploadedDocs={["Aadhaar Card", "Bank Account Details"]}
              category={scheme.category}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {scheme.ruleMatches && (
              <EligibilityScoreCard score={scheme.aiScore || 0} ruleMatches={scheme.ruleMatches} />
            )}

            <div className="card-elevated p-6 space-y-3">
              <Link to={`/scheme-register/${scheme.id}`}>
                <Button className="w-full group">
                  Register for Scheme
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/schemes">
                <Button variant="outline" className="w-full">Browse Other Schemes</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MissingDocsPopup
        open={showMissingDocs}
        onClose={() => setShowMissingDocs(false)}
        missingDocs={["Income Certificate", "Caste Certificate"]}
      />

      <Footer />
    </div>
  );
};

export default SchemeDetails;
