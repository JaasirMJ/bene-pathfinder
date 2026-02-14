import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AIChatbot } from "@/components/AIChatbot";
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
import FAQ from "./pages/FAQ";
import SavedSchemes from "./pages/SavedSchemes";
import OfficeFinder from "./pages/OfficeFinder";
import AdminProfile from "./pages/AdminProfile";
import AdminSettings from "./pages/AdminSettings";
import FindOfficers from "./pages/FindOfficers";
import SchoolLogin from "./pages/SchoolLogin";
import SchoolDashboard from "./pages/SchoolDashboard";
import VerifyDocuments from "./pages/VerifyDocuments";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import TrackApplication from "./pages/TrackApplication";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
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
            <Route path="/faq" element={<FAQ />} />
            <Route path="/saved-schemes" element={<SavedSchemes />} />
            <Route path="/office-finder" element={<OfficeFinder />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/officers" element={<FindOfficers />} />
            <Route path="/school-login" element={<SchoolLogin />} />
            <Route path="/school/dashboard" element={<SchoolDashboard />} />
            <Route path="/verify-documents" element={<VerifyDocuments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/track-application" element={<TrackApplication />} />
            <Route path="/feedback" element={<Feedback />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatbot />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
