import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";

const AadhaarOTP = () => {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const aadhaarNumber = (location.state as any)?.aadhaarNumber || "XXXXXXXXXXXX";

  const maskedAadhaar = `XXXX XXXX ${aadhaarNumber.slice(-4)}`;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    setError("");
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setTimeout(() => {
        navigate("/eligibility-start");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-4">
          <div className="card-elevated p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${verified ? "bg-success/10" : "bg-accent/10"}`}>
                {verified ? (
                  <CheckCircle className="h-8 w-8 text-success" />
                ) : (
                  <Shield className="h-8 w-8 text-accent" />
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {verified ? "Verified!" : "Enter OTP"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {verified
                  ? "Aadhaar e-KYC successful. Redirecting..."
                  : `OTP sent to mobile linked with Aadhaar ${maskedAadhaar}`}
              </p>
            </div>

            {!verified && (
              <>
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-center mb-6">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  onClick={handleVerify}
                  className="w-full mb-4"
                  disabled={verifying || otp.length !== 6}
                >
                  {verifying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend OTP in <span className="font-semibold text-foreground">{timer}s</span>
                    </p>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => setTimer(30)}>
                      Resend OTP
                    </Button>
                  )}
                </div>
              </>
            )}

            {verified && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/aadhaar-auth" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                Change Aadhaar Number
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
            <p className="text-sm text-info font-medium mb-1">Demo Mode</p>
            <p className="text-xs text-muted-foreground">
              Enter any 6 digits to simulate OTP verification.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AadhaarOTP;
