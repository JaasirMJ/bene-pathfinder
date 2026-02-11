import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EligibilityScoreCard } from "@/components/EligibilityScoreCard";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, FileText, IndianRupee } from "lucide-react";
import { mockSchemes } from "@/data/mockData";

const SchemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scheme = mockSchemes.find((s) => s.id === id);

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 section-container py-8">
        <Button variant="ghost" className="mb-4 gap-1" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={scheme.type === "central" ? "central" : "state"}>
                  {scheme.type === "central" ? "Central" : "State"}
                </Badge>
                <Badge variant="category">{scheme.category}</Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{scheme.title}</h1>
              <p className="text-sm text-muted-foreground mb-1">{scheme.ministry}</p>
              <p className="text-muted-foreground mt-4">{scheme.description}</p>
            </div>

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

            {/* Documents */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" /> Required Documents
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Aadhaar Card</li>
                <li>Income Certificate</li>
                <li>Age Proof / Birth Certificate</li>
                <li>Bank Account Details</li>
                {scheme.category === "Education" && <li>Previous Marksheet</li>}
                {scheme.state && <li>Domicile Certificate ({scheme.state})</li>}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {scheme.aiScore !== undefined && (
              <EligibilityScoreCard score={scheme.aiScore} ruleMatches={scheme.ruleMatches} />
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

      <Footer />
    </div>
  );
};

export default SchemeDetails;
