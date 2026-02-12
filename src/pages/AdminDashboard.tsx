import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  FileText,
  TrendingUp,
  Shield,
  Plus,
  Search,
  BarChart3,
  Settings,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "schemes" | "users" | "rules">("overview");
  const [schemes, setSchemes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSchemes = async () => {
      const { data } = await supabase.from("schemes").select("*").order("created_at", { ascending: false });
      if (data) setSchemes(data);
    };
    fetchSchemes();
  }, []);

  const stats = [
    { label: "Total Schemes", value: schemes.length, icon: FileText, color: "text-accent" },
    { label: "Total Users", value: "—", icon: Users, color: "text-info" },
    { label: "Applications", value: "—", icon: TrendingUp, color: "text-success" },
    { label: "Active Rules", value: schemes.length, icon: Shield, color: "text-warning" },
  ];

  const filteredSchemes = schemes.filter(
    (s) => s.title?.toLowerCase().includes(searchQuery.toLowerCase()) || s.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isLoggedIn userRole="admin" userName="Admin" />

      <main className="flex-1 section-container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage schemes, users, and eligibility rules</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["overview", "schemes", "users", "rules"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <div className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" /> Recent Activity
              </h3>
              <p className="text-muted-foreground text-sm">Activity log will populate as users interact with the platform.</p>
            </div>
          </div>
        )}

        {/* Schemes Management */}
        {activeTab === "schemes" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search schemes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add Scheme
              </Button>
            </div>

            <div className="card-elevated overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Income Limit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchemes.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium max-w-[250px] truncate">{s.title}</TableCell>
                      <TableCell><Badge variant="secondary">{s.category}</Badge></TableCell>
                      <TableCell><Badge variant={s.type === "central" ? "default" : "outline"}>{s.type}</Badge></TableCell>
                      <TableCell>{s.state || "All India"}</TableCell>
                      <TableCell>{s.income_limit ? `₹${(s.income_limit / 1000).toFixed(0)}K` : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="card-elevated p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">User Management</h3>
            <p className="text-muted-foreground">User analytics and management will appear as users sign up.</p>
          </div>
        )}

        {/* Rule Engine */}
        {activeTab === "rules" && (
          <div className="space-y-4">
            <div className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-accent" /> Eligibility Rule Engine
              </h3>
              <p className="text-muted-foreground mb-6">
                Define eligibility conditions for scheme matching. Rules are automatically applied during the AI eligibility analysis.
              </p>

              <div className="space-y-3">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <p className="text-sm font-medium text-foreground mb-2">Example Rule Block</p>
                  <div className="font-mono text-sm text-muted-foreground space-y-1">
                    <p><span className="text-accent">IF</span> age &gt;= scheme.min_age <span className="text-accent">AND</span> age &lt;= scheme.max_age</p>
                    <p><span className="text-accent">AND</span> annual_income &lt;= scheme.income_limit</p>
                    <p><span className="text-accent">AND</span> state = scheme.state <span className="text-accent">OR</span> scheme.state IS NULL</p>
                    <p><span className="text-accent">THEN</span> eligible = <span className="text-success">true</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
