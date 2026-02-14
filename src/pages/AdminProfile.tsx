import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, Edit, Mail, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isLoggedIn userRole="admin" userName="Admin User" />
      <main className="flex-1 section-container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Admin Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Admin User</h2>
              <p className="text-sm text-muted-foreground mb-1">admin@benefitsgps.gov.in</p>
              <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium mb-4">
                <Shield className="h-3 w-3 inline mr-1" />
                Administrator
              </span>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 gap-2">
                  <Edit className="h-4 w-4" /> Edit Profile
                </Button>
                <Link to="/admin/settings" className="flex-1">
                  <Button variant="default" className="w-full gap-2">
                    <Settings className="h-4 w-4" /> Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Full Name", value: "Admin User" },
                { label: "Email", value: "admin@benefitsgps.gov.in" },
                { label: "Phone", value: "+91 98765 43210" },
                { label: "Department", value: "Ministry of Social Justice" },
                { label: "Designation", value: "District Programme Officer" },
                { label: "State", value: "Tamil Nadu" },
                { label: "District", value: "Chennai" },
                { label: "Joined", value: "June 2023" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProfile;
