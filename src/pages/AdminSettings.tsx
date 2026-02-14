import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, Users, GraduationCap, LogOut, Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [applicationNotifs, setApplicationNotifs] = useState(true);
  const [schemeUpdates, setSchemeUpdates] = useState(true);

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isLoggedIn userRole="admin" userName="Admin User" />
      <main className="flex-1 section-container py-8 max-w-3xl">
        <Button variant="ghost" className="gap-1 mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-6">Admin Settings</h1>

        <div className="space-y-6">
          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-accent" /> Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-alerts" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email Alerts
                </Label>
                <Switch id="email-alerts" checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-alerts" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" /> SMS Notifications
                </Label>
                <Switch id="sms-alerts" checked={smsAlerts} onCheckedChange={setSmsAlerts} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="app-notifs" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> New Application Alerts
                </Label>
                <Switch id="app-notifs" checked={applicationNotifs} onCheckedChange={setApplicationNotifs} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="scheme-updates" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" /> Scheme Update Notifications
                </Label>
                <Switch id="scheme-updates" checked={schemeUpdates} onCheckedChange={setSchemeUpdates} />
              </div>
            </CardContent>
          </Card>

          {/* Manage Officers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent" /> Manage Officers</CardTitle>
              <CardDescription>View and manage officer accounts in your jurisdiction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Officer Ravi Kumar - Revenue Dept", "Officer Lakshmi S - Social Welfare", "Officer Arun M - Education Dept"].map((name) => (
                  <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{name}</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Manage Schools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-accent" /> Manage School Logins</CardTitle>
              <CardDescription>Manage school and college access credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Govt. Higher Sec. School, Chennai - ID: SCH001", "Govt. Arts College, Madurai - ID: SCH002", "District Model School, Coimbatore - ID: SCH003"].map((name) => (
                  <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{name}</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1">Save Settings</Button>
            <Button variant="destructive" className="gap-2" onClick={() => navigate("/")}>
              <LogOut className="h-4 w-4" /> Log Out
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSettings;
