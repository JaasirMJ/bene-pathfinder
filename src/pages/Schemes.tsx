import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchemeCard } from "@/components/SchemeCard";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Clock,
} from "lucide-react";
import { mockSchemes, schemeCategories, indianStates } from "@/data/mockData";

const Schemes = () => {
  const { t } = useLanguage();
  const { recentIds } = useRecentlyViewed();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedType, setSelectedType] = useState<"all" | "central" | "state">("all");
  const [sortBy, setSortBy] = useState<"score" | "name">("score");
  const [showFilters, setShowFilters] = useState(false);
  const [eligibilityFilter, setEligibilityFilter] = useState<"all" | "eligible" | "not-eligible">("all");

  const filteredSchemes = mockSchemes
    .filter((scheme) => {
      const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
      const matchesState = selectedState === "All States" || !scheme.state || scheme.state === selectedState;
      const matchesType = selectedType === "all" || scheme.type === selectedType;

      // Eligibility filter
      if (eligibilityFilter !== "all" && scheme.ruleMatches) {
        const allMatch = Object.values(scheme.ruleMatches).every(Boolean);
        if (eligibilityFilter === "eligible" && !allMatch) return false;
        if (eligibilityFilter === "not-eligible" && allMatch) return false;
      }

      return matchesSearch && matchesCategory && matchesState && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "score") {
        return (b.aiScore || 0) - (a.aiScore || 0);
      }
      return a.title.localeCompare(b.title);
    });

  const recentSchemes = mockSchemes.filter((s) => recentIds.includes(s.id));

  const activeFiltersCount = [
    selectedCategory !== "All",
    selectedState !== "All States",
    selectedType !== "all",
    eligibilityFilter !== "all",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedState("All States");
    setSelectedType("all");
    setSearchQuery("");
    setEligibilityFilter("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("schemes.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("schemes.subtitle")}
          </p>
        </div>

        {/* Recently Viewed */}
        {recentSchemes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              {t("recentlyViewed.title")}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentSchemes.map((scheme) => (
                <Link
                  key={scheme.id}
                  to={`/scheme/${scheme.id}`}
                  className="shrink-0 card-elevated p-3 w-[220px] hover:shadow-lg transition-shadow"
                >
                  <p className="text-sm font-medium text-foreground line-clamp-1">{scheme.title}</p>
                  <p className="text-xs text-muted-foreground">{scheme.category}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters Bar */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t("schemes.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Type toggle */}
              <div className="flex items-center rounded-lg border border-border p-1">
                <Button
                  variant={selectedType === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                  className="h-8"
                >
                  All
                </Button>
                <Button
                  variant={selectedType === "central" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType("central")}
                  className="h-8"
                >
                  Central
                </Button>
                <Button
                  variant={selectedType === "state" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType("state")}
                  className="h-8"
                >
                  State
                </Button>
              </div>

              {/* Filters button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="info" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as "score" | "name")}>
                <SelectTrigger className="w-[140px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">By Match Score</SelectItem>
                  <SelectItem value="name">By Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Eligibility Filters */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-medium">Eligibility:</span>
            <div className="flex items-center rounded-lg border border-border p-1">
              <Button
                variant={eligibilityFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setEligibilityFilter("all")}
                className="h-7 text-xs"
              >
                {t("schemes.showAll")}
              </Button>
              <Button
                variant={eligibilityFilter === "eligible" ? "default" : "ghost"}
                size="sm"
                onClick={() => setEligibilityFilter("eligible")}
                className="h-7 text-xs"
              >
                {t("schemes.showEligible")}
              </Button>
              <Button
                variant={eligibilityFilter === "not-eligible" ? "default" : "ghost"}
                size="sm"
                onClick={() => setEligibilityFilter("not-eligible")}
                className="h-7 text-xs"
              >
                {t("schemes.showNotEligible")}
              </Button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {schemeCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    State
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="sm:col-span-2 flex items-end">
                  <Button variant="ghost" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Clear all filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active filters pills */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedCategory("All")}>
                {selectedCategory}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {selectedState !== "All States" && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedState("All States")}>
                {selectedState}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {selectedType !== "all" && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedType("all")}>
                {selectedType} schemes
                <X className="h-3 w-3" />
              </Badge>
            )}
            {eligibilityFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setEligibilityFilter("all")}>
                {eligibilityFilter === "eligible" ? "Eligible Only" : "Not Eligible"}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredSchemes.length} schemes
        </p>

        {/* Schemes Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="card-elevated p-12 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No schemes found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Schemes;
