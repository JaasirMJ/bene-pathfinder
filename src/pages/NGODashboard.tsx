import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, FileText, TrendingUp, MessageSquare, BarChart3 } from "lucide-react";

const stats = [
  { label: "Citizens Supported", value: 142, icon: Users, color: "text-accent" },
  { label: "Applications Assisted", value: 89, icon: FileText, color: "text-info" },
  { label: "Schemes Tracked", value: 34, icon: TrendingUp, color: "text-success" },
  { label: "Messages", value: 12, icon: MessageSquare, color: "text-warning" },
];

const NGODashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isLoggedIn userRole="ngo" userName="NGO User" />

      <main className="flex-1 section-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">NGO Dashboard</h1>
          <p className="text-muted-foreground">Track citizens, applications, and scheme insights</p>
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

        {/* Scheme Insights */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" /> Scheme Utilization
            </h3>
            <div className="space-y-3">
              {["Education", "Healthcare", "Agriculture", "Pension"].map((cat) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{cat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${Math.floor(Math.random() * 60 + 30)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" /> Recent Messages
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">No messages yet. Messages from citizens and officers will appear here.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NGODashboard;
