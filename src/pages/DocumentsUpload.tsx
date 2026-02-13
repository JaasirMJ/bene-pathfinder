import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Stepper } from "@/components/Stepper";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, ArrowLeft, Upload, FileText, CheckCircle, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocSlot {
  label: string;
  key: string;
  required: boolean;
}

const documentSlots: DocSlot[] = [
  { label: "Aadhaar Card (PDF/Photo)", key: "aadhaar", required: true },
  { label: "Income Certificate", key: "income", required: true },
  { label: "Caste Certificate", key: "caste", required: false },
  { label: "Disability Certificate", key: "disability", required: false },
  { label: "Address Proof", key: "address", required: true },
];

const DocumentsUpload = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [uploads, setUploads] = useState<Record<string, File | null>>({});

  const handleFile = (key: string, files: FileList | null) => {
    if (files && files[0]) {
      setUploads((prev) => ({ ...prev, [key]: files[0] }));
      toast({
        title: "✅ " + t("docs.uploadSuccess"),
        description: files[0].name,
      });
    }
  };

  const removeFile = (key: string) => {
    setUploads((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const requiredDone = documentSlots
    .filter((d) => d.required)
    .every((d) => uploads[d.key]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 section-container py-8">
        <div className="max-w-2xl mx-auto">
          <Stepper steps={["Profile Info", "Documents", "AI Analysis", "Schemes"]} currentStep={1} />

          <div className="card-elevated p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Upload className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Upload Documents</h1>
                <p className="text-sm text-muted-foreground">
                  Upload supporting documents for eligibility verification
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {documentSlots.map((doc) => (
                <div
                  key={doc.key}
                  className={`border rounded-lg p-4 transition-colors ${
                    uploads[doc.key]
                      ? "border-success/50 bg-success/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {uploads[doc.key] ? (
                        <CheckCircle className="h-5 w-5 text-success shrink-0" />
                      ) : (
                        <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <div>
                        <Label className="font-medium">
                          {doc.label}
                          {doc.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        {uploads[doc.key] && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {uploads[doc.key]!.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploads[doc.key] && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(doc.key)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <label className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="h-3 w-3 mr-1" />
                            {uploads[doc.key] ? "Replace" : "Upload"}
                          </span>
                        </Button>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFile(doc.key, e.target.files)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <Button
                disabled={!requiredDone}
                onClick={() => navigate("/ai-analyzer")}
                className="group"
              >
                Run AI Analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="mt-4 p-4 bg-info/10 border border-info/20 rounded-lg">
            <p className="text-sm text-info font-medium mb-1">Demo Mode</p>
            <p className="text-xs text-muted-foreground">
              Select any files to simulate uploads. No actual upload occurs in demo.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentsUpload;
