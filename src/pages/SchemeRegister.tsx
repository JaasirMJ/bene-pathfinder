import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, CheckCircle, Upload } from "lucide-react";
import { mockSchemes } from "@/data/mockData";

const SchemeRegister = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scheme = mockSchemes.find((s) => s.id === id);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    beneficiaryType: "",
    familyIncomeCert: null as File | null,
  });

  const update = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md mx-4 text-center">
            <div className="card-elevated p-8">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h1>
              <p className="text-muted-foreground mb-6">
                Your application for <span className="font-semibold">{scheme.title}</span> has been submitted successfully.
              </p>
              <div className="space-y-3">
                <Link to="/applications">
                  <Button className="w-full">Track Application Status</Button>
                </Link>
                <Link to="/schemes">
                  <Button variant="outline" className="w-full">Browse More Schemes</Button>
                </Link>
              </div>
            </div>
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
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" className="mb-4 gap-1" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <div className="card-elevated p-8">
            <h1 className="text-xl font-bold text-foreground mb-1">
              Register for {scheme.title}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Provide additional details required for this scheme
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input id="bankName" placeholder="e.g. State Bank of India" value={formData.bankName} onChange={(e) => update("bankName", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input id="accountNumber" placeholder="e.g. 1234567890" value={formData.accountNumber} onChange={(e) => update("accountNumber", e.target.value)} required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code *</Label>
                  <Input id="ifsc" placeholder="e.g. SBIN0001234" value={formData.ifscCode} onChange={(e) => update("ifscCode", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Beneficiary Type *</Label>
                  <Select value={formData.beneficiaryType} onValueChange={(v) => update("beneficiaryType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self</SelectItem>
                      <SelectItem value="family">Family Member</SelectItem>
                      <SelectItem value="dependent">Dependent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Family Income Certification (optional)</Label>
                <label className="cursor-pointer block">
                  <div className="border border-dashed border-border rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                    <Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {formData.familyIncomeCert ? formData.familyIncomeCert.name : "Click to upload PDF/image"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        familyIncomeCert: e.target.files?.[0] || null,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="group">
                  Submit Application
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SchemeRegister;
