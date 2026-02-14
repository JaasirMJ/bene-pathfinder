import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface VerifiedDoc {
  type: string;
  name: string;
  dob: string;
  address: string;
  income?: string;
  validity: string;
  discrepancy?: string;
}

const simulatedResults: Record<string, VerifiedDoc> = {
  aadhaar: { type: "Aadhaar Card", name: "Rajesh Kumar", dob: "15-03-1990", address: "42, Gandhi Nagar, Chennai, Tamil Nadu - 600020", validity: "Valid", discrepancy: undefined },
  income: { type: "Income Certificate", name: "Rajesh Kumar", dob: "15-03-1990", address: "42, Gandhi Nagar, Chennai", income: "₹1,80,000/year", validity: "Valid until March 2026", discrepancy: "Name spelling slightly differs from Aadhaar" },
  caste: { type: "Caste Certificate", name: "Rajesh Kumar", dob: "15-03-1990", address: "42, Gandhi Nagar, Chennai", validity: "Valid", discrepancy: undefined },
};

const VerifyDocuments = () => {
  const [uploading, setUploading] = useState<string | null>(null);
  const [verified, setVerified] = useState<Record<string, VerifiedDoc>>({});

  const handleUpload = (docKey: string) => {
    setUploading(docKey);
    setTimeout(() => {
      setUploading(null);
      setVerified((prev) => ({ ...prev, [docKey]: simulatedResults[docKey] }));
    }, 2000);
  };

  const docTypes = [
    { key: "aadhaar", label: "Aadhaar Card" },
    { key: "income", label: "Income Certificate" },
    { key: "caste", label: "Caste Certificate" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <FileText className="h-8 w-8 text-accent" />
          OCR Document Verification
        </h1>
        <p className="text-muted-foreground mb-8">Upload your documents for automated verification and data extraction.</p>

        <div className="space-y-6">
          {docTypes.map((doc) => (
            <Card key={doc.key}>
              <CardHeader>
                <CardTitle className="text-lg">{doc.label}</CardTitle>
              </CardHeader>
              <CardContent>
                {uploading === doc.key ? (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <Loader2 className="h-10 w-10 text-accent animate-spin" />
                    <p className="text-sm text-muted-foreground">Analyzing document...</p>
                    <p className="text-xs text-muted-foreground">Extracting details using OCR</p>
                  </div>
                ) : verified[doc.key] ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm font-medium text-success">Verification Complete</span>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                      {[
                        { label: "Document", value: verified[doc.key].type },
                        { label: "Extracted Name", value: verified[doc.key].name },
                        { label: "DOB", value: verified[doc.key].dob },
                        { label: "Address", value: verified[doc.key].address },
                        ...(verified[doc.key].income ? [{ label: "Income", value: verified[doc.key].income! }] : []),
                        { label: "Validity", value: verified[doc.key].validity },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    {verified[doc.key].discrepancy && (
                      <div className="flex items-start gap-2 bg-warning/10 border border-warning/20 rounded-lg p-3">
                        <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{verified[doc.key].discrepancy}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Input type="file" accept="image/*,.pdf" className="flex-1" />
                    <Button onClick={() => handleUpload(doc.key)} className="gap-2">
                      <Upload className="h-4 w-4" /> Verify
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyDocuments;
