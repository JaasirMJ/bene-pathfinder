import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, ArrowRight, RefreshCw, ArrowLeft } from "lucide-react";

const AadhaarAuth = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode] = useState(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanAadhaar = aadhaarNumber.replace(/\s/g, "");
    if (cleanAadhaar.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    if (captchaInput.toUpperCase() !== captchaCode) {
      setError("Captcha doesn't match. Please try again.");
      return;
    }

    navigate("/aadhaar-otp", { state: { aadhaarNumber: cleanAadhaar } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-4">
          <div className="card-elevated p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Aadhaar e-KYC Login</h1>
              <p className="text-muted-foreground text-sm">
                Verify your identity securely using your Aadhaar number
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  inputMode="numeric"
                  placeholder="XXXX XXXX XXXX"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                  className="text-center text-lg tracking-widest font-mono"
                  maxLength={14}
                  required
                />
                <p className="text-xs text-muted-foreground">Enter your 12-digit Aadhaar number</p>
              </div>

              {/* Captcha */}
              <div className="space-y-2">
                <Label>Captcha Verification</Label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-muted rounded-lg p-3 text-center font-mono text-xl tracking-[0.5em] font-bold text-foreground select-none"
                    style={{
                      background: "repeating-linear-gradient(45deg, hsl(var(--muted)), hsl(var(--muted)) 10px, hsl(var(--muted-foreground) / 0.05) 10px, hsl(var(--muted-foreground) / 0.05) 20px)",
                    }}
                  >
                    {captchaCode}
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => window.location.reload()}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Enter captcha above"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="text-center tracking-widest font-mono"
                  maxLength={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full group">
                Send OTP
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                Back to Login
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
            <p className="text-sm text-info font-medium mb-1">Demo Mode</p>
            <p className="text-xs text-muted-foreground">
              Enter any 12-digit number and match the captcha to proceed.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AadhaarAuth;
