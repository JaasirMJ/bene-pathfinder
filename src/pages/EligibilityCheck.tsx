import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EligibilityScoreCard } from "@/components/EligibilityScoreCard";
import { EligibilityBinaryResult } from "@/components/EligibilityTags";
import { SchemeCard } from "@/components/SchemeCard";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Brain,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Loader2,
  Search,
} from "lucide-react";
import { mockSchemes } from "@/data/mockData";

const EligibilityCheck = () => {
  const { t } = useLanguage();
  const [stage, setStage] = useState<"loading" | "complete">("loading");
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const navigate = useNavigate();

  const loadingTasks = [
    t("eligibility.analyzing"),
    t("eligibility.matching"),
    "Checking age criteria...",
    "Verifying income limits...",
    "Validating location eligibility...",
    "Preparing results...",
  ];

  const eligibleSchemes = mockSchemes
    .filter((s) => s.ruleMatches && Object.values(s.ruleMatches).every(Boolean))
    .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));

  const notEligibleSchemes = mockSchemes
    .filter((s) => s.ruleMatches && !Object.values(s.ruleMatches).every(Boolean));

  useEffect(() => {
    let taskIndex = 0;
    let progressInterval: NodeJS.Timeout;

    const updateProgress = () => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setStage("complete"), 500);
          return 100;
        }
        return newProgress;
      });

      if (taskIndex < loadingTasks.length) {
        setCurrentTask(loadingTasks[taskIndex]);
        taskIndex++;
      }
    };

    setCurrentTask(loadingTasks[0]);
    progressInterval = setInterval(updateProgress, 600);

    return () => clearInterval(progressInterval);
  }, []);

  if (stage === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="section-container py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* AI Brain Animation */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-accent/30 animate-pulse delay-100" />
              <div className="absolute inset-4 rounded-full bg-accent/40 animate-pulse delay-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="h-16 w-16 text-accent animate-pulse" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-4">
              {t("eligibility.analyzing")}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              {t("eligibility.matching")}
            </p>

            {/* Progress */}
            <div className="mb-6">
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </p>
            </div>

            {/* Current Task */}
            <div className="flex items-center justify-center gap-2 text-accent">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">{currentTask}</span>
            </div>

            {/* Processing Steps */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {["Rule Matching", "Criteria Check", "Results"].map((step, i) => (
                <div
                  key={step}
                  className={`p-4 rounded-lg border ${
                    progress > (i + 1) * 30
                      ? "border-success/50 bg-success/5"
                      : "border-border bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {progress > (i + 1) * 30 ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Results stage
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-container py-8">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Eligibility Analysis Complete!
          </h1>
          <p className="text-lg text-muted-foreground">
            We found <span className="font-semibold text-success">{eligibleSchemes.length} eligible</span> and <span className="font-semibold text-destructive">{notEligibleSchemes.length} not eligible</span> schemes
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <div className="card-elevated p-4 text-center border-2 border-success/30">
            <p className="text-3xl font-bold text-success">{eligibleSchemes.length}</p>
            <p className="text-sm text-muted-foreground">{t("eligibility.eligible")}</p>
          </div>
          <div className="card-elevated p-4 text-center border-2 border-destructive/30">
            <p className="text-3xl font-bold text-destructive">{notEligibleSchemes.length}</p>
            <p className="text-sm text-muted-foreground">{t("eligibility.notEligible")}</p>
          </div>
        </div>

        {/* Top Recommendation */}
        {eligibleSchemes[0] && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Badge className="bg-success/10 text-success border-success/30">Top Match</Badge>
              Best Recommendation for You
            </h2>
            <div className="card-elevated p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={eligibleSchemes[0].type === 'central' ? 'central' : 'state'}>
                      {eligibleSchemes[0].type === 'central' ? 'Central' : 'State'}
                    </Badge>
                    <Badge variant="category">{eligibleSchemes[0].category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {eligibleSchemes[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {eligibleSchemes[0].description}
                  </p>
                  <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-4">
                    <span className="text-xs font-medium text-success">Benefits</span>
                    <p className="text-sm font-semibold text-foreground">{eligibleSchemes[0].benefits}</p>
                  </div>
                  <Button className="group">
                    Apply Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div>
                  {eligibleSchemes[0].ruleMatches && (
                    <EligibilityBinaryResult ruleMatches={eligibleSchemes[0].ruleMatches} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              All Eligible Schemes ({eligibleSchemes.length})
            </h2>
            <Link to="/schemes">
              <Button variant="ghost" size="sm" className="gap-1">
                <Search className="h-4 w-4" />
                Browse All Schemes
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibleSchemes.slice(1).map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Complete your profile to get more accurate recommendations
          </p>
          <Link to="/profile">
            <Button variant="outline">Complete Profile</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EligibilityCheck;
