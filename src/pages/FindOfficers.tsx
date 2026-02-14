import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail, Clock, Building2, Search, MapPin, MessageSquare, X } from "lucide-react";
import { indianStates } from "@/data/mockData";

interface Officer {
  id: string;
  name: string;
  department: string;
  phone: string;
  email: string;
  officeHours: string;
  state: string;
  district: string;
}

const allOfficers: Officer[] = [
  { id: "o1", name: "Ravi Kumar", department: "Revenue Department", phone: "+91 44 2567 1234", email: "ravi.kumar@tn.gov.in", officeHours: "Mon-Fri: 10AM-5PM", state: "Tamil Nadu", district: "Chennai" },
  { id: "o2", name: "Lakshmi Sundaram", department: "Social Welfare Department", phone: "+91 44 2432 9876", email: "lakshmi.s@tn.gov.in", officeHours: "Mon-Sat: 9:30AM-5:30PM", state: "Tamil Nadu", district: "Chennai" },
  { id: "o3", name: "Arun Mohan", department: "Education Department", phone: "+91 44 2234 5678", email: "arun.m@tn.gov.in", officeHours: "Mon-Fri: 10AM-4PM", state: "Tamil Nadu", district: "Madurai" },
  { id: "o4", name: "Priya Natarajan", department: "Women & Child Development", phone: "+91 44 2561 0101", email: "priya.n@tn.gov.in", officeHours: "Mon-Fri: 10AM-5PM", state: "Tamil Nadu", district: "Coimbatore" },
  { id: "o5", name: "Suresh Babu", department: "Agriculture Department", phone: "+91 44 2834 5678", email: "suresh.b@tn.gov.in", officeHours: "Mon-Sat: 10AM-5PM", state: "Tamil Nadu", district: "Salem" },
  { id: "o6", name: "Amit Sharma", department: "Revenue Department", phone: "+91 11 2398 7654", email: "amit.s@delhi.gov.in", officeHours: "Mon-Fri: 9AM-5PM", state: "Delhi", district: "Central Delhi" },
  { id: "o7", name: "Neha Gupta", department: "Social Welfare Department", phone: "+91 11 2398 1111", email: "neha.g@delhi.gov.in", officeHours: "Mon-Fri: 9:30AM-5:30PM", state: "Delhi", district: "South Delhi" },
  { id: "o8", name: "Rajesh Patil", department: "Education Department", phone: "+91 20 2553 1234", email: "rajesh.p@maha.gov.in", officeHours: "Mon-Sat: 10AM-5PM", state: "Maharashtra", district: "Pune" },
  { id: "o9", name: "Ananya Reddy", department: "Health Department", phone: "+91 80 2223 4567", email: "ananya.r@ka.gov.in", officeHours: "Mon-Fri: 10AM-5PM", state: "Karnataka", district: "Bangalore" },
  { id: "o10", name: "Meena Kumari", department: "Women & Child Development", phone: "+91 471 2334 5678", email: "meena.k@kerala.gov.in", officeHours: "Mon-Sat: 10AM-5PM", state: "Kerala", district: "Thiruvananthapuram" },
];

const FindOfficers = () => {
  const [selectedState, setSelectedState] = useState("Tamil Nadu");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);

  const filtered = allOfficers.filter((o) => {
    const matchState = selectedState === "All States" || o.state === selectedState;
    const matchSearch = !searchQuery || o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchState && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <User className="h-8 w-8 text-accent" />
            Find Officers
          </h1>
          <p className="text-muted-foreground">Find government officers in your area who can help with scheme applications.</p>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search by name or department..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">Showing {filtered.length} officers</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((officer) => (
            <div key={officer.id} className="card-elevated p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{officer.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{officer.department}</span>
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" />{officer.phone}</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" />{officer.email}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" />{officer.officeHours}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" />{officer.district}, {officer.state}</div>
              </div>
              <Button variant="default" size="sm" className="w-full gap-2" onClick={() => setSelectedOfficer(officer)}>
                <MessageSquare className="h-4 w-4" /> Contact Officer
              </Button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card-elevated p-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No officers found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </main>

      {/* Contact Modal */}
      <Dialog open={!!selectedOfficer} onOpenChange={() => setSelectedOfficer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Officer</DialogTitle>
            <DialogDescription>Send a message to {selectedOfficer?.name}</DialogDescription>
          </DialogHeader>
          {selectedOfficer && (
            <div className="space-y-4">
              <div className="card-elevated p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{selectedOfficer.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedOfficer.department}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1 mt-2">
                  <p className="flex items-center gap-2"><Phone className="h-3 w-3" />{selectedOfficer.phone}</p>
                  <p className="flex items-center gap-2"><Mail className="h-3 w-3" />{selectedOfficer.email}</p>
                  <p className="flex items-center gap-2"><Clock className="h-3 w-3" />{selectedOfficer.officeHours}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Your Message</label>
                <Textarea placeholder="Type your message here..." rows={4} />
              </div>
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={() => setSelectedOfficer(null)}>Send Message</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default FindOfficers;
