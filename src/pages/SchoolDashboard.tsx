import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Calendar } from "lucide-react";

const schemeCategories = [
  { name: "Pudhumai Penn Scheme", eligible: Math.floor(Math.random() * 150) + 50 },
  { name: "Merit Scholarship", eligible: Math.floor(Math.random() * 80) + 20 },
  { name: "Post-Matric Scholarship", eligible: Math.floor(Math.random() * 100) + 30 },
  { name: "Free Laptop Scheme", eligible: Math.floor(Math.random() * 200) + 80 },
  { name: "Free Bus Pass for Girls", eligible: Math.floor(Math.random() * 300) + 100 },
  { name: "EBC Fee Concession", eligible: Math.floor(Math.random() * 60) + 10 },
  { name: "Minority Scholarship", eligible: Math.floor(Math.random() * 50) + 10 },
  { name: "National Means-cum-Merit Scholarship", eligible: Math.floor(Math.random() * 40) + 10 },
];

const totalStudents = schemeCategories.reduce((sum, s) => sum + s.eligible, 0);

const SchoolDashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-accent" />
            School Dashboard
          </h1>
          <p className="text-muted-foreground">Govt. Higher Secondary School, Chennai</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">School Name</p>
                <p className="font-semibold text-foreground">Govt. Higher Sec. School</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Academic Year</p>
                <p className="font-semibold text-foreground">2025-2026</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="font-semibold text-foreground">{totalStudents}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scheme Eligibility Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              Student Scheme Eligibility Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Scheme Category</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Eligible Students</th>
                  </tr>
                </thead>
                <tbody>
                  {schemeCategories.map((cat) => (
                    <tr key={cat.name} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-foreground">{cat.name}</td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="secondary" className="font-semibold">{cat.eligible}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SchoolDashboard;
