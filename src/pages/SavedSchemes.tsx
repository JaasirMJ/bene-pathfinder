import { useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchemeCard } from "@/components/SchemeCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { mockSchemes } from "@/data/mockData";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SavedSchemes = () => {
  const { t } = useLanguage();
  const { bookmarks } = useBookmarks();
  const savedSchemes = mockSchemes.filter((s) => bookmarks.includes(s.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 section-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Bookmark className="h-8 w-8 text-accent" />
            {t("bookmark.savedSchemes")}
          </h1>
          <p className="text-muted-foreground">Schemes you've bookmarked for later</p>
        </div>

        {savedSchemes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="card-elevated p-12 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No saved schemes yet</h3>
            <p className="text-muted-foreground mb-4">
              Click the bookmark icon on any scheme to save it for later
            </p>
            <Link to="/schemes">
              <Button variant="outline">Browse Schemes</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SavedSchemes;
