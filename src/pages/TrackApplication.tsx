import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { mockApplications } from "@/data/mockData";

const statusColors: Record<string, string> = {
  submitted: "bg-info/10 text-info",
  under_review: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

const TrackApplication = () => {
  const [query, setQuery] = useState("");
  const filtered = query
    ? mockApplications.filter((a) => a.id.toLowerCase().includes(query.toLowerCase()) || a.schemeName.toLowerCase().includes(query.toLowerCase()))
    : mockApplications;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <FileText className="h-8 w-8 text-accent" />
          Track Application
        </h1>
        <p className="text-muted-foreground mb-6">Track the status of your submitted applications.</p>

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by application ID or scheme name..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
        </div>

        <div className="space-y-4">
          {filtered.map((app) => (
            <Card key={app.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{app.schemeName}</h3>
                    <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                  </div>
                  <Badge className={statusColors[app.status] || ""}>{app.status.replace("_", " ").toUpperCase()}</Badge>
                </div>
                <div className="space-y-2 mt-4">
                  {app.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{step.status}</p>
                        <p className="text-xs text-muted-foreground">{step.date} — {step.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackApplication;
