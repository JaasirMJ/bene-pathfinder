import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Clock, Navigation, Building2, Search } from "lucide-react";
import { indianStates } from "@/data/mockData";

interface Office {
  id: string;
  name: string;
  type: string;
  address: string;
  state: string;
  phone: string;
  hours: string;
  distance: string;
}

const mockOffices: Office[] = [
  { id: "1", name: "District Collector Office", type: "Revenue", address: "Collector Office Complex, Anna Salai, Chennai 600002", state: "Tamil Nadu", phone: "044-2567-1234", hours: "Mon-Fri: 10AM-5PM", distance: "2.3 km" },
  { id: "2", name: "Taluk Office - Mylapore", type: "Revenue", address: "48, Kutchery Road, Mylapore, Chennai 600004", state: "Tamil Nadu", phone: "044-2498-5678", hours: "Mon-Fri: 10AM-5PM", distance: "4.1 km" },
  { id: "3", name: "Social Welfare Department", type: "Social Welfare", address: "DMS Complex, Teynampet, Chennai 600006", state: "Tamil Nadu", phone: "044-2432-9876", hours: "Mon-Sat: 9:30AM-5:30PM", distance: "5.7 km" },
  { id: "4", name: "Employment Exchange Office", type: "Employment", address: "Guindy Industrial Estate, Chennai 600032", state: "Tamil Nadu", phone: "044-2234-5678", hours: "Mon-Fri: 10AM-4PM", distance: "8.2 km" },
  { id: "5", name: "Municipal Corporation Office", type: "Municipal", address: "Ripon Building, Park Town, Chennai 600003", state: "Tamil Nadu", phone: "044-2561-0101", hours: "Mon-Sat: 10AM-5PM", distance: "3.5 km" },
  { id: "6", name: "Ration Card Office", type: "Food & Civil Supplies", address: "Block Office, T. Nagar, Chennai 600017", state: "Tamil Nadu", phone: "044-2834-5678", hours: "Mon-Fri: 10AM-4PM", distance: "6.0 km" },
  { id: "7", name: "District Magistrate Office", type: "Revenue", address: "Civil Lines, New Delhi 110054", state: "Delhi", phone: "011-2398-7654", hours: "Mon-Fri: 9AM-5PM", distance: "3.0 km" },
  { id: "8", name: "Gram Panchayat Office - Pune", type: "Local Governance", address: "Shivajinagar, Pune 411005", state: "Maharashtra", phone: "020-2553-1234", hours: "Mon-Sat: 10AM-5PM", distance: "1.8 km" },
];

const OfficeFinder = () => {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState("All States");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOffices = mockOffices.filter((office) => {
    const matchState = selectedState === "All States" || office.state === selectedState;
    const matchSearch = !searchQuery || office.name.toLowerCase().includes(searchQuery.toLowerCase()) || office.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchState && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-accent" />
            {t("officeFinder.title")}
          </h1>
          <p className="text-muted-foreground">{t("officeFinder.subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by office name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
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

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredOffices.length} offices
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredOffices.map((office) => (
            <div key={office.id} className="card-elevated p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{office.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                    {office.type}
                  </span>
                </div>
                <span className="text-sm font-semibold text-accent flex items-center gap-1">
                  <Navigation className="h-3 w-3" />
                  {office.distance}
                </span>
              </div>

              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{office.hours}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => window.open("https://maps.google.com/?q=nearest+government+office", "_blank")}
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </Button>
            </div>
          ))}
        </div>

        {filteredOffices.length === 0 && (
          <div className="card-elevated p-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No offices found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OfficeFinder;
