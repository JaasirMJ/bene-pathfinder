import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center section-container py-12">
        <div className="text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Thank You!</h1>
          <p className="text-muted-foreground mb-6">Your message has been submitted successfully. We'll get back to you within 2-3 business days.</p>
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
