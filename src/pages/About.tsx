import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Brain, FileCheck, Lock, Users, Target } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Discovery",
    description: "Our intelligent engine analyzes your profile against 500+ government schemes to find the best matches for you.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "Rule-based eligibility checks combined with ML scoring ensure you never miss a scheme you qualify for.",
  },
  {
    icon: FileCheck,
    title: "Document Analysis",
    description: "Upload your documents once. Our system validates and maps them to scheme requirements automatically.",
  },
  {
    icon: Users,
    title: "Multi-Role Support",
    description: "Purpose-built dashboards for citizens, NGOs, government officers, and administrators.",
  },
  {
    icon: Shield,
    title: "Aadhaar Verified",
    description: "Secure Aadhaar-based authentication ensures your identity and streamlines application processing.",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    description: "Your data is encrypted and stored securely. We never share personal information with third parties.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient text-primary-foreground py-20">
          <div className="section-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Benefits GPS</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              An AI-powered welfare scheme discovery platform helping every Indian citizen access the government benefits they deserve.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="section-container py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Benefits GPS Exists</h2>
            <p className="text-muted-foreground text-lg">
              India has over 500 central and state welfare schemes, yet millions of eligible citizens miss out due to lack of awareness, complex eligibility rules, and cumbersome application processes. Benefits GPS bridges this gap using AI to match citizens with schemes they qualify for — instantly and accurately.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="bg-secondary/30 py-16">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">How We Help</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f) => (
                <div key={f.title} className="card-elevated p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <f.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className="section-container py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Data & Privacy</h2>
            <div className="card-elevated p-8 space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">What we store:</strong> Your profile information (age, income, state, occupation) is used solely to match you with eligible schemes. Document uploads are stored securely and only used for application processing.
              </p>
              <p>
                <strong className="text-foreground">How we process:</strong> Eligibility analysis runs using a combination of rule-based matching and AI scoring. Your data is never used for advertising or shared with unauthorized third parties.
              </p>
              <p>
                <strong className="text-foreground">Your rights:</strong> You can view, update, or delete your data at any time from your profile settings. We comply with applicable data protection regulations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
