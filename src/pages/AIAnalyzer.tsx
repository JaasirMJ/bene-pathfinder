import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Stepper } from "@/components/Stepper";
import { Brain, CheckCircle, Loader2, FileSearch, Database, Sparkles } from "lucide-react";

const stages = [
  { icon: FileSearch, label: "Validating documents…" },
  { icon: Database, label: "Matching eligibility rules…" },
  { icon: Brain, label: "Running ML scoring engine…" },
  { icon: Sparkles, label: "Ranking scheme recommendations…" },
];

const AIAnalyzer = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/schemes"), 1200);
          return 100;
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const stageIndex = Math.min(Math.floor(progress / 25), stages.length - 1);
    setCurrentStage(stageIndex);
  }, [progress]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 section-container py-8">
        <div className="max-w-2xl mx-auto">
          <Stepper steps={["Profile Info", "Documents", "AI Analysis", "Schemes"]} currentStep={2} />

          <div className="card-elevated p-8 mt-8 text-center">
            {/* Animated brain */}
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
              <div className="absolute inset-3 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: "150ms" }} />
              <div className="absolute inset-6 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: "300ms" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="h-12 w-12 text-accent" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-2">
              AI Eligibility Engine Running
            </h1>
            <p className="text-muted-foreground mb-8">
              Analyzing your profile against 500+ government schemes
            </p>

            {/* Progress */}
            <Progress value={progress} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground mb-8">
              {Math.round(progress)}% complete
            </p>

            {/* Stage indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stages.map((stage, i) => {
                const StageIcon = stage.icon;
                const done = progress >= (i + 1) * 25;
                const active = currentStage === i && !done;

                return (
                  <div
                    key={stage.label}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      done
                        ? "border-success/50 bg-success/5"
                        : active
                        ? "border-accent/50 bg-accent/5"
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      {done ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : active ? (
                        <Loader2 className="h-5 w-5 text-accent animate-spin" />
                      ) : (
                        <StageIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-foreground leading-tight">
                      {stage.label.replace("…", "")}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Current task */}
            <div className="mt-8 flex items-center justify-center gap-2 text-accent">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">{stages[currentStage].label}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIAnalyzer;
