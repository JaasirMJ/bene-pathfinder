import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  UserPlus,
  ClipboardList,
  Upload,
  Brain,
  ListChecks,
  FileSignature,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Sign Up / Login",
    description: "Create your account using email, Google, or Aadhaar verification. Quick and secure.",
  },
  {
    step: 2,
    icon: ClipboardList,
    title: "Complete Your Profile",
    description: "Fill in your personal details — age, income, state, occupation, caste, disability status, and household information.",
  },
  {
    step: 3,
    icon: Upload,
    title: "Upload Documents",
    description: "Upload required documents like Aadhaar card, income certificate, caste certificate, and address proof.",
  },
  {
    step: 4,
    icon: Brain,
    title: "AI Eligibility Analysis",
    description: "Our AI engine runs rule-based matching and ML scoring against 500+ central and state schemes to find your best matches.",
  },
  {
    step: 5,
    icon: ListChecks,
    title: "View Recommended Schemes",
    description: "See personalized scheme recommendations ranked by eligibility score with detailed match breakdowns.",
  },
  {
    step: 6,
    icon: FileSignature,
    title: "Apply for Schemes",
    description: "Register for schemes with auto-filled data. Track your application status in real-time from your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient text-primary-foreground py-20">
          <div className="section-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              From signup to scheme registration — discover your eligible benefits in 6 simple steps.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="section-container py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0">
                    <s.icon className="h-6 w-6 text-accent" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Step {s.step}</p>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary/30 py-16">
          <div className="section-container text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to find your benefits?</h2>
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
