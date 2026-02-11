import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Stepper } from "@/components/Stepper";
import { ArrowRight, ArrowLeft, ClipboardList } from "lucide-react";
import { indianStates } from "@/data/mockData";

const EligibilityStart = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    annualIncome: "",
    gender: "",
    occupation: "",
    casteCategory: "",
    state: "",
    disabilityStatus: "none",
    householdMembers: "",
  });

  const update = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const isValid =
    formData.age && formData.annualIncome && formData.gender &&
    formData.occupation && formData.state && formData.householdMembers;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    navigate("/documents-upload", { state: { profile: formData } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 section-container py-8">
        <div className="max-w-2xl mx-auto">
          <Stepper
            steps={["Profile Info", "Documents", "AI Analysis", "Schemes"]}
            currentStep={0}
          />

          <div className="card-elevated p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Tell Us About Yourself</h1>
                <p className="text-sm text-muted-foreground">
                  We need some details to match you with eligible schemes
                </p>
              </div>
            </div>

            <form onSubmit={handleNext} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" type="number" min="0" max="120" placeholder="e.g. 35" value={formData.age} onChange={(e) => update("age", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income (₹) *</Label>
                  <Input id="income" type="number" min="0" placeholder="e.g. 150000" value={formData.annualIncome} onChange={(e) => update("annualIncome", e.target.value)} required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select value={formData.gender} onValueChange={(v) => update("gender", v)}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Occupation *</Label>
                  <Select value={formData.occupation} onValueChange={(v) => update("occupation", v)}>
                    <SelectTrigger><SelectValue placeholder="Select occupation" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="homemaker">Homemaker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Caste Category</Label>
                  <Select value={formData.casteCategory} onValueChange={(v) => update("casteCategory", v)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                      <SelectItem value="ews">EWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Select value={formData.state} onValueChange={(v) => update("state", v)}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      {indianStates.filter((s) => s !== "All States").map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Disability Status</Label>
                  <Select value={formData.disabilityStatus} onValueChange={(v) => update("disabilityStatus", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Disability</SelectItem>
                      <SelectItem value="physical">Physical Disability</SelectItem>
                      <SelectItem value="visual">Visual Impairment</SelectItem>
                      <SelectItem value="hearing">Hearing Impairment</SelectItem>
                      <SelectItem value="intellectual">Intellectual Disability</SelectItem>
                      <SelectItem value="multiple">Multiple Disabilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="household">Household Members *</Label>
                  <Input id="household" type="number" min="1" max="20" placeholder="e.g. 4" value={formData.householdMembers} onChange={(e) => update("householdMembers", e.target.value)} required />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button type="submit" disabled={!isValid} className="group">
                  Next: Upload Documents
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

export default EligibilityStart;
