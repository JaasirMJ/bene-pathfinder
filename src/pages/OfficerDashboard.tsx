import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const OfficerDashboard = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("applications")
        .select("*, schemes(title)")
        .order("created_at", { ascending: false });
      if (data) setApplications(data);
    };
    fetch();
  }, []);

  const stats = [
    { label: "Pending Review", value: applications.filter((a) => a.status === "submitted").length, icon: Clock, color: "text-warning" },
    { label: "Under Review", value: applications.filter((a) => a.status === "under_review").length, icon: FileText, color: "text-info" },
    { label: "Approved", value: applications.filter((a) => a.status === "approved").length, icon: CheckCircle, color: "text-success" },
    { label: "Rejected", value: applications.filter((a) => a.status === "rejected").length, icon: XCircle, color: "text-destructive" },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      submitted: "status-pending",
      under_review: "status-review",
      approved: "status-approved",
      rejected: "status-rejected",
    };
    return <span className={map[status] || "status-pending"}>{status.replace("_", " ")}</span>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isLoggedIn userRole="officer" userName="Officer" />

      <main className="flex-1 section-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Government Officer Dashboard</h1>
          <p className="text-muted-foreground">Review and process scheme applications</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="card-elevated p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div className="card-elevated overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" /> All Applications
            </h3>
          </div>
          {applications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{(app.schemes as any)?.title || "—"}</TableCell>
                    <TableCell>{statusBadge(app.status || "submitted")}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {app.created_at ? new Date(app.created_at).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1 text-success">
                          <CheckCircle className="h-3 w-3" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1 text-destructive">
                          <XCircle className="h-3 w-3" /> Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No applications to review yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OfficerDashboard;
