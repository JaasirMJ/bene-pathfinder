import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AadhaarAuth from "./pages/AadhaarAuth";
import AadhaarOTP from "./pages/AadhaarOTP";
import Dashboard from "./pages/Dashboard";
import Schemes from "./pages/Schemes";
import SchemeDetails from "./pages/SchemeDetails";
import SchemeRegister from "./pages/SchemeRegister";
import EligibilityCheck from "./pages/EligibilityCheck";
import EligibilityStart from "./pages/EligibilityStart";
import DocumentsUpload from "./pages/DocumentsUpload";
import AIAnalyzer from "./pages/AIAnalyzer";
import Applications from "./pages/Applications";
import ProfileCompletion from "./pages/ProfileCompletion";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import AdminDashboard from "./pages/AdminDashboard";
import NGODashboard from "./pages/NGODashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aadhaar-auth" element={<AadhaarAuth />} />
          <Route path="/aadhaar-otp" element={<AadhaarOTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/scheme/:id" element={<SchemeDetails />} />
          <Route path="/scheme-register/:id" element={<SchemeRegister />} />
          <Route path="/eligibility-check" element={<EligibilityCheck />} />
          <Route path="/eligibility-start" element={<EligibilityStart />} />
          <Route path="/documents-upload" element={<DocumentsUpload />} />
          <Route path="/ai-analyzer" element={<AIAnalyzer />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/profile" element={<ProfileCompletion />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/ngo" element={<NGODashboard />} />
          <Route path="/officer" element={<OfficerDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
