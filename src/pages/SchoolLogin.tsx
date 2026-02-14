import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Lock, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SchoolLogin = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId || !password) {
      toast({ title: "Error", description: "Please enter School ID and Password.", variant: "destructive" });
      return;
    }
    toast({ title: "Login Successful", description: "Redirecting to school dashboard..." });
    navigate("/school/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center section-container py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-2xl">School & College Login</CardTitle>
            <CardDescription>Access your institution dashboard to view student scheme eligibility</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="school-id" className="flex items-center gap-2 mb-1">
                  <Building2 className="h-4 w-4" /> School / College ID
                </Label>
                <Input id="school-id" placeholder="Enter your institution ID" value={schoolId} onChange={(e) => setSchoolId(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="school-password" className="flex items-center gap-2 mb-1">
                  <Lock className="h-4 w-4" /> Password
                </Label>
                <Input id="school-password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" size="lg">Login</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SchoolLogin;
